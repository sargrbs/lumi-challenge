export class UnprocessableEntityError extends Error {
  constructor(message: any = null) {
    super(message || 'Não foi possível processar a requisição')
    this.name = 'UnprocessableEntityError'
  }
}
