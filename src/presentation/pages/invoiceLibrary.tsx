import { useState, useEffect } from 'react'
import styled from 'styled-components'
import {
  getInvoicePerPage,
  getInvoiceByClient,
  deleteInvoiceById,
} from '../../main/usecases/invoice/invoice-factory'
import { Invoice } from '../../domain/models/invoice.model'
import { showToast } from '../components/toast-notification'
import SimpleLoading from '../components/loadings/simple'
import FileUpload from '../components/file-upload'

const InvoiceLibrary = () => {
  const [loading, setLoading] = useState(true)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [clientNumber, setClientNumber] = useState('')
  const [referenceMonth, setReferenceMonth] = useState('')

  useEffect(() => {
    ;(async () => {
      try {
        setLoading(true)
        const response = await getInvoicePerPage(currentPage).load()
        setInvoices(response.data)
        setTotalPages(response.pagination.totalPages)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching invoices:', error)
      }
    })()
  }, [currentPage])

  const fetchInvoices = async () => {
    try {
      setLoading(true)
      const response = await getInvoicePerPage(currentPage).load()
      setInvoices(response.data)
      setTotalPages(response.pagination.totalPages)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    }
  }

  const handleSearch = async () => {
    try {
      if (clientNumber) {
        const response = await getInvoiceByClient(clientNumber).load()
        setInvoices(response.data)
      } else {
        fetchInvoices()
      }
    } catch (error) {
      console.error('Error searching invoices:', error)
    }
  }

  const handleDelete = async (invoiceId: string) => {
    try {
      await deleteInvoiceById(invoiceId).delete()
      showToast('Fatura excluída com sucesso', 'success')
      fetchInvoices()
    } catch (error) {
      console.error('Error deleting invoice:', error)
    }
  }

  if (loading) return <SimpleLoading />

  return (
    <Container>
      <h1>Faturas</h1>

      <Header>
        <SearchContainer>
          <Input
            type="text"
            placeholder="Número do Cliente"
            value={clientNumber}
            onChange={(e) => setClientNumber(e.target.value)}
          />
          <Input
            type="month"
            value={referenceMonth}
            onChange={(e) => setReferenceMonth(e.target.value)}
          />
          <Button onClick={handleSearch}>Buscar</Button>
        </SearchContainer>

        <FileUpload />
      </Header>

      {invoices.length > 0 ? (
        <Table>
          <thead>
            <tr>
              <Th>Nome do Cliente</Th>
              <Th>Número do Cliente</Th>
              <Th>Mês Referência</Th>
              <Th>Total</Th>
              <Th>Ações</Th>
            </tr>
          </thead>
          <tbody>
            {invoices.map((invoice) => (
              <tr key={invoice.id}>
                <Td>{invoice.clientName}</Td>
                <Td>{invoice.clientNumber}</Td>
                <Td>{invoice.referenceMonth}</Td>
                <Td>{invoice.totalCost}</Td>
                <Td>
                  <Button onClick={() => handleDelete(invoice.id!)}>
                    Excluir
                  </Button>
                </Td>
              </tr>
            ))}
          </tbody>
        </Table>
      ) : (
        <p>Nenhuma fatura encontrada.</p>
      )}

      {invoices.length > 0 && (
        <Pagination>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            bgcolor={currentPage === 1 ? 'true' : 'false'}
          >
            Anterior
          </Button>
          <span>
            {currentPage} / {totalPages}
          </span>
          <Button
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
            bgcolor={currentPage === totalPages ? 'true' : 'false'}
          >
            Próxima
          </Button>
        </Pagination>
      )}
    </Container>
  )
}

export default InvoiceLibrary

const Container = styled.div`
  padding: 20px;
`

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`

const SearchContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
`

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

const Button = styled.button<any>`
  padding: 8px 16px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  ${(props) =>
    props.bgcolor &&
    `
    background-color: #a1a6ab;
    opacity: 0.5;
    &:hover {
      background-color: #a1a6ab;
    }
  `}
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
`

const Th = styled.th`
  background-color: #f8f9fa;
  padding: 12px;
  text-align: left;
  border-bottom: 2px solid #dee2e6;
`

const Td = styled.td`
  padding: 12px;
  border-bottom: 1px solid #dee2e6;
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 15px;
`
