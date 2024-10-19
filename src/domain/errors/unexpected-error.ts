export class UnexpectedError extends Error {
  constructor() {
    super('ERROR_UNEXPECTED')
    this.name = 'UnexpectedError'
  }
}
