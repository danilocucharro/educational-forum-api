import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "../../../../../test/factory/make-question.js";
import { DeleteQuestionUseCase } from "./delete-question.js";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: DeleteQuestionUseCase // System under test

describe('Delete Question By ID', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new DeleteQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to delete a question by an ID', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({ authorId: 'author-1', questionId: 'question-1' })

    expect(inMemoryQuestionsRepository.items).toHaveLength(0)
  })

  it('should NOT be able to delete a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        questionId: 'question-1'
      })
    })
    .rejects.toBeInstanceOf(Error)
  })
})
