import React, { useEffect } from "react";

type Theme = "ocean" | "forest" | "night" | "sunny" | "sunset";

type ThemeConfig = {
  id: Theme;
  name: string;
  colors: {
    primary: string;
    secondary: string;
    accent: string;
    background: string;
  };
};

const THEMES: ThemeConfig[] = [
  {
    id: "ocean",
    name: "Ocean",
    colors: {
      primary: "#e6fbff",
      secondary: "#f0f8ff",
      accent: "#0369a1",
      background: "linear-gradient(135deg, #e6fbff 0%, #f0f8ff 50%, #dbeafe 100%)",
    },
  },
  {
    id: "forest",
    name: "Forest",
    colors: {
      primary: "#f7fdf6",
      secondary: "#ecfdf3",
      accent: "#15803d",
      background: "linear-gradient(135deg, #f7fdf6 0%, #ecfdf3 50%, #dcfce7 100%)",
    },
  },
  {
    id: "night",
    name: "Night",
    colors: {
      primary: "#0b1220",
      secondary: "#07122b",
      accent: "#e0e7ff",
      background: "linear-gradient(135deg, #0b1220 0%, #07122b 50%, #1e1b4b 100%)",
    },
  },
  {
    id: "sunny",
    name: "Sunny",
    colors: {
      primary: "#fff9d6",
      secondary: "#fff3b3",
      accent: "#ff9f1c",
      background: "linear-gradient(135deg, #fff9d6 0%, #fff3b3 50%, #ffd60a 100%)",
    },
  },
  {
    id: "sunset",
    name: "Sunset",
    colors: {
      primary: "#fff0e6",
      secondary: "#ffd1b8",
      accent: "#dc2626",
      background: "linear-gradient(135deg, #fff0e6 0%, #ffd1b8 50%, #fca5a5 100%)",
    },
  },
];

type Props = {
  currentTheme: Theme;
  onThemeChange: (theme: Theme) => void;
  isOpen: boolean;
  onClose: () => void;
};

export default function ThemesPanel({ currentTheme, onThemeChange, isOpen, onClose }: Props) {
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

    // Save to localStorage
    if (typeof window !== "undefined") {
      try {
        localStorage.setItem("calmflow-theme", currentTheme);
      } catch {
        // Silently fail
      }
    }
  }, [currentTheme]);

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 50,
            animation: "fadeIn 0.3s ease",
          }}
        />
      )}

      {/* Themes Panel */}
      <div
        style={{
          position: "fixed",
          top: 64,
          right: 0,
          width: Math.min(320, typeof window !== "undefined" ? window.innerWidth - 20 : 300),
          maxHeight: "calc(100vh - 64px)",
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderRadius: "0 0 12px 12px",
          zIndex: 60,
          padding: "20px",
          overflowY: "auto",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen ? "0 10px 40px rgba(0, 0, 0, 0.1)" : "none",
        }}
      >
        <h3
          style={{
            margin: "0 0 16px 0",
            fontSize: 18,
            fontWeight: 700,
            color: "#0f172a",
          }}
        >
          Themes
        </h3>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 10,
          }}
        >
          {THEMES.map((theme) => (
            <button
              key={theme.id}
              onClick={() => {
                onThemeChange(theme.id);
                onClose();
              }}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                border: currentTheme === theme.id ? "2px solid #0f172a" : "1px solid rgba(0, 0, 0, 0.1)",
                background: theme.colors.background,
                color: theme.colors.accent === "#e0e7ff" ? "#fff" : "#0f172a",
                fontWeight: 600,
                cursor: "pointer",
                transition: "all 0.3s ease",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                fontSize: 14,
              }}
              onMouseEnter={(e) => {
                if (currentTheme !== theme.id) {
                  (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 20px rgba(0, 0, 0, 0.1)";
                }
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              <span>{theme.name}</span>
              {currentTheme === theme.id && <span style={{ fontSize: 16 }}>✓</span>}
            </button>
          ))}
        </div>

        <div
          style={{
            marginTop: 16,
            padding: "12px",
            background: "rgba(99, 102, 241, 0.1)",
            borderRadius: 8,
            fontSize: 12,
            color: "#666",
            lineHeight: 1.5,
          }}
        >
          <strong>Theme saved!</strong> Your selection persists across sessions.
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
