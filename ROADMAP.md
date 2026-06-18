# Zapmath — Project Roadmap

## Project Overview
Zapmath is a flashcard math game for kids. Players practice addition facts solo or head-to-head against a friend. The twist: players speak their answers using speech recognition, and in 2-player mode, players buzz in using hand gestures (thumbs up or open palm) detected via camera.

**MVP Scope:**
- Addition facts only, operands 0–12
- 1 or 2 players
- Win condition: first to X correct (`firstToX` mode only for MVP — `mostInX` deferred)
- Pure frontend — no accounts, no data persistence
- Responsive: phone, tablet, desktop

**Stack:** React, Vite, Tailwind CSS v4, React Router, Web Speech API, MediaPipe Tasks Vision

---

## Phase 1 — Project Setup
- Scaffold project with `npm create vite@latest` using the React template
- Install and configure Tailwind CSS v4
- Install React Router, set up basic routing structure (`/`, `/game`)
- Set up folder structure: `components/`, `pages/`, `hooks/`, `utils/`, `context/`
- Create placeholder `HomePage` and `GamePage` components wired to routes
- Confirm dev server runs, routing works, Tailwind classes apply

---

## Phase 2 — Math & Game Logic
- Write a `generateQuestion()` utility that produces random addition facts using operands 0–12
- Write `GameConfig` and `Scores` types in `utils/types.ts`
- Build a `useGameState` custom hook that manages: current question, player scores, round counter, whose turn it is, buzz-in state, and game over condition
- Write pure unit-testable logic functions for: checking an answer, advancing to next question, determining a winner
- MVP implements `firstToX` win condition only — `GameConfig.mode` is typed as a union (`'firstToX' | 'mostInX'`) to leave the door open, but only `firstToX` logic is implemented for now
- No UI yet — just logic you can `console.log` your way through to verify it works

---

## Phase 3 — Home Page & Game Setup UI
- Build `HomePage` with: number of players selector (1 or 2), input for the target score (X), and a Start Game button
- Pass selected config into game state when navigating to `/game`
- Keep it functional and clean — Tailwind utility classes, no custom CSS

---

## Phase 4 — Game Page UI (Keyboard Input)
- Build `GamePage` with: question display, score display for 1 or 2 players, answer input field, submit button, and game over / winner screen
- Wire it to `useGameState` — the game should be fully playable end to end with keyboard input at this point
- Test it manually by playing actual games

---

## Phase 5 — Speech Recognition
- Implement a `useSpeechRecognition` custom hook using the browser's native Web Speech API (no library needed)
- Hook should: start listening on demand, return a transcript, handle errors and no-match cases
- In single player mode, listening starts automatically after each question is displayed
- Replace the keyboard input with voice input on `GamePage` — keep a fallback text input visible for testing
- Test across Chrome (best support) and note any browser limitations

---

## Phase 6 — Gesture Recognition (2-Player Buzz-in)
- Install MediaPipe Tasks Vision package
- Implement a `useGestureRecognition` custom hook that: accesses the camera, runs the MediaPipe hand gesture recognizer, and detects thumbs up and open palm
- In 2-player mode, both players hold up their gesture to buzz in — first detected gesture wins the buzz-in and that player gets to answer via speech
- Wire buzz-in state into `useGameState` — only the buzzing-in player's speech input counts for that round
- Handle camera permissions, loading states, and devices with no camera gracefully

---

## Phase 7 — Cleanup & Kid Testing
- Fix any bugs that shake out from real usage
- Make sure layout doesn't break on phone, tablet, desktop (Tailwind responsive prefixes, minimal effort)
- Add any quality of life stuff that makes it more fun for kids to actually use (correct/wrong feedback, simple score animation, etc.)
- Optional stretch: swap out operations and number range from hardcoded to configurable
