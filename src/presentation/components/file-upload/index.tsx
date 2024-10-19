import { useState } from 'react'
import styled from 'styled-components'
import { createInvoice } from '../../../main/usecases/invoice/invoice-factory'
import { showToast } from '../toast-notification'
import { customTheme } from '../../../styles/theme'

const FileUpload: React.FC<{ onUpload: () => void }> = ({ onUpload }) => {
  const [file, setFile] = useState<File | null>(null)
  const [openForm, setOpenForm] = useState(false)

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0])
    }
  }

  const handleUpload = async () => {
    if (!file) {
      showToast('Por favor, selecione um arquivo', 'error')
      return
    }

    const formData = new FormData()
    formData.append('invoice', file)

    try {
      await createInvoice().post(formData)
      showToast('Fatura enviada com sucesso', 'success')
      setFile(null)
      if (document.querySelector<HTMLInputElement>('input[type="file"]')) {
        ;(
          document.querySelector<HTMLInputElement>(
            'input[type="file"]'
          ) as HTMLInputElement
        ).value = ''
      }
      onUpload()
    } catch (error) {
      console.error('Erro ao enviar a fatura:', error)
      showToast(
        `Erro ao enviar a fatura: ${error instanceof Error ? error.message : 'Erro desconhecido'}`,
        'error'
      )
    }
  }

  if (!openForm) {
    return (
      <Button
        onClick={() => {
          setOpenForm(true)
        }}
      >
        Importar Fatura
      </Button>
    )
  } else {
    return (
      <FormWrapper>
        <input type="file" onChange={handleFileChange} accept=".pdf" />
        <Button onClick={handleUpload} disabled={!file} $bgdisabled={!file}>
          Upload Fatura
        </Button>
      </FormWrapper>
    )
  }
}

export default FileUpload

const FormWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`

const Button = styled.button<any>`
  padding: 8px 16px;
  background-color: ${(props) =>
    props.$bgdisabled
      ? customTheme.colors.hover
      : customTheme.colors.secondary};
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: ${customTheme.colors.hover};
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
