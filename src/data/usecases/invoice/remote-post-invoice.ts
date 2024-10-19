import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import {
  PostInvoice,
  InvoiceResponse,
} from '../../../domain/usecases/invoice/post-invoice'
import { HttpClient, HttpStatusCode } from '../../protocols/http/http-client'
import { InvoicePost } from '../../../domain/models/invoice-upload.model'

export class RemotePostInvoice implements PostInvoice {
  constructor(
    private readonly endpoint: string,
    private readonly httpClient: HttpClient<InvoiceResponse>
  ) {}

  async post(body: InvoicePost | FormData): Promise<InvoiceResponse> {
    const headers: { [key: string]: string } = {}

    if (!(body instanceof FormData)) {
      headers['Content-Type'] = 'application/json'
    }

    try {
      const httpResponse = await this.httpClient.request({
        url: this.endpoint,
        method: 'post',
        body: body,
        headers,
      })

      switch (httpResponse.statusCode) {
        case HttpStatusCode.ok:
          return httpResponse.body
        case HttpStatusCode.created:
          return httpResponse.body
        case HttpStatusCode.badRequest:
          throw new Error('Bad Request: ' + JSON.stringify(httpResponse.body))
        case HttpStatusCode.serverError:
          throw new Error('Server Error: ' + JSON.stringify(httpResponse.body))
        default:
          throw new UnexpectedError()
      }
    } catch (error) {
      console.error('RemotePostInvoice - Erro na requisição:', error)
      throw error
    }
  }
}
