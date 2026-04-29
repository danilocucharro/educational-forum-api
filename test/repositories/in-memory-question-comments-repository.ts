import type { QuestionCommentsRepository } from "../../src/domain/forum/application/repositories/question-comments-repository.js";
import type { QuestionComment } from "../../src/domain/forum/enterprise/entities/question-comment.js";

export class InMemoryQuestionCommentsRepository implements QuestionCommentsRepository {
  public items: QuestionComment[] = []

  async create(questionComment: QuestionComment) {
    this.items.push(questionComment)
  }

  async findById(id: string){
    const question = this.items.find((item) => item.id.toString() === id)

    if (!question) {
      return null
    }

    return question
  }

  async delete(question: QuestionComment) {
    const itemIndex = this.items.findIndex((item) => item.id === question.id)

    this.items.splice(itemIndex, 1)
  }
}
