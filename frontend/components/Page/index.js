import Header from "../Header";
import Meta from "../Meta";
import { StyledButton } from "./styles";
import { ThemeProvider } from 'styled-components'

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
    </ThemeProvider>
  );
}