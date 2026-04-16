import React, { useState } from 'react';
import SnakeGame from './components/SnakeGame';
import MusicPlayer from './components/MusicPlayer';
import NeonBackground from './components/NeonBackground';
import { motion } from 'motion/react';
import { TRACKS } from './constants';

export default function App() {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  return (
    <div className="h-screen w-screen flex flex-col p-6 gap-5 bg-bg-deep text-text-main font-sans overflow-hidden">
      <NeonBackground />
      
      {/* Header */}
      <header className="glass-panel flex justify-between items-center px-6 py-4 shrink-0">
        <div className="text-xl font-black tracking-[2px] uppercase text-neon-cyan drop-shadow-[0_0_10px_rgba(0,243,255,0.5)]">
          Synth Snake
        </div>
        <div className="flex gap-8">
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest opacity-60">Session Score</div>
            <div className="font-mono text-2xl text-neon-pink drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">
              {score.toString().padStart(5, '0')}
            </div>
          </div>
          <div className="text-right">
            <div className="text-[10px] uppercase tracking-widest opacity-60">Global High</div>
            <div className="font-mono text-2xl text-neon-pink drop-shadow-[0_0_5px_rgba(255,0,255,0.5)]">
              {highScore.toString().padStart(5, '0')}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content Grid */}
      <main className="flex-1 grid grid-cols-[280px_1fr_240px] gap-5 min-h-0">
        {/* Left Panel: Playlist & Visualizer */}
        <aside className="glass-panel p-5 flex flex-col gap-4 overflow-hidden">
          <h3 className="text-[12px] uppercase tracking-[1.5px] text-white/50">Playlist</h3>
          <div className="flex-1 overflow-y-auto custom-scrollbar space-y-2">
            {TRACKS.map((track) => (
              <div key={track.id} className="p-3 rounded-lg hover:bg-white/5 transition-colors cursor-pointer group border-l-2 border-transparent hover:border-neon-cyan">
                <div className="text-sm font-bold truncate group-hover:text-neon-cyan transition-colors">{track.title}</div>
                <div className="text-[10px] opacity-40 truncate uppercase tracking-wider">{track.artist}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-auto pt-4 border-t border-white/5">
            <h3 className="text-[12px] uppercase tracking-[1.5px] text-white/50 mb-4">Visualizer</h3>
            <div className="flex items-end gap-[3px] h-[30px]">
              {[40, 80, 60, 90, 50, 70, 40, 85, 45, 75].map((h, i) => (
                <motion.div
                  key={i}
                  animate={{ height: [`${h}%`, `${Math.min(100, h + 20)}%`, `${h}%`] }}
                  transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                  className="w-1 bg-neon-pink rounded-t-sm"
                />
              ))}
            </div>
          </div>
        </aside>

        {/* Center Panel: Game Board */}
        <section className="glass-panel relative flex items-center justify-center overflow-hidden p-4">
          <SnakeGame onScoreUpdate={setScore} onHighScoreUpdate={setHighScore} />
        </section>

        {/* Right Panel: Status */}
        <aside className="glass-panel p-5 flex flex-col gap-6">
          <h3 className="text-[12px] uppercase tracking-[1.5px] text-white/50">Status</h3>
          
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-widest opacity-60">Speed</div>
            <div className="text-lg text-neon-green">1.25x</div>
          </div>
          
          <div className="space-y-1">
            <div className="text-[10px] uppercase tracking-widest opacity-60">District</div>
            <div className="text-lg">Sector 07</div>
          </div>

          <div className="mt-auto text-[11px] leading-relaxed opacity-60 space-y-2">
            <p className="text-neon-cyan font-bold">CONTROLS:</p>
            <p>Arrows to move snake</p>
            <p>Space to pause game</p>
            <p>Skip buttons for tracks</p>
          </div>
        </aside>
      </main>

      {/* Footer: Music Player */}
      <footer className="glass-panel h-[100px] shrink-0 flex items-center px-8">
        <MusicPlayer />
      </footer>
    </div>
  );
}
