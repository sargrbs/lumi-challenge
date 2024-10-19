import { Invoice } from '../../models/invoice.model'

export interface LoadInvoice {
  load(params: object): Promise<InvoiceResponse>
}

export interface InvoiceResponse {
  data: Invoice[]
}
