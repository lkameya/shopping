import styled, { keyframes } from 'styled-components';

const loading = keyframes`
  from {
    background-position: 0 0;
    /* rotate: 0; */
  }

  to {
    background-position: 100% 100%;
    /* rotate: 360deg; */
  }
`;

const Form = styled.form`
  box-shadow: 0 0 5px 3px rgba(0, 0, 0, 0.05);
  background: rgba(0, 0, 0, 0.02);
  padding: 5rem;
  font-size: 2rem;
  line-height: 1.5;
  label {
    display: block;
    font-size: 1.5rem;
    margin-bottom: 2rem;

  }
  input,
  textarea,
  select {
    width: 100%;
    padding: 0.5rem;
    font-size: 2rem;
    height: 50px;
    
  }
  button,
  input[type='submit'] {
    width: 100%;
    background: ${props => props.theme.colors.darkblue};
    color: white;
    border: 0;
    font-size: 2rem;
    font-weight: 600;
    padding: 1rem 1.2rem;
    cursor: pointer;
  }
  fieldset {
    border: 0;
    padding: 0;

    &[disabled] {
      opacity: 0.5;
    }
    &::before {
      height: 2px;
      content: '';
      display: block;
      background-image: linear-gradient(to right, #303342 0%, #DEDEE3 50%, #303342 100%);
    }
    &[aria-busy='true']::before {
      background-size: 50% auto;
      animation: ${loading} 0.5s linear infinite;
    }
  }
  h2 {
    text-align:center;
  }
`;


export default Form;
