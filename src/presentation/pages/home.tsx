import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <HomeContainer>
      <WelcomeTitle>Bem-vindo ao Energy Dashboard</WelcomeTitle>
      <Subtitle>
        Gerencie suas faturas de energia e acompanhe seu consumo de forma
        eficiente.
      </Subtitle>

      <ActionsContainer>
        <ActionCard>
          <ActionTitle>Importar Fatura</ActionTitle>
          <ActionDescription>
            Adicione novas faturas para manter seus dados atualizados.
          </ActionDescription>
          <ActionLink to="/invoices">Importar Fatura</ActionLink>
        </ActionCard>

        <ActionCard>
          <ActionTitle>Acessar Dashboard</ActionTitle>
          <ActionDescription>
            Visualize gráficos e estatísticas sobre seu consumo de energia.
          </ActionDescription>
          <ActionLink to="/dashboard">Ver Dashboard</ActionLink>
        </ActionCard>
      </ActionsContainer>
    </HomeContainer>
  )
}

export default Home

const HomeContainer = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`

const WelcomeTitle = styled.h1`
  color: #2c3e50;
  font-size: 2.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 2rem;
  }
`

const Subtitle = styled.p`
  color: #34495e;
  font-size: 1.2rem;
  margin-bottom: 2rem;

  @media (max-width: 768px) {
    font-size: 1rem;
  }
`

const ActionsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 2rem;
  margin-top: 2rem;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    gap: 1rem;
  }
`

const ActionCard = styled.div`
  background-color: #ecf0f1;
  border-radius: 8px;
  padding: 1.5rem;
  width: 250px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }

  @media (max-width: 768px) {
    width: 100%;
    max-width: 300px;
  }
`

const ActionTitle = styled.h2`
  color: #2c3e50;
  font-size: 1.5rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 1.3rem;
  }
`

const ActionDescription = styled.p`
  color: #7f8c8d;
  font-size: 1rem;
  margin-bottom: 1rem;

  @media (max-width: 768px) {
    font-size: 0.9rem;
  }
`

const ActionLink = styled(Link)`
  display: inline-block;
  background-color: #3498db;
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  text-decoration: none;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #2980b9;
  }
`
