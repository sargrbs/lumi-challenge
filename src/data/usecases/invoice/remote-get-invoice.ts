import { UnexpectedError } from '../../../domain/errors/unexpected-error'
import {
  LoadInvoice,
  InvoiceResponse,
} from '../../../domain/usecases/invoice/load-invoice'
import { HttpClient, HttpStatusCode } from '../../protocols/http/http-client'

export class RemoteLoadInvoice implements LoadInvoice {
  constructor(
    private readonly endpoint: string,
    private readonly httpClient: HttpClient<InvoiceResponse>
  ) {}

  async load(params?: any): Promise<any> {
    const httpResponse = await this.httpClient.request({
      url: this.endpoint,
      method: 'get',
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
