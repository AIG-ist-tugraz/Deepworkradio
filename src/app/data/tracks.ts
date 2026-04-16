export interface Track {
  id: string;
  title: string;
  artist: string;
  bpm: number;
  duration: number; // in seconds
  genre: "Acoustic Strings" | "Lo-Fi Beats" | "Ambient Piano";
  energy: "low" | "medium" | "high";
  taskOptimized: string[];
}

export const musicLibrary: Track[] = [
  // Acoustic Strings - Low Energy
  {
    id: "as001",
    title: "Nordic Strings",
    artist: "Fjord Ensemble",
    bpm: 60,
    duration: 312,
    genre: "Acoustic Strings",
    energy: "low",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "as002",
    title: "Whisper of Pines",
    artist: "Forest Chamber",
    bpm: 58,
    duration: 298,
    genre: "Acoustic Strings",
    energy: "low",
    taskOptimized: ["Studying", "Coding"],
  },
  {
    id: "as003",
    title: "Autumn Waltz",
    artist: "Seasonal String Trio",
    bpm: 68,
    duration: 301,
    genre: "Acoustic Strings",
    energy: "low",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "as004",
    title: "Cathedral Echoes",
    artist: "Sacred Strings",
    bpm: 52,
    duration: 345,
    genre: "Acoustic Strings",
    energy: "low",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "as005",
    title: "Moonlit Serenade",
    artist: "Nocturne Quartet",
    bpm: 62,
    duration: 289,
    genre: "Acoustic Strings",
    energy: "low",
    taskOptimized: ["Writing", "Creative Design"],
  },
  
  // Acoustic Strings - Medium Energy
  {
    id: "as006",
    title: "Sunrise Over Mountains",
    artist: "Alpine Quartet",
    bpm: 72,
    duration: 285,
    genre: "Acoustic Strings",
    energy: "medium",
    taskOptimized: ["Creative Design", "Writing"],
  },
  {
    id: "as007",
    title: "Reflections in Water",
    artist: "String Theory Collective",
    bpm: 65,
    duration: 324,
    genre: "Acoustic Strings",
    energy: "medium",
    taskOptimized: ["Writing", "Creative Design"],
  },
  {
    id: "as008",
    title: "Mediterranean Breeze",
    artist: "Coastal Ensemble",
    bpm: 78,
    duration: 267,
    genre: "Acoustic Strings",
    energy: "medium",
    taskOptimized: ["Coding", "Creative Design"],
  },
  {
    id: "as009",
    title: "Velvet Horizon",
    artist: "Twilight Strings",
    bpm: 70,
    duration: 295,
    genre: "Acoustic Strings",
    energy: "medium",
    taskOptimized: ["Writing", "Studying"],
  },
  
  // Acoustic Strings - High Energy
  {
    id: "as010",
    title: "Morning Light Variations",
    artist: "Ensemble Aurora",
    bpm: 85,
    duration: 267,
    genre: "Acoustic Strings",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },
  {
    id: "as011",
    title: "Kinetic Motion",
    artist: "Vivace String Collective",
    bpm: 92,
    duration: 243,
    genre: "Acoustic Strings",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },
  {
    id: "as012",
    title: "Electric Strings",
    artist: "Modern Chamber",
    bpm: 88,
    duration: 256,
    genre: "Acoustic Strings",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },

  // Lo-Fi Beats - Low Energy
  {
    id: "lf001",
    title: "Lazy Afternoon",
    artist: "Analog Dreams",
    bpm: 75,
    duration: 203,
    genre: "Lo-Fi Beats",
    energy: "low",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "lf002",
    title: "Rainy Day Rhythm",
    artist: "Weathered Beats",
    bpm: 78,
    duration: 225,
    genre: "Lo-Fi Beats",
    energy: "low",
    taskOptimized: ["Studying", "Writing"],
  },
  {
    id: "lf003",
    title: "Sunday Morning",
    artist: "Weekend Vibes",
    bpm: 72,
    duration: 234,
    genre: "Lo-Fi Beats",
    energy: "low",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "lf004",
    title: "Velvet Dreams",
    artist: "Nightshift Producer",
    bpm: 68,
    duration: 198,
    genre: "Lo-Fi Beats",
    energy: "low",
    taskOptimized: ["Writing", "Creative Design"],
  },
  {
    id: "lf005",
    title: "Cloudy Thoughts",
    artist: "Mellow Minds",
    bpm: 70,
    duration: 215,
    genre: "Lo-Fi Beats",
    energy: "low",
    taskOptimized: ["Studying", "Writing"],
  },
  
  // Lo-Fi Beats - Medium Energy
  {
    id: "lf006",
    title: "Midnight Study Session",
    artist: "Chillhop Collective",
    bpm: 85,
    duration: 195,
    genre: "Lo-Fi Beats",
    energy: "medium",
    taskOptimized: ["Coding", "Studying"],
  },
  {
    id: "lf007",
    title: "Focus Flow",
    artist: "Study Beats Lab",
    bpm: 88,
    duration: 189,
    genre: "Lo-Fi Beats",
    energy: "medium",
    taskOptimized: ["Coding", "Studying"],
  },
  {
    id: "lf008",
    title: "Tokyo Sunset",
    artist: "Urban Chill",
    bpm: 82,
    duration: 212,
    genre: "Lo-Fi Beats",
    energy: "medium",
    taskOptimized: ["Creative Design", "Writing"],
  },
  {
    id: "lf009",
    title: "Deep Work",
    artist: "Productivity Sounds",
    bpm: 86,
    duration: 241,
    genre: "Lo-Fi Beats",
    energy: "medium",
    taskOptimized: ["Coding", "Studying"],
  },
  {
    id: "lf010",
    title: "Neon Lights",
    artist: "City Nights",
    bpm: 84,
    duration: 207,
    genre: "Lo-Fi Beats",
    energy: "medium",
    taskOptimized: ["Coding", "Creative Design"],
  },
  {
    id: "lf011",
    title: "Vinyl Nostalgia",
    artist: "Retro Waves",
    bpm: 80,
    duration: 219,
    genre: "Lo-Fi Beats",
    energy: "medium",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "lf012",
    title: "Bookshelf Stories",
    artist: "Library Loops",
    bpm: 83,
    duration: 228,
    genre: "Lo-Fi Beats",
    energy: "medium",
    taskOptimized: ["Studying", "Writing"],
  },
  
  // Lo-Fi Beats - High Energy
  {
    id: "lf013",
    title: "Coffee Shop Groove",
    artist: "Beat Botanist",
    bpm: 90,
    duration: 218,
    genre: "Lo-Fi Beats",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },
  {
    id: "lf014",
    title: "Morning Commute",
    artist: "Beat Architect",
    bpm: 95,
    duration: 198,
    genre: "Lo-Fi Beats",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },
  {
    id: "lf015",
    title: "Sunrise Hustle",
    artist: "Dawn Patrol",
    bpm: 98,
    duration: 185,
    genre: "Lo-Fi Beats",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },
  {
    id: "lf016",
    title: "Peak Performance",
    artist: "Flow State Beats",
    bpm: 92,
    duration: 201,
    genre: "Lo-Fi Beats",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },

  // Ambient Piano - Low Energy
  {
    id: "ap001",
    title: "Moonlit Keys",
    artist: "Nocturne Piano",
    bpm: 55,
    duration: 289,
    genre: "Ambient Piano",
    energy: "low",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "ap002",
    title: "Gentle Cascade",
    artist: "Minimalist Piano Collective",
    bpm: 62,
    duration: 314,
    genre: "Ambient Piano",
    energy: "low",
    taskOptimized: ["Writing", "Creative Design"],
  },
  {
    id: "ap003",
    title: "Distant Memories",
    artist: "Ethereal Keys",
    bpm: 58,
    duration: 298,
    genre: "Ambient Piano",
    energy: "low",
    taskOptimized: ["Studying", "Writing"],
  },
  {
    id: "ap004",
    title: "Morning Meditation",
    artist: "Peaceful Piano",
    bpm: 50,
    duration: 342,
    genre: "Ambient Piano",
    energy: "low",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "ap005",
    title: "Contemplation",
    artist: "Solo Piano Works",
    bpm: 53,
    duration: 329,
    genre: "Ambient Piano",
    energy: "low",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "ap006",
    title: "Winter Solstice",
    artist: "Seasonal Piano",
    bpm: 48,
    duration: 356,
    genre: "Ambient Piano",
    energy: "low",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "ap007",
    title: "Starlight Sonata",
    artist: "Celestial Keys",
    bpm: 56,
    duration: 318,
    genre: "Ambient Piano",
    energy: "low",
    taskOptimized: ["Writing", "Creative Design"],
  },
  
  // Ambient Piano - Medium Energy
  {
    id: "ap008",
    title: "Floating Thoughts",
    artist: "Ambient Ivories",
    bpm: 65,
    duration: 276,
    genre: "Ambient Piano",
    energy: "medium",
    taskOptimized: ["Creative Design", "Writing"],
  },
  {
    id: "ap009",
    title: "Silent Spaces",
    artist: "Modern Classical",
    bpm: 60,
    duration: 305,
    genre: "Ambient Piano",
    energy: "medium",
    taskOptimized: ["Coding", "Studying"],
  },
  {
    id: "ap010",
    title: "Urban Twilight",
    artist: "City Piano",
    bpm: 70,
    duration: 265,
    genre: "Ambient Piano",
    energy: "medium",
    taskOptimized: ["Creative Design", "Coding"],
  },
  {
    id: "ap011",
    title: "Crystal Clear",
    artist: "Pure Tone Piano",
    bpm: 67,
    duration: 287,
    genre: "Ambient Piano",
    energy: "medium",
    taskOptimized: ["Writing", "Studying"],
  },
  {
    id: "ap012",
    title: "Afternoon Light",
    artist: "Golden Hour Keys",
    bpm: 64,
    duration: 294,
    genre: "Ambient Piano",
    energy: "medium",
    taskOptimized: ["Creative Design", "Writing"],
  },
  
  // Ambient Piano - High Energy
  {
    id: "ap013",
    title: "Awakening",
    artist: "Kinetic Piano",
    bpm: 75,
    duration: 258,
    genre: "Ambient Piano",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },
  {
    id: "ap014",
    title: "Momentum",
    artist: "Progressive Keys",
    bpm: 78,
    duration: 243,
    genre: "Ambient Piano",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },
  {
    id: "ap015",
    title: "Cascading Energy",
    artist: "Vivace Piano",
    bpm: 82,
    duration: 236,
    genre: "Ambient Piano",
    energy: "high",
    taskOptimized: ["Coding", "Creative Design"],
  },
];

export function getRecommendedTracks(
  task: string,
  energyLevel: number,
  musicPreference: Track["genre"]
): Track[] {
  // Filter by music preference
  let filtered = musicLibrary.filter((track) => track.genre === musicPreference);

  // Filter by task optimization
  filtered = filtered.filter((track) => track.taskOptimized.includes(task));

  // Sort by energy level match
  const targetEnergy = energyLevel < 35 ? "low" : energyLevel < 70 ? "medium" : "high";
  filtered.sort((a, b) => {
    const aMatch = a.energy === targetEnergy ? 1 : 0;
    const bMatch = b.energy === targetEnergy ? 1 : 0;
    return bMatch - aMatch;
  });

  // Return shuffled tracks for variety
  return filtered.sort(() => Math.random() - 0.5);
}

export function getTrackExplanation(track: Track, task: string): string {
  const explanations: Record<string, string> = {
    Writing: `Matched for **${task}**: 0% vocals to avoid interference with your internal monologue. ${track.bpm} BPM maintains steady cognitive rhythm without distraction.`,
    Coding: `Matched for **${task}**: Instrumental texture provides acoustic background without competing for logical processing. ${track.bpm} BPM supports problem-solving flow.`,
    Studying: `Matched for **${task}**: Pure instrumental focus—no lyrics to interrupt memory encoding. ${track.bpm} BPM keeps attention stable during information processing.`,
    "Creative Design": `Matched for **${task}**: Harmonic complexity stimulates creative thinking without overwhelming visual processing. ${track.bpm} BPM balances energy and focus.`,
  };

  return explanations[task] || `Optimized for deep work at ${track.bpm} BPM.`;
}