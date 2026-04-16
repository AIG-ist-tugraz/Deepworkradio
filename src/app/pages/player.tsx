import { useState, useEffect } from "react";
import { useNavigate } from "react-router";
import { motion, AnimatePresence } from "motion/react";
import { Radio, Play, Pause, SkipForward, AlertCircle, History, Volume2, Music2, Activity, Settings } from "lucide-react";
import { toast } from "sonner";
import { getRecommendedTracks, getTrackExplanation, type Track } from "../data/tracks";
import { PreferencesModal } from "../components/preferences-modal";

interface PlayedTrack {
  track: Track;
  startTime: number;
  duration: number;
  skipped: boolean;
  distracted: boolean;
}

export function Player() {
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [sessionTime, setSessionTime] = useState(0);
  const [trackProgress, setTrackProgress] = useState(0);
  const [showDistractedOptions, setShowDistractedOptions] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);
  
  const [task, setTask] = useState(sessionStorage.getItem("deepwork-task") || "Coding");
  const [energy, setEnergy] = useState(parseInt(sessionStorage.getItem("deepwork-energy") || "50"));
  const [musicPref, setMusicPref] = useState((sessionStorage.getItem("deepwork-music") || "Lo-Fi Beats") as Track["genre"]);

  const [playlist, setPlaylist] = useState<Track[]>([]);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playedTracks, setPlayedTracks] = useState<PlayedTrack[]>([]);
  const [trackStartTime, setTrackStartTime] = useState(0);

  // Initialize playlist
  useEffect(() => {
    const tracks = getRecommendedTracks(task, energy, musicPref);
    setPlaylist(tracks);
    setIsPlaying(true);
    setTrackStartTime(0);
    
    toast.success("Playlist Ready", {
      description: `${tracks.length} tracks curated for ${task}`,
      duration: 3000,
    });
  }, []);

  // Session timer
  useEffect(() => {
    if (!isPlaying) return;
    
    const interval = setInterval(() => {
      setSessionTime((prev) => prev + 1);
      setTrackProgress((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isPlaying]);

  // Auto-advance to next track
  useEffect(() => {
    if (playlist.length === 0) return;
    
    const currentTrack = playlist[currentTrackIndex];
    if (trackProgress >= currentTrack?.duration) {
      handleNextTrack(false, false);
    }
  }, [trackProgress, playlist, currentTrackIndex]);

  const currentTrack = playlist[currentTrackIndex];

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying);
    toast(isPlaying ? "Paused" : "Playing", {
      description: isPlaying ? "Session paused" : `Now playing: ${currentTrack?.title}`,
    });
  };

  const handleNextTrack = (skipped: boolean = true, showToast: boolean = true) => {
    if (!currentTrack) return;
    
    // Record the track that just finished
    const playedTrack: PlayedTrack = {
      track: currentTrack,
      startTime: trackStartTime,
      duration: trackProgress - trackStartTime,
      skipped,
      distracted: false,
    };
    
    setPlayedTracks((prev) => [...prev, playedTrack]);
    
    // Move to next track
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    setTrackProgress(0);
    setTrackStartTime(sessionTime);
    
    if (showToast) {
      toast.info("Track Skipped", {
        description: `Now playing: ${playlist[nextIndex]?.title}`,
        duration: 2000,
      });
    }
  };

  const handleDistracted = () => {
    setShowDistractedOptions(true);
  };

  const handleRecalibration = (type: string) => {
    if (!currentTrack) return;
    
    setShowDistractedOptions(false);
    
    // Mark current track as distracted
    const playedTrack: PlayedTrack = {
      track: currentTrack,
      startTime: trackStartTime,
      duration: trackProgress - trackStartTime,
      skipped: false,
      distracted: true,
    };
    
    setPlayedTracks((prev) => [...prev, playedTrack]);
    
    // Recalibrate based on type
    let newPlaylist = [...playlist];
    
    switch (type) {
      case "too-slow":
        // Filter for higher BPM tracks
        newPlaylist = playlist.filter(t => t.bpm > currentTrack.bpm).length > 0
          ? playlist.filter(t => t.bpm > currentTrack.bpm)
          : playlist;
        toast.success("Tempo Increased", {
          description: "Switching to higher BPM tracks for more energy",
          duration: 3000,
        });
        break;
      case "too-busy":
        // Filter for lower energy tracks
        newPlaylist = playlist.filter(t => t.energy === "low").length > 0
          ? playlist.filter(t => t.energy === "low")
          : playlist;
        toast.success("Complexity Reduced", {
          description: "Switching to more minimalist tracks",
          duration: 3000,
        });
        break;
      case "change-texture":
        // Just shuffle and skip
        toast.success("Texture Changed", {
          description: "Exploring different sonic textures",
          duration: 3000,
        });
        break;
    }
    
    if (newPlaylist.length > 0) {
      setPlaylist(newPlaylist);
      setCurrentTrackIndex(0);
      setTrackProgress(0);
      setTrackStartTime(sessionTime);
    }
  };

  const handleUpdatePreferences = (newTask: string, newEnergy: number, newMusicPref: Track["genre"]) => {
    setTask(newTask);
    setEnergy(newEnergy);
    setMusicPref(newMusicPref);
    
    // Update session storage
    sessionStorage.setItem("deepwork-task", newTask);
    sessionStorage.setItem("deepwork-energy", newEnergy.toString());
    sessionStorage.setItem("deepwork-music", newMusicPref);
    
    // Generate new playlist
    const newPlaylist = getRecommendedTracks(newTask, newEnergy, newMusicPref);
    setPlaylist(newPlaylist);
    setCurrentTrackIndex(0);
    setTrackProgress(0);
    setTrackStartTime(sessionTime);
    
    setShowPreferences(false);
    
    toast.success("Preferences Updated", {
      description: `New playlist generated for ${newTask}`,
      duration: 3000,
    });
  };

  const handleEndSession = () => {
    // Save final track if playing
    if (currentTrack && trackProgress > 0) {
      const finalTrack: PlayedTrack = {
        track: currentTrack,
        startTime: trackStartTime,
        duration: trackProgress - trackStartTime,
        skipped: false,
        distracted: false,
      };
      const allTracks = [...playedTracks, finalTrack];
      sessionStorage.setItem("deepwork-played-tracks", JSON.stringify(allTracks));
    } else {
      sessionStorage.setItem("deepwork-played-tracks", JSON.stringify(playedTracks));
    }
    
    sessionStorage.setItem("deepwork-session-time", sessionTime.toString());
    navigate("/history");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  if (!currentTrack) {
    return <div className="min-h-screen bg-background flex items-center justify-center">
      <p>Loading tracks...</p>
    </div>;
  }

  const explanation = getTrackExplanation(currentTrack, task);
  const progressPercent = (trackProgress / currentTrack.duration) * 100;

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Animated background gradients */}
      <motion.div
        className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"
        animate={{
          scale: isPlaying ? [1, 1.2, 1] : 1,
          opacity: isPlaying ? [0.1, 0.15, 0.1] : 0.1,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl"
        animate={{
          scale: isPlaying ? [1, 1.15, 1] : 1,
          opacity: isPlaying ? [0.05, 0.1, 0.05] : 0.05,
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-8">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-8"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-primary" />
            <span className="text-xl tracking-tight">DeepWork Radio</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-full px-6 py-2">
              <span className="text-sm text-muted-foreground mr-2">Session</span>
              <span className="text-primary font-mono" style={{ fontWeight: 600 }}>{formatTime(sessionTime)}</span>
            </div>
            <button
              onClick={() => setShowPreferences(true)}
              className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg hover:border-primary/50 transition-all"
            >
              <Settings className="w-4 h-4" />
              <span className="text-sm">Preferences</span>
            </button>
            <button
              onClick={handleEndSession}
              className="flex items-center gap-2 px-4 py-2 backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg hover:border-primary/50 transition-all"
            >
              <History className="w-4 h-4" />
              <span className="text-sm">End & Review</span>
            </button>
          </div>
        </motion.header>

        {/* Main Content Grid */}
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Left Column - Session Info */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="space-y-4"
          >
            {/* Task Info */}
            <div className="backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Music2 className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Focus Mode</p>
                  <p className="font-medium">{task}</p>
                </div>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Genre</span>
                  <span>{musicPref}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Energy</span>
                  <span>{energy}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Tracks Queued</span>
                  <span>{playlist.length}</span>
                </div>
              </div>
            </div>

            {/* Waveform Visualization */}
            <div className="backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 bg-primary/10 rounded-lg flex items-center justify-center">
                  <Activity className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">Audio Profile</p>
                  <p className="font-medium">{currentTrack.bpm} BPM</p>
                </div>
              </div>
              <AudioWaveform isPlaying={isPlaying} bpm={currentTrack.bpm} />
            </div>
          </motion.div>

          {/* Center Column - Player */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="lg:col-span-2"
          >
            <div className="backdrop-blur-xl bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl p-8 md:p-12">
              {/* Vinyl Visualization */}
              <div className="mb-8">
                <EnhancedVinylVisualization isPlaying={isPlaying} bpm={currentTrack.bpm} />
              </div>

              {/* Track Info */}
              <div className="text-center mb-8">
                <motion.div
                  key={currentTrack.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4"
                >
                  <p className="text-xs text-primary mb-2 uppercase tracking-widest">Now Playing</p>
                  <h2 className="text-4xl mb-3" style={{ fontSize: '2.5rem', fontWeight: 600, lineHeight: 1.2 }}>
                    {currentTrack.title}
                  </h2>
                  <p className="text-xl text-muted-foreground mb-2">
                    {currentTrack.artist}
                  </p>
                  <div className="flex items-center justify-center gap-4 text-sm text-muted-foreground">
                    <span className="px-3 py-1 bg-primary/10 rounded-full">{currentTrack.bpm} BPM</span>
                    <span className="px-3 py-1 bg-secondary/50 rounded-full capitalize">{currentTrack.energy} Energy</span>
                    <span className="px-3 py-1 bg-secondary/50 rounded-full">{currentTrack.genre}</span>
                  </div>
                </motion.div>
              </div>

              {/* Progress Bar */}
              <div className="mb-8">
                <div className="relative h-2 bg-secondary/50 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className="absolute inset-y-0 left-0 bg-gradient-to-r from-primary to-primary/80 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: `${progressPercent}%` }}
                    transition={{ duration: 0.3 }}
                  />
                  {/* Animated pulse on progress head */}
                  <motion.div
                    className="absolute inset-y-0 w-1 bg-primary rounded-full shadow-lg shadow-primary/50"
                    style={{ left: `${progressPercent}%` }}
                    animate={isPlaying ? { opacity: [1, 0.5, 1] } : { opacity: 1 }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </div>
                <div className="flex justify-between text-sm text-muted-foreground">
                  <span className="font-mono">{formatTime(trackProgress)}</span>
                  <span className="font-mono">{formatTime(currentTrack.duration)}</span>
                </div>
              </div>

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 mb-8">
                <motion.button
                  onClick={() => handleNextTrack(true)}
                  className="w-14 h-14 rounded-full backdrop-blur-xl bg-background/50 border border-[var(--glass-border)] flex items-center justify-center hover:border-primary/50 transition-all group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <SkipForward className="w-5 h-5 group-hover:text-primary transition-colors" />
                </motion.button>
                
                <motion.button
                  onClick={handlePlayPause}
                  className="w-20 h-20 rounded-full bg-gradient-to-br from-primary to-primary/80 text-primary-foreground flex items-center justify-center shadow-xl shadow-primary/20 transition-all group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AnimatePresence mode="wait">
                    {isPlaying ? (
                      <motion.div
                        key="pause"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                      >
                        <Pause className="w-8 h-8" />
                      </motion.div>
                    ) : (
                      <motion.div
                        key="play"
                        initial={{ scale: 0, rotate: -180 }}
                        animate={{ scale: 1, rotate: 0 }}
                        exit={{ scale: 0, rotate: 180 }}
                      >
                        <Play className="w-8 h-8 ml-1" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.button>

                <motion.button
                  onClick={handleDistracted}
                  className="w-14 h-14 rounded-full backdrop-blur-xl bg-background/50 border border-[var(--glass-border)] flex items-center justify-center hover:border-destructive/50 transition-all group"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <AlertCircle className="w-5 h-5 group-hover:text-destructive transition-colors" />
                </motion.button>
              </div>

              {/* Volume Control */}
              <div className="flex items-center gap-4 mb-8">
                <Volume2 className="w-5 h-5 text-muted-foreground" />
                <div className="flex-1">
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={volume * 100}
                    onChange={(e) => setVolume(Number(e.target.value) / 100)}
                    className="w-full h-2 bg-secondary/50 rounded-lg appearance-none cursor-pointer"
                    style={{
                      background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${volume * 100}%, rgba(var(--secondary-rgb), 0.5) ${volume * 100}%, rgba(var(--secondary-rgb), 0.5) 100%)`,
                    }}
                  />
                </div>
                <span className="text-sm text-muted-foreground w-12 text-right">{Math.round(volume * 100)}%</span>
              </div>

              {/* Why Badge */}
              <div className="p-6 backdrop-blur-xl bg-primary/5 border border-primary/20 rounded-xl">
                <p className="text-sm text-center leading-relaxed" style={{ color: 'var(--muted-foreground)' }}>
                  {explanation}
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Distracted Options Modal */}
        <AnimatePresence>
          {showDistractedOptions && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
              onClick={() => setShowDistractedOptions(false)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                className="backdrop-blur-xl bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl p-8 max-w-2xl w-full"
                onClick={(e) => e.stopPropagation()}
              >
                <h3 className="text-3xl mb-3 text-center" style={{ fontSize: '2rem', fontWeight: 600 }}>
                  How should we recalibrate?
                </h3>
                <p className="text-center text-muted-foreground mb-8">
                  We'll adjust the playlist to better match your focus state
                </p>
                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <motion.button
                    onClick={() => handleRecalibration("too-slow")}
                    className="backdrop-blur-xl bg-background/30 border-2 border-primary/20 rounded-2xl p-8 hover:border-primary transition-all group"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Activity className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-medium mb-2" style={{ fontSize: '1.125rem' }}>Too Slow</p>
                    <p className="text-sm text-muted-foreground">Increase tempo & energy</p>
                  </motion.button>
                  <motion.button
                    onClick={() => handleRecalibration("too-busy")}
                    className="backdrop-blur-xl bg-background/30 border-2 border-primary/20 rounded-2xl p-8 hover:border-primary transition-all group"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Volume2 className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-medium mb-2" style={{ fontSize: '1.125rem' }}>Too Busy</p>
                    <p className="text-sm text-muted-foreground">More minimalist tracks</p>
                  </motion.button>
                  <motion.button
                    onClick={() => handleRecalibration("change-texture")}
                    className="backdrop-blur-xl bg-background/30 border-2 border-primary/20 rounded-2xl p-8 hover:border-primary transition-all group"
                    whileHover={{ scale: 1.05, y: -4 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-2xl flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                      <Music2 className="w-8 h-8 text-primary" />
                    </div>
                    <p className="font-medium mb-2" style={{ fontSize: '1.125rem' }}>Change Texture</p>
                    <p className="text-sm text-muted-foreground">Different sonic vibe</p>
                  </motion.button>
                </div>
                <button
                  onClick={() => setShowDistractedOptions(false)}
                  className="w-full text-sm text-muted-foreground hover:text-foreground transition-colors py-2"
                >
                  Cancel
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Preferences Modal */}
        <AnimatePresence>
          {showPreferences && (
            <PreferencesModal
              currentTask={task}
              currentEnergy={energy}
              currentMusicPref={musicPref}
              onUpdate={handleUpdatePreferences}
              onClose={() => setShowPreferences(false)}
            />
          )}
        </AnimatePresence>

        {/* Queue Preview */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-6 backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-6"
        >
          <h3 className="text-sm text-muted-foreground mb-4 uppercase tracking-wider flex items-center gap-2">
            <Radio className="w-4 h-4" />
            Up Next in Queue
          </h3>
          <div className="space-y-2">
            {playlist.slice(currentTrackIndex + 1, currentTrackIndex + 6).map((track, i) => (
              <motion.div
                key={track.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.05 }}
                className="flex items-center justify-between text-sm py-3 px-4 rounded-lg hover:bg-background/30 transition-colors border border-transparent hover:border-primary/20"
              >
                <div className="flex items-center gap-4 flex-1">
                  <span className="text-muted-foreground w-6">{i + 1}</span>
                  <div className="flex-1">
                    <span className="text-foreground block">{track.title}</span>
                    <span className="text-muted-foreground text-xs">{track.artist}</span>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-muted-foreground">
                  <span className="text-xs px-2 py-1 bg-secondary/50 rounded-full">{track.bpm} BPM</span>
                  <span className="text-xs font-mono">{formatTime(track.duration)}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function EnhancedVinylVisualization({ isPlaying, bpm }: { isPlaying: boolean; bpm: number }) {
  const rotationDuration = 60 / bpm * 8; // Rotation speed based on BPM
  
  return (
    <div className="relative w-72 h-72 mx-auto">
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 bg-primary/20 rounded-full blur-2xl"
        animate={isPlaying ? {
          scale: [1, 1.3, 1],
          opacity: [0.2, 0.4, 0.2],
        } : {}}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />
      
      <motion.div
        className="absolute inset-0"
        animate={isPlaying ? { rotate: 360 } : {}}
        transition={{
          duration: rotationDuration,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Vinyl record with gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-primary/5 rounded-full border-4 border-primary/40 shadow-2xl shadow-primary/20" />
        
        {/* Multiple groove rings */}
        {[...Array(16)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border rounded-full"
            style={{
              margin: `${12 + i * 5}px`,
              borderColor: `rgba(var(--primary-rgb), ${0.15 - i * 0.008})`,
              borderWidth: i % 3 === 0 ? '2px' : '1px',
            }}
          />
        ))}
        
        {/* Center label with animated details */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-24 h-24 bg-gradient-to-br from-background to-background/80 border-4 border-primary rounded-full flex items-center justify-center shadow-xl">
            <motion.div
              className="w-4 h-4 bg-primary rounded-full"
              animate={isPlaying ? {
                scale: [1, 1.2, 1],
                boxShadow: [
                  '0 0 0 0 rgba(var(--primary-rgb), 0.4)',
                  '0 0 0 8px rgba(var(--primary-rgb), 0)',
                  '0 0 0 0 rgba(var(--primary-rgb), 0)',
                ],
              } : {}}
              transition={{
                duration: 2,
                repeat: Infinity,
              }}
            />
          </div>
        </div>

        {/* Reflection highlights */}
        <div className="absolute inset-0 rounded-full overflow-hidden opacity-30">
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/20 to-transparent" />
        </div>
      </motion.div>
    </div>
  );
}

function AudioWaveform({ isPlaying, bpm }: { isPlaying: boolean; bpm: number }) {
  const bars = 24;
  const animationSpeed = 60 / bpm; // Sync with BPM
  
  return (
    <div className="flex items-end justify-between gap-1 h-24">
      {[...Array(bars)].map((_, i) => {
        const baseHeight = 20 + Math.sin(i * 0.5) * 15;
        
        return (
          <motion.div
            key={i}
            className="flex-1 bg-gradient-to-t from-primary to-primary/40 rounded-full"
            animate={isPlaying ? {
              height: [
                `${baseHeight}%`,
                `${baseHeight + 20 + Math.random() * 40}%`,
                `${baseHeight}%`,
              ],
            } : {
              height: `${baseHeight * 0.5}%`,
            }}
            transition={{
              duration: animationSpeed,
              repeat: Infinity,
              ease: "easeInOut",
              delay: i * 0.05,
            }}
          />
        );
      })}
    </div>
  );
}