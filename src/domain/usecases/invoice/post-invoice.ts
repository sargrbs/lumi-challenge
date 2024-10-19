import { Invoice } from '../../../data/data-store/models'
import { InvoicePost } from '../../models/invoice-upload.model'
export interface PostInvoice {
  post: (body: InvoicePost | FormData) => Promise<InvoiceResponse>
}

export type InvoiceResponse = Invoice | any
