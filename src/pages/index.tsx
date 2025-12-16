import React from "react";

export default function Home() {
  return (
    <div className="home-container">
      <h1 className="home-title">CalmFlow</h1>
      <p className="home-description">Your daily dose of peace and tranquility.</p>
      <div className="divider"></div>
      <div className="app-list">
        <a href="/breathing" className="app-item">
          Breathing Guide
          <span className="tooltip">A guided breathing exercise to help you relax and focus.</span>
        </a>
        <a href="/pomodoro" className="app-item">
          Pomodoro Timer
          <span className="tooltip">A simple Pomodoro timer to help you focus on your work.</span>
        </a>
      </div>
    </div>
  );
}