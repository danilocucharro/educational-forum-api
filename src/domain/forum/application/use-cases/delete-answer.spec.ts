import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository.js";
import { makeAnswer } from "../../../../../test/factory/make-answer.js";
import { DeleteAnswerUseCase } from "./delete-answer.js";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository
let sut: DeleteAnswerUseCase // System under test

describe('Delete Answer By ID', () => {
  beforeEach(() => {
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new DeleteAnswerUseCase(inMemoryAnswersRepository)
  })

  it('should be able to delete a question by an ID', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({ authorId: 'author-1', answerId: 'question-1' })

    expect(inMemoryAnswersRepository.items).toHaveLength(0)
  })

  it('should NOT be able to delete a question', async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))
    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: 'question-1'
      })
    })
    .rejects.toBeInstanceOf(Error)
  })
})
