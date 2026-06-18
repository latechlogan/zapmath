import { useState } from "react";
import type { GameConfig } from "../utils/types";
import { checkAnswer, generateQuestion } from "../utils/math";
import { getWinner, isGameOver } from "../utils/game";

export default function useGameState(config: GameConfig) {
  const [currentQuestion, setCurrentQuestion] = useState(generateQuestion());
  const [scores, setScores] = useState({ 1: 0, 2: 0 });
  const [roundCount, setRoundCount] = useState(0);
  const [buzzedIn, setBuzzedIn] = useState<1 | 2 | null>(null);
  const [gameOver, setGameOver] = useState(false);
  const [winner, setWinner] = useState<1 | 2 | null>(null);

  const activePlayer = 1 as const;

  const submitAnswer = (input: string | number) => {
    function nextRound() {
      setCurrentQuestion(generateQuestion());
      setRoundCount((prev) => prev + 1);
      setBuzzedIn(null);
    }

    if (checkAnswer(input, currentQuestion)) {
      const newScores = {
        ...scores,
        [buzzedIn ?? activePlayer]: scores[buzzedIn ?? activePlayer] + 1,
      };
      setScores(newScores);

      if (isGameOver(newScores, config)) {
        setGameOver(true);
        setWinner(getWinner(newScores));
      } else {
        nextRound();
      }
    } else {
      nextRound();
    }
  };

  const buzzIn = (player: 1 | 2 | null) => {
    setBuzzedIn(player);
  };

  const resetGame = () => {
    setCurrentQuestion(generateQuestion());
    setScores({ 1: 0, 2: 0 });
    setRoundCount(0);
    setBuzzedIn(null);
    setGameOver(false);
    setWinner(null);
  };

  return {
    // state
    currentQuestion,
    scores,
    roundCount,
    activePlayer,
    buzzedIn,
    gameOver,
    winner,
    // actions
    submitAnswer,
    buzzIn,
    resetGame,
  };
}
