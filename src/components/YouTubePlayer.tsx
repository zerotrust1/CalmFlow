import React from "react";

type Props = {
  videoId: string | null;
  onError?: (error: string) => void;
};

/**
 * YouTubePlayer component
 * Embeds a YouTube video in an iframe with audio enabled
 * @param videoId - YouTube video ID
 */
export default function YouTubePlayer({ videoId, onError }: Props) {
  if (!videoId) {
    return (
      <div
        style={{
          width: "100%",
          maxWidth: 480,
          aspectRatio: "16/9",
          background: "rgba(0, 0, 0, 0.1)",
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "#666",
          fontSize: 14,
        }}
      >
        Paste a YouTube URL to get started
      </div>
    );
  }

  return (
    <div
      style={{
        width: "100%",
        maxWidth: 480,
        aspectRatio: "16/9",
        borderRadius: 12,
        overflow: "hidden",
        boxShadow: "0 6px 18px rgba(0, 0, 0, 0.1)",
      }}
    >
      <iframe
        width="100%"
        height="100%"
        src={`https://www.youtube.com/embed/${videoId}?autoplay=1&mute=0&loop=1&playlist=${videoId}`}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ border: "none" }}
      />
    </div>
  );
}
