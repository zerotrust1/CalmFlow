import React, { useEffect, useState } from "react";
import Head from "next/head";
import SimpleNavBar from "../components/SimpleNavBar";
import MusicDrawer from "../components/MusicDrawer";
import BreathingCircle from "../components/BreathingCircle";
import ErrorBoundary from "../components/ErrorBoundary";
import {
  DEFAULT_BREATHING_SETTINGS,
  DEFAULT_THEME,
  DEFAULT_YOUTUBE_VIDEO,
  LOCAL_STORAGE_KEYS,
  getDefaultTheme,
} from "../constants/app";

type Settings = {
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
};

type Theme = "ocean" | "forest" | "night" | "sunny" | "sunset";

const loadVideoId = (): string => {
  if (typeof window === "undefined") return DEFAULT_YOUTUBE_VIDEO;
  try {
    return localStorage.getItem(LOCAL_STORAGE_KEYS.YOUTUBE_VIDEO) || DEFAULT_YOUTUBE_VIDEO;
  } catch {
    return DEFAULT_YOUTUBE_VIDEO;
  }
};

const loadTheme = (): Theme => {
  if (typeof window === "undefined") return DEFAULT_THEME as Theme;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.THEME);
    // If no saved theme, use device preference (dark mode = night, light mode = forest)
    return (saved as Theme) || getDefaultTheme();
  } catch {
    return getDefaultTheme();
  }
};

const loadSettings = (): Settings => {
  if (typeof window === "undefined") return DEFAULT_BREATHING_SETTINGS;
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_KEYS.BREATHING_SETTINGS);
    return saved ? JSON.parse(saved) : DEFAULT_BREATHING_SETTINGS;
  } catch {
    return DEFAULT_BREATHING_SETTINGS;
  }
};

export default function Breathing() {
  const [videoId, setVideoId] = useState<string | null>(loadVideoId);
  const [error, setError] = useState<string>("");
  const [theme, setTheme] = useState<Theme>(loadTheme);
  const [settings, setSettings] = useState<Settings>(loadSettings);

  // Persist settings to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.BREATHING_SETTINGS, JSON.stringify(settings));
      } catch (error) {
        console.warn("Failed to save breathing settings:", error);
      }
    }
  }, [settings]);

  // Handle video load
  const handleVideoLoad = (id: string) => {
    setVideoId(id);
    setError("");
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.YOUTUBE_VIDEO, id);
      } catch (error) {
        console.warn("Failed to save YouTube video ID:", error);
      }
    }
  };

  // Set theme-based background
  useEffect(() => {
    const html = document.documentElement;
    const body = document.body;
    const nextRoot = document.getElementById("__next");

    // Theme gradients
    const gradients = {
      ocean: "linear-gradient(180deg, #e0f2fe 0%, #bae6fd 100%)",
      forest: "linear-gradient(180deg, #d1fae5 0%, #a7f3d0 100%)",
      night: "linear-gradient(180deg, #1e1b4b 0%, #312e81 100%)",
      sunny: "linear-gradient(180deg, #fef3c7 0%, #fde68a 100%)",
      sunset: "linear-gradient(180deg, #fed7aa 0%, #fdba74 100%)",
    };

    const gradient = gradients[theme] || gradients.forest;

    if (html) html.style.backgroundImage = gradient;
    if (body) body.style.backgroundImage = gradient;
    if (nextRoot) nextRoot.style.backgroundImage = gradient;
  }, [theme]);

  return (
    <ErrorBoundary>
      <>
        <Head>
          <title>CalmFlow - Breathing Guide</title>
          <meta name="description" content="Breathing guide with YouTube audio" />
        </Head>

        <SimpleNavBar 
          settings={settings} 
          onSettingsChange={setSettings}
          theme={theme}
          onThemeChange={setTheme}
        />

      <main
        style={{
          paddingTop: 64,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          padding: "64px 20px",
          width: "100%",
          boxSizing: "border-box",
          position: "relative",
        }}
      >
        {/* Main Breathing Circle - Center Focus */}
        <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <BreathingCircle
            inhaleMs={settings.inhaleSec * 1000}
            holdMs={settings.holdSec * 1000}
            exhaleMs={settings.exhaleSec * 1000}
          />
        </div>

        {/* Music Drawer at Bottom */}
        <MusicDrawer
          videoId={videoId}
          onVideoLoad={handleVideoLoad}
          onError={setError}
          error={error}
        />
      </main>

        <footer
          style={{
            padding: "20px",
            textAlign: "center",
            color: "#999",
            fontSize: 11,
            marginBottom: 100,
          }}
        >
          © {new Date().getFullYear()} CalmFlow
        </footer>
      </>
    </ErrorBoundary>
  );
}
