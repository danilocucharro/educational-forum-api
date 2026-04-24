import type { Slug } from "./value-objects/slug.js"
import { Entity } from "../../core/entities.js"

interface QuestionProps {
  title: string
  content: string
  authorId: string
  slug: Slug
}

export class Question extends Entity<QuestionProps>{
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
