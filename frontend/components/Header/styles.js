import styled from 'styled-components';

export const Container = styled.header`
  margin: 0;
  text-align: center;
  flex-direction: column;

  @media (min-width: 1025px) {
    font-size: 1.4rem;
    background-color: #fff;
    display: flex;
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
  }
`;

export const BarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  flex-grow: 1;
  flex-direction: column-reverse;
  margin: 1rem 0;

  @media (min-width: 1025px) {
    font-size: 1.4rem;
    background-color: #fff;
    display: flex;
    flex-direction: row;
  }
`;

export const Logo = styled.h1`
  font-size: 4rem;
  a {
    padding: 0.5rem 3rem;
    color: ${props => props.theme.colors.black};
    text-transform: lowercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;
