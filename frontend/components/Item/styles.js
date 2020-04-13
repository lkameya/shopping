import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  box-shadow: ${props => props.theme.bs};
  position: relative;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  max-height: 300px;
  img {
    width: 100%;
    object-fit: fit;
  }
  p {
    font-size: 1.4rem;
    line-height: 2;
    font-weight: 500;
    flex-grow: 1;
    padding: 0 3rem;
  }
  /* .buttonList {
    display: grid;
    width: 100%;
    border-top: 1px solid ${props => props.theme.lightgrey};
    grid-template-columns: repeat(auto-fit, minmax(100px, 1fr));
    grid-gap: 1px;
    background: ${props => props.theme.lightgrey};
    & > * {
      background: white;
      border: 0;
      font-family: 'radnika_next';
      font-size: 1rem;
      padding: 1rem;
    }
  } */
`;

