export class NotFound extends Error {
  constructor(body: any) {
    super(body.message)
    this.name = body.message
  }
}
