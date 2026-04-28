import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js"
import { Question } from "../../enterprise/entities/question.js"
import type { QuestionsRepository } from "../repositories/question-repository.js"

interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository
  ) {}

  async execute({
    authorId,
    content,
    title
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntityId(authorId),
      title,
      content,
      bestAnswerId: undefined
    })

    await this.questionsRepository.create(question)

    return {
      question
    }
  }
}
