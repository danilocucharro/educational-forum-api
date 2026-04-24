import { Entity } from "../../core/entities.js"

interface StudentProps {
  name: string
}

export class Student extends Entity<StudentProps>{
  get name() {
    return this.props.name
  }
}
