import styled from 'styled-components'

const Footer = () => {
  return (
    <FooterContainer>
      <p>&copy; 2024 Energy Dashboard. Todos os direitos reservados.</p>
    </FooterContainer>
  )
}

export default Footer

const FooterContainer = styled.footer`
  background-color: #2c3e50;
  color: #ecf0f1;
  padding: 1rem;
  text-align: center;
  margin-top: auto;
`
