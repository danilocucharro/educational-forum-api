import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js";
import { GetQuestionbySlugUseCase } from "./get-question-by-slug.js";
import { makeQuestion } from "../../../../../test/factory/make-question.js";
import { Slug } from "../../enterprise/entities/value-objects/slug.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: GetQuestionbySlugUseCase // System under test

describe('Get Question By Slug', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new GetQuestionbySlugUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to get a question by a slug', async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-slug')
    })
    inMemoryQuestionsRepository.create(newQuestion)

    const {question} = await sut.execute({slug: newQuestion.slug.value})

    expect(question.id).toBeTruthy()
    expect(question.slug.value).toEqual(newQuestion.slug.value)
  })
})
