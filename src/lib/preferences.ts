// User preferences storage (in-memory for demo, replace with database in production)
interface UserPreferences {
  theme: string;
  music: string | null;
  bellSound: string;
  pomodoroSettings: {
    work: number;
    shortBreak: number;
    longBreak: number;
  };
  breathingSettings: {
    inhale: number;
    hold: number;
    exhale: number;
  };
}

const userPreferences = new Map<string, UserPreferences>();

// Get user preferences
export function getUserPreferences(userId: string): UserPreferences | null {
  return userPreferences.get(userId) || null;
}

// Save user preferences
export function saveUserPreferences(userId: string, preferences: Partial<UserPreferences>) {
  const current = userPreferences.get(userId) || getDefaultPreferences();
  const updated = { ...current, ...preferences };
  userPreferences.set(userId, updated);
  return updated;
}

// Get default preferences
export function getDefaultPreferences(): UserPreferences {
  return {
    theme: "grass",
    music: null,
    bellSound: "bell",
    pomodoroSettings: {
      work: 25,
      shortBreak: 5,
      longBreak: 15,
    },
    breathingSettings: {
      inhale: 4,
      hold: 4,
      exhale: 4,
    },
  };
}
