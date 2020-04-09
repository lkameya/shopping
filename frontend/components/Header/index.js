import Link from 'next/link';
import Nav from "../Nav";
import { Container, Logo } from "./styles";

export default function Header() {
  return (
    <Container>
      <div className="bar">
        <Logo>
          <Link href="/">
            <a>wears</a>
          </Link>
        </Logo>
        <Nav />
      </div>
      <div className="sub-bar">
        <p>Search</p>
      </div>
      <div>Cart</div>
    </Container>
  );
}