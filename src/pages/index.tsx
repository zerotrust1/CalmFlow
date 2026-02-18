import React from "react";
import Link from "next/link";
import SignIn from "../components/SignIn";

export default function Home() {
  return (
    <div className="home-container">
      {/* Simple Header */}
      <header className="home-header">
        <div className="header-content">
          <h1 className="logo">CalmFlow</h1>
          <SignIn />
        </div>
      </header>

      {/* Hero */}
      <main className="hero">
        <h1 className="hero-title">Find Your Calm</h1>
        <p className="hero-subtitle">Beautiful tools for mindfulness and productivity</p>
      </main>

      {/* Apps Grid */}
      <section className="apps-section" id="apps">
        <div className="apps-grid">
          
          {/* Breathing Guide */}
          <Link href="/breathing" legacyBehavior>
            <a className="app-card">
              <div className="card-header">
                <div className="card-icon breathing">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10" opacity="0.3"/>
                    <circle cx="12" cy="12" r="6" opacity="0.6"/>
                    <circle cx="12" cy="12" r="3"/>
                  </svg>
                </div>
                <span className="badge">Popular</span>
              </div>
              <h3 className="card-title">Breathing Guide</h3>
              <p className="card-text">
                Guided breathing exercises to reduce stress and improve focus
              </p>
              <div className="card-tags">
                <span>Custom Timers</span>
                <span>5 Themes</span>
              </div>
            </a>
          </Link>

          {/* Pomodoro Timer */}
          <Link href="/pomodoro" legacyBehavior>
            <a className="app-card">
              <div className="card-header">
                <div className="card-icon pomodoro">
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="10"/>
                    <polyline points="12 6 12 12 16 14"/>
                  </svg>
                </div>
                <span className="badge">New</span>
              </div>
              <h3 className="card-title">Pomodoro Timer</h3>
              <p className="card-text">
                Focus sessions with timed breaks to boost productivity
              </p>
              <div className="card-tags">
                <span>25/5 Timer</span>
                <span>Auto Breaks</span>
              </div>
            </a>
          </Link>

        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>© 2024 CalmFlow</p>
      </footer>
    </div>
  );
}