import styled from 'styled-components';

export const ItemContainer = styled.div`
  display: flex;
  width: 100%;

  img {
    width: 50%;
    object-fit: contain;
  }

  h2 {
    text-transform: uppercase;
    font-size: 5rem;
  }

  h4 {
    margin: 0;
    font-size: 3.5rem;
    text-align: right;
  }

  hr {
    margin: 0;
  }


  .details {
    width: 100%;
    margin: 0 5rem;
    font-size: 2rem;
    button {
    margin: 3rem 0;
  }

  }
`;
