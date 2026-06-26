import { useState } from "react";
import { type GameConfig } from "../utils/types";
import { useNavigate } from "react-router";

function HomePage() {
  const navigate = useNavigate();
  const [playerCount, setPlayerCount] = useState<1 | 2>(1);
  const [target, setTarget] = useState(10);

  const handleStart = (e: React.SubmitEvent) => {
    e.preventDefault();
    navigate("/game", {
      state: {
        playerCount,
        target,
        mode: "firstToX",
      } satisfies GameConfig,
    });
  };

  const handlePlayerCount = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPlayerCount(Number(e.target.value) as 1 | 2);
  };

  const handleTarget = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTarget(Number(e.target.value));
  };

  return (
    <div>
      <h1>HomePage works!</h1>
      <form onSubmit={handleStart}>
        <input
          type="radio"
          name="playerCount"
          id="onePlayer"
          value={1}
          onChange={handlePlayerCount}
          checked
        />
        <label htmlFor="onePlayer">1 Player</label>

        <input
          type="radio"
          name="playerCount"
          id="twoPlayer"
          value={2}
          onChange={handlePlayerCount}
        />
        <label htmlFor="twoPlayer">2 Player</label>

        <label htmlFor="target">Choose a target score:</label>
        <input
          type="text"
          name="target"
          id="target"
          placeholder="10"
          onChange={handleTarget}
        />

        <button type="submit">Start New Game</button>
      </form>
    </div>
  );
}

export default HomePage;
