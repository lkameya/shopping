import styled from 'styled-components';

export const Container = styled.header`
  .bar {
    border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
    display: grid;
    grid-template-columns: auto 1fr;
    justify-content: space-between;
    align-items: stretch;
    @media (max-width: 1300px) {
      grid-template-columns: 1fr;
      justify-content: center;
    }
  }
  .sub-bar {
    display: grid;
    grid-template-columns: 1fr auto;
    border-bottom: 1px solid ${props => props.theme.colors.lightgrey};
  }
`;

export const Logo = styled.h1`
  font-size: 4rem;
  font-family: 'Poiret One', cursive;
  margin-left: 2rem;
  position: relative;
  z-index: 2;
  a {
    padding: 0.5rem 1rem;
    color: ${props => props.theme.colors.black};
    text-transform: uppercase;
    text-decoration: none;
  }
  @media (max-width: 1300px) {
    margin: 0;
    text-align: center;
  }
`;
