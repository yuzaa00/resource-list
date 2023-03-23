type ErrorType = "invalid" | "failed"

export class AddResourceError extends Error {
  type: ErrorType

  constructor(message: string, type: ErrorType) {
    super(message)
    this.name = "AddResourceError"
    this.type = type
  }
}
