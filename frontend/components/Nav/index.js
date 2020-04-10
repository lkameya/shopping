import Link from 'next/link';
import { Container } from './styles';

export default function Nav() {
  return (
    <Container>
      <li>
        <Link href="sell">
          <a>Shop</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>Sell</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>Signup</a>
        </Link>
      </li>
      <li>
        <Link href="/">
          <a>Orders</a>
        </Link>
      </li>
    </Container>
  );
}