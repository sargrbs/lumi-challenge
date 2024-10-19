import styled, { keyframes } from 'styled-components'

const SimpleLoading = () => {
  return (
    <Container>
      <Spinner style={{ borderLeftColor: '#2c3e50' }} />
    </Container>
  )
}

const rotate = keyframes`
  to {
    transform: rotate(360deg);
  }
`

const Container = styled.div`
  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;
`

const Spinner = styled.div`
  border: 8px solid transparent;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${rotate} 1s linear infinite;
`

export default SimpleLoading
