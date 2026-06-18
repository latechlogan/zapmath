import type { GameConfig, Scores } from "./types";

export function isGameOver(scores: Scores, config: GameConfig): boolean {
  return scores[1] >= config.target || scores[2] >= config.target;
}

export function getWinner(scores: Scores): 1 | 2 {
  return scores[1] >= scores[2] ? 1 : 2;
}
