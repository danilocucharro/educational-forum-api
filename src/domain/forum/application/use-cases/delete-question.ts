import type { QuestionsRepository } from "../repositories/question-repository.js"

interface DeleteQuestionUseCaseRequest {
  authorId: string
  questionId: string
}

type DeleteQuestionUseCaseResponse = {}

export class DeleteQuestionUseCase {
  constructor(
    private QuestionsRepository: QuestionsRepository
  ) {}

  async execute({
    authorId,
    questionId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

    const Question = await this.QuestionsRepository.findById(questionId)

    if (!Question) {
      throw new Error('Question not found.')
    }

    if (authorId !== Question.authorId.toString()) {
      throw new Error('Not Allowed.')
    }

    await this.QuestionsRepository.delete(Question)
    return {}
  }
}
