import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Radio, Trophy, TrendingUp, SkipForward, AlertCircle, CheckCircle2 } from "lucide-react";
import type { Track } from "../data/tracks";

interface PlayedTrack {
  track: Track;
  startTime: number;
  duration: number;
  skipped: boolean;
  distracted: boolean;
}

export function History() {
  const navigate = useNavigate();
  const [selectedTrack, setSelectedTrack] = useState<PlayedTrack | null>(null);

  const sessionTime = parseInt(sessionStorage.getItem("deepwork-session-time") || "0");
  const playedTracksData = sessionStorage.getItem("deepwork-played-tracks");
  const playedTracks: PlayedTrack[] = playedTracksData ? JSON.parse(playedTracksData) : [];
  const task = sessionStorage.getItem("deepwork-task") || "Coding";

  // Identify Flow Matches (tracks played for 20+ minutes without skip/distraction)
  const flowMatches = playedTracks.filter(
    (pt) => pt.duration >= 1200 && !pt.skipped && !pt.distracted
  );

  const totalTracks = playedTracks.length;
  const skippedCount = playedTracks.filter((pt) => pt.skipped).length;
  const distractedCount = playedTracks.filter((pt) => pt.distracted).length;
  const avgTrackDuration = playedTracks.length > 0
    ? Math.round(playedTracks.reduce((sum, pt) => sum + pt.duration, 0) / playedTracks.length)
    : 0;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  const formatSessionTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNewSession = () => {
    sessionStorage.clear();
    navigate("/onboard");
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-12"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-primary" />
            <span className="text-xl tracking-tight">DeepWork Radio</span>
          </div>
        </motion.header>

        {/* Session Complete Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center mb-12"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-primary/20 rounded-full flex items-center justify-center">
            {flowMatches.length > 0 ? (
              <Trophy className="w-8 h-8 text-primary" />
            ) : (
              <CheckCircle2 className="w-8 h-8 text-primary" />
            )}
          </div>
          <h1 className="text-4xl mb-2" style={{ fontSize: '2.5rem', fontWeight: 600 }}>
            Session History
          </h1>
          <p className="text-muted-foreground text-lg">
            {flowMatches.length > 0
              ? `${flowMatches.length} Flow ${flowMatches.length === 1 ? 'Match' : 'Matches'} discovered!`
              : "Review your listening session"}
          </p>
        </motion.div>

        {/* Session Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid md:grid-cols-4 gap-6 mb-12"
        >
          <StatCard
            label="Total Time"
            value={formatSessionTime(sessionTime)}
            icon={<Radio className="w-5 h-5" />}
          />
          <StatCard
            label="Tracks Played"
            value={totalTracks.toString()}
            icon={<TrendingUp className="w-5 h-5" />}
          />
          <StatCard
            label="Avg Track Duration"
            value={formatTime(avgTrackDuration)}
            icon={<CheckCircle2 className="w-5 h-5" />}
          />
          <StatCard
            label="Flow Matches"
            value={flowMatches.length.toString()}
            highlight={flowMatches.length > 0}
            icon={<Trophy className="w-5 h-5" />}
          />
        </motion.div>

        {/* Flow Matches Section */}
        {flowMatches.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mb-12"
          >
            <div className="backdrop-blur-xl bg-primary/10 border-2 border-primary/50 rounded-2xl p-8">
              <div className="flex items-center gap-3 mb-6">
                <Trophy className="w-6 h-6 text-primary" />
                <h2 className="text-2xl" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
                  Flow Matches Discovered
                </h2>
              </div>
              <p className="text-muted-foreground mb-6">
                These tracks kept you focused for 20+ minutes without interruption—perfect for {task} sessions.
              </p>
              <div className="space-y-3">
                {flowMatches.map((pt, index) => (
                  <div
                    key={index}
                    className="backdrop-blur-xl bg-background/30 border border-primary/30 rounded-xl p-4 hover:border-primary transition-all"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <CheckCircle2 className="w-5 h-5 text-primary" />
                          <div>
                            <p className="font-medium">{pt.track.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {pt.track.artist} • {pt.track.bpm} BPM • {pt.track.genre}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-primary font-medium">{formatTime(pt.duration)}</p>
                        <p className="text-xs text-muted-foreground">Uninterrupted</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        )}

        {/* Session Timeline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <div className="backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-8">
            <h2 className="text-2xl mb-6" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
              Session Timeline
            </h2>
            <div className="space-y-4">
              {playedTracks.map((pt, index) => {
                const isFlowMatch = pt.duration >= 1200 && !pt.skipped && !pt.distracted;
                
                return (
                  <div
                    key={index}
                    className={`border rounded-xl p-4 transition-all hover:scale-[1.02] cursor-pointer ${
                      isFlowMatch
                        ? "bg-primary/10 border-primary/30"
                        : pt.skipped || pt.distracted
                        ? "bg-destructive/5 border-destructive/20"
                        : "bg-background/30 border-border/50"
                    }`}
                    onClick={() => setSelectedTrack(pt)}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4 flex-1">
                        {/* Status Icon */}
                        <div>
                          {isFlowMatch ? (
                            <Trophy className="w-5 h-5 text-primary" />
                          ) : pt.skipped ? (
                            <SkipForward className="w-5 h-5 text-muted-foreground" />
                          ) : pt.distracted ? (
                            <AlertCircle className="w-5 h-5 text-destructive" />
                          ) : (
                            <CheckCircle2 className="w-5 h-5 text-muted-foreground" />
                          )}
                        </div>

                        {/* Track Info */}
                        <div className="flex-1">
                          <p className="font-medium">{pt.track.title}</p>
                          <p className="text-sm text-muted-foreground">
                            {pt.track.artist} • {pt.track.bpm} BPM
                          </p>
                        </div>

                        {/* Duration & Status */}
                        <div className="text-right">
                          <p className={isFlowMatch ? "text-primary font-medium" : ""}>
                            {formatTime(pt.duration)}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            {isFlowMatch
                              ? "Flow Match"
                              : pt.skipped
                              ? "Skipped"
                              : pt.distracted
                              ? "Distracted"
                              : "Completed"}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="mt-3 h-1 bg-secondary/50 rounded-full overflow-hidden">
                      <div
                        className={`h-full ${isFlowMatch ? "bg-primary" : "bg-muted-foreground"}`}
                        style={{
                          width: `${Math.min((pt.duration / pt.track.duration) * 100, 100)}%`,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </motion.div>

        {/* Insights */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-8 mb-12"
        >
          <h2 className="text-2xl mb-4" style={{ fontSize: '1.5rem', fontWeight: 600 }}>
            Insights
          </h2>
          <div className="space-y-3 text-sm text-muted-foreground">
            {flowMatches.length > 0 && (
              <p className="text-primary">
                ✓ Excellent! You found {flowMatches.length} Flow {flowMatches.length === 1 ? 'Match' : 'Matches'}. We'll prioritize similar tracks in future {task} sessions.
              </p>
            )}
            {skippedCount > 0 && (
              <p>
                • {skippedCount} track{skippedCount !== 1 ? 's' : ''} skipped - we'll reduce similar recommendations
              </p>
            )}
            {distractedCount > 0 && (
              <p>
                • {distractedCount} recalibration{distractedCount !== 1 ? 's' : ''} needed - we're learning your preferences
              </p>
            )}
            {avgTrackDuration >= 600 && (
              <p className="text-primary">
                ✓ Average track duration of {formatTime(avgTrackDuration)} shows strong engagement
              </p>
            )}
          </div>
        </motion.div>

        {/* Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="flex justify-center gap-4"
        >
          <button
            onClick={handleNewSession}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
            style={{ fontSize: '1.125rem' }}
          >
            Start New Session
          </button>
          <button
            onClick={() => navigate("/")}
            className="px-8 py-4 backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-lg hover:border-primary/50 transition-all"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    </div>
  );
}

function StatCard({
  label,
  value,
  icon,
  highlight = false,
}: {
  label: string;
  value: string;
  icon: React.ReactNode;
  highlight?: boolean;
}) {
  return (
    <div
      className={`backdrop-blur-xl border rounded-xl p-6 ${
        highlight
          ? "bg-primary/10 border-primary/30"
          : "bg-[var(--glass-bg)] border-[var(--glass-border)]"
      }`}
    >
      <div className="flex items-start justify-between mb-4">
        <p className="text-sm text-muted-foreground">{label}</p>
        <div className={highlight ? "text-primary" : "text-muted-foreground"}>{icon}</div>
      </div>
      <p
        className={`text-3xl ${highlight ? "text-primary" : ""}`}
        style={{ fontSize: '2rem', fontWeight: 600 }}
      >
        {value}
      </p>
    </div>
  );
}
