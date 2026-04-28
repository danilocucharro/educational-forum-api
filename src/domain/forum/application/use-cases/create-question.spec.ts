import { expect, describe, it, beforeEach } from "vitest"
import { CreateQuestionUseCase } from "./create-question.js";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: CreateQuestionUseCase // System under test

describe('Create Question', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new CreateQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to create a Question', async () => {
    const {question} = await sut.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'nova pergunta teste',
    })

    expect(question.id).toBeTruthy()
    expect(inMemoryQuestionsRepository.items[0]?.id).toEqual(question.id)
  })
})
