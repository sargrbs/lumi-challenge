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

const Dashboard = () => {
  const [loading, setLoading] = useState(true)
  const [invoices, setInvoices] = useState<Invoice[]>([])
  const [clientNumber, setClientNumber] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')

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

  const handleFilter = () => {
    fetchInvoices()
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
        <Input
          type="text"
          placeholder="Número do Cliente"
          value={clientNumber}
          onChange={(e) => setClientNumber(e.target.value)}
        />
        <Input
          type="month"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Input
          type="month"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <button onClick={handleFilter}>Filtrar</button>
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
    </DashboardContainer>
  )
}

export default Dashboard

const DashboardContainer = styled.div`
  padding: 20px;
`

const FilterContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const Input = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
`

const CardContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  gap: 15px;
`

const Card = styled.div`
  background-color: #f0f0f0;
  border-radius: 8px;
  padding: 20px;
  width: 23%;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const ChartContainer = styled.div`
  height: 400px;
  margin-bottom: 20px;
`
