import React, { useState } from "react";
import { extractVideoId } from "../utils/youtube";

type Props = {
  onVideoLoad: (videoId: string) => void;
  onError: (error: string) => void;
  currentVideoId: string | null;
};

/**
 * YouTubeInput component
 * Handles YouTube URL input and validation
 * Extracts video ID from various URL formats
 */
export default function YouTubeInput({ onVideoLoad, onError, currentVideoId }: Props) {
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleLoad = async () => {
    if (!inputValue.trim()) {
      onError("Please enter a YouTube URL");
      return;
    }

    const videoId = extractVideoId(inputValue.trim());
    if (!videoId) {
      onError("Invalid YouTube URL. Please check the format.");
      return;
    }

    setIsLoading(true);
    // Simulate validation by attempting to load the iframe
    // In a real app, you could make an API call to verify the video exists
    setTimeout(() => {
      onVideoLoad(videoId);
      setInputValue("");
      setIsLoading(false);
    }, 500);
  };

  const handleClear = () => {
    setInputValue("");
    onError("");
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleLoad();
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: 12,
        width: "100%",
        maxWidth: 500,
        margin: "0 auto",
      }}
    >
      <div style={{ display: "flex", gap: 8 }}>
        <input
          type="text"
          placeholder="Paste YouTube URL or video ID..."
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyPress={handleKeyPress}
          disabled={isLoading}
          style={{
            flex: 1,
            padding: "10px 12px",
            borderRadius: 8,
            border: "1px solid rgba(0, 0, 0, 0.12)",
            fontSize: 14,
            fontFamily: "inherit",
            outline: "none",
            transition: "border-color 0.2s",
          }}
        />
        <button
          onClick={handleLoad}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "none",
            background: isLoading ? "#ccc" : "#0f172a",
            color: "#fff",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "background 0.2s",
          }}
        >
          {isLoading ? "Loading..." : "Load"}
        </button>
        <button
          onClick={handleClear}
          disabled={isLoading}
          style={{
            padding: "10px 20px",
            borderRadius: 8,
            border: "1px solid rgba(0, 0, 0, 0.12)",
            background: "#fff",
            color: "#0f172a",
            fontWeight: 600,
            cursor: isLoading ? "not-allowed" : "pointer",
            transition: "all 0.2s",
          }}
        >
          Clear
        </button>
      </div>

      {currentVideoId && (
        <div
          style={{
            padding: "8px 12px",
            background: "rgba(16, 185, 129, 0.1)",
            color: "#065f46",
            borderRadius: 6,
            fontSize: 13,
            fontWeight: 500,
          }}
        >
          ✓ Video loaded: {currentVideoId}
        </div>
      )}

      <div style={{ fontSize: 12, color: "#666", lineHeight: 1.5 }}>
        <strong>Supported formats:</strong>
        <ul style={{ margin: "6px 0 0 16px", paddingLeft: 0 }}>
          <li>youtube.com/watch?v=VIDEO_ID</li>
          <li>youtu.be/VIDEO_ID</li>
          <li>VIDEO_ID (just the 11-character ID)</li>
        </ul>
      </div>
    </div>
  );
}
