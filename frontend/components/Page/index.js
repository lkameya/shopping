import Header from "../Header";
import Meta from "../Meta";
import { StyledButton } from "./styles";
import { ThemeProvider, createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  html {
    box-sizing: border-box;
    font-size: 10px;
  }
  *, *:before, *:after {
    box-sizing: inherit;
  }
  body {
    font-family: 'Quicksand', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
  }
`;

const theme = {
  colors: {
    primary: '#0070f3',
  },
}

export default function Page({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <Header />
      <StyledButton>Click Me</StyledButton>
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
}