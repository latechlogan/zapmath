# Zapmath — Claude Code Context

## What This Project Is

Zapmath is a frontend-only flashcard math game built for kids to practice addition facts. Players can go solo or head-to-head against a friend. The distinctive features are **speech recognition** for answering questions and **hand gesture recognition** (thumbs up / open palm) for buzzing in during 2-player mode.

This is a personal learning project — not commercial. Functional and clean beats polished.

---

## MVP Scope

- Addition facts only; operands 0–12
- 1 or 2 players (camera field-of-view limits 2-player max)
- Win condition: **first to X correct** (`firstToX`). A `mostInX` mode (most correct in X rounds, or within a timeframe) is **parked for a later phase** — see Data Shapes note
- Pure frontend — no backend, no accounts, no data persistence
- Responsive: phone, tablet, desktop

---

## Tech Stack

| Tool                   | Version / Notes                                                      |
| ---------------------- | -------------------------------------------------------------------- |
| React                  | via Vite scaffold                                                    |
| Vite                   | `npm create vite@latest`, React template                             |
| Tailwind CSS           | **v4** — use v4 syntax and APIs only                                 |
| React Router           | standard SPA routing                                                 |
| Web Speech API         | browser-native, no library wrapper                                   |
| MediaPipe Tasks Vision | hand gesture recognition (preferred over TensorFlow.js / Fingerpose) |

### Stack rationale worth knowing

- **Tailwind v4** was chosen specifically to minimize custom CSS. Lean on utility classes. Don't write custom CSS unless there is genuinely no utility class that fits.
- **MediaPipe Tasks Vision** was chosen over TensorFlow.js + Fingerpose for better reliability at distance and a simpler API surface.
- **Web Speech API** is browser-native and needs no library. Chrome has the best support. Do not suggest polyfills or third-party speech libraries.
- **React Router — declarative mode only.** Use BrowserRouter, Routes, Route, useNavigate, and useLocation. Do not use framework-mode features (loaders, actions, file-based routing).

---

## Folder Structure

```
src/
  components/   # Shared, reusable UI components
  pages/        # Route-level components (HomePage, GamePage)
  hooks/        # Custom React hooks (useGameState, useSpeechRecognition, useGestureRecognition)
  utils/        # Pure functions (generateQuestion, checkAnswer, determineWinner, etc.)
  context/      # React context if/when needed for shared state
```

Keep this structure. Don't create new top-level folders without a clear reason.

---

## Routing

```
/       → HomePage   (game setup)
/game   → GamePage   (active game)
```

---

## Architecture Principles

**Keep logic and UI separate.** Game logic lives in `utils/` as pure functions. Hooks in `hooks/` compose those functions and manage state. Page components just wire hooks to UI — they shouldn't contain raw logic.

**Hooks own their domain.** `useGameState` owns all game state. `useSpeechRecognition` owns the Web Speech API lifecycle. `useGestureRecognition` owns MediaPipe and the camera. Don't let concerns bleed across hooks.

**Pure functions in `utils/` should be unit-testable** without any React context. Write them that way.

---

## Data Shapes & Key APIs

### Core types

// GameConfig — created on HomePage, passed to GamePage via router state
// `mode` is a single-member union for now; `mostInX` is parked for later.
// `target` = number of correct answers needed to win.
{ playerCount: 1 | 2, mode: 'firstToX', target: number }

// Question — produced by generateQuestion()
{ operandA: number, operandB: number, answer: number }

// Scores
{ 1: number, 2: number }

### useGameState(config) — public return shape
// roundCount is for scoreboard display only — not a win condition under firstToX.
State:    currentQuestion, scores, roundCount, activePlayer, buzzedIn, gameOver, winner
Actions:  submitAnswer(input), buzzIn(player), resetGame()

### Component props (brief)
QuestionDisplay   { question }
ScoreBoard        { scores, playerCount, roundCount, config }
AnswerInput       { onSubmit }
GameOver          { winner, scores, onPlayAgain }

---

## Phasing Strategy — Important

The project is built in phases. **Experimental features come last.**

1. Phases 1–4: Fully playable game with keyboard input — no speech, no camera.
2. Phase 5: Add speech recognition on top of the working game.
3. Phase 6: Add gesture recognition (buzz-in) on top of speech.
4. Phase 7: Cleanup, responsive polish, kid-friendly QoL touches.

**Do not introduce speech or gesture code before Phase 5.** This keeps early milestones achievable and debugging isolated to one layer at a time.

---

## Constraints & Known Gotchas

- **No backend.** No API calls, no databases, no auth. If a suggestion requires a server, it's out of scope.
- **No data persistence.** Game state lives in memory only. No localStorage, no cookies.
- **Web Speech API — Chrome only for now.** Don't design around other browsers or suggest cross-browser fallbacks. Note limitations but don't solve them.
- **MediaPipe loads async and is heavy.** Handle loading states gracefully in the UI. Don't assume it's ready immediately.
- **Camera permissions can be denied.** `useGestureRecognition` must handle denied/unavailable camera without crashing the app.
- **2-player mode assumes players are side-by-side** in a single camera frame. No multi-device sync needed.
- **Tailwind v4 only.** If you're about to use a v3 API or syntax, stop and use the v4 equivalent.

---

## Code Style Preferences

- Functional components only — no class components.
- Prefer named exports. Default exports are fine for page-level components.
- Keep components focused. If a component is getting long, it probably wants to be split.
- Descriptive variable names over terse ones — kids' code should be readable.
- Comments are welcome on anything non-obvious, especially in hooks and utils.
- No unnecessary dependencies. If the browser API does it, use the browser API.
