
 # DeepWork Radio

 DeepWork Radio is a frontend prototype for creating focused work sessions with personalized instrumental music recommendations based on your task, current energy level, and music preference.

 ## Features

 - Guided onboarding flow to capture:
   - current task type (Writing, Coding, Studying, Creative Design)
   - current energy level
   - preferred music style (Acoustic Strings, Lo-Fi Beats, Ambient Piano)
 - Personalized session playback with:
   - curated track recommendations based on onboarding inputs
   - play/pause and skip controls
   - session timer and track progress
 - Focus recovery interactions with:
   - “I’m distracted” recalibration options
   - real-time recommendation updates
   - in-session preference adjustments
 - Session history and insights including:
   - played and skipped tracks
   - distraction markers
   - “flow matches” (long, uninterrupted tracks)
 - Local persistence via `sessionStorage` for task settings, session duration, and played tracks.

 ## Tech Stack

 - `React` + `TypeScript`
 - `Vite`
 - `react-router`
 - `Tailwind CSS`
 - `Radix UI`
 - `lucide-react`
 - `motion` (Framer Motion API)
 - `sonner` (toast notifications)

 ## Getting Started

 ### Prerequisites

 - Node.js 18+ (recommended)
 - npm

 ### Install dependencies

 ```bash
 npm install
 ```

 ### Start development server

 ```bash
 npm run dev
 ```

 By default, Vite serves the app at `http://localhost:5173`.

 ### Build for production

 ```bash
 npm run build
 ```

 ## App Flow

 1. `/` – Landing page
 2. `/onboard` – Session onboarding
 3. `/player` – Focus session player with adaptive recommendations
 4. `/history` – Session summary and flow insights

 ## Project Structure

 ```text
 src/
   app/
     pages/           # Landing, onboarding, player, history screens
     components/      # Preferences modal and reusable UI elements
     data/            # Track catalog and recommendation logic
     routes.tsx       # App routes
   main.tsx
 ```

 ## Notes

 - This project currently uses mock track data and simulated playback state.
 - Session data is stored in `sessionStorage` and resets when storage is cleared.
 - There is no backend integration in this code bundle.
  