/*
 * Home — Main page for BidSnap demo
 * Handles: email gate, view tracking, watermark, demo walkthrough, music
 * Design: Noir Cinema — dark theater experience
 */
import { useState, useEffect, useRef } from "react";
import { usePianoAudio } from "@/hooks/usePianoAudio";
import EmailGate from "@/components/EmailGate";
import Watermark from "@/components/Watermark";
import DemoWalkthrough from "@/components/DemoWalkthrough";
import ExpiredView from "@/components/ExpiredView";

const MAX_VIEWS = 3;
const STORAGE_KEY = "bidsnap_demo_state";

interface DemoState {
  email: string;
  viewCount: number;
  lastViewedAt: number;
}

export default function Home() {
  const [state, setState] = useState<DemoState | null>(null);
  const [isExpired, setIsExpired] = useState(false);
  const { isPlaying, toggle: toggleMusic, startAudio } = usePianoAudio();
  const viewCountIncrementedRef = useRef(false);

  // Initialize state from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        // Validate structure
        if (
          parsed &&
          typeof parsed === "object" &&
          typeof parsed.email === "string" &&
          typeof parsed.viewCount === "number" &&
          typeof parsed.lastViewedAt === "number"
        ) {
          setState(parsed);
          if (parsed.viewCount >= MAX_VIEWS) {
            setIsExpired(true);
          }
        }
      }
    } catch {
      // Silent fail on parse error
      setState(null);
    }
  }, []);

  // Increment view count exactly once when state is loaded
  useEffect(() => {
    if (!state || viewCountIncrementedRef.current) return;
    viewCountIncrementedRef.current = true;

    const newViewCount = state.viewCount + 1;
    if (newViewCount > MAX_VIEWS) {
      setIsExpired(true);
      return;
    }

    const updatedState = { ...state, viewCount: newViewCount, lastViewedAt: Date.now() };
    setState(updatedState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedState));
    } catch {
      // Silent fail
    }
  }, [state]);

  // Auto-start music on first interaction
  useEffect(() => {
    const handleInteraction = () => {
      startAudio();
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
    document.addEventListener("click", handleInteraction);
    document.addEventListener("touchstart", handleInteraction);
    return () => {
      document.removeEventListener("click", handleInteraction);
      document.removeEventListener("touchstart", handleInteraction);
    };
  }, [startAudio]);

  // Disable right-click
  useEffect(() => {
    const handleContextMenu = (e: MouseEvent) => {
      e.preventDefault();
    };
    document.addEventListener("contextmenu", handleContextMenu);
    return () => document.removeEventListener("contextmenu", handleContextMenu);
  }, []);

  // Disable screenshot/print
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Disable Print Screen
      if (e.key === "PrintScreen") {
        e.preventDefault();
      }
      // Disable Ctrl+S, Ctrl+P, Cmd+S, Cmd+P
      if ((e.ctrlKey || e.metaKey) && (e.key === "s" || e.key === "p")) {
        e.preventDefault();
      }
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleEmailSubmit = (email: string) => {
    const newState: DemoState = {
      email,
      viewCount: 1,
      lastViewedAt: Date.now(),
    };
    setState(newState);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newState));
    } catch {
      // Silent fail on storage error
    }
  };

  // If expired, show expired view
  if (isExpired) {
    return <ExpiredView />;
  }

  // If no email, show email gate
  if (!state) {
    return <EmailGate onSubmit={handleEmailSubmit} />;
  }

  // Show demo walkthrough with watermark
  return (
    <>
      <Watermark email={state.email} />
      <DemoWalkthrough onMusicToggle={toggleMusic} isMusicPlaying={isPlaying} />
    </>
  );
}
