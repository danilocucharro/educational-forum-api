import { expect, describe, it, beforeEach } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question.js"
import type { AnswersRepository } from "../repositories/answers-repository.js";
import type { Answer } from "../../enterprise/entities/answer.js";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository.js";


let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Create Answer', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const result = await sut.execute({
      content: 'nova resposta',
      instructorId: '1',
      questionId: '1',
    })

    expect(result.isRight()).toBe(true)
    expect(inMemoryAnswersRepository.items[0]).toEqual(result.value?.answer)
  })
})
