import styled from 'styled-components'
import Header from '../header/header'
import Footer from '../footer/footer'
import { Outlet } from 'react-router-dom'

const BaseLayout = () => {
  return (
    <>
      <FullWrapper>
        <Wrapper>
          <Header />
          <ContentWrapper>
            <Outlet />
          </ContentWrapper>
          <Footer />
        </Wrapper>
      </FullWrapper>
    </>
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
  padding: 2rem;
`
