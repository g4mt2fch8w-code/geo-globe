import React, { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX } from 'lucide-react';

export const AmbientAudio: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const oscillatorsRef = useRef<OscillatorNode[]>([]);
  const gainNodeRef = useRef<GainNode | null>(null);

  useEffect(() => {
    return () => {
      stopAudio();
    };
  }, []);

  const stopAudio = () => {
    oscillatorsRef.current.forEach(osc => {
      try { osc.stop(); } catch(e) {}
      osc.disconnect();
    });
    oscillatorsRef.current = [];
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
    masterGain.gain.value = 0.12; // Increased ambient volume
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Create an ethereal, uplifting A Major 7th chord
    const frequencies = [
      110.00, // A2 (root)
      138.59, // C#3 (major third)
      164.81, // E3 (perfect fifth)
      207.65  // G#3 (major seventh)
    ]; 
    
    frequencies.forEach((freq, index) => {
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      // The main oscillator (sine wave for deep smooth ambient)
      osc.type = 'sine';
      osc.frequency.value = freq;

      // Low frequency oscillator (LFO) to create a "breathing" effect
      lfo.type = 'sine';
      // Each note breathes at a slightly different rate for organic feel
      lfo.frequency.value = 0.02 + Math.random() * 0.02; 

      lfoGain.gain.value = 0.3; // Amplitude of the frequency modulation

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      // Volume modulation (Tremolo) for extra smoothness
      const volLfo = ctx.createOscillator();
      const volGain = ctx.createGain();
      volLfo.type = 'sine';
      volLfo.frequency.value = 0.03 + Math.random() * 0.02;
      
      const nodeGain = ctx.createGain();
      // Higher notes should be slightly quieter
      nodeGain.gain.value = 1.0 - (index * 0.15); 
      
      volGain.gain.value = 0.4;
      volLfo.connect(volGain);
      volGain.connect(nodeGain.gain);

      osc.connect(nodeGain);
      nodeGain.connect(masterGain);
      
      osc.start();
      lfo.start();
      volLfo.start();
      
      oscillatorsRef.current.push(osc, lfo, volLfo);
    });

    // Add a very subtle, angelic high-pitch shimmer
    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = 'sine';
    shimmerOsc.frequency.value = 440; // A4
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.02;
    shimmerOsc.connect(shimmerGain);
    shimmerGain.connect(masterGain);
    shimmerOsc.start();
    oscillatorsRef.current.push(shimmerOsc);
  };

  const toggleAudio = () => {
    if (isPlaying) {
      stopAudio();
      setIsPlaying(false);
    } else {
      startAudio();
      setIsPlaying(true);
    }
  };

  return (
    <button
      onClick={toggleAudio}
      className={`fixed bottom-24 right-4 z-50 p-3 rounded-full border transition-all duration-300 shadow-[0_0_20px_rgba(0,0,0,0.5)] ${
        isPlaying 
          ? 'bg-[#08221a]/90 border-[#34d399]/50 text-[#34d399]' 
          : 'bg-[#08221a]/50 border-gray-600 text-gray-400'
      } backdrop-blur-md`}
      title={isPlaying ? "Mute Ambient Space Drone" : "Play Ambient Space Drone"}
    >
      {isPlaying ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
    </button>
  );
};
