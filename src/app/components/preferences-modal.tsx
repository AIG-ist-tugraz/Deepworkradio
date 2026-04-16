import { useState } from "react";
import { motion } from "motion/react";
import { Check } from "lucide-react";
import type { Track } from "../data/tracks";

interface PreferencesModalProps {
  currentTask: string;
  currentEnergy: number;
  currentMusicPref: Track["genre"];
  onUpdate: (task: string, energy: number, musicPref: Track["genre"]) => void;
  onClose: () => void;
}

export function PreferencesModal({
  currentTask,
  currentEnergy,
  currentMusicPref,
  onUpdate,
  onClose,
}: PreferencesModalProps) {
  const [task, setTask] = useState(currentTask);
  const [energy, setEnergy] = useState(currentEnergy);
  const [musicPref, setMusicPref] = useState(currentMusicPref);

  const tasks = ["Writing", "Coding", "Studying", "Creative Design"];
  const genres: Track["genre"][] = ["Acoustic Strings", "Lo-Fi Beats", "Ambient Piano"];

  const handleSubmit = () => {
    onUpdate(task, energy, musicPref);
  };

  const hasChanges =
    task !== currentTask ||
    energy !== currentEnergy ||
    musicPref !== currentMusicPref;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center p-6"
      onClick={onClose}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        className="backdrop-blur-xl bg-[var(--glass-bg)] border-2 border-[var(--glass-border)] rounded-3xl p-8 max-w-2xl w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h3
          className="text-3xl mb-3 text-center"
          style={{ fontSize: "2rem", fontWeight: 600 }}
        >
          Update Your Preferences
        </h3>
        <p className="text-center text-muted-foreground mb-8">
          Change your focus settings and we'll regenerate your playlist
        </p>

        {/* Task Selection */}
        <div className="mb-8">
          <label className="text-sm text-muted-foreground mb-3 block uppercase tracking-wider">
            What are you working on?
          </label>
          <div className="grid grid-cols-2 gap-3">
            {tasks.map((t) => (
              <motion.button
                key={t}
                onClick={() => setTask(t)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  task === t
                    ? "border-primary bg-primary/10"
                    : "border-primary/20 bg-background/30 hover:border-primary/40"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-center justify-between">
                  <span className="font-medium">{t}</span>
                  {task === t && (
                    <Check className="w-5 h-5 text-primary" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Energy Slider */}
        <div className="mb-8">
          <label className="text-sm text-muted-foreground mb-3 block uppercase tracking-wider">
            Current Energy Level: {energy}%
          </label>
          <div className="px-2">
            <input
              type="range"
              min="0"
              max="100"
              value={energy}
              onChange={(e) => setEnergy(Number(e.target.value))}
              className="w-full h-3 bg-secondary/50 rounded-lg appearance-none cursor-pointer"
              style={{
                background: `linear-gradient(to right, var(--primary) 0%, var(--primary) ${energy}%, rgba(var(--secondary-rgb), 0.5) ${energy}%, rgba(var(--secondary-rgb), 0.5) 100%)`,
              }}
            />
            <div className="flex justify-between text-xs text-muted-foreground mt-2">
              <span>Low</span>
              <span>Medium</span>
              <span>High</span>
            </div>
          </div>
        </div>

        {/* Genre Selection */}
        <div className="mb-8">
          <label className="text-sm text-muted-foreground mb-3 block uppercase tracking-wider">
            Music Genre Preference
          </label>
          <div className="grid grid-cols-3 gap-3">
            {genres.map((genre) => (
              <motion.button
                key={genre}
                onClick={() => setMusicPref(genre)}
                className={`p-4 rounded-xl border-2 transition-all text-center ${
                  musicPref === genre
                    ? "border-primary bg-primary/10"
                    : "border-primary/20 bg-background/30 hover:border-primary/40"
                }`}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex flex-col items-center gap-2">
                  <span className="text-sm font-medium">{genre}</span>
                  {musicPref === genre && (
                    <Check className="w-4 h-4 text-primary" />
                  )}
                </div>
              </motion.button>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl backdrop-blur-xl bg-background/50 border border-[var(--glass-border)] hover:border-primary/50 transition-all"
          >
            Cancel
          </button>
          <motion.button
            onClick={handleSubmit}
            disabled={!hasChanges}
            className={`flex-1 px-6 py-3 rounded-xl transition-all ${
              hasChanges
                ? "bg-gradient-to-br from-primary to-primary/80 text-primary-foreground shadow-lg shadow-primary/20"
                : "bg-secondary/30 text-muted-foreground cursor-not-allowed"
            }`}
            whileHover={hasChanges ? { scale: 1.02 } : {}}
            whileTap={hasChanges ? { scale: 0.98 } : {}}
          >
            Update Playlist
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
}
