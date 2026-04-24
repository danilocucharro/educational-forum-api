import { expect, test } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question.js"

test('create an answer', () => {
  const answerQuestion = new AnswerQuestionUseCase()

  const answer = answerQuestion.execute({
    content: 'nova resposta',
    instructorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('nova resposta')
})
