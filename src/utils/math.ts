export type Question = {
  operandA: number;
  operandB: number;
  answer: number;
};

export function generateQuestion(): Question {
  const operandA: number = Math.floor(Math.random() * 13);
  const operandB: number = Math.floor(Math.random() * 13);
  const answer: number = operandA + operandB;

  return { operandA, operandB, answer };
}

export function checkAnswer(input: string | number, question: Question) {
  return question.operandA + question.operandB === Number(input);
}
