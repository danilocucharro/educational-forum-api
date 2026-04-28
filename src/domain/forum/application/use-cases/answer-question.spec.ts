import { beforeEach, describe, expect, it, test } from "vitest"
import { AnswerQuestionUseCase } from "./answer-question.js"
import type { AnswersRepository } from "../repositories/answers-repository.js";
import type { Answer } from "../../enterprise/entities/answer.js";
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: AnswerQuestionUseCase

describe('Answer Question', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository
    sut = new AnswerQuestionUseCase(inMemoryAnswersRepository)
  })

  it('should be able to create an answer', async () => {
    const {answer} = await sut.execute({
      content: 'nova resposta',
      instructorId: '1',
      questionId: '1',
    })

    expect(answer.id).toBeTruthy()
    expect(inMemoryAnswersRepository.items[0]?.id).toEqual(answer.id)
  })
})
