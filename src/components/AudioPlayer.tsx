import React, { useEffect, useRef, useState } from 'react';
import { Music, Volume2, VolumeX, Sparkles } from 'lucide-react';

interface AudioPlayerProps {
  autoStartTrigger?: boolean;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ autoStartTrigger }) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [volume, setVolume] = useState<number>(0.6);
  const [showControls, setShowControls] = useState<boolean>(false);
  const audioCtxRef = useRef<AudioContext | null>(null);
  const isPlayingRef = useRef<boolean>(false);
  const stepTimerRef = useRef<number | null>(null);

  // Musical sequence: Pentatonic Kyrgyz komuz / gentle romantic wedding motif (D major / B minor)
  // Notes in Hz: D4, F#4, A4, B4, D5, E5, F#5, A5
  const MELODY_SEQUENCE = [
    { freq: 293.66, dur: 0.8 }, // D4
    { freq: 369.99, dur: 0.6 }, // F#4
    { freq: 440.0, dur: 0.8 },  // A4
    { freq: 493.88, dur: 1.2 }, // B4
    { freq: 440.0, dur: 0.6 },  // A4
    { freq: 587.33, dur: 1.0 }, // D5
    { freq: 554.37, dur: 0.6 }, // C#5
    { freq: 493.88, dur: 0.8 }, // B4
    { freq: 440.0, dur: 1.4 },  // A4
    { freq: 369.99, dur: 0.8 }, // F#4
    { freq: 293.66, dur: 1.6 }, // D4
    // Second phrase
    { freq: 246.94, dur: 0.8 }, // B3
    { freq: 293.66, dur: 0.6 }, // D4
    { freq: 369.99, dur: 0.8 }, // F#4
    { freq: 440.0, dur: 1.0 },  // A4
    { freq: 493.88, dur: 0.8 }, // B4
    { freq: 587.33, dur: 1.2 }, // D5
    { freq: 659.25, dur: 0.8 }, // E5
    { freq: 739.99, dur: 1.6 }, // F#5
    { freq: 587.33, dur: 1.2 }, // D5
    { freq: 440.0, dur: 2.0 },  // A4
  ];

  // Pluck synthesizer to mimic acoustic komuz / gentle harp
  const playPluck = (ctx: AudioContext, frequency: number, duration: number, gainNode: GainNode) => {
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const noteGain = ctx.createGain();
    const filter = ctx.createBiquadFilter();

    // Harmonics for rich string resonance
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(frequency, ctx.currentTime);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(frequency * 2, ctx.currentTime);

    // Warm acoustic low-pass filter
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1600, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(400, ctx.currentTime + duration * 0.8);

    // Pluck amplitude envelope (fast attack, gentle natural acoustic decay)
    const now = ctx.currentTime;
    noteGain.gain.setValueAtTime(0.001, now);
    noteGain.gain.exponentialRampToValueAtTime(0.35, now + 0.02);
    noteGain.gain.exponentialRampToValueAtTime(0.0001, now + duration * 1.5);

    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(noteGain);
    noteGain.connect(gainNode);

    osc.start(now);
    osc2.start(now);
    osc.stop(now + duration * 1.6);
    osc2.stop(now + duration * 1.6);
  };

  const startMusic = async () => {
    try {
      if (!audioCtxRef.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef.current = new AudioCtx();
      }

      const ctx = audioCtxRef.current;
      if (ctx.state === 'suspended') {
        await ctx.resume();
      }

      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);

      isPlayingRef.current = true;
      setIsPlaying(true);

      let step = 0;
      const playLoop = () => {
        if (!isPlayingRef.current || !audioCtxRef.current) return;
        const currentNote = MELODY_SEQUENCE[step % MELODY_SEQUENCE.length];
        playPluck(audioCtxRef.current, currentNote.freq, currentNote.dur, masterGain);

        step++;
        stepTimerRef.current = window.setTimeout(playLoop, currentNote.dur * 850);
      };

      playLoop();
    } catch {
      // Audio context might fail in non-interactive environment
      setIsPlaying(false);
    }
  };

  const stopMusic = () => {
    isPlayingRef.current = false;
    setIsPlaying(false);
    if (stepTimerRef.current) {
      clearTimeout(stepTimerRef.current);
      stepTimerRef.current = null;
    }
    if (audioCtxRef.current && audioCtxRef.current.state === 'running') {
      audioCtxRef.current.suspend();
    }
  };

  const toggleMusic = () => {
    if (isPlaying) {
      stopMusic();
    } else {
      startMusic();
    }
  };

  // Allow trigger when envelope opens if user interacted
  useEffect(() => {
    if (autoStartTrigger && !isPlaying) {
      startMusic();
    }
  }, [autoStartTrigger]);

  useEffect(() => {
    return () => {
      stopMusic();
      if (audioCtxRef.current) {
        audioCtxRef.current.close().catch(() => {});
      }
    };
  }, []);

  return (
    <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 select-none">
      {/* Mini info badge on hover */}
      {showControls && (
        <div className="bg-[#FAF7F2]/95 backdrop-blur-md px-3 py-1.5 rounded-full border border-[#C8A97E]/30 shadow-md flex items-center gap-2 text-xs text-[#1B2A4A] animate-fade-in">
          <Sparkles className="w-3.5 h-3.5 text-[#C8A97E]" />
          <span className="font-serif-luxury text-sm font-medium">
            {isPlaying ? 'Кыргыз комузу жана романтика' : 'Музыка токтотулган'}
          </span>
        </div>
      )}

      {/* Floating Music Button */}
      <button
        type="button"
        onClick={toggleMusic}
        onMouseEnter={() => setShowControls(true)}
        onMouseLeave={() => setShowControls(false)}
        aria-label={isPlaying ? 'Музыканы өчүрүү' : 'Фондук музыканы угуу'}
        title={isPlaying ? 'Музыканы өчүрүү' : 'Фондук музыканы угуу'}
        className={`relative w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 shadow-[0_4px_16px_rgba(22,34,56,0.15)] border border-[#C8A97E]/40 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#C8A97E] ${
          isPlaying
            ? 'bg-[#162238] text-[#EFE4D3] scale-105'
            : 'bg-[#FAF7F2] text-[#162238] hover:bg-[#F3EDE2]'
        }`}
      >
        {isPlaying ? (
          <div className="relative flex items-center justify-center">
            {/* Pulsing gentle ring */}
            <span className="absolute -inset-1 rounded-full border border-[#C8A97E]/50 animate-ping opacity-30" />
            <Music className="w-5 h-5 text-[#C8A97E] animate-pulse" />
          </div>
        ) : (
          <VolumeX className="w-5 h-5 text-[#162238]/60" />
        )}
      </button>
    </div>
  );
};
