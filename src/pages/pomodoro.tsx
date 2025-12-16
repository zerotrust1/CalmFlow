import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import { FaCog } from "react-icons/fa";

type SessionType = "work" | "shortBreak" | "longBreak";
type SettingsTab = "general" | "timer";

const musicTracks = ["bliss", "lofi1"];
const themes = ["city", "beach", "forest", "grass"];
const bellSounds = ["bell"];

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
  const [selectedTheme, setSelectedTheme] = useState<string>("city");
  const [selectedBell, setSelectedBell] = useState<string>("bell");
  const [activeTab, setActiveTab] = useState<SettingsTab>("general");
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
        }
        if (seconds === 0) {
          if (minutes === 0) {
            if (bellAudioRef.current && selectedBell) {
              bellAudioRef.current.play();
            }
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
          } else {
            setMinutes(minutes - 1);
            setSeconds(59);
          }
        }
      }, 1000);
    } else if (!isActive && seconds !== 0) {
      clearInterval(interval!);
    }
    return () => clearInterval(interval!);
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
    if (bellAudioRef.current && selectedBell) {
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
    setSelectedBell(bell);
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

  return (
    <>
      <Head>
        <title>CalmFlow - Pomodoro Timer</title>
        <meta name="description" content="A simple Pomodoro timer" />
      </Head>
      <audio ref={audioRef} />
      <audio ref={bellAudioRef} />
      <div
        className="pomodoro-container"
        style={{ backgroundImage: `url(/background/${selectedTheme}.jpg)` }}
      >
        <div className="settings-icon" onClick={toggleSettings}>
          <FaCog />
        </div>
        {isSettingsOpen && (
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
          <div className="time">
            {minutes < 10 ? `0${minutes}` : minutes}:
            {seconds < 10 ? `0${seconds}` : seconds}
          </div>
          <div className="buttons">
            <button onClick={toggle} className="button">
              {isActive ? "Pause" : "Start"}
            </button>
            <button onClick={reset} className="button">
              Reset
            </button>
          </div>
        </div>
      </div>
    </>
  );
}