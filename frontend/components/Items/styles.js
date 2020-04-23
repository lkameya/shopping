import styled from 'styled-components';

const ItemsContainer = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr) );
  grid-gap: 10px;

  @media (min-width: 1025px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr) );
    grid-gap: 30px;
  }
`;

export { ItemsContainer };