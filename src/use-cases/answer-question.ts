import { Answer } from "../domain/entities/answer.js"
import type { AnswersRepository } from "../repositories/answers-repository.js"


interface AnswerQuestionUseCaseInterface {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  constructor(
    private answersRepository: AnswersRepository
  ) {}

  async execute({ instructorId, questionId, content }: AnswerQuestionUseCaseInterface) {
    const answer = new Answer({
      content,
      authorId: instructorId,
      questionId,
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
