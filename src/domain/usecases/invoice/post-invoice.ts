import { Invoice } from '../../../data/data-store/models'
import { InvoiceUpload } from '../../models/invoice-upload.model'

export interface PostInvoice {
  post: (body: InvoiceUpload | FormData) => Promise<InvoiceResponse>
}

export type InvoiceResponse = Invoice | any
