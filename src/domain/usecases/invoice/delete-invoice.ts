import { Invoice } from '../../models/invoice.model'

export interface DeleteInvoice {
  delete(params: object): Promise<InvoiceResponse>
}

export interface InvoiceResponse {
  data: Invoice[]
}
