import { useNavigate } from "react-router";
import { motion } from "motion/react";
import { Disc3, Music, Radio } from "lucide-react";

export function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background gradient orbs */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
      
      <div className="relative z-10 max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <motion.header
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center justify-between mb-24"
        >
          <div className="flex items-center gap-2">
            <Radio className="w-6 h-6 text-primary" />
            <span className="text-xl tracking-tight">DeepWork Radio</span>
          </div>
        </motion.header>

        {/* Hero Section */}
        <div className="text-center mb-32">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="mb-12 flex justify-center"
          >
            <SpinningRecord />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-5xl md:text-7xl mb-6 tracking-tight"
            style={{ fontSize: '4rem', fontWeight: 600 }}
          >
            Music for the <br />
            <span className="text-primary">Deepest Work.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Your focus is fragile. We protect it with{" "}
            <span className="text-foreground">science-backed acoustic tracks</span> curated for your current task.
          </motion.p>

          <motion.button
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            onClick={() => navigate("/onboard")}
            className="px-8 py-4 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-all hover:scale-105"
            style={{ fontSize: '1.125rem' }}
          >
            Enter My Studio
          </motion.button>
        </div>

        {/* Why It Works */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-32"
        >
          <div className="backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-2xl p-8 md:p-12">
            <h2 className="text-3xl mb-8 text-center" style={{ fontSize: '2rem' }}>
              The Science of Flow-Inducing Music
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <FeatureCard
                icon={<Music className="w-8 h-8" />}
                title="Zero Vocals"
                description="Pure instrumental tracks prevent linguistic interference with your internal monologue during writing and coding."
              />
              <FeatureCard
                icon={<Disc3 className="w-8 h-8" />}
                title="BPM Optimization"
                description="Tempo matched to your task—slower for deep thinking, moderate for steady work, faster for creative energy."
              />
              <FeatureCard
                icon={<Radio className="w-8 h-8" />}
                title="Complexity Filter"
                description="Minimalist melodies that provide acoustic texture without competing for your brain's attention."
              />
            </div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mb-24"
        >
          <h2 className="text-3xl mb-12 text-center" style={{ fontSize: '2rem' }}>
            Your Personal Music Engine
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <WorkflowStep
              number="01"
              title="Define Your Session"
              description="Tell us your task, energy level, and music preference"
            />
            <WorkflowStep
              number="02"
              title="Get Recommendations"
              description="We curate instrumental tracks optimized for your cognitive state"
            />
            <WorkflowStep
              number="03"
              title="Track Your Flow"
              description="We learn which tracks keep you focused longest"
            />
          </div>
        </motion.div>
      </div>
    </div>
  );
}

function SpinningRecord() {
  return (
    <div className="relative w-48 h-48">
      <motion.div
        className="absolute inset-0"
        animate={{ rotate: 360 }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "linear",
        }}
      >
        {/* Outer ring */}
        <div className="absolute inset-0 border-4 border-primary/30 rounded-full" />
        
        {/* Middle ring */}
        <div className="absolute inset-6 border-2 border-primary/20 rounded-full" />
        
        {/* Grooves */}
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute inset-0 border border-primary/10 rounded-full"
            style={{ margin: `${12 + i * 4}px` }}
          />
        ))}
        
        {/* Center hole */}
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 bg-background border-4 border-primary rounded-full" />
        </div>
      </motion.div>
      
      {/* Transparent disc overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent rounded-full" />
    </div>
  );
}

function FeatureCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="text-center">
      <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
        {icon}
      </div>
      <h3 className="mb-2" style={{ fontSize: '1.25rem' }}>{title}</h3>
      <p className="text-muted-foreground text-sm leading-relaxed">{description}</p>
    </div>
  );
}

function WorkflowStep({ number, title, description }: { number: string; title: string; description: string }) {
  return (
    <div className="relative">
      <div className="backdrop-blur-xl bg-[var(--glass-bg)] border border-[var(--glass-border)] rounded-xl p-8 h-full">
        <div className="text-6xl text-primary/20 mb-4" style={{ fontSize: '3rem', fontWeight: 700 }}>
          {number}
        </div>
        <h3 className="mb-2" style={{ fontSize: '1.5rem' }}>{title}</h3>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}
