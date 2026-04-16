import { useState } from "react";
import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Code, Pencil, BookOpen, Palette, Radio, Guitar, Headphones, Piano } from "lucide-react";
import type { Track } from "../data/tracks";

type Task = "Writing" | "Coding" | "Studying" | "Creative Design";
type MusicPreference = "Acoustic Strings" | "Lo-Fi Beats" | "Ambient Piano";

const tasks: Array<{ name: Task; icon: React.ReactNode; description: string }> = [
  { name: "Writing", icon: <Pencil className="w-8 h-8" />, description: "Essays, articles, documentation" },
  { name: "Coding", icon: <Code className="w-8 h-8" />, description: "Programming & development" },
  { name: "Studying", icon: <BookOpen className="w-8 h-8" />, description: "Reading & learning" },
  { name: "Creative Design", icon: <Palette className="w-8 h-8" />, description: "UI/UX, graphics, art" },
];

const musicPreferences: Array<{ name: MusicPreference; icon: React.ReactNode; description: string }> = [
  { name: "Acoustic Strings", icon: <Guitar className="w-8 h-8" />, description: "Classical guitar, cello, violin" },
  { name: "Lo-Fi Beats", icon: <Headphones className="w-8 h-8" />, description: "Chill hip-hop instrumentals" },
  { name: "Ambient Piano", icon: <Piano className="w-8 h-8" />, description: "Minimalist piano compositions" },
];

export function Onboarding() {
  const navigate = useNavigate();
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);
  const [energyLevel, setEnergyLevel] = useState(50);
  const [musicPreference, setMusicPreference] = useState<MusicPreference | null>(null);

  const handleStart = () => {
    if (!selectedTask || !musicPreference) return;
    
    // Store selections in sessionStorage
    sessionStorage.setItem("deepwork-task", selectedTask);
    sessionStorage.setItem("deepwork-energy", energyLevel.toString());
    sessionStorage.setItem("deepwork-music", musicPreference);
    
    navigate("/player");
  };

  const canStart = selectedTask && musicPreference;

  const getEnergyLabel = () => {
    if (energyLevel < 35) return "Afternoon Slump";
    if (energyLevel < 70) return "Steady State";
    return "Morning Peak";
  };

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-4xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-16"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-primary" />
            <span className="text-xl tracking-tight">DeepWork Radio</span>
          </div>
        </motion.header>

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl mb-4" style={{ fontSize: '2.5rem', fontWeight: 600 }}>
            Define Your Session
          </h1>
          <p className="text-muted-foreground text-lg">
            Help us curate the perfect soundtrack for your work
          </p>
        </motion.div>

        {/* Question 1: Current Task */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12"
        >
          <label className="block mb-6 text-lg">What's your current task?</label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tasks.map((task) => (
              <button
                key={task.name}
                onClick={() => setSelectedTask(task.name)}
                className={`backdrop-blur-xl border rounded-xl p-6 transition-all hover:scale-105 ${
                  selectedTask === task.name
                    ? "bg-primary/20 border-primary"
                    : "bg-[var(--glass-bg)] border-[var(--glass-border)] hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={selectedTask === task.name ? "text-primary" : "text-muted-foreground"}>
                    {task.icon}
                  </div>
                  <div className="text-center">
                    <span className={`block text-sm font-medium ${selectedTask === task.name ? "text-primary" : ""}`}>
                      {task.name}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      {task.description}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Question 2: Energy Level */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-12"
        >
          <label className="block mb-6 text-lg">What's your energy level?</label>
          <div className="backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-8">
            <div className="flex justify-between mb-4 text-sm">
              <span className="text-muted-foreground">Afternoon Slump</span>
              <span className="text-primary text-lg" style={{ fontWeight: 600 }}>{getEnergyLabel()}</span>
              <span className="text-muted-foreground">Morning Peak</span>
            </div>
            <input
              type="range"
              min="0"
              max="100"
              value={energyLevel}
              onChange={(e) => setEnergyLevel(Number(e.target.value))}
              className="w-full h-2 bg-secondary rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${energyLevel}%, var(--secondary) ${energyLevel}%, var(--secondary) 100%)`,
              }}
            />
            <div className="mt-4 text-center text-sm text-muted-foreground">
              {energyLevel < 35 
                ? "Lower BPM tracks for gentle focus" 
                : energyLevel < 70 
                ? "Moderate tempo for steady productivity" 
                : "Higher energy tracks for peak performance"}
            </div>
          </div>
        </motion.div>

        {/* Question 3: Music Preference */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-12"
        >
          <label className="block mb-6 text-lg">What's your music preference?</label>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {musicPreferences.map((pref) => (
              <button
                key={pref.name}
                onClick={() => setMusicPreference(pref.name)}
                className={`backdrop-blur-xl border rounded-xl p-6 transition-all hover:scale-105 ${
                  musicPreference === pref.name
                    ? "bg-primary/20 border-primary"
                    : "bg-[var(--glass-bg)] border-[var(--glass-border)] hover:border-primary/50"
                }`}
              >
                <div className="flex flex-col items-center gap-3">
                  <div className={musicPreference === pref.name ? "text-primary" : "text-muted-foreground"}>
                    {pref.icon}
                  </div>
                  <div className="text-center">
                    <span className={`block text-sm font-medium ${musicPreference === pref.name ? "text-primary" : ""}`}>
                      {pref.name}
                    </span>
                    <span className="block text-xs text-muted-foreground mt-1">
                      {pref.description}
                    </span>
                  </div>
                </div>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Start Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="text-center"
        >
          <button
            onClick={handleStart}
            disabled={!canStart}
            className="px-12 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            style={{ fontSize: '1.125rem' }}
          >
            Start Session
          </button>
          {!canStart && (
            <p className="mt-4 text-sm text-muted-foreground">
              Please select a task and music preference
            </p>
          )}
        </motion.div>
      </div>
    </div>
  );
}
