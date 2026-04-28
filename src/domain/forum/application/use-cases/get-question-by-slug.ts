import { Question } from "../../enterprise/entities/question.js"
import type { QuestionsRepository } from "../repositories/questions-repository.js"

interface GetQuestionbySlugUseCaseRequest {
  slug: string
}

interface GetQuestionbySlugUseCaseResponse {
  question: Question
}

export class GetQuestionbySlugUseCase {
  constructor(
    private questionsRepository: QuestionsRepository
  ) {}

  async execute({
    slug
  }: GetQuestionbySlugUseCaseRequest): Promise<GetQuestionbySlugUseCaseResponse> {
    const question = await this.questionsRepository.findBySlug(slug)

    if (!question) {
      throw new Error('Question not found.')
    }

    return {
      question
    }
  }
}
