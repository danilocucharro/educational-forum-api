import { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js"
import type { AnswersRepository } from "../repositories/answers-repository.js"
import { Answer } from "../../enterprise/entities/answer.js"


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
    const answer = Answer.create({
      content,
      authorId: new UniqueEntityId(instructorId),
      questionId: new UniqueEntityId(questionId),
    })

    await this.answersRepository.create(answer)

    return answer
  }
}
