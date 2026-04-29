import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "../../../../../test/factory/make-question.js";
import { EditQuestionUseCase } from "./edit-question.js";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";
import { NotAllowedError } from "./errors/not-allowed-error.js";

let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: EditQuestionUseCase // System under test

describe('Edit Question By ID', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    sut = new EditQuestionUseCase(inMemoryQuestionsRepository)
  })

  it('should be able to edit a question by an ID', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)

    await sut.execute({
      authorId: 'author-1',
      content: 'new question content',
      title: 'new question title',
      questionId: newQuestion.id.toString()
    })

    expect(inMemoryQuestionsRepository.items[0]?.content).toEqual('new question content')
    expect(inMemoryQuestionsRepository.items[0]?.title).toEqual('new question title')
    expect(inMemoryQuestionsRepository.items[0]?.slug.value).toEqual('new-question-title')

  })

  it('should NOT be able to edit a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1')
    }, new UniqueEntityId('question-1'))
    await inMemoryQuestionsRepository.create(newQuestion)

    const result = await sut.execute({
      authorId: 'author-2',
      questionId: newQuestion.id.toString(),
      content: 'new question content',
      title: 'new question title',
    })

    expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(NotAllowedError);
  })
})
