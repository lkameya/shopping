import styled from 'styled-components';

export const Container = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  justify-self: end;
  font-size: 2rem;
  text-decoration: none;
  list-style-type: none;
  li {
    text-decoration: none;
    text-transform: uppercase;
  }
  a,
  button {
    padding: 1rem 3rem;
    display: flex;
    align-items: center;
    position: relative;
    text-decoration: none;
    cursor: pointer;
    color: ${props => props.theme.black};
    @media (max-width: 700px) {
      font-size: 2rem;
      padding: 0 10px;
    }
    &:hover,
    &:focus {
      outline: none;
      &:after {
        width: calc(100% - 60px);
      }
    }
  }
  @media (max-width: 1300px) {
    border-top: 1px solid ${props => props.theme.lightgrey};
    width: 100%;
    justify-content: center;
    font-size: 1.5rem;
  }
`;
