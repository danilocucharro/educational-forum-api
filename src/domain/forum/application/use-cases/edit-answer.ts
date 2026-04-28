import type { Answer } from "../../enterprise/entities/answer.js"
import type { AnswersRepository } from "../repositories/answers-repository.js"

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

interface EditAnswerUseCaseResponse {
  answer: Answer
}

export class EditAnswerUseCase {
  constructor(
    private questionsRepository: AnswersRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {

    const answer = await this.questionsRepository.findById(answerId)

    if (!answer) {
      throw new Error('Answer not found.')
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error('Not Allowed.')
    }

    answer.content = content

    await this.questionsRepository.save(answer)

    return {
      answer
    }
  }
}
