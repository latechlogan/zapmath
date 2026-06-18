import { expect, test } from "vitest";
import { generateQuestion, checkAnswer } from "./math";

test("operands are between 0 and 12", () => {
  for (let i = 0; i < 100; i++) {
    const question = generateQuestion();
    expect(question.operandA).toBeGreaterThanOrEqual(0);
    expect(question.operandA).toBeLessThanOrEqual(12);
    expect(question.operandB).toBeGreaterThanOrEqual(0);
    expect(question.operandB).toBeLessThanOrEqual(12);
  }
});

test("operands produce the correct answer", () => {
  const question = generateQuestion();
  expect(question.operandA + question.operandB).toEqual(question.answer);
});

test("a correct number input returns true", () => {
  expect(checkAnswer(7, { operandA: 3, operandB: 4, answer: 7 })).toBe(true);
});

test("a correct string input returns true", () => {
  expect(checkAnswer("7", { operandA: 3, operandB: 4, answer: 7 })).toBe(true);
});

test("an incorrect input value returns false", () => {
  expect(checkAnswer(8, { operandA: 3, operandB: 4, answer: 7 })).toBe(false);
});
