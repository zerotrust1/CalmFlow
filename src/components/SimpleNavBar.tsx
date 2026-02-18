import React, { useState } from "react";
import Link from "next/link";
import PeacefulThemesPanel from "./PeacefulThemesPanel";
import PeacefulSettingsPanel from "./PeacefulSettingsPanel";

type Settings = {
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
};

type Theme = "ocean" | "forest" | "night" | "sunny" | "sunset";

type Props = {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  theme?: Theme;
  onThemeChange?: (theme: Theme) => void;
};

export default function SimpleNavBar({ settings, onSettingsChange, theme = "ocean", onThemeChange }: Props) {
  const [showSettings, setShowSettings] = useState(false);
  const [showThemes, setShowThemes] = useState(false);

  return (
    <>
      <nav
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          background: "rgba(255, 255, 255, 0.7)",
          boxShadow: "0 2px 4px rgba(0, 0, 0, 0.04)",
          zIndex: 50,
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(255, 255, 255, 0.6)",
        }}
      >
        <Link href="/" passHref legacyBehavior>
          <a
            style={{
              fontSize: 20,
              fontWeight: 800,
              color: "#0f172a",
              textDecoration: "none",
              cursor: "pointer",
            }}
          >
            CalmFlow
          </a>
        </Link>

        <div style={{ display: "flex", gap: 8 }}>
          {/* Theme Button - Glassmorphic Icon Style */}
          <button
            onClick={() => setShowThemes(!showThemes)}
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: showThemes 
                ? "rgba(167, 139, 250, 0.15)" 
                : "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: showThemes 
                ? "1.5px solid rgba(167, 139, 250, 0.3)" 
                : "1.5px solid rgba(226, 232, 240, 0.6)",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 20,
              color: showThemes ? "#7c3aed" : "#64748b",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: showThemes 
                ? "0 4px 12px rgba(167, 139, 250, 0.2)" 
                : "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
            onMouseEnter={(e) => {
              if (!showThemes) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.8)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(167, 139, 250, 0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(167, 139, 250, 0.15)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!showThemes) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.5)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(226, 232, 240, 0.6)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }
            }}
            title="Change theme"
            aria-label="Change theme"
          >
            {/* Theme Icon - Swatches/Color Samples */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="8" height="8" rx="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="13" y="3" width="8" height="8" rx="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="13" width="8" height="8" rx="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="13" y="13" width="8" height="8" rx="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>

          {/* Settings Button - Glassmorphic Icon Style */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            style={{
              width: 44,
              height: 44,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: showSettings 
                ? "rgba(74, 128, 128, 0.15)" 
                : "rgba(255, 255, 255, 0.5)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: showSettings 
                ? "1.5px solid rgba(74, 128, 128, 0.3)" 
                : "1.5px solid rgba(226, 232, 240, 0.6)",
              borderRadius: "50%",
              cursor: "pointer",
              fontSize: 20,
              color: showSettings ? "#4a8080" : "#64748b",
              transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              boxShadow: showSettings 
                ? "0 4px 12px rgba(74, 128, 128, 0.2)" 
                : "0 2px 8px rgba(0, 0, 0, 0.04)",
            }}
            onMouseEnter={(e) => {
              if (!showSettings) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.8)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(74, 128, 128, 0.3)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 12px rgba(74, 128, 128, 0.15)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              }
            }}
            onMouseLeave={(e) => {
              if (!showSettings) {
                (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.5)";
                (e.currentTarget as HTMLElement).style.borderColor = "rgba(226, 232, 240, 0.6)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.04)";
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              }
            }}
            title="Breathing settings"
            aria-label="Breathing settings"
          >
            {/* Settings Icon - Sliders/Controls */}
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="17" x2="20" y2="17"/>
              <circle cx="8" cy="7" r="2" fill="currentColor" stroke="currentColor"/>
              <circle cx="16" cy="12" r="2" fill="currentColor" stroke="currentColor"/>
              <circle cx="12" cy="17" r="2" fill="currentColor" stroke="currentColor"/>
            </svg>
          </button>
        </div>
      </nav>

      {/* Peaceful Themes Panel */}
      <PeacefulThemesPanel
        currentTheme={theme}
        onThemeChange={onThemeChange || (() => {})}
        isOpen={showThemes}
        onClose={() => setShowThemes(false)}
      />

      {/* Peaceful Settings Panel */}
      <PeacefulSettingsPanel
        settings={settings}
        onSettingsChange={onSettingsChange}
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />
    </>
  );
}
