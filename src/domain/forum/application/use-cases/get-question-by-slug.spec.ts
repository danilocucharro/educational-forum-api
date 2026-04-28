import { expect, describe, it, beforeEach } from "vitest"
import { CreateQuestionUseCase } from "./create-question.js";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js";
import { GetQuestionbySlugUseCase } from "./get-question-by-slug.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let createQuestionUseCase: CreateQuestionUseCase
let sut: GetQuestionbySlugUseCase // System under test

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    createQuestionUseCase = new CreateQuestionUseCase(inMemoryQuestionsRepository)
    sut = new GetQuestionbySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by a slug', async () => {
    const newQuestion = await createQuestionUseCase.execute({
      authorId: '1',
      title: 'Nova pergunta',
      content: 'nova pergunta teste',
    })

    const {question} = await sut.execute({slug: newQuestion.question.slug.value})

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual(newQuestion.question.slug.value)
  })
})
