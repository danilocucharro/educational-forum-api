import { expect, test } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question.js"
import type { AnswersRepository } from "../repositories/answers-repository.js";
import type { Answer } from "../../enterprise/entities/answer.js";


const fakeAnswersRepository: AnswersRepository = {
  create: async (answer: Answer) => {
    return;
  }
}

test('create an answer', async () => {
  const answerQuestion = new AnswerQuestionUseCase(fakeAnswersRepository)

  const answer = await answerQuestion.execute({
    content: 'nova resposta',
    instructorId: '1',
    questionId: '1',
  })

  expect(answer.content).toEqual('nova resposta')
})
