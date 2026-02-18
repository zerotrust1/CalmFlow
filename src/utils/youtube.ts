import { YOUTUBE_VIDEO_ID_LENGTH, YOUTUBE_URL_PATTERNS } from "../constants/app";

/**
 * Extract YouTube video ID from various URL formats
 * Supports:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 * - VIDEO_ID (just the 11-character ID)
 */
export const extractVideoId = (url: string): string | null => {
  if (!url || typeof url !== "string") return null;

  const trimmedUrl = url.trim();

  // Try watch pattern
  const watchMatch = trimmedUrl.match(YOUTUBE_URL_PATTERNS.WATCH);
  if (watchMatch && watchMatch[1]) {
    return validateVideoId(watchMatch[1]);
  }

  // Try just the video ID
  const idMatch = trimmedUrl.match(YOUTUBE_URL_PATTERNS.VIDEO_ID_ONLY);
  if (idMatch) {
    return validateVideoId(idMatch[0]);
  }

  return null;
};

/**
 * Validate that a video ID has the correct format
 */
export const validateVideoId = (id: string): string | null => {
  if (!id || id.length !== YOUTUBE_VIDEO_ID_LENGTH) return null;
  if (!/^[a-zA-Z0-9_-]+$/.test(id)) return null;
  return id;
};

/**
 * Validate that a YouTube video exists by checking if it's embeddable
 * Note: This is a client-side check and may have CORS limitations
 */
export const validateYouTubeVideoExists = async (videoId: string): Promise<boolean> => {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}`,
      { signal: controller.signal }
    );

    clearTimeout(timeout);
    return response.ok;
  } catch (error) {
    console.warn("YouTube validation failed:", error);
    // Return true anyway - let YouTube handle invalid IDs
    return true;
  }
};

/**
 * Check if a URL or ID is a valid YouTube reference
 */
export const isValidYouTubeUrl = (url: string): boolean => {
  return extractVideoId(url) !== null;
};
