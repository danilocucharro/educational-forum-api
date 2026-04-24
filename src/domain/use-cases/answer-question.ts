import { Answer } from "../entities/answer.js"

interface AnswerQuestionUseCaseInterface {
  instructorId: string
  questionId: string
  content: string
}

export class AnswerQuestionUseCase {
  execute({ instructorId, questionId, content }: AnswerQuestionUseCaseInterface) {
    const answer = new Answer(content)

    return answer
  }
}
