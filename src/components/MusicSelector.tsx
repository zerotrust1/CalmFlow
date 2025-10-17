import React, { useEffect, useRef } from "react";
import Selector, { Option } from "./Selector";

const musicOptions: Option[] = [
  { id: "none", label: "None", value: "none" },
  { id: "ocean", label: "Ocean", value: "ocean" }, // maps to public/sounds/ocean.mp3
  // add more tracks here with matching filenames in public/sounds/
];

type Props = {
  value: string | null;
  onChange: (value: string) => void;
};

export function MusicSelector({ value, onChange }: Props) {
  return <Selector label="Music" options={musicOptions} value={value} onChange={onChange} />;
}

type AudioControllerProps = {
  selectedMusic?: string | null;
  volume?: number;
  muted?: boolean;
};

export default function AudioController({
  selectedMusic,
  volume = 0.6,
  muted = false,
}: AudioControllerProps) {
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
    // when prop changes, attempt to play the selected track
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

    // attempt play (may be blocked by browser if no user gesture)
    a.play().catch(() => {
      // silent fail — removed UI button per request
    });
  }

  // no visible UI (navbar handles selection and control)
  return null;
}