import Link from "next/link";
import React from "react";

type Settings = {
  inhaleSec: number;
  holdSec: number;
  exhaleSec: number;
};

type Props = {
  theme: string | null;
  onThemeChange: (t: string | null) => void;
  music: string | null;
  onMusicChange: (m: string | null) => void;
  background: string | null;
  onBackgroundChange: (b: string | null) => void;
  settings: Settings;
  onSettingsChange: (s: Settings) => void;
};

export default function NavBar({
  theme,
  onThemeChange,
  music,
  onMusicChange,
  background,
  onBackgroundChange,
  settings,
  onSettingsChange,
}: Props) {
  const DropdownButton = ({
    label,
    options,
    current,
    onChange,
  }: {
    label: string;
    // options may include an optional colors palette used by themes
    options: { id: string; label: string; value: string; colors?: string[] }[];
    current: string | null | undefined;
    onChange: (v: string) => void;
  }) => {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
      const onDoc = (e: MouseEvent) => {
        if (!ref.current) return;
        if (!ref.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, []);
    return (
      <div ref={ref} style={{ position: "relative", display: "inline-block", marginRight: 8 }} className="scene-selector">
        <button
          type="button"
          className="selector-button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
        >
          <span className="option-text">{label}</span>
          <span className="check-wrapper" aria-hidden style={{ marginLeft: 8 }}>
            ▾
          </span>
        </button>

        {open && (
          <div role="menu" className="listbox-options" style={{ position: "absolute", left: 0, top: "calc(100% + 8px)", zIndex: 60, minWidth: 180 }}>
            {options.map((opt) => {
              const selected = opt.value === current;
              return (
                <button
                  key={opt.id}
                  type="button"
                  role="menuitem"
                  className="listbox-option"
                  aria-checked={selected}
                  onClick={() => {
                    onChange(opt.value);
                    setOpen(false);
                  }}
                  style={{ width: "100%", textAlign: "left", background: "transparent", border: "none", padding: "0.45rem 0.75rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}
                >
                  <span className="option-text">{opt.label}</span>
                  <span className="check-wrapper" aria-hidden>
                    {selected ? "✓" : null}
                  </span>
                </button>
              );
            })}
          </div>
        )}
      </div>
    );
  };

  const SettingsDropdown = () => {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);
    const [local, setLocal] = React.useState<Settings>(settings);

    React.useEffect(() => setLocal(settings), [settings]);

    React.useEffect(() => {
      const onDoc = (e: MouseEvent) => {
        if (!ref.current) return;
        if (!ref.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    return (
      <div ref={ref} style={{ position: "relative", display: "inline-block", marginLeft: 12 }}>
        <button
          type="button"
          className="selector-button settings-button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          title="Settings"
        >
          <span className="option-text">⚙︎</span>
        </button>

        {open && (
          <div
            role="menu"
            className="listbox-options settings-panel"
            style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 70, minWidth: 300, padding: 12 }}
          >
            <div style={{ display: "grid", gap: 12 }}>
              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Inhale (s)</span>
                  <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>{local.inhaleSec}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={local.inhaleSec}
                  onChange={(e) => setLocal({ ...local, inhaleSec: Math.max(1, Number(e.target.value || 1)) })}
                  className="range-input"
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Hold (s)</span>
                  <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>{local.holdSec}</span>
                </div>
                <input
                  type="range"
                  min={0}
                  max={100}
                  value={local.holdSec}
                  onChange={(e) => setLocal({ ...local, holdSec: Math.max(0, Number(e.target.value || 0)) })}
                  className="range-input"
                />
              </label>

              <label style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                  <span>Exhale (s)</span>
                  <span style={{ fontVariantNumeric: "tabular-nums", fontWeight: 700 }}>{local.exhaleSec}</span>
                </div>
                <input
                  type="range"
                  min={1}
                  max={100}
                  value={local.exhaleSec}
                  onChange={(e) => setLocal({ ...local, exhaleSec: Math.max(1, Number(e.target.value || 1)) })}
                  className="range-input"
                />
              </label>

              <div style={{ display: "flex", gap: 8, justifyContent: "flex-end", marginTop: 6 }}>
                <button
                  type="button"
                  className="selector-button"
                  onClick={() => {
                    setLocal(settings);
                    setOpen(false);
                  }}
                >
                  Cancel
                </button>
                <button
                  type="button"
                  className="selector-button"
                  onClick={() => {
                    onSettingsChange(local);
                    setOpen(false);
                  }}
                >
                  Save
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Support dropdown (Ko-fi)
  const SupportDropdown = () => {
    const [open, setOpen] = React.useState(false);
    const ref = React.useRef<HTMLDivElement | null>(null);
    React.useEffect(() => {
      const onDoc = (e: MouseEvent) => {
        if (!ref.current) return;
        if (!ref.current.contains(e.target as Node)) setOpen(false);
      };
      document.addEventListener("mousedown", onDoc);
      return () => document.removeEventListener("mousedown", onDoc);
    }, []);

    return (
      <div ref={ref} style={{ position: "relative", display: "inline-block", marginLeft: 8 }}>
        <button
          type="button"
          className="selector-button support-button"
          aria-haspopup="menu"
          aria-expanded={open}
          onClick={() => setOpen((s) => !s)}
          title="Support me"
        >
          <span style={{ marginRight: 8 }}>☕</span>
          <span className="option-text">Support</span>
        </button>

        {open && (
          <div
            role="menu"
            className="listbox-options"
            style={{ position: "absolute", right: 0, top: "calc(100% + 8px)", zIndex: 80, minWidth: 260, padding: 12 }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontWeight: 700 }}>support me</div>
              <div style={{ color: "#274151", fontSize: 14 }}>please support me to keep this website running contact:fahrel02x@gmail.com</div>

              <div style={{ display: "flex", justifyContent: "flex-end", gap: 8, marginTop: 6 }}>
                <a
                  href="https://ko-fi.com/reldev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="selector-button"
                  style={{ textDecoration: "none" }}
                >
                  Support on Ko‑fi
                </a>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // mobile drawer state (hamburger-driven)
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  return (
    <>
      <nav
        className="top-nav"
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 64,
          display: "flex",
          alignItems: "center",
          gap: 12,
          padding: "0 1rem",
          background: "rgba(255,255,255,0.98)",
          boxShadow: "0 6px 18px rgba(11,18,32,0.06)",
          zIndex: 60,
        }}
      >
        <div className="left-controls" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          {/* visible on small screens via CSS */}
          <button
            className="hamburger-button selector-button"
            aria-label="Open menu"
            onClick={() => setDrawerOpen((s) => !s)}
          >
            ☰
          </button>

          <Link href="/" passHref>
            <div className="brand-left" style={{ fontWeight: 800, fontSize: 18, color: "#0f172a", marginRight: 8 }}>
              CalmFlow
            </div>
          </Link>

          <div className="desktop-controls" style={{ display: "flex", alignItems: "center", gap: 12 }}>
            <DropdownButton label="Themes" options={THEME_OPTIONS} current={theme} onChange={(v) => onThemeChange(v)} />
            <DropdownButton label="Music" options={MUSIC_OPTIONS} current={music} onChange={(v) => onMusicChange(v)} />
            <DropdownButton
              label="Background"
              options={BACKGROUND_OPTIONS}
              current={background}
              onChange={(v) => onBackgroundChange(v === "none" ? null : v)}
            />
          </div>
        </div>

        <div style={{ flex: 1 }} />

        {/* settings moved to very right as circular button */}
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <SupportDropdown />
          <SettingsDropdown />
        </div>
      </nav>

      {/* mobile drawer: fixed panel + overlay sibling for deterministic layering */}
      <div className={`mobile-drawer ${drawerOpen ? "open" : ""}`} role="dialog" aria-hidden={!drawerOpen}>
        <div className="mobile-drawer-inner">
          <div style={{ padding: 16, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div style={{ fontWeight: 800 }}>CalmFlow</div>
            <button className="selector-button" onClick={() => setDrawerOpen(false)}>
              ✕
            </button>
          </div>

          <div style={{ padding: 12, display: "flex", flexDirection: "column", gap: 8 }}>
            <div style={{ marginBottom: 8 }}>
              <strong>Themes</strong>
              <div style={{ marginTop: 6 }}>
                {THEME_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    className="listbox-option"
                    onClick={() => {
                      onThemeChange(o.value);
                      setDrawerOpen(false);
                    }}
                    style={{ display: "block", width: "100%" }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Music block added for mobile */}
            <div style={{ marginBottom: 8 }}>
              <strong>Music</strong>
              <div style={{ marginTop: 6 }}>
                {MUSIC_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    className="listbox-option"
                    onClick={() => {
                      onMusicChange(o.value === "none" ? null : o.value);
                      setDrawerOpen(false);
                    }}
                    style={{ display: "block", width: "100%" }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: 8 }}>
              <strong>Background</strong>
              <div style={{ marginTop: 6 }}>
                {BACKGROUND_OPTIONS.map((o) => (
                  <button
                    key={o.id}
                    className="listbox-option"
                    onClick={() => {
                      onBackgroundChange(o.value === "none" ? null : o.value);
                      setDrawerOpen(false);
                    }}
                    style={{ display: "block", width: "100%" }}
                  >
                    {o.label}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginTop: 8 }}>
              <strong>Settings</strong>
              <div style={{ marginTop: 6 }}>
                <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
                  <label style={{ flex: 1 }}>
                    Inhale
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={settings.inhaleSec}
                      onChange={(e) => onSettingsChange({ ...settings, inhaleSec: Math.max(1, Number(e.target.value || 1)) })}
                      style={{ width: "100%", marginTop: 6, padding: "6px 8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)" }}
                    />
                  </label>
                  <label style={{ flex: 1 }}>
                    Hold
                    <input
                      type="number"
                      min={0}
                      max={100}
                      value={settings.holdSec}
                      onChange={(e) => onSettingsChange({ ...settings, holdSec: Math.max(0, Number(e.target.value || 0)) })}
                      style={{ width: "100%", marginTop: 6, padding: "6px 8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)" }}
                    />
                  </label>
                  <label style={{ flex: 1 }}>
                    Exhale
                    <input
                      type="number"
                      min={1}
                      max={100}
                      value={settings.exhaleSec}
                      onChange={(e) => onSettingsChange({ ...settings, exhaleSec: Math.max(1, Number(e.target.value || 1)) })}
                      style={{ width: "100%", marginTop: 6, padding: "6px 8px", borderRadius: 8, border: "1px solid rgba(0,0,0,0.08)" }}
                    />
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* overlay shown only when drawerOpen */}
      {drawerOpen && <div className="mobile-drawer-overlay" onClick={() => setDrawerOpen(false)} />}
    </>
  );
}

const THEME_OPTIONS = [
  { id: "ocean", label: "Ocean", value: "ocean", colors: ["#E0F7FA", "#8ED1E6", "#36A6C8", "#0B8796", "#042D34"] },
  { id: "forest", label: "Forest", value: "forest", colors: ["#E8F6EC", "#B8E3C6", "#7EC38A", "#3B8A57", "#153927"] },
  { id: "night", label: "Night", value: "night", colors: ["#F3F6FA", "#BBC7E6", "#6F7EA8", "#2D3756", "#0B1220"] },
  // Sunny: warm bright palette
  { id: "sunny", label: "Sunny", value: "sunny", colors: ["#FFF7D6", "#FFE28A", "#FFC857", "#FF9F1C", "#FF6B00"] },
  // Sunset: deep orange/pink gradient
  { id: "sunset", label: "Sunset", value: "sunset", colors: ["#FFF0E6", "#FFD1B8", "#FF9AA2", "#FF6F61", "#C23B5A"] },
];

const MUSIC_OPTIONS = [
  { id: "none", label: "None", value: "none" },
  { id: "ocean", label: "Ocean", value: "ocean" },
  { id: "forest", label: "forest", value: "forest" },
  { id: "wind", label: "wind", value: "wind" },
];

const BACKGROUND_OPTIONS = [
  { id: "none", label: "None", value: "none" },
  { id: "beach", label: "Beach", value: "beach" },
  { id: "forest", label: "forest", value: "forest" },
  { id: "grass", label: "grass", value: "grass" },
];