import Header from "../Header";
import Meta from "../Meta";
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
    font-family: 'Poppins', sans-serif;
    padding: 0;
    margin: 0;
    font-size: 1.5rem;
  }
`;

const theme = {
  colors: {
    black: '#101010',
    darkblue: '#303342',
    lightgrey: '#DEDEE3',
    darkgrey: '#85868D',
    white: '#FFFFFF',
  },
}

export default function Page({ children }) {
  return (
    <ThemeProvider theme={theme}>
      <Meta />
      <Header />
      {children}
      <GlobalStyle />
    </ThemeProvider>
  );
}