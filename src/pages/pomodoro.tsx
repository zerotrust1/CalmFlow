import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { FaCog } from "react-icons/fa";
import MusicDrawer from "../components/MusicDrawer";

type SessionType = "work" | "shortBreak" | "longBreak";
type SettingsTab = "general" | "timer";

const musicTracks = ["bliss", "lofi1"];
const themes = ["city", "beach", "forest", "grass"];
const bellSounds = ["bell"];

// Theme-specific color palettes
const themeColors = {
  city: {
    work: { start: "#ff6b6b", mid: "#ee5a6f", end: "#c44569" }, // Urban reds/pinks
    shortBreak: { start: "#4facfe", mid: "#00f2fe", end: "#43e4f6" }, // Electric blues
    longBreak: { start: "#a8edea", mid: "#fed6e3", end: "#fbc2eb" }, // Soft pastel
  },
  beach: {
    work: { start: "#f39c12", mid: "#f8b739", end: "#fddb92" }, // Warm sunset
    shortBreak: { start: "#00b4db", mid: "#0083b0", end: "#006d8f" }, // Ocean blues
    longBreak: { start: "#667eea", mid: "#764ba2", end: "#f093fb" }, // Tropical twilight
  },
  forest: {
    work: { start: "#56ab2f", mid: "#a8e063", end: "#d4fc79" }, // Forest greens
    shortBreak: { start: "#134e5e", mid: "#71b280", end: "#bce6bd" }, // Deep forest
    longBreak: { start: "#2c3e50", mid: "#4ca1af", end: "#93d5dc" }, // Misty forest
  },
  grass: {
    work: { start: "#76b852", mid: "#8dc26f", end: "#c1e88b" }, // Fresh grass
    shortBreak: { start: "#bdc3c7", mid: "#d4dfe6", end: "#ecf0f1" }, // Cloud white
    longBreak: { start: "#636fa4", mid: "#8ea7c7", end: "#b8c6db" }, // Sky gradient
  },
};

export default function Pomodoro() {
  const [sessionDurations, setSessionDurations] = useState({
    work: 25,
    shortBreak: 5,
    longBreak: 15,
  });
  const [sessionType, setSessionType] = useState<SessionType>("work");
  const [minutes, setMinutes] = useState(sessionDurations.work);
  const [seconds, setSeconds] = useState(0);
  const [isActive, setIsActive] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [selectedMusic, setSelectedMusic] = useState<string | null>(null);
  const [selectedTheme, setSelectedTheme] = useState<string>("grass");
  const [selectedBell, setSelectedBell] = useState<string>("bell"); // Default to "bell"
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
  const [videoId, setVideoId] = useState<string | null>("jfKfPfyJRdk"); // Lo-fi beats default
  const [isThemeOpen, setIsThemeOpen] = useState(false);
  const [musicError, setMusicError] = useState<string>("");
  const [isCompleting, setIsCompleting] = useState(false);
  const workSessionCount = useRef(0);
  const settingsPanelRef = useRef<HTMLDivElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const bellAudioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    setMinutes(sessionDurations[sessionType]);
    setSeconds(0);
    setIsActive(false);
  }, [sessionType, sessionDurations]);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          // Timer finished - stop timer, play bell, and switch session
          setIsActive(false);
          setIsCompleting(true);
          
          if (bellAudioRef.current && selectedBell !== "") {
            bellAudioRef.current.play().catch(() => {
              // Handle autoplay restrictions
              console.log("Bell sound blocked by browser");
            });
          }
          
          // Show completion animation for 1.5 seconds
          setTimeout(() => {
            setIsCompleting(false);
            if (sessionType === "work") {
              workSessionCount.current += 1;
              if (workSessionCount.current % 4 === 0) {
                setSessionType("longBreak");
              } else {
                setSessionType("shortBreak");
              }
            } else {
              setSessionType("work");
            }
          }, 1500);
        }
      }, 1000);
    }

    return () => {
      if (interval !== null) {
        clearInterval(interval);
      }
    };
  }, [isActive, seconds, minutes, sessionType, selectedBell]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        settingsPanelRef.current &&
        !settingsPanelRef.current.contains(event.target as Node)
      ) {
        setIsSettingsOpen(false);
      }
    };

    if (isSettingsOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSettingsOpen]);

  useEffect(() => {
    if (audioRef.current) {
      if (selectedMusic) {
        audioRef.current.src = `/music/${selectedMusic}.mp3`;
        audioRef.current.play();
        audioRef.current.loop = true;
      } else {
        audioRef.current.pause();
      }
    }
  }, [selectedMusic]);

  useEffect(() => {
    if (bellAudioRef.current && selectedBell !== "") { // Only set src if a bell is selected
      bellAudioRef.current.src = `/bell/${selectedBell}.mp3`;
    }
  }, [selectedBell]);

  const toggle = () => {
    setIsActive(!isActive);
  };

  const reset = () => {
    setMinutes(sessionDurations[sessionType]);
    setSeconds(0);
    setIsActive(false);
  };

  const handleSessionChange = (type: SessionType) => {
    setSessionType(type);
  };

  const toggleSettings = () => {
    setIsSettingsOpen(!isSettingsOpen);
  };

  const handleMusicSelect = (music: string) => {
    setSelectedMusic(music === "" ? null : music);
  };

  const handleThemeSelect = (theme: string) => {
    setSelectedTheme(theme);
  };

  const handleBellSelect = (bell: string) => {
    setSelectedBell(bell); // Always set a string, "" for None
  };

  const handleDurationChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    type: SessionType
  ) => {
    const newDurations = {
      ...sessionDurations,
      [type]: parseInt(e.target.value, 10),
    };
    setSessionDurations(newDurations);
  };

  // Get current theme colors
  const getCurrentColors = () => {
    return themeColors[selectedTheme as keyof typeof themeColors] || themeColors.city;
  };

  return (
    <>
      <Head>
        <title>CalmFlow - Pomodoro Timer</title>
        <meta name="description" content="A simple Pomodoro timer" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@200;400;600;700&display=swap" rel="stylesheet" />
      </Head>
      <audio ref={audioRef} />
      <audio ref={bellAudioRef} />
      <div
        className="pomodoro-container"
        style={{ backgroundImage: `url(/background/${selectedTheme}.jpg)` }}
      >
        {/* Navigation buttons matching breathing guide style */}
        <div style={{
          position: 'fixed',
          top: '20px',
          right: '20px',
          display: 'flex',
          gap: '12px',
          zIndex: 1000,
        }}>
          <button
            onClick={() => setIsThemeOpen(!isThemeOpen)}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: isThemeOpen ? 'rgba(167, 139, 250, 0.3)' : 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: isThemeOpen ? '0 4px 16px rgba(167, 139, 250, 0.4)' : 'none',
            }}
            title="Change theme"
            aria-label="Change theme"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2">
              <rect x="3" y="3" width="8" height="8" rx="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="13" y="3" width="8" height="8" rx="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="3" y="13" width="8" height="8" rx="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              <rect x="13" y="13" width="8" height="8" rx="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </button>
          
          <button
            onClick={toggleSettings}
            style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '2px solid rgba(255, 255, 255, 0.3)',
              background: isSettingsOpen ? 'rgba(74, 128, 128, 0.3)' : 'rgba(255, 255, 255, 0.15)',
              backdropFilter: 'blur(10px)',
              WebkitBackdropFilter: 'blur(10px)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'all 0.3s ease',
              boxShadow: isSettingsOpen ? '0 4px 16px rgba(74, 128, 128, 0.4)' : 'none',
            }}
            title="Timer settings"
            aria-label="Timer settings"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round">
              <line x1="4" y1="7" x2="20" y2="7"/>
              <line x1="4" y1="12" x2="20" y2="12"/>
              <line x1="4" y1="17" x2="20" y2="17"/>
              <circle cx="8" cy="7" r="2" fill="white" stroke="white"/>
              <circle cx="16" cy="12" r="2" fill="white" stroke="white"/>
              <circle cx="12" cy="17" r="2" fill="white" stroke="white"/>
            </svg>
          </button>
        </div>

        {/* Theme Panel - Background Image Selector */}
        {isThemeOpen && (
          <div className="theme-panel">
            <h3 className="theme-panel-title">Choose Background</h3>
            <div className="theme-grid">
              {themes.map((theme) => (
                <button
                  key={theme}
                  className={`theme-option ${selectedTheme === theme ? 'active' : ''}`}
                  onClick={() => {
                    setSelectedTheme(theme);
                    setIsThemeOpen(false);
                  }}
                  style={{
                    backgroundImage: `url(/background/${theme}.jpg)`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                  }}
                >
                  <span className="theme-label">{theme.charAt(0).toUpperCase() + theme.slice(1)}</span>
                </button>
              ))}
            </div>
          </div>
        )}
        {isSettingsOpen && (
          <>
            {/* Backdrop overlay */}
            <div className="settings-backdrop" onClick={() => setIsSettingsOpen(false)} />
            <div className="settings-panel" ref={settingsPanelRef}>
            <div className="settings-content">
              <div className="settings-sidebar">
                <div
                  className={`settings-tab ${
                    activeTab === "general" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("general")}
                >
                  General
                </div>
                <div
                  className={`settings-tab ${
                    activeTab === "timer" ? "active" : ""
                  }`}
                  onClick={() => setActiveTab("timer")}
                >
                  Timer
                </div>
              </div>
              <div className="settings-main">
                {activeTab === "general" && (
                  <>
                    <div className="music-selector">
                      <p>Music</p>
                      <select
                        className="music-dropdown"
                        value={selectedMusic || ""}
                        onChange={(e) => handleMusicSelect(e.target.value)}
                      >
                        <option value="">None</option>
                        {musicTracks.map((track) => (
                          <option key={track} value={track}>
                            {track.charAt(0).toUpperCase() + track.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="themes-selector">
                      <p>Themes</p>
                      <div className="themes-options">
                        {themes.map((theme) => (
                          <button
                            key={theme}
                            onClick={() => handleThemeSelect(theme)}
                            className={`theme-option ${
                              selectedTheme === theme ? "active" : ""
                            }`}
                            style={{
                              backgroundImage: `url(/background/${theme}.jpg)`,
                            }}
                          >
                            <div className="theme-name">
                              {theme.charAt(0).toUpperCase() + theme.slice(1)}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="bell-selector">
                      <p>Bell Sound</p>
                      <select
                        className="bell-dropdown"
                        value={selectedBell}
                        onChange={(e) => handleBellSelect(e.target.value)}
                      >
                        <option value="">None</option>
                        {bellSounds.map((bell) => (
                          <option key={bell} value={bell}>
                            {bell.charAt(0).toUpperCase() + bell.slice(1)}
                          </option>
                        ))}
                      </select>
                    </div>
                  </>
                )}
                {activeTab === "timer" && (
                  <div className="timer-settings">
                    <p>Timer (minutes)</p>
                    <div className="duration-inputs">
                      <div className="duration-input">
                        <label htmlFor="work-duration">Work</label>
                        <input
                          type="number"
                          id="work-duration"
                          value={sessionDurations.work}
                          onChange={(e) => handleDurationChange(e, "work")}
                        />
                      </div>
                      <div className="duration-input">
                        <label htmlFor="short-break-duration">
                          Short Break
                        </label>
                        <input
                          type="number"
                          id="short-break-duration"
                          value={sessionDurations.shortBreak}
                          onChange={(e) =>
                            handleDurationChange(e, "shortBreak")
                          }
                        />
                      </div>
                      <div className="duration-input">
                        <label htmlFor="long-break-duration">
                          Long Break
                        </label>
                        <input
                          type="number"
                          id="long-break-duration"
                          value={sessionDurations.longBreak}
                          onChange={(e) =>
                            handleDurationChange(e, "longBreak")
                          }
                        />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
          </>
        )}
        <div className="timer">
          <div className="session-tabs">
            <button
              onClick={() => handleSessionChange("work")}
              className={`session-tab ${
                sessionType === "work" ? "active" : ""
              }`}
            >
              Work
            </button>
            <button
              onClick={() => handleSessionChange("shortBreak")}
              className={`session-tab ${
                sessionType === "shortBreak" ? "active" : ""
              }`}
            >
              Short Break
            </button>
            <button
              onClick={() => handleSessionChange("longBreak")}
              className={`session-tab ${
                sessionType === "longBreak" ? "active" : ""
              }`}
            >
              Long Break
            </button>
          </div>
          
          <div style={{ position: 'relative', margin: '2rem auto' }} className={`timer-ring-container ${isActive ? 'active' : ''} ${isCompleting ? 'completing' : ''}`}>
            {/* Progress Ring */}
            <svg className="timer-ring" viewBox="0 0 200 200">
              {/* Define gradients for different session types - Dynamic based on theme */}
              <defs>
                <linearGradient id="workGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={getCurrentColors().work.start} stopOpacity="1" />
                  <stop offset="50%" stopColor={getCurrentColors().work.mid} stopOpacity="1" />
                  <stop offset="100%" stopColor={getCurrentColors().work.end} stopOpacity="1" />
                </linearGradient>
                <linearGradient id="shortBreakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={getCurrentColors().shortBreak.start} stopOpacity="1" />
                  <stop offset="50%" stopColor={getCurrentColors().shortBreak.mid} stopOpacity="1" />
                  <stop offset="100%" stopColor={getCurrentColors().shortBreak.end} stopOpacity="1" />
                </linearGradient>
                <linearGradient id="longBreakGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={getCurrentColors().longBreak.start} stopOpacity="1" />
                  <stop offset="50%" stopColor={getCurrentColors().longBreak.mid} stopOpacity="1" />
                  <stop offset="100%" stopColor={getCurrentColors().longBreak.end} stopOpacity="1" />
                </linearGradient>
                
                {/* Glow filter for enhanced effect */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Outer decorative ring */}
              <circle
                className="timer-ring-outer"
                cx="100"
                cy="100"
                r="95"
              />
              
              {/* Session progress dots (mini rings showing completed sessions) */}
              {[...Array(4)].map((_, i) => {
                const angle = (i * 90 - 90) * (Math.PI / 180);
                const dotX = 100 + 85 * Math.cos(angle);
                const dotY = 100 + 85 * Math.sin(angle);
                const isCompleted = i < (workSessionCount.current % 4);
                
                return (
                  <circle
                    key={i}
                    cx={dotX}
                    cy={dotY}
                    r="3"
                    className={`session-dot ${isCompleted ? 'completed' : ''}`}
                    fill={isCompleted ? 'rgba(255, 255, 255, 0.9)' : 'rgba(255, 255, 255, 0.2)'}
                  />
                );
              })}
              
              {/* Main background ring */}
              <circle
                className="timer-ring-background"
                cx="100"
                cy="100"
                r="75"
              />
              
              {/* Main progress ring */}
              <circle
                className={`timer-ring-progress ${sessionType}`}
                cx="100"
                cy="100"
                r="75"
                style={{
                  strokeDasharray: `${2 * Math.PI * 75}`,
                  strokeDashoffset: `${
                    2 * Math.PI * 75 * (1 - ((minutes * 60 + seconds) / (sessionDurations[sessionType] * 60)))
                  }`,
                }}
                filter="url(#glow)"
              />
              
              {/* Inner glow ring when active */}
              {isActive && (
                <circle
                  className="timer-ring-glow"
                  cx="100"
                  cy="100"
                  r="75"
                />
              )}
            </svg>
            
            {/* Timer display inside ring */}
            <div className="timer-content">
              <div className="session-label">
                {sessionType === "work" ? "FOCUS" : sessionType === "shortBreak" ? "SHORT BREAK" : "LONG BREAK"}
              </div>
              <div className="time">
                {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
              </div>
              <div className="session-count">Session {workSessionCount.current + 1}</div>
            </div>
          </div>
          
          <div className="buttons">
            <button 
              onClick={toggle} 
              className={`button ${isActive ? 'button-pause' : 'button-start'}`}
            >
              {isActive ? "Pause" : "Start"}
            </button>
            <button onClick={reset} className="button button-reset">
              Reset
            </button>
          </div>
        </div>

        {/* Music Drawer - YouTube integration */}
        <MusicDrawer
          videoId={videoId}
          onVideoLoad={(id) => setVideoId(id)}
          onError={(err) => setMusicError(err)}
          error={musicError}
        />
      </div>
    </>
  );
}