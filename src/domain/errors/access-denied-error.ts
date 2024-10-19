export class AccessDeniedError extends Error {
  constructor() {
    super('ERROR_ACCESS_DENIED')
    this.name = 'AccessDeniedError'
  }
}
