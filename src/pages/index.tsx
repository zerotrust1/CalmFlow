import React, { useEffect, useState } from "react";
import NavBar from "../components/NavBar";
import AudioController from "../components/AudioController";
import BreathingCircle from "../components/BreathingCircle";

type Settings = {
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
};

export default function Home() {
  <head>
        <title>CalmFlow</title>
        <meta name="description" content="Relaxing breathing guide" />
  </head>
  const [theme, setTheme] = useState<string | null>("ocean");
  const [music, setMusic] = useState<string | null>("ocean");
  const [background, setBackground] = useState<string | null>("none");

  const [settings, setSettings] = useState<Settings>({ inhaleSec: 4, holdSec: 2, exhaleSec: 6 });

  useEffect(() => {
    const html = document.documentElement;
    html.classList.remove("theme-ocean", "theme-forest", "theme-night");
    if (theme) html.classList.add(`theme-${theme}`);

    const themePalettes: Record<string, Record<string, string>> = {
      ocean: {
        "--theme-bg": "linear-gradient(180deg,#e6fbff,#f0f8ff)",
        "--label-color": "#043544", // dark teal on light label bg
        "--breath-bg": "linear-gradient(180deg, rgba(3,105,161,0.16), rgba(3,105,161,0.05))",
        "--breath-shadow": "0 26px 80px rgba(3,105,161,0.18), inset 0 -12px 36px rgba(3,105,161,0.06)",
      },
      forest: {
        "--theme-bg": "linear-gradient(180deg,#f7fdf6,#ecfdf3)",
        "--label-color": "#042617", // dark green for good contrast on light label bg
        // slightly stronger green so the circle stands out on mixed backgrounds/images
        "--breath-bg": "linear-gradient(180deg, rgba(34,197,94,0.18), rgba(34,197,94,0.06))",
        "--breath-shadow": "0 20px 56px rgba(16,88,44,0.14), inset 0 -10px 28px rgba(34,197,94,0.04)",
      },
      night: {
        "--theme-bg": "linear-gradient(180deg,#0b1220,#07122b)",
        "--label-color": "#071033", // dark label text so it remains legible on the white label background
        // make the circle subtly lighter than the page so it is visible on dark night theme
        "--breath-bg": "linear-gradient(180deg, rgba(255,255,255,0.06), rgba(255,255,255,0.02))",
        "--breath-shadow": "0 22px 64px rgba(2,6,23,0.36), inset 0 -10px 28px rgba(255,255,255,0.02)",
      },
    };

    const vars = themePalettes[theme ?? "ocean"] ?? themePalettes.ocean;
    Object.entries(vars).forEach(([k, v]) => document.documentElement.style.setProperty(k, v));
  }, [theme]);

  // robust background setter: preload, set var + inline on html/body/#__next
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;
    const nextRoot = document.getElementById("__next");

    const clearImage = () => {
      root.style.setProperty("--app-bg-image", "none");
      root.style.setProperty("--app-bg-size", "cover");
      root.style.backgroundImage = "";
      body.style.backgroundImage = "";
      if (nextRoot) nextRoot.style.backgroundImage = "";
    };

    if (background === "beach") {
      const imgPath = "/background/beach.jpg";
      const img = new Image();
      img.onload = () => {
        const imgValue = `url("${imgPath}")`;
        root.style.setProperty("--app-bg-image", imgValue);
        root.style.setProperty("--app-bg-size", "cover");
        // also inline for immediate coverage
        root.style.backgroundImage = imgValue;
        body.style.backgroundImage = imgValue;
        if (nextRoot) nextRoot.style.backgroundImage = imgValue;
        console.log("[bg] loaded", img.naturalWidth, "x", img.naturalHeight);
      };
      img.onerror = () => {
        console.error("[bg] failed to load", imgPath);
        clearImage();
      };
      img.src = imgPath;
    } else {
      clearImage();
    }
  }, [background]);

  return (
    <>
      <NavBar
        theme={theme}
        onThemeChange={(t) => setTheme(t)}
        music={music}
        onMusicChange={(m) => setMusic(m)}
        background={background}
        onBackgroundChange={(b) => setBackground(b)}
        settings={settings}
        onSettingsChange={(s) => setSettings(s)}
      />
      <main className="page-with-navbar-padding" style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
        <BreathingCircle inhaleMs={settings.inhaleSec * 1000} holdMs={settings.holdSec * 1000} exhaleMs={settings.exhaleSec * 1000} />
        <AudioController selectedMusic={music} />
      </main>

      <div className="app-copyright">© {new Date().getFullYear()} CalmFlow</div>
    </>
  );
}
