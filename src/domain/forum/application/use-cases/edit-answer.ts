import { left, right, type Either } from "../../../../core/either.js"
import type { Answer } from "../../enterprise/entities/answer.js"
import type { AnswersRepository } from "../repositories/answers-repository.js"
import { NotAllowedError } from "./errors/not-allowed-error.js"
import { ResourceNotFoundError } from "./errors/resource-not-found-error.js"

interface EditAnswerUseCaseRequest {
  authorId: string
  answerId: string
  content: string
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  { answer: Answer }
>

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
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content

    await this.questionsRepository.save(answer)

    return right({ answer })
  }
}
