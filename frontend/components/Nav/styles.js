import styled from 'styled-components';

export const NavContainer = styled.nav`
  display: flex;
  list-style: none;
  align-items: center;
  align-self: stretch;
  justify-content: space-between;

  div{
    position:relative;
    padding: 0 2rem;
    cursor: pointer;
    display:flex;
    align-items:center;
    height:100%;


    a {
      text-decoration: none;
      display: flex;
    }
  }
`;
