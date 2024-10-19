import { useEffect, useState, useCallback } from 'react'
import styled from 'styled-components'
import { findInvoicesBy } from '../../main/usecases/invoice/invoice-factory'
import SimpleLoading from '../components/loadings/simple'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts'
import { Invoice } from '../../domain/models/invoice.model'
import { customTheme } from '../../styles/theme'

interface ClientInfo {
  [key: string]: {
    name: string
    clientNumber: string
  }
}

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [clientNumber, setClientNumber] = useState('')
  const [clientInfo, setClientInfo] = useState({})
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [endDateFilter, setEndDateFilter] = useState('')
  const [clientNumberFilter, setClientNumberFilter] = useState('')
  const [startDateFilter, setStartDateFilter] = useState('')

  const fetchInvoices = useCallback(async () => {
    setLoading(true)
    try {
      const response = await findInvoicesBy().post({
        clientNumber,
        startDate,
        endDate,
      })
      setInvoices(response)
    } catch (error) {
      console.error('Error fetching invoices:', error)
    } finally {
      setLoading(false)
    }
  }, [clientNumber, startDate, endDate])

  useEffect(() => {
    fetchInvoices()
  }, [fetchInvoices])

  useEffect(() => {
    const result: ClientInfo = invoices.reduce((acc, invoice) => {
      if (!acc[invoice.clientNumber]) {
        acc[invoice.clientNumber] = {
          name: invoice.clientName,
          clientNumber: invoice.clientNumber,
        }
      }
      return acc
    }, {} as ClientInfo)

    setClientInfo(result)
  }, [invoices])

  const handleFilter = () => {
    const number = clientNumberFilter
    const start = startDateFilter
    const end = endDateFilter

    setClientNumber(number)
    setStartDate(start)
    setEndDate(end)
  }

  const calculateTotals = () => {
    return invoices.reduce(
      (acc, invoice) => ({
        totalConsumption: acc.totalConsumption + invoice.totalConsumption,
        totalCompensated: acc.totalCompensated + invoice.economyGDIQuantity,
        totalWithoutGD: acc.totalWithoutGD + invoice.totalWithoutGD,
        totalSavings: acc.totalSavings + invoice.economyGDITotal,
      }),
      {
        totalConsumption: 0,
        totalCompensated: 0,
        totalWithoutGD: 0,
        totalSavings: 0,
      }
    )
  }

  const totals = calculateTotals()

  if (loading) return <SimpleLoading />

  return (
    <DashboardContainer>
      <FilterContainer>
        <FormGroup>
          <LabelForm>Número do Cliente</LabelForm>
          <Input
            type="text"
            placeholder="Número do Cliente"
            value={clientNumberFilter}
            onChange={(e) => setClientNumberFilter(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <LabelForm>Data Inicial</LabelForm>
          <Input
            type="month"
            value={startDateFilter}
            onChange={(e) => setStartDateFilter(e.target.value)}
          />
        </FormGroup>

        <FormGroup>
          <LabelForm>Data Final</LabelForm>
          <Input
            type="month"
            value={endDateFilter}
            onChange={(e) => setEndDateFilter(e.target.value)}
          />
        </FormGroup>

        <FilterButton onClick={handleFilter}>Filtrar</FilterButton>
      </FilterContainer>

      <CardContainer>
        <Card>
          <h3>Consumo Total</h3>
          <p>{totals.totalConsumption.toFixed(2)} kWh</p>
        </Card>
        <Card>
          <h3>Energia Compensada</h3>
          <p>{totals.totalCompensated.toFixed(2)} kWh</p>
        </Card>
        <Card>
          <h3>Valor Total sem GD</h3>
          <p>R$ {totals.totalWithoutGD.toFixed(2)}</p>
        </Card>
        <Card>
          <h3>Economia GD</h3>
          <p>R$ {totals.totalSavings.toFixed(2)}</p>
        </Card>
      </CardContainer>

      <ChartContainer>
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={invoices}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="referenceMonth" />
            <YAxis yAxisId="left" />
            <YAxis yAxisId="right" orientation="right" />
            <Tooltip />
            <Legend />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="totalConsumption"
              stroke="#8884d8"
              name="Consumo de Energia"
            />
            <Line
              yAxisId="left"
              type="monotone"
              dataKey="economyGDIQuantity"
              stroke="#82ca9d"
              name="Energia Compensada"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="totalWithoutGD"
              stroke="#ffc658"
              name="Valor sem GD"
            />
            <Line
              yAxisId="right"
              type="monotone"
              dataKey="economyGDITotal"
              stroke="#ff7300"
              name="Economia GD"
            />
          </LineChart>
        </ResponsiveContainer>
      </ChartContainer>

      <ClientCard>
        {Object.values(clientInfo).map((client: any) => (
          <Details key={client.clientNumber}>
            <h3>{client.name}</h3>
            <h3>Nº DO CLIENTE : {client.clientNumber}</h3>
          </Details>
        ))}
      </ClientCard>
    </DashboardContainer>
  )
}

export default Dashboard

const DashboardContainer = styled.div`
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
`

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  align-items: end;

  @media (max-width: 768px) {
    flex-direction: column;
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
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  flex: 1;
  min-width: 120px;

  @media (max-width: 768px) {
    width: 100%;
  }
`

const FilterButton = styled.button`
  padding: 10px 20px;
  background-color: ${customTheme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  max-height: 40px;

  &:hover {
    background-color: ${customTheme.colors.hover};
  }

  @media (max-width: 768px) {
    width: 100%;
  }
`

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
`

const Card = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);

  h3 {
    margin-top: 0;
    font-size: 1rem;
  }

  p {
    font-size: 1.2rem;
    font-weight: bold;
    margin-bottom: 0;
  }
`

const ChartContainer = styled.div`
  height: 400px;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    height: 300px;
  }
`
const ClientCard = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 15px;
  max-height: 500px;
  overflow-y: auto;
`
const Details = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`
