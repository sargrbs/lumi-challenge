export declare class Invoice {
  readonly id?: string
  readonly clientName: string
  readonly clientNumber: string
  readonly installationNumber: string
  readonly referenceMonth: string
  readonly electricityQuantity: number
  readonly electricityTotal: number
  readonly energySceeeQuantity: number
  readonly energySceeeTotal: number
  readonly economyGDIQuantity: number
  readonly economyGDITotal: number
  readonly publicLighting: number
  readonly totalCost: number
  readonly invoiceDueDate: Date
  readonly paymentCode: string
  readonly totalConsumption: number
  readonly totalWithoutGD: number
  readonly createdAt?: Date
  readonly updatedAt?: Date
  constructor(init: ModelInit<Invoice, InvoiceMetaData>)
  static copyOf(
    source: Invoice,
    mutator: (
      draft: MutableModel<Invoice, InvoiceMetaData>
    ) => MutableModel<Invoice, InvoiceMetaData> | void
  ): Invoice
}

type InvoiceMetaData = {
  readOnlyFields: 'createdAt' | 'updatedAt'
}
