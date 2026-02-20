/*
 * usePianoAudio — Web Audio API synthesized ambient piano
 * Plays a soft Cmaj7 → Fmaj7 chord progression at 15% volume
 * with play/pause toggle. Fully self-contained, no external files.
 */
import { useCallback, useEffect, useRef, useState } from "react";

// Note frequencies (Hz)
const NOTES: Record<string, number> = {
  C3: 130.81, E3: 164.81, G3: 196.00, B3: 246.94,
  C4: 261.63, E4: 329.63, F4: 349.23, G4: 392.00,
  A4: 440.00, B4: 493.88, C5: 523.25,
  F3: 174.61, A3: 220.00,
};

// Cmaj7 = C E G B, Fmaj7 = F A C E
const CMAJ7 = ["C3", "E3", "G3", "B3", "E4"];
const FMAJ7 = ["F3", "A3", "C4", "E4", "A4"];

function createPadVoice(
  ctx: AudioContext,
  freq: number,
  gain: GainNode,
  startTime: number,
  duration: number
) {
  const osc = ctx.createOscillator();
  osc.type = "sine";
  osc.frequency.setValueAtTime(freq, startTime);

  // Soft envelope
  const env = ctx.createGain();
  env.gain.setValueAtTime(0, startTime);
  env.gain.linearRampToValueAtTime(0.12, startTime + 1.5);
  env.gain.setValueAtTime(0.12, startTime + duration - 1.5);
  env.gain.linearRampToValueAtTime(0, startTime + duration);

  osc.connect(env);
  env.connect(gain);

  osc.start(startTime);
  osc.stop(startTime + duration);
}

function scheduleProgression(ctx: AudioContext, masterGain: GainNode, startOffset: number) {
  const chordDuration = 4.5;
  const totalCycle = chordDuration * 2;

  // Cmaj7
  CMAJ7.forEach((note) => {
    createPadVoice(ctx, NOTES[note], masterGain, ctx.currentTime + startOffset, chordDuration);
  });

  // Fmaj7
  FMAJ7.forEach((note) => {
    createPadVoice(
      ctx,
      NOTES[note],
      masterGain,
      ctx.currentTime + startOffset + chordDuration,
      chordDuration
    );
  });

  return totalCycle;
}

export function usePianoAudio() {
  const [isPlaying, setIsPlaying] = useState(false);
  const ctxRef = useRef<AudioContext | null>(null);
  const gainRef = useRef<GainNode | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const startedRef = useRef(false);

  const startAudio = useCallback(() => {
    if (startedRef.current) return;
    startedRef.current = true;

    try {
      const ctx = new AudioContext();
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(0.15, ctx.currentTime);
      masterGain.connect(ctx.destination);

      ctxRef.current = ctx;
      gainRef.current = masterGain;

      // Schedule first cycle immediately
      const cycleDuration = scheduleProgression(ctx, masterGain, 0);

      // Keep scheduling ahead
      intervalRef.current = setInterval(() => {
        if (ctx.state === "running") {
          scheduleProgression(ctx, masterGain, 0.1);
        }
      }, cycleDuration * 1000 - 200);

      setIsPlaying(true);
    } catch {
      startedRef.current = false;
    }
  }, []);

  const toggle = useCallback(() => {
    const ctx = ctxRef.current;
    if (!ctx) {
      startAudio();
      return;
    }

    if (ctx.state === "running") {
      ctx.suspend();
      setIsPlaying(false);
    } else {
      ctx.resume();
      setIsPlaying(true);
    }
  }, [startAudio]);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      ctxRef.current?.close();
    };
  }, []);

  return { isPlaying, toggle, startAudio };
}
