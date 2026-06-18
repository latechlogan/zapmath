import { expect, test } from "vitest";
import { isGameOver, getWinner } from "./game";

// isGameOver

test("returns false when neither player has reached the target", () => {
  expect(isGameOver({ 1: 2, 2: 3 }, { playerCount: 2, mode: "firstToX", target: 5 })).toBe(false);
});

test("returns true when player 1 reaches the target", () => {
  expect(isGameOver({ 1: 5, 2: 3 }, { playerCount: 2, mode: "firstToX", target: 5 })).toBe(true);
});

test("returns true when player 2 reaches the target", () => {
  expect(isGameOver({ 1: 3, 2: 5 }, { playerCount: 2, mode: "firstToX", target: 5 })).toBe(true);
});


test("returns false when scores are zero and target is non-zero", () => {
  expect(isGameOver({ 1: 0, 2: 0 }, { playerCount: 2, mode: "firstToX", target: 10 })).toBe(false);
});

// getWinner

test("returns 1 when player 1 has a higher score", () => {
  expect(getWinner({ 1: 8, 2: 3 })).toBe(1);
});

test("returns 2 when player 2 has a higher score", () => {
  expect(getWinner({ 1: 3, 2: 8 })).toBe(2);
});
