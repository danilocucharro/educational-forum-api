import { Entity } from "../../core/entities.js"

interface AnswerProps {
  content: string
  authorId: string
  questionId: string
}

export class Answer extends Entity<AnswerProps>{
  constructor(props: AnswerProps, id?: string) {
    super(props, id)
  }

  get content() {
    return this.props.content
  }

  get authorId() {
    return this.props.authorId
  }

  get questionId() {
    return this.props.questionId
  }
}
