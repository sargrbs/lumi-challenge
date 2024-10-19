import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <HeaderContainer>
      <Nav>
        <StyledLink to="/">
          <Logo>Energy Dashboard</Logo>
        </StyledLink>
        <MenuList>
          <MenuItem>
            <StyledLink to="/dashboard">Dashboard</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/invoices">Faturas</StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/invoices-download">Download</StyledLink>
          </MenuItem>
        </MenuList>
      </Nav>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  background-color: #2c3e50;
  padding: 1rem 2rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`

const Nav = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.h1`
  color: #ecf0f1;
  margin: 0;
  font-size: 1.5rem;
`

const MenuList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;
`

const MenuItem = styled.li`
  margin-left: 1rem;
`

const StyledLink = styled(Link)`
  color: #ecf0f1;
  text-decoration: none;
  padding: 0.5rem 1rem;
  border-radius: 4px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #34495e;
  }
`
