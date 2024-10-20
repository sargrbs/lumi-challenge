import { useEffect } from 'react'
import Modal from 'react-modal'
import styled from 'styled-components'
import { customTheme } from '../../../styles/theme'

interface IInvoiceProps {
  isOpen: boolean
  onRequestClose: () => void
  invoice: any
}

const InvoiceModal = ({ isOpen, onRequestClose, invoice }: IInvoiceProps) => {
  useEffect(() => {
    Modal.setAppElement('#root')
  }, [])

  if (!invoice) return null

  const formatDueDate = (dateString: string) => {
    const str = dateString.split('T00')
    return str[0].split('-').reverse().join('/')
  }

  const formattedDueDate = formatDueDate(invoice.invoiceDueDate)

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      contentLabel="Detalhes da Fatura"
      style={{
        overlay: {
          backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          border: 'none',
          background: 'none',
          padding: 0,
        },
      }}
    >
      <Card>
        <Title>Detalhes da Fatura</Title>
        <Field>
          <Label>Mês de Referência:</Label>
          <Value>{invoice.referenceMonth}</Value>
        </Field>
        <Field>
          <Label>Nome do Cliente:</Label>
          <Value>{invoice.clientName}</Value>
        </Field>
        <Field>
          <Label>Número do Cliente:</Label>
          <Value>{invoice.clientNumber}</Value>
        </Field>
        <Field>
          <Label>Número da Instalação:</Label>
          <Value>{invoice.installationNumber}</Value>
        </Field>
        <Field>---</Field>
        <Field>
          <Label>Energia elétrica:</Label>
          <Value>{invoice.electricityQuantity}kWh</Value>
        </Field>
        <Field>
          <Label>Energia SCEE:</Label>
          <Value>{invoice.energySceeeQuantity}kWh</Value>
        </Field>
        <Field>
          <Label>Energia compensada GD I:</Label>
          <Value>{invoice.economyGDIQuantity}kWh</Value>
        </Field>
        <Field>---</Field>
        <Field>
          <Label>Total de Eletricidade:</Label>
          <Value>R$ {invoice.electricityTotal.toFixed(2)}</Value>
        </Field>
        <Field>
          <Label>Total SCEEE Energia:</Label>
          <Value>R$ {invoice.energySceeeTotal.toFixed(2)}</Value>
        </Field>
        <Field>
          <Label>Total GDI Economia:</Label>
          <Value>R$ {invoice.economyGDITotal.toFixed(2)}</Value>
        </Field>
        <Field>
          <Label>Iluminação Pública:</Label>
          <Value>R$ {invoice.publicLighting.toFixed(2)}</Value>
        </Field>
        <Field>---</Field>
        <Field>
          <Label>Consumo Total:</Label>
          <Value>{invoice.totalConsumption}</Value>
        </Field>
        <Field>
          <Label>Custo Total:</Label>
          <Value>R$ {invoice.totalCost.toFixed(2)}</Value>
        </Field>
        <Field>
          <Label>Total sem GD:</Label>
          <Value>R$ {invoice.totalWithoutGD.toFixed(2)}</Value>
        </Field>
        <Field>---</Field>
        <Field>
          <Label>Data de Vencimento:</Label>
          <Value>{formattedDueDate}</Value>
        </Field>
        <Field>
          <Label>Código de Pagamento:</Label>
          <Value>{invoice.paymentCode}</Value>
        </Field>

        <ButtonWrapper>
          <Button onClick={onRequestClose}>Fechar</Button>
        </ButtonWrapper>
      </Card>
    </Modal>
  )
}

export default InvoiceModal

const Card = styled.div`
  background-color: white;
  border-radius: 8px;
  padding: 20px;
  max-width: 500px;
  max-width: 90%;
  position: relative;
  overflow: auto;
  max-height: 80vh;
`

const Title = styled.h2`
  color: #333;
  margin-bottom: 20px;
`

const Field = styled.div`
  margin-bottom: 10px;
`

const Label = styled.span`
  font-weight: bold;
  margin-right: 10px;
`

const Value = styled.span`
  color: #666;
`

const ButtonWrapper = styled.div`
  color: #666;
  display: flex;
  alight-items: center;
  justify-content: center;
  margin: 10px 0;
`
const Button = styled.button`
  padding: 8px 16px;
  background-color: ${customTheme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${customTheme.colors.hover};
  }
`
