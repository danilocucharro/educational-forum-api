import type { AnswersRepository } from "../../src/domain/forum/application/repositories/answers-repository.js";
import { Answer } from "../../src/domain/forum/enterprise/entities/answer.js";

export class InMemoryAnswersRepository implements AnswersRepository {

  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async findById(id: string){
    const answer = this.items.find((item) => item.id.toString() === id)

    if (!answer) {
      return null
    }

    return answer
  }

  async delete(answer: Answer) {
    const itemIndex = this.items.findIndex((item) => item.id === answer.id)

    this.items.splice(itemIndex, 1)
  }
}
