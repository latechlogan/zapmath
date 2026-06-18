export type GameConfig = {
  playerCount: 1 | 2;
  // Single-member union for now — a "mostInX" mode is parked for a later phase.
  mode: "firstToX";
  target: number;
};

export type Scores = {
  1: number;
  2: number;
};
