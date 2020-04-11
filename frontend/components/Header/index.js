import Link from 'next/link';
import Router from 'next/router';
import NProgress from 'nprogress';
import Nav from "../Nav";
import { Container, Logo } from "./styles";
import Cart from '../Cart.js';

Router.onRouteChangeStart = () => {
  NProgress.start();
};

Router.onRouteChangeComplete = () => {
  NProgress.done();
};

Router.onRouteChangeError = () => {
  NProgress.done();
};

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
      <Cart />
    </Container>
  );
}