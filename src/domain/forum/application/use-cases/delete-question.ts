import type { QuestionsRepository } from "../repositories/question-repository.js"

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = {}

export class DeleteQuestionUseCase {
  constructor(
    private questionsRepository: QuestionsRepository
  ) {}

  async execute({
    authorId,
    questionId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

    const question = await this.questionsRepository.findById(questionId)

    if (!question) {
      throw new Error('Question not found.')
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error('Not Allowed.')
    }

    await this.questionsRepository.delete(question)
    return {}
  }
}
