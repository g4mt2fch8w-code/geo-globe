import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  
  const audioCtxRef = useRef<AudioContext | null>(null);
  const activeNodesRef = useRef<any[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);
  const intervalsRef = useRef<any[]>([]);

  useEffect(() => {
    return () => stopAudio();
  }, []);

  const stopAudio = () => {
    activeNodesRef.current.forEach(node => {
      try { 
        if (node.stop) node.stop(); 
        node.disconnect(); 
      } catch {}
    });
    activeNodesRef.current = [];
    intervalsRef.current.forEach(clearInterval);
    intervalsRef.current = [];
    if (gainNodeRef.current) {
      gainNodeRef.current.disconnect();
    }
    if (audioCtxRef.current) {
      audioCtxRef.current.close();
      audioCtxRef.current = null;
    }
  };

  const startAudio = () => {
    const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
    const ctx = new AudioContext();
    audioCtxRef.current = ctx;

    const masterGain = ctx.createGain();
    masterGain.gain.value = 0.60; 
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    playEnigma(ctx, masterGain);
  };

  const playEnigma = async (ctx: AudioContext, masterGain: GainNode) => {
    try {
      const response = await fetch('/sadeness.mp3');
      if (response.ok) {
        const arrayBuffer = await response.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        const duration = audioBuffer.duration;
        const crossfadeTime = 3.0; // 3 second smooth crossfade overlap
        let nextStartTime = ctx.currentTime;

        const scheduleLoop = () => {
          if (ctx.state === 'closed') return;

          const source = ctx.createBufferSource();
          source.buffer = audioBuffer;
          const trackGain = ctx.createGain();

          source.connect(trackGain);
          trackGain.connect(masterGain);

          // Smooth Fade In
          trackGain.gain.setValueAtTime(0, nextStartTime);
          trackGain.gain.linearRampToValueAtTime(1.0, nextStartTime + crossfadeTime);

          // Smooth Fade Out
          trackGain.gain.setValueAtTime(1.0, nextStartTime + duration - crossfadeTime);
          trackGain.gain.linearRampToValueAtTime(0, nextStartTime + duration);

          source.start(nextStartTime);
          source.stop(nextStartTime + duration);

          activeNodesRef.current.push(source, trackGain);

          // Calculate start time for the next overlapping loop
          nextStartTime += (duration - crossfadeTime);

          // Schedule the next loop in javascript just before it's needed
          const timeToNextLoop = (nextStartTime - ctx.currentTime - 2.0) * 1000;
          if (timeToNextLoop > 0) {
            const timeoutId = setTimeout(scheduleLoop, timeToNextLoop);
            intervalsRef.current.push(timeoutId); // Store to clear on stop
          } else {
             // Fallback if audio is super short
             setTimeout(scheduleLoop, 100);
          }
        };

        scheduleLoop();
      } else {
        console.warn("sadeness.mp3 not found in public folder. Please add it to hear the music.");
      }
    } catch (e) {
      console.error("Error loading sadeness.mp3:", e);
    }
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
    } else {
      startAudio();
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="fixed bottom-24 right-4 z-50">
      <button
        onClick={toggleAudio}
        className={`p-3 rounded-full border transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${
          isPlaying 
            ? 'bg-[#08221a]/90 border-[#34d399]/50 text-[#34d399]' 
            : 'bg-[#08221a]/50 border-gray-600 text-gray-400 hover:text-white'
        } backdrop-blur-md`}
        title={isPlaying ? "Mute Sadeness" : "Play Sadeness"}
      >
        {isPlaying ? <Volume2 className="w-5 h-5 animate-pulse" /> : <VolumeX className="w-5 h-5" />}
      </button>
    </div>
  );
};
