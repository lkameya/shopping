import styled from 'styled-components';

export const Container = styled.header`
  font-size: 1.4rem;
  background-color: #fff;
  display: flex;
  //position: fixed;
  justify-content: space-between;
  align-items: center;
`;

export const Logo = styled.h1`
  font-size: 4rem;
  a {
    padding: 0.5rem 1rem;
    color: ${props => props.theme.colors.black};
    text-transform: lowercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;
