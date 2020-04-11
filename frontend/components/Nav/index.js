import Link from 'next/link';
import { Container } from './styles';
import User from '../User';
import Signout from '../Signout';

export default function Nav() {
  return (
    <User>
      {({ data }) => {
        const me = data ? data.me : null
        return (
          <Container>
            <li>
              <Link href="/items">
                <a>Shop</a>
              </Link>
            </li>
            {me && (
              <>
                <li>
                  <Link href="/sell">
                    <a>Sell</a>
                  </Link>
                </li>
                <li>
                  <Link href="/">
                    <a>Orders</a>
                  </Link>
                </li>
                <li>
                  <Signout />
                </li>
              </>
            )}
            {!me && (
              <li>
                <Link href="/signup">
                  <a>Sign In</a>
                </Link>
              </li>
            )}
          </Container>
        )
      }}
    </User>
  );
}