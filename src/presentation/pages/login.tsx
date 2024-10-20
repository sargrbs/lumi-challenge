import { SignIn } from '@clerk/clerk-react'
import styled from 'styled-components'

const Login = () => {
  return (
    <LoginContainer>
      <LoginCard>
        <Title>Entre na sua conta</Title>
        <StyledSignIn
          path="/login"
          routing="path"
          signUpUrl="/signup"
          fallbackRedirectUrl="/home"
        />
      </LoginCard>
    </LoginContainer>
  )
}

export default Login

const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f2f5;
  padding: 20px;
`

const LoginCard = styled.div`
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 40px;
  width: 100%;
  max-width: 400px;
`

const Title = styled.h1`
  color: #1a202c;
  font-size: 24px;
  font-weight: 600;
  text-align: center;
  margin-bottom: 24px;
`

const StyledSignIn = styled(SignIn)`
  .cl-card {
    background-color: transparent;
    border: none;
    box-shadow: none;
    padding: 0;
  }

  .cl-formButtonPrimary {
    background-color: #4a90e2;
    &:hover {
      background-color: #3a7bc8;
    }
  }

  .cl-formField {
    margin-bottom: 16px;
  }

  @media (max-width: 480px) {
    .cl-card {
      padding: 0;
    }
  }
`
