import Head from 'next/head';
import { motion } from 'framer-motion';
import { useState } from 'react';
import NavBar from '../components/NavBar';

const THEME_OPTIONS = [
  { id: "ocean", label: "Ocean", value: "ocean", colors: ["#E0F7FA", "#8ED1E6", "#36A6C8", "#0B8796", "#042D34"] },
  { id: "forest", label: "Forest", value: "forest", colors: ["#E8F6EC", "#B8E3C6", "#7EC38A", "#3B8A57", "#153927"] },
  { id: "night", label: "Night", value: "night", colors: ["#F3F6FA", "#BBC7E6", "#6F7EA8", "#2D3756", "#0B1220"] },
  { id: "sunny", label: "Sunny", value: "sunny", colors: ["#FFF7D6", "#FFE28A", "#FFC857", "#FF9F1C", "#FF6B00"] },
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

export default function Home() {
  const [theme, setTheme] = useState<string | null>(THEME_OPTIONS[0].value);
  const [music, setMusic] = useState<string | null>(MUSIC_OPTIONS[0].value);
  const [background, setBackground] = useState<string | null>(BACKGROUND_OPTIONS[0].value);
  const [settings, setSettings] = useState({
    inhaleSec: 4,
    holdSec: 4,
    exhaleSec: 4,
  });

  return (
    <>
      <Head>
        <title>CalmFlow</title>
        <meta name="description" content="CalmFlow - Your personal sanctuary for relaxation and focus." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="relative min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <NavBar
          theme={theme}
          onThemeChange={setTheme}
          music={music}
          onMusicChange={setMusic}
          background={background}
          onBackgroundChange={setBackground}
          settings={settings}
          onSettingsChange={setSettings}
        />
        <motion.h1
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-6xl md:text-8xl font-bold text-center text-gray-800"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.0 }}
        >
          CalmFlow
        </motion.h1>
      </div>
    </>
  );
}
