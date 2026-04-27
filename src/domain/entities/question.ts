import type { Slug } from "./value-objects/slug.js"

import type { UniqueEntityId } from "../../core/entities/unique-entity-id.js"
import { Entity } from "../../core/entities/entity.js"
import type { Optional } from "../../core/types/optional.js"

interface QuestionProps {
  authorId: UniqueEntityId
  bestAnswerId: UniqueEntityId
  title: string
  content: string
  slug: Slug
  createdAt: Date
  updatedAt?: Date
}

export class Question extends Entity<QuestionProps>{
  static create(props: Optional<QuestionProps, 'createdAt'>, id?: UniqueEntityId) {
    const question = new Question({
      ...props,
      createdAt: new Date()
    }, id)

    return question
  }

  get title() {
    return this.props.title
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get slug() {
    return this.props.slug
  }
}
