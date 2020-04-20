import styled from 'styled-components';

const StyledButton = styled.button`
  background: ${({ theme }) => theme.colors.darkblue};
  font-family: 'Poppins', sans-serif;
  font-weight: 300;
  color: white;
  border-radius: 2px;
  text-transform: lowercase;
  font-size: 1.2rem;
  width: 200px;
  padding: .8rem 7rem .8rem 0;
  letter-spacing: .1rem;
  transition: all 0.5s;
  display: block;

  cursor: pointer;

  &[disabled] {
    opacity: 0.5;
  }
`;

export default StyledButton;
