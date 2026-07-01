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
    masterGain.gain.value = 0.05; // Very soft ambient volume
    masterGain.connect(ctx.destination);
    gainNodeRef.current = masterGain;

    // Create a cosmic drone using 3 low-frequency oscillators with slight detuning
    const frequencies = [55, 55.4, 82.4]; // A1, slight detune, E2 (perfect fifth)
    
    frequencies.forEach(freq => {
      const osc = ctx.createOscillator();
      const lfo = ctx.createOscillator();
      const lfoGain = ctx.createGain();

      // The main oscillator (sine wave for deep smooth drone)
      osc.type = 'sine';
      osc.frequency.value = freq;

      // Low frequency oscillator (LFO) to create a "breathing" or "pulsing" effect
      lfo.type = 'sine';
      lfo.frequency.value = 0.05 + Math.random() * 0.05; // Very slow pulse

      lfoGain.gain.value = 0.5; // Amplitude of the pulse

      lfo.connect(lfoGain);
      lfoGain.connect(osc.frequency);

      osc.connect(masterGain);
      
      osc.start();
      lfo.start();
      
      oscillatorsRef.current.push(osc, lfo);
    });

    // Add a very subtle high-pitch shimmer
    const shimmerOsc = ctx.createOscillator();
    shimmerOsc.type = 'triangle';
    shimmerOsc.frequency.value = 440; // A4
    const shimmerGain = ctx.createGain();
    shimmerGain.gain.value = 0.01;
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
