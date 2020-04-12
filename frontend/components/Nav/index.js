import Link from 'next/link';
import { Mutation } from 'react-apollo';
import { TOGGLE_CART_MUTATION } from '../Cart.js';
import { Container } from './styles';
import User from '../User';
import Signout from '../Signout';
import CartCount from '../CartCount/index.js';

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
                  <Link href="/orders">
                    <a>Orders</a>
                  </Link>
                </li>
                <li>
                  <Signout />
                  <Mutation mutation={TOGGLE_CART_MUTATION}>
                    {(toggleCart) => (
                      <button onClick={toggleCart}>
                        My Cart
                        <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount>
                      </button>
                    )}
                  </Mutation>
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