import styled from 'styled-components'
import { Outlet } from 'react-router-dom'
import Header from '../header/header'
import Footer from '../footer/footer'

const BaseLayout = () => {
  console.log(window.location.pathname)
  return (
    <FullWrapper>
      <Wrapper>
        {!['/login', '/login/*'].includes(window.location.pathname) && (
          <Header />
        )}
        <ContentWrapper>
          <Outlet />
        </ContentWrapper>
        {!['/login', '/login/*'].includes(window.location.pathname) && (
          <Footer />
        )}
      </Wrapper>
    </FullWrapper>
  )
}

export default BaseLayout

const FullWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`

const Wrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
`

const ContentWrapper = styled.main`
  flex: 1;
  margin: 1rem;

  background-color: #f8f8f9;
  box-shadow: 0 2px 4px rgb(203 203 203 / 10%);
  border-radius: 10px;

  @media (max-width: 768px) {
    padding: 1rem;
  }

  .cl-rootBox {
    margin-top: 10%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
