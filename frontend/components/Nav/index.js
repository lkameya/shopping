import Link from 'next/link';
import { Mutation } from '@apollo/react-components';
import { TOGGLE_CART_MUTATION } from '../Cart.js';
import { NavContainer } from './styles';
import User from '../User';
import Signout from '../Signout';
import CartCount from '../CartCount/index.js';

export default function Nav() {
  return (
    <User>
      {({ data }) => {
        const me = data ? data.me : null
        return (
          <NavContainer>
            <div>
              <Link href="/items">
                <a>Shop</a>
              </Link>
            </div>
            {me && (
              <>
                <div>
                  <Link href="/sell">
                    <a>Sell</a>
                  </Link>
                </div>
                <div>
                  <Link href="/orders">
                    <a>Orders</a>
                  </Link>
                </div>
                <div>
                  <Signout />

                </div>

                <Mutation mutation={TOGGLE_CART_MUTATION}>
                  {(toggleCart) => (
                    <div onClick={toggleCart}>
                      My cart
                      <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount>
                    </div>
                  )}
                </Mutation>

              </>
            )}
            {!me && (
              <div>
                <Link href="/login">
                  <a>Sign in</a>
                </Link>
              </div>
            )}
          </NavContainer>
        )
      }}
    </User>
  );
}