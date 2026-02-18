import React, { useEffect, useRef } from "react";
import { motion } from "framer-motion";

type Settings = {
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
};

type Props = {
  settings: Settings;
  onSettingsChange: (settings: Settings) => void;
  isOpen: boolean;
  onClose: () => void;
};

// Premium Slider Component with Synchronized Liquid Animation
function SimpleSlider({
  value,
  onChange,
  min = 0,
  max = 30,
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max?: number;
}) {
  const percentage = ((value - min) / (max - min)) * 100;

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sliderValue = Number(e.target.value) / 100;
    // Round to nearest 0.1 for the actual value
    const roundedValue = Math.round(sliderValue * 10) / 10;
    onChange(roundedValue);
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: 44,
        display: "flex",
        alignItems: "center",
        margin: "16px 0",
      }}
    >
      {/* Track Background - Rounded Pill Line */}
      <div
        style={{
          position: "absolute",
          width: "100%",
          height: 10,
          background: "#e5ebe7",
          borderRadius: 14,
          left: 0,
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Animated Fill - Theme Color Rounded - Accelerates to Follow Button */}
      <div
        style={{
          position: "absolute",
          height: 10,
          background: `var(--slider-primary, #4a8080)`,
          borderRadius: 14,
          left: 0,
          pointerEvents: "none",
          zIndex: 2,
          width: `${percentage}%`,
          boxShadow: `0 4px 12px rgba(var(--slider-primary-rgb, 74 128 128), 0.2)`,
          transition: "width 0.3s cubic-bezier(0.4, 0.0, 0.2, 1)",
        }}
      />

      {/* Visual Thumb Overlay - Accelerates to Follow */}
      <div
        className="visual-thumb"
        style={{
          position: "absolute",
          top: "50%",
          left: `${percentage}%`,
          transform: "translate(-50%, -50%)",
          width: "50px",
          height: "24px",
          borderRadius: 14,
          background: "rgba(255, 255, 255, 0.25)",
          backdropFilter: "blur(15px)",
          WebkitBackdropFilter: "blur(15px)",
          border: "1.5px solid rgba(255, 255, 255, 0.6)",
          boxShadow: `
            0 4px 16px rgba(0, 0, 0, 0.15),
            0 8px 24px rgba(0, 0, 0, 0.1),
            inset 2px 0 4px rgba(255, 255, 255, 0.9),
            inset -2px 0 4px rgba(255, 255, 255, 0.3)`,
          pointerEvents: "none",
          zIndex: 10,
          transition: "left 0.3s cubic-bezier(0.4, 0.0, 0.2, 1), background 0.2s ease, box-shadow 0.2s ease",
        }}
      />

      {/* Native Range Input - Handles All Interaction (Hidden Thumb) */}
      <input
        type="range"
        min={min * 100}
        max={max * 100}
        step="1"
        value={value * 100}
        onChange={handleChange}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          cursor: "pointer",
          appearance: "none",
          WebkitAppearance: "none",
          background: "transparent",
          zIndex: 20,
          margin: 0,
          padding: 0,
          border: "none",
        } as React.CSSProperties}
      />

      <style>{`
        input[type="range"] {
          -webkit-appearance: none;
          appearance: none;
        }

        /* Webkit (Chrome, Safari, Edge) - Hidden, interaction only */
        input[type="range"]::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          width: 50px;
          height: 24px;
          border-radius: 14px;
          background: transparent;
          border: none;
          cursor: grab;
          box-shadow: none;
        }

        /* Visual thumb hover effect */
        input[type="range"]:hover ~ .visual-thumb {
          background: rgba(255, 255, 255, 0.35);
          box-shadow: 
            0 6px 20px rgba(0, 0, 0, 0.2),
            0 10px 28px rgba(0, 0, 0, 0.12),
            inset 2px 0 4px rgba(255, 255, 255, 1),
            inset -2px 0 4px rgba(255, 255, 255, 0.4);
        }

        /* Visual thumb active effect */
        input[type="range"]:active ~ .visual-thumb {
          background: rgba(255, 255, 255, 0.45);
          box-shadow: 
            0 8px 24px rgba(0, 0, 0, 0.25),
            0 12px 32px rgba(0, 0, 0, 0.15),
            inset 2px 0 4px rgba(255, 255, 255, 1),
            inset -2px 0 4px rgba(255, 255, 255, 0.5);
        }

        /* Firefox */
        input[type="range"]::-moz-range-track {
          background: transparent;
          border: none;
        }

        input[type="range"]::-moz-range-progress {
          background: transparent;
        }

        input[type="range"]::-moz-range-thumb {
          width: 50px;
          height: 24px;
          border-radius: 14px;
          background: transparent;
          border: none;
          cursor: grab;
          box-shadow: none;
        }

      `}</style>
    </div>
  );
}

export default function PeacefulSettingsPanel({ settings, onSettingsChange, isOpen, onClose }: Props) {

  const handleSettingChange = (key: keyof Settings, value: number) => {
    const newSettings = { ...settings, [key]: Math.max(1, value) };
    onSettingsChange(newSettings);
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
            background: "rgba(74, 128, 128, 0.2)",
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
          background: "rgba(248, 252, 250, 0.97)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(107, 168, 156, 0.3)",
          zIndex: 60,
          padding: "44px 32px 32px",
          overflowY: "auto",
          transform: isOpen ? "translateX(0)" : "translateX(100%)",
          transition: "transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: isOpen ? "-12px 0 36px rgba(74, 128, 128, 0.12)" : "none",
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
            color: "#9eb5ae",
            transition: "color 0.3s ease",
            padding: 0,
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#4a8080";
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = "#9eb5ae";
          }}
        >
          ←
        </button>

        {/* Header */}
        <div style={{ marginBottom: 40 }}>
          <h2
            style={{
              margin: 0,
              fontSize: 26,
              fontWeight: 500,
              color: "#2d3e39",
              letterSpacing: "-0.3px",
              lineHeight: 1.2,
            }}
          >
            Breathing Settings
          </h2>
          <p
            style={{
              margin: "12px 0 0 0",
              fontSize: 13,
              color: "#6ba89c",
              fontWeight: 400,
              letterSpacing: "0.4px",
            }}
          >
            Customize your perfect rhythm
          </p>
        </div>

        {/* Settings Items */}
        <div style={{ display: "flex", flexDirection: "column", gap: 36 }}>
          {/* Inhale */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#2d3e39",
                  letterSpacing: "0.3px",
                }}
              >
                Inhale
              </label>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#4a8080",
                  letterSpacing: "0.5px",
                }}
              >
                {settings.inhaleSec}s
              </span>
            </div>
            <SimpleSlider
              value={settings.inhaleSec}
              onChange={(value) => handleSettingChange("inhaleSec", value)}
              min={1}
              max={30}
            />
          </div>

          {/* Hold */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#2d3e39",
                  letterSpacing: "0.3px",
                }}
              >
                Hold
              </label>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#4a8080",
                  letterSpacing: "0.5px",
                }}
              >
                {settings.holdSec}s
              </span>
            </div>
            <SimpleSlider
              value={settings.holdSec}
              onChange={(value) => handleSettingChange("holdSec", value)}
              min={0}
              max={30}
            />
          </div>

          {/* Exhale */}
          <div>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 14,
              }}
            >
              <label
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: "#2d3e39",
                  letterSpacing: "0.3px",
                }}
              >
                Exhale
              </label>
              <span
                style={{
                  fontSize: 18,
                  fontWeight: 500,
                  color: "#4a8080",
                  letterSpacing: "0.5px",
                }}
              >
                {settings.exhaleSec}s
              </span>
            </div>
            <SimpleSlider
              value={settings.exhaleSec}
              onChange={(value) => handleSettingChange("exhaleSec", value)}
              min={1}
              max={30}
            />
          </div>
        </div>

        {/* Footer Message */}
        <div
          style={{
            marginTop: 48,
            paddingTop: 24,
            borderTop: "1px solid rgba(107, 168, 156, 0.25)",
            fontSize: 12,
            color: "#6ba89c",
            lineHeight: 1.8,
            letterSpacing: "0.3px",
            fontWeight: 400,
          }}
        >
          Find your natural rhythm. There is no perfect pace, only what feels right for you.
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
