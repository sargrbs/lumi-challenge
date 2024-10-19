import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  getInvoicePerPage,
  getAllInvoices,
} from '../../main/usecases/invoice/invoice-factory'
import { Invoice } from '../../domain/models/invoice.model'
import SimpleLoading from '../components/loadings/simple'
import InvoiceModal from '../components/modal/invoice'
import { customTheme } from '../../styles/theme'
import FileUpload from '../components/file-upload'

const InvoiceDownload = () => {
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear())
  const [loading, setLoading] = useState(true)
  const [clientNumber, setClientNumber] = useState('')
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const years = [2018, 2019, 2020, 2021, 2022, 2023, 2024]
  const months = [
    'JAN',
    'FEV',
    'MAR',
    'ABR',
    'MAI',
    'JUN',
    'JUL',
    'AGO',
    'SET',
    'OUT',
    'NOV',
    'DEZ',
  ]

  useEffect(() => {
    ;(async () => {
      setLoading(true)
      try {
        const response = await getAllInvoices().load()
        setInvoices(response)
      } catch (error) {
        console.error('Error fetching invoices:', error)
      } finally {
        setLoading(false)
      }
    })()
  }, [])

  const loadFilterInvoices = async () => {
    setLoading(true)
    try {
      const response = await getInvoicePerPage(1, clientNumber, false).load()
      const filteredInvoices = response.data.filter((invoice: Invoice) => {
        const invoiceDate = new Date(invoice.referenceMonth)
        const yearMatch = invoiceDate.getFullYear() === selectedYear
        return yearMatch
      })
      setInvoices(filteredInvoices)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleYearClick = (year: number) => {
    setSelectedYear(year)
  }

  const handleClientNumberFilterChange = async () => {
    if (!clientNumber) {
      realodPage()
    } else {
      setInvoices([])
      loadFilterInvoices()
    }
  }

  const handleDownload = (invoice: Invoice) => {
    setSelectedInvoice(invoice)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedInvoice(null)
  }

  const realodPage = () => {
    window.location.reload()
  }

  const groupInvoicesByClient = () => {
    const groupedInvoices: { [key: string]: { [key: string]: Invoice } } = {}
    invoices.forEach((invoice) => {
      if (!groupedInvoices[invoice.clientNumber]) {
        groupedInvoices[invoice.clientNumber] = {}
      }
      const monthKey = invoice.referenceMonth
      groupedInvoices[invoice.clientNumber][monthKey] = invoice
    })

    return groupedInvoices
  }

  if (loading) return <SimpleLoading />

  return (
    <Container>
      <h1>Faturas</h1>

      <FilterContainer>
        <YearButtons>
          {years.map((year) => (
            <YearButton
              key={year}
              $active={year === selectedYear}
              onClick={() => handleYearClick(year)}
            >
              {year}
            </YearButton>
          ))}
        </YearButtons>
        <Input
          type="text"
          placeholder="Filtrar por Número do Cliente"
          value={clientNumber}
          onChange={(e) => setClientNumber(e.target.value)}
        />
        <Button onClick={handleClientNumberFilterChange}>Buscar</Button>

        <FileUploadWrapper>
          <FileUpload onUpload={realodPage} />
        </FileUploadWrapper>
      </FilterContainer>

      <TableWrapper>
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
                <tr key={clientNumber} style={{ borderTop: '1px solid #ddd' }}>
                  <Td data-label="Nome da UC">
                    {Object.values(clientInvoices)[0]?.clientName || 'N/A'}
                  </Td>
                  <Td data-label="Número da UC">{clientNumber}</Td>
                  {months.map((month, index) => {
                    const monthKey = `${months[index]}/${selectedYear}`
                    const invoice = clientInvoices[monthKey]
                    return (
                      <Td key={month} data-label={month}>
                        {invoice ? (
                          <DownloadButton
                            onClick={() => handleDownload(invoice)}
                          >
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
      </TableWrapper>

      <InvoiceModal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        invoice={selectedInvoice}
      />
    </Container>
  )
}

export default InvoiceDownload

const Container = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  @media (max-width: 768px) {
    padding: 10px;
  }
`

const FilterContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const YearButtons = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
`

const YearButton = styled.button<{ $active?: boolean }>`
  padding: 8px 16px;
  background-color: ${(props) => (props.$active ? '#1a3c5d' : '#4870B7')};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #1a3c5d;
  }
`

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  flex-grow: 1;
`

const TableWrapper = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  @media (max-width: 768px) {
    font-size: 14px;

    thead {
      display: none;
    }
  }
`

const Th = styled.th`
  background-color: #757f89;
  color: white;
  padding: 12px;
  text-align: left;
  white-space: nowrap;
  @media (max-width: 768px) {
    padding: 8px;
  }
`

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #ddd;

  @media (max-width: 768px) {
    padding: 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid #ddd;
    border-left: 1px solid #ddd;
    border-right: 1px solid #ddd;

    &:before {
      content: attr(data-label);
      font-weight: bold;
      text-transform: uppercase;
      margin-right: 6px;
    }

    &:last-child {
      border-bottom: 1px solid #ddd;
    }
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
const Button = styled.button<{ $inactive?: boolean }>`
  padding: 8px 16px;
  background-color: ${(props) =>
    props.$inactive ? '#a1a6ab' : customTheme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: ${(props) => (props.$inactive ? 'default' : 'pointer')};
  opacity: ${(props) => (props.$inactive ? 0.5 : 1)};

  &:hover {
    background-color: ${(props) =>
      props.$inactive ? '#a1a6ab' : customTheme.colors.hover};
  }
`
const FileUploadWrapper = styled.div`
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
  }
`
