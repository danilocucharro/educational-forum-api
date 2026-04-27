import { Entity } from "../../../../core/entities/entity.js"
import type { UniqueEntityId } from "../../../../core/entities/unique-entity-id.js"
import type { Optional } from "../../../../core/types/optional.js"

interface AnswerProps {
  authorId: UniqueEntityId
  questionId: UniqueEntityId
  content: string
  createdAt: Date
  updatedAt?: Date
}

export class Answer extends Entity<AnswerProps>{
  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }

  get excerpt() {
    return this.content.substring(0, 120).trimEnd().concat('...')
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  set content(content: string) {
    this.props.content = content
    this.touch()
  }

  private touch() {
    this.props.updatedAt = new Date()
  }

  static create(props: Optional<AnswerProps, 'createdAt'>, id?: UniqueEntityId) {
    const answer = new Answer({
      ...props,
      createdAt: new Date()
    }, id)

    return answer
  }
}
