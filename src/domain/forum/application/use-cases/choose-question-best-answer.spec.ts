import { expect, describe, it, beforeEach } from "vitest"
import { InMemoryAnswersRepository } from "../../../../../test/repositories/in-memory-answers-repository.js";
import { makeAnswer } from "../../../../../test/factory/make-answer.js";
import { ChooseQuestionBestAnswerUseCase } from "./choose-question-best-answer.js";
import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js";
import { InMemoryQuestionsRepository } from "../../../../../test/repositories/in-memory-questions-repository.js";
import { makeQuestion } from "../../../../../test/factory/make-question.js";

let inMemoryAnswersRepository: InMemoryAnswersRepository
let inMemoryQuestionsRepository: InMemoryQuestionsRepository
let sut: ChooseQuestionBestAnswerUseCase // System under test

describe('Delete Answer By ID', () => {
  beforeEach(() => {
    inMemoryQuestionsRepository = new InMemoryQuestionsRepository()
    inMemoryAnswersRepository = new InMemoryAnswersRepository()
    sut = new ChooseQuestionBestAnswerUseCase(
      inMemoryQuestionsRepository,
      inMemoryAnswersRepository
    )
  })

  it('should be able to choose a best answer for a question', async () => {
    const newQuestion = makeQuestion()
    const newAnswer = makeAnswer({
      questionId: newQuestion.id,
    })

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    await sut.execute({
      authorId: newQuestion.authorId.toValue(),
      answerId: newAnswer.id.toValue(),
    })

    expect(inMemoryQuestionsRepository.items[0]?.bestAnswerId?.toValue()).toEqual(newAnswer.id.toValue())
  })

  it('should NOT be able to choose a best answer for a question', async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntityId('author-1'),
    })
    const newAnswer = makeAnswer({
			questionId: newQuestion.id,
		})

    await inMemoryQuestionsRepository.create(newQuestion)
    await inMemoryAnswersRepository.create(newAnswer)

    expect(() => {
      return sut.execute({
        authorId: 'author-2',
        answerId: newAnswer.id.toValue()
      })
    })
    .rejects.toBeInstanceOf(Error)
  })
})
