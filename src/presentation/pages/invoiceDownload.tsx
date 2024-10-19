import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { getInvoicePerPage } from '../../main/usecases/invoice/invoice-factory'
import { Invoice } from '../../domain/models/invoice.model'

const InvoiceDownload = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())

  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  const months = [
    'Jan',
    'Fev',
    'Mar',
    'Abr',
    'Mai',
    'Jun',
    'Jul',
    'Ago',
    'Set',
    'Out',
    'Nov',
    'Dez',
  ]

  useEffect(() => {
    ;(async () => {
      try {
        const response = await getInvoicePerPage(1).load()
        setInvoices(
          response.data.filter((invoice: Invoice) => {
            const invoiceDate = new Date(invoice.referenceMonth)
            return invoiceDate.getFullYear() === selectedYear
          })
        )
      } catch (error) {
        console.error('Error fetching invoices:', error)
      }
    })()
  }, [selectedYear])

  const handleYearClick = (year: number) => {
    setSelectedYear(year)
  }

  const handleDownload = (invoice: Invoice) => {
    console.log('Download:', invoice)
  }

  const groupInvoicesByClient = () => {
    const groupedInvoices: { [key: string]: { [key: string]: Invoice } } = {}
    invoices.forEach((invoice) => {
      if (!groupedInvoices[invoice.clientNumber]) {
        groupedInvoices[invoice.clientNumber] = {}
      }
      const date = new Date(invoice.referenceMonth)
      const monthKey = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}`
      groupedInvoices[invoice.clientNumber][monthKey] = invoice
    })
    return groupedInvoices
  }

  return (
    <Container>
      <h1>Faturas</h1>

      <YearButtons>
        {years.map((year) => (
          <YearButton
            key={year}
            active={year === selectedYear}
            onClick={() => handleYearClick(year)}
          >
            {year}
          </YearButton>
        ))}
      </YearButtons>

      <Table>
        <thead>
          <tr>
            <Th>Nome da UC</Th>
            <Th>Número da UC</Th>
            {months.map((month) => (
              <Th key={month}>{month}</Th>
            ))}
          </tr>
        </thead>

        {invoices.length === 0 && (
          <tbody>
            <tr>
              <Td colSpan={months.length + 2}>Nenhuma fatura encontrada.</Td>
            </tr>
          </tbody>
        )}

        <tbody>
          {Object.entries(groupInvoicesByClient()).map(
            ([clientNumber, clientInvoices]) => (
              <tr key={clientNumber}>
                <Td>{Object.values(clientInvoices)[0]?.clientName || 'N/A'}</Td>
                <Td>{clientNumber}</Td>
                {months.map((month, index) => {
                  const monthKey = `${selectedYear}-${String(index + 1).padStart(2, '0')}`
                  const invoice = clientInvoices[monthKey]
                  return (
                    <Td key={month}>
                      {invoice ? (
                        <DownloadButton onClick={() => handleDownload(invoice)}>
                          📄
                        </DownloadButton>
                      ) : null}
                    </Td>
                  )
                })}
              </tr>
            )
          )}
        </tbody>
      </Table>
    </Container>
  )
}

export default InvoiceDownload

const Container = styled.div`
  padding: 20px;
  @media (max-width: 768px) {
    padding: 10px;
  }
`

const YearButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
`

const YearButton = styled.button<any>`
  padding: 8px 16px;
  background-color: ${(props) => (props.active ? '#1a3c5d' : '#4870B7')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #1a3c5d;
  }
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    font-size: 14px;
  }
`

const Th = styled.th`
  background-color: #757f89;
  color: white;
  padding: 12px;
  text-align: left;
  @media (max-width: 768px) {
    padding: 8px;
  }
`

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;
  @media (max-width: 768px) {
    padding: 8px;
  }
`

const DownloadButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  color: #1a3c5d;
  &:hover {
    text-decoration: underline;
  }
`
