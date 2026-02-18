import React, { useEffect } from "react";
import { LOCAL_STORAGE_KEYS } from "../constants/app";

type Theme = "ocean" | "forest" | "night" | "sunny" | "sunset";

type ThemeConfig = {
  id: Theme;
  name: string;
  emoji: string;
  description: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
    sliderPrimary?: string;
    sliderSecondary?: string;
  };
};

const THEMES: ThemeConfig[] = [
  {
    id: "ocean",
    name: "Ocean",
    emoji: "🌊",
    description: "Calm waters, serene depths",
    colors: {
      primary: "#e6fbff",
      secondary: "#f0f8ff",
      accent: "#0369a1",
      background: "linear-gradient(135deg, #f0f9fc 0%, #e8f4f9 25%, #e6f2f8 75%, #eef5fb 100%)",
      sliderPrimary: "#0369a1",
      sliderSecondary: "#0284c7",
    },
  },
  {
    id: "forest",
    name: "Forest",
    emoji: "🌲",
    description: "Natural stillness, grounded peace",
    colors: {
      primary: "#f7fdf6",
      secondary: "#ecfdf3",
      accent: "#15803d",
      background: "linear-gradient(135deg, #f5faf5 0%, #eff6ed 25%, #ebf4e7 75%, #f0f5eb 100%)",
      sliderPrimary: "#15803d",
      sliderSecondary: "#16a34a",
    },
  },
  {
    id: "night",
    name: "Night",
    emoji: "🌙",
    description: "Quiet darkness, inner reflection",
    colors: {
      primary: "#1e293b",
      secondary: "#0f172a",
      accent: "#a8b5ff",
      background: "linear-gradient(135deg, #0f172a 0%, #1a1f35 25%, #16213e 75%, #0f1729 100%)",
      sliderPrimary: "#7c3aed",
      sliderSecondary: "#8b5cf6",
    },
  },
  {
    id: "sunny",
    name: "Sunny",
    emoji: "☀️",
    description: "Warm light, uplifting energy",
    colors: {
      primary: "#fffbeb",
      secondary: "#fef3c7",
      accent: "#d97706",
      background: "linear-gradient(135deg, #fffbf0 0%, #fef9f3 25%, #fef6ef 75%, #fffaf5 100%)",
      sliderPrimary: "#d97706",
      sliderSecondary: "#f59e0b",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    emoji: "🌅",
    description: "Golden warmth, gentle transition",
    colors: {
      primary: "#fff0e6",
      secondary: "#ffd1b8",
      accent: "#dc2626",
      background: "linear-gradient(135deg, #fff5f0 0%, #ffeee6 25%, #ffeae1 75%, #fff2ec 100%)",
      sliderPrimary: "#dc2626",
      sliderSecondary: "#ef4444",
    },
  },
];

type Props = {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function PeacefulThemesPanel({ currentTheme, onThemeChange, isOpen, onClose }: Props) {
  // Apply theme to document
  useEffect(() => {
    const theme = THEMES.find((t) => t.id === currentTheme);
    if (!theme) return;

    const root = document.documentElement;
    const html = root;
    const body = document.body;
    const nextRoot = document.getElementById("__next");

    // Set data-theme attribute for CSS styling
    if (html) html.setAttribute("data-theme", currentTheme);

    // Set gradient background
    const bgGradient = theme.colors.background;
    if (html) html.style.backgroundImage = bgGradient;
    if (body) body.style.backgroundImage = bgGradient;
    if (nextRoot) nextRoot.style.backgroundImage = bgGradient;

    // Set slider color CSS variables
    const sliderPrimary = theme.colors.sliderPrimary || theme.colors.accent;
    const sliderSecondary = theme.colors.sliderSecondary || theme.colors.primary;
    if (html) {
      html.style.setProperty("--slider-primary", sliderPrimary);
      html.style.setProperty("--slider-secondary", sliderSecondary);
    }

    // Save to localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem(LOCAL_STORAGE_KEYS.THEME, currentTheme);
      } catch (error) {
        console.warn("Failed to save theme:", error);
      }
    }
  }, [currentTheme]);

  const handleThemeSelect = (theme: Theme) => {
    onThemeChange(theme);
    // Auto-close after selection
    setTimeout(onClose, 300);
  };

  return (
    <>
      {/* Overlay - Click to close */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(95, 121, 106, 0.25)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            zIndex: 50,
            animation: "fadeIn 0.4s ease-out",
          }}
        />
      )}

      {/* Sliding Panel */}
      <div
        style={{
          position: "fixed",
          right: 0,
          top: 0,
          bottom: 0,
          width: "100%",
          maxWidth: 410,
          background: "rgba(250, 250, 248, 0.95)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(200, 220, 196, 0.4)",
          zIndex: 60,
          padding: "44px 32px 32px",
          overflowY: "auto",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen ? "-12px 0 36px rgba(95, 121, 106, 0.1)" : "none",
          overscrollBehavior: "contain",
        }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "transparent",
            border: "none",
            fontSize: 24,
            cursor: "pointer",
            color: "#a8b3ae",
            transition: "color 0.3s ease",
            padding: 0,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#7a8a7f";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#a8b3ae";
          }}
        >
          ←
        </button>

        {/* Header */}
        <div style={{ marginBottom: 32 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 400,
              color: "#4a5a55",
              letterSpacing: "-0.3px",
              lineHeight: 1.2,
            }}
          >
            Themes
          </h2>
          <p
            style={{
              margin: "12px 0 0 0",
              fontSize: 13,
              color: "#8a9a92",
              fontWeight: 400,
              letterSpacing: "0.4px",
            }}
          >
            Choose your breathing space
          </p>
        </div>

        {/* Theme List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => handleThemeSelect(theme.id)}
              style={{
                padding: "14px 16px",
                background: currentTheme === theme.id ? "rgba(200, 220, 196, 0.12)" : "transparent",
                border: currentTheme === theme.id ? "1px solid rgba(200, 220, 196, 0.35)" : "1px solid rgba(200, 220, 196, 0.12)",
                borderRadius: 10,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                alignItems: "center",
                gap: 12,
                textAlign: "left",
              }}
              onMouseEnter={(e) => {
                if (currentTheme !== theme.id) {
                  (e.currentTarget as HTMLElement).style.background = "rgba(200, 220, 196, 0.06)";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200, 220, 196, 0.25)";
                }
              }}
              onMouseLeave={(e) => {
                if (currentTheme !== theme.id) {
                  (e.currentTarget as HTMLElement).style.background = "transparent";
                  (e.currentTarget as HTMLElement).style.borderColor = "rgba(200, 220, 196, 0.12)";
                }
              }}
            >
              {/* Emoji */}
              <span style={{ fontSize: 22, minWidth: 26, display: "flex", alignItems: "center" }}>{theme.emoji}</span>

              {/* Text Content */}
              <div style={{ flex: 1 }}>
                <div
                  style={{
                    fontSize: 14,
                    fontWeight: 500,
                    color: "#4a5a55",
                    marginBottom: 2,
                    letterSpacing: "0.2px",
                  }}
                >
                  {theme.name}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    color: "#8a9a92",
                    lineHeight: 1.4,
                    fontWeight: 400,
                  }}
                >
                  {theme.description}
                </div>
              </div>

              {/* Checkmark */}
              {currentTheme === theme.id && (
                <div
                  style={{
                    fontSize: 16,
                    color: "#6b8a7e",
                    fontWeight: 500,
                    minWidth: 18,
                  }}
                >
                  ✓
                </div>
              )}
            </button>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 36,
            paddingTop: 20,
            borderTop: "1px solid rgba(200, 220, 196, 0.2)",
            fontSize: 12,
            color: "#8a9a92",
            lineHeight: 1.7,
            letterSpacing: "0.3px",
            fontWeight: 400,
            textAlign: "center",
          }}
        >
          Each theme creates a unique breathing space. Choose what feels right for you.
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
          }
          to {
            opacity: 1;
          }
        }
      `}</style>
    </>
  );
}
