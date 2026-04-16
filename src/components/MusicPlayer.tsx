import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2, Music2, ListMusic } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { TRACKS } from '@/src/constants';

export default function MusicPlayer() {
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [volume, setVolume] = useState(80);
  const [duration, setDuration] = useState(0);

  const audioRef = useRef<HTMLAudioElement>(null);
  const currentTrack = TRACKS[currentTrackIndex];

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(e => console.error("Playback failed", e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentTrackIndex]);

  const togglePlay = () => setIsPlaying(!isPlaying);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      const current = audioRef.current.currentTime;
      const total = audioRef.current.duration;
      if (total) {
        setProgress((current / total) * 100);
        setDuration(total);
      }
    }
  };

  const handleSeek = (value: number[]) => {
    if (audioRef.current) {
      const newTime = (value[0] / 100) * audioRef.current.duration;
      audioRef.current.currentTime = newTime;
      setProgress(value[0]);
    }
  };

  const skipForward = () => {
    setCurrentTrackIndex((prev) => (prev + 1) % TRACKS.length);
    setIsPlaying(true);
  };

  const skipBackward = () => {
    setCurrentTrackIndex((prev) => (prev - 1 + TRACKS.length) % TRACKS.length);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    const mins = Math.floor(time / 60);
    const secs = Math.floor(time % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <div className="w-full flex items-center justify-between gap-10">
      <audio
        ref={audioRef}
        src={currentTrack.url}
        onTimeUpdate={handleTimeUpdate}
        onEnded={skipForward}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
      />

      {/* Now Playing */}
      <div className="w-[200px] flex flex-col justify-center">
        <div className="text-sm font-bold text-white truncate">{currentTrack.title}</div>
        <div className="text-[11px] text-white/50 truncate uppercase tracking-wider">{currentTrack.artist}</div>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-6">
        <button onClick={skipBackward} className="text-white/60 hover:text-white transition-colors">
          <SkipBack className="w-5 h-5" />
        </button>
        <button 
          onClick={togglePlay}
          className="w-12 h-12 rounded-full bg-neon-cyan text-bg-deep flex items-center justify-center shadow-[0_0_15px_rgba(0,243,255,0.5)] hover:scale-105 transition-all"
        >
          {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current ml-1" />}
        </button>
        <button onClick={skipForward} className="text-white/60 hover:text-white transition-colors">
          <SkipForward className="w-5 h-5" />
        </button>
      </div>

      {/* Progress */}
      <div className="flex-1 flex flex-col gap-2">
        <div className="relative h-1 bg-white/10 rounded-full overflow-hidden">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-neon-cyan shadow-[0_0_10px_rgba(0,243,255,0.8)]"
            animate={{ width: `${progress}%` }}
          />
          <Slider
            value={[progress]}
            max={100}
            step={0.1}
            onValueChange={handleSeek}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-white/30 uppercase tracking-widest">
          <span>{formatTime(audioRef.current?.currentTime || 0)}</span>
          <span>{formatTime(duration)}</span>
        </div>
      </div>

      {/* Volume */}
      <div className="w-[150px] flex items-center gap-3">
        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Vol</span>
        <div className="flex-1 h-1 bg-white/10 rounded-full relative">
          <motion.div 
            className="absolute inset-y-0 left-0 bg-white"
            animate={{ width: `${volume}%` }}
          />
          <Slider
            value={[volume]}
            max={100}
            onValueChange={(v) => {
              setVolume(v[0]);
              if (audioRef.current) audioRef.current.volume = v[0] / 100;
            }}
            className="absolute inset-0 opacity-0 cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
