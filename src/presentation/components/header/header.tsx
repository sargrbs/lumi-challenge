import { useState } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { customTheme } from '../../../styles/theme'

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  return (
    <HeaderContainer>
      <Nav>
        <StyledLink to="/">
          <Logo>Energy Dashboard</Logo>
        </StyledLink>
        <MenuToggle onClick={toggleMenu}>
          <Menu size={24} color="#ecf0f1" />
        </MenuToggle>
        <MenuList $isOpen={isMenuOpen}>
          <MenuItem>
            <StyledLink to="/dashboard" onClick={toggleMenu}>
              Dashboard
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/invoices" onClick={toggleMenu}>
              Faturas
            </StyledLink>
          </MenuItem>
          <MenuItem>
            <StyledLink to="/invoices-download" onClick={toggleMenu}>
              Download
            </StyledLink>
          </MenuItem>
        </MenuList>
      </Nav>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  background-color: ${customTheme.colors.primary};
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

const MenuToggle = styled.button`
  display: none;
  background: none;
  border: none;
  cursor: pointer;

  @media (max-width: 768px) {
    display: block;
  }
`

const MenuList = styled.ul<any>`
  list-style-type: none;
  padding: 0;
  margin: 0;
  display: flex;

  @media (max-width: 768px) {
    display: ${({ $isOpen }) => ($isOpen ? 'flex' : 'none')};
    flex-direction: column;
    position: absolute;
    top: 70px;
    right: 0;
    background-color: #2c3e50;
    padding: 1rem;
  }
`

const MenuItem = styled.li`
  margin-left: 1rem;

  @media (max-width: 768px) {
    margin: 0.5rem 0;
  }
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
