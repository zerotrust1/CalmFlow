// App Constants

export const YOUTUBE_VIDEO_ID_LENGTH = 11;

export const DEFAULT_BREATHING_SETTINGS = {
  inhaleSec: 4,
  holdSec: 2,
  exhaleSec: 6,
} as const;

// Get default theme based on device dark mode preference
export const getDefaultTheme = (): "ocean" | "forest" | "night" | "sunny" | "sunset" => {
  if (typeof window === "undefined") return "forest"; // SSR fallback
  
  const prefersDarkMode = window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches;
  return prefersDarkMode ? "night" : "forest";
};

export const DEFAULT_THEME = "forest" as const; // Fallback when window is not available
export const DEFAULT_YOUTUBE_VIDEO = "ANkxRGvl1VY";

export const BREATHING_DURATIONS = {
  MIN_DURATION: 1,
  MAX_DURATION: 30,
  HOLD_MIN_DURATION: 0,
} as const;

export const ANIMATION_DURATIONS = {
  SLOW_TRANSITION: 0.6,
  MEDIUM_TRANSITION: 0.4,
  FAST_TRANSITION: 0.3,
} as const;

export const PANEL_WIDTHS = {
  MAX_WIDTH: 360,
  MOBILE_PADDING: 40,
} as const;

export const LOCAL_STORAGE_KEYS = {
  BREATHING_SETTINGS: "calmflow-breathing-settings",
  YOUTUBE_VIDEO: "calmflow-youtube-video",
  THEME: "calmflow-theme",
} as const;

export const YOUTUBE_URL_PATTERNS = {
  WATCH: /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
  VIDEO_ID_ONLY: /^[a-zA-Z0-9_-]{11}$/,
} as const;
