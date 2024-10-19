import styled from 'styled-components'
import { customTheme } from '../../../styles/theme'

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Energy Dashboard. Todos os direitos reservados.</p>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
  background-color: ${customTheme.colors.primary};
  color: #ecf0f1;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
`
