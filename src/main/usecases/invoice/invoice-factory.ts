import { RemoteLoadInvoice } from '../../../data/usecases/invoice/remote-get-invoice'
import { RemotePostInvoice } from '../../../data/usecases/invoice/remote-post-invoice'
import { RemoteDeleteInvoice } from '../../../data/usecases/invoice/remote-delete-invoice'
import { makeAxiosHttpClient } from '../../factories/http/axios-http-client-factory'

export const getAllInvoices = (): RemoteLoadInvoice => {
  return new RemoteLoadInvoice('/api/invoices/', makeAxiosHttpClient())
}

export const findInvoicesBy = (): RemotePostInvoice => {
  return new RemotePostInvoice('/api/invoices/filter', makeAxiosHttpClient())
}

export const createInvoice = (): RemotePostInvoice => {
  return new RemotePostInvoice('/api/invoices/upload', makeAxiosHttpClient())
}

export const getInvoiceByClient = (clientNumber: string): RemoteLoadInvoice => {
  return new RemoteLoadInvoice(
    `/api/invoices/client/${clientNumber}`,
    makeAxiosHttpClient()
  )
}

export const getInvoicePerPage = (page: number): RemoteLoadInvoice => {
  return new RemoteLoadInvoice(
    `/api/invoices/page/${page}`,
    makeAxiosHttpClient()
  )
}

export const deleteInvoiceById = (id: string): RemoteDeleteInvoice => {
  return new RemoteDeleteInvoice(
    `/api/invoices/delete/${id}`,
    makeAxiosHttpClient()
  )
}
