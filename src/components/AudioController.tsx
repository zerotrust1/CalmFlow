import React, { useEffect, useRef } from "react";

type Props = {
  selectedMusic: string | null; // e.g. "ocean" or "none"
  volume?: number;
  muted?: boolean;
};

export default function AudioController({ selectedMusic, volume = 0.6, muted = false }: Props) {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.loop = true;
      audioRef.current.preload = "auto";
      audioRef.current.volume = volume;
    }
  }, [volume]);

  useEffect(() => {
    const handler = (e: Event) => {
      const ev = e as CustomEvent;
      const track = ev.detail ?? null;
      setSourceAndPlay(track);
    };
    window.addEventListener("calmflow:music-change", handler as EventListener);
    return () => window.removeEventListener("calmflow:music-change", handler as EventListener);
  }, []);

  useEffect(() => {
    setSourceAndPlay(selectedMusic ?? null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedMusic, muted, volume]);

  function setSourceAndPlay(track: string | null) {
    const a = audioRef.current;
    if (!a) return;
    a.muted = muted;
    a.volume = volume;

    if (!track || track === "none") {
      a.pause();
      a.currentTime = 0;
      return;
    }

    const url = `/sounds/${track}.mp3`;
    if (a.src !== url) {
      a.src = url;
      a.load();
    }

    a.play().catch(() => {
      // autoplay blocked — no UI here (navbar handles controls)
    });
  }

  // NO visible UI — completely hidden
  return null;
}
