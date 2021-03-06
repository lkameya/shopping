import styled from 'styled-components';

export const Container = styled.div`
  background: white;
  box-shadow: ${props => props.theme.bs};
  position: relative;
  border: 1px solid transparent;
  display: flex;
  flex-direction: column;
  max-width: 300px;
  max-height: 300px;
  cursor: pointer;

  &:hover {
    border: 1px solid black;
  }

  img {
    height: 200px;
    &:hover {
      opacity: 0.5;
    }
  }
  p {
    font-family: Helvetica, Arial, sans-serif;
    font-size: 1.4rem;
    line-height: 2;
    font-weight: 500;
    flex-grow: 1;
  }

  .priceHover {
    position: absolute;
    padding: .4rem .7rem;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 10;
  }

  span {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    font-size: 3rem;
    z-index: 20;
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

