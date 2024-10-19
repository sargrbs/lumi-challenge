import { useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import {
  getInvoicePerPage,
  deleteInvoiceById,
} from '../../main/usecases/invoice/invoice-factory'
import { Invoice } from '../../domain/models/invoice.model'
import { showToast } from '../components/toast-notification'
import SimpleLoading from '../components/loadings/simple'
import FileUpload from '../components/file-upload'
import { customTheme } from '../../styles/theme'
const InvoiceLibrary = () => {
  const [loading, setLoading] = useState(true)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [clientNumber, setClientNumber] = useState('')
  const [referenceMonth, setReferenceMonth] = useState('')
  const [clientNumberFilter, setClientNumberFilter] = useState<
    string | boolean
  >(false)
  const [referenceMonthFilter, setReferenceMonthFilter] = useState<
    string | boolean
  >(false)

  const fetchInvoices = useCallback(async () => {
    try {
      setLoading(true)
      const response = await getInvoicePerPage(
        currentPage,
        clientNumberFilter,
        referenceMonthFilter
      ).load()
      setInvoices(response.data)
      setTotalPages(response.pagination.totalPages)
      setLoading(false)
    } catch (error) {
      console.error('Error fetching invoices:', error)
      setLoading(false)
    }
  }, [currentPage, clientNumberFilter, referenceMonthFilter])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  const handleSearch = async () => {
    const number = clientNumber || 'false'
    const month = referenceMonth || 'false'

    setClientNumberFilter(number)
    setReferenceMonthFilter(month)
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

  const realoadInvoices = async () => {
    fetchInvoices()
  }

  if (loading) return <SimpleLoading />

  return (
    <Container>
      <h1>Faturas</h1>

      <Header>
        <SearchContainer>
          <FormGroup>
            <LabelForm>Número do Cliente</LabelForm>
            <Input
              type="text"
              placeholder="Número do Cliente"
              value={clientNumber}
              onChange={(e) => setClientNumber(e.target.value)}
            />
          </FormGroup>

          <FormGroup>
            <LabelForm>Mês de Referência</LabelForm>
            <Input
              type="month"
              value={referenceMonth}
              onChange={(e) => setReferenceMonth(e.target.value)}
            />
          </FormGroup>

          <Button onClick={handleSearch}>Buscar</Button>
        </SearchContainer>

        <FileUploadWrapper>
          <FileUpload onUpload={realoadInvoices} />
        </FileUploadWrapper>
      </Header>

      {invoices.length > 0 ? (
        <TableWrapper>
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
              {invoices.map((invoice, index) => (
                <Tr key={invoice.id} $isEven={index % 2 === 0}>
                  <Td data-label="Nome do Cliente">{invoice.clientName}</Td>
                  <Td data-label="Número do Cliente">{invoice.clientNumber}</Td>
                  <Td data-label="Mês Referência">{invoice.referenceMonth}</Td>
                  <Td data-label="Total">R${invoice.totalCost}</Td>
                  <Td>
                    <Button onClick={() => handleDelete(invoice.id!)}>
                      Excluir
                    </Button>
                  </Td>
                </Tr>
              ))}
            </tbody>
          </Table>
        </TableWrapper>
      ) : (
        <p>Nenhuma fatura encontrada.</p>
      )}

      {totalPages > 1 && (
        <Pagination>
          <Button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            $inactive={currentPage === 1}
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
            $inactive={currentPage === totalPages}
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
  max-width: 1200px;
  margin: 0 auto;
`

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-bottom: 20px;

  @media (min-width: 768px) {
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
  }
`

const SearchContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  align-items: end;

  @media (min-width: 768px) {
    flex-direction: row;
  }
`

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  width: 100%;
`

const LabelForm = styled.span`
  padding: 10px;
`

const Input = styled.input`
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  @media (min-width: 768px) {
    width: auto;
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
  max-height: 40px;

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

const TableWrapper = styled.div`
  overflow-x: auto;
`

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  border: 1px solid #dee2e6;

  @media (max-width: 767px) {
    thead {
      display: none;
    }
  }
`

const Tr = styled.tr<any>`
  background-color: ${(props) => (props.$isEven ? '#f2f2f2' : 'white')};
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

  @media (max-width: 767px) {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 95%;
    padding: 8px 12px;

    &:before {
      content: attr(data-label);
      font-weight: bold;
      margin-right: 10px;
    }
  }
`

const Pagination = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  gap: 15px;
  flex-wrap: wrap;
`
