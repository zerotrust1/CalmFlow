import React, { useState } from "react";
import YouTubePlayer from "./YouTubePlayer";
import YouTubeInput from "./YouTubeInput";

type Props = {
  videoId: string | null;
  onVideoLoad: (videoId: string) => void;
  onError: (error: string) => void;
  error: string;
};

export default function MusicDrawer({ videoId, onVideoLoad, onError, error }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      {/* Music Button - Fixed at bottom */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: 24,
          left: "50%",
          transform: "translateX(-50%)",
          padding: "12px 28px",
          background: "rgba(255, 255, 255, 0.15)",
          backdropFilter: "blur(10px)",
          WebkitBackdropFilter: "blur(10px)",
          border: "1px solid rgba(255, 255, 255, 0.25)",
          borderRadius: 50,
          color: "#0f172a",
          fontWeight: 600,
          cursor: "pointer",
          fontSize: 14,
          zIndex: 40,
          transition: "all 0.3s ease",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.25)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 48px rgba(0, 0, 0, 0.15)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.15)";
          (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 32px rgba(0, 0, 0, 0.1)";
        }}
      >
        <span style={{ marginRight: 8 }}>🎵</span>
        {videoId ? "Music" : "Add Music"}
      </button>

      {/* Drawer Overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0, 0, 0, 0.4)",
            zIndex: 50,
            animation: "fadeIn 0.3s ease",
          }}
        />
      )}

      {/* Music Drawer Panel */}
      <div
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          maxHeight: isOpen ? "70vh" : 0,
          background: "rgba(255, 255, 255, 0.85)",
          backdropFilter: "blur(20px)",
          WebkitBackdropFilter: "blur(20px)",
          border: "1px solid rgba(255, 255, 255, 0.4)",
          borderTop: "1px solid rgba(255, 255, 255, 0.5)",
          borderRadius: "24px 24px 0 0",
          zIndex: 60,
          overflow: "hidden",
          transition: "max-height 0.4s cubic-bezier(0.4, 0, 0.2, 1)",
          boxShadow: "0 -20px 60px rgba(0, 0, 0, 0.15)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 20,
            padding: "24px",
            maxHeight: "70vh",
            overflowY: "auto",
          }}
        >
          {/* Drawer Header */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginBottom: 8,
            }}
          >
            <h3
              style={{
                margin: 0,
                fontSize: 20,
                fontWeight: 700,
                color: "#0f172a",
              }}
            >
              Your Music
            </h3>
            <button
              onClick={() => setIsOpen(false)}
              style={{
                background: "none",
                border: "none",
                fontSize: 24,
                cursor: "pointer",
                color: "#666",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#0f172a";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.color = "#666";
              }}
            >
              ✕
            </button>
          </div>

          {/* YouTube Player */}
          <div style={{ 
            width: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}>
            <YouTubePlayer videoId={videoId} onError={onError} />
          </div>

          {/* YouTube URL Input */}
          <div style={{ width: "100%" }}>
            <YouTubeInput
              onVideoLoad={onVideoLoad}
              onError={onError}
              currentVideoId={videoId}
            />
          </div>

          {/* Error Message */}
          {error && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(239, 68, 68, 0.1)",
                color: "#7f1d1d",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                animation: "fadeIn 0.3s ease",
              }}
            >
              ⚠ {error}
            </div>
          )}

          {/* Currently Playing Info */}
          {videoId && (
            <div
              style={{
                padding: "12px 16px",
                background: "rgba(16, 185, 129, 0.1)",
                color: "#065f46",
                borderRadius: 8,
                fontSize: 13,
                fontWeight: 500,
                animation: "fadeIn 0.3s ease",
              }}
            >
              ✓ Playing: {videoId}
            </div>
          )}
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
