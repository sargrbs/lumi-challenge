export class InvalidCredentialsError extends Error {
  constructor() {
    super('ERROR_INVALID_CREDENTIALS')
    this.name = 'InvalidCredentialsError'
  }
}
