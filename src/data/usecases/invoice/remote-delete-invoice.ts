import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import {
  DeleteInvoice,
  InvoiceResponse,
} from '../../../domain/usecases/invoice/delete-invoice'
import { HttpClient, HttpStatusCode } from '../../protocols/http/http-client'

export class RemoteDeleteInvoice implements DeleteInvoice {
  constructor(
    private readonly endpoint: string,
    private readonly httpClient: HttpClient<InvoiceResponse>
  ) {}

  async delete(params?: any): Promise<any> {
    const httpResponse = await this.httpClient.request({
      url: this.endpoint,
      method: 'delete',
      params: {
        ...params,
      },
    })

    const remoteResult = httpResponse.body

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return remoteResult!
      default:
        throw new UnexpectedError()
    }
  }
}
