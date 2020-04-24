import Link from 'next/link';
import { useMutation } from '@apollo/client';
import { TOGGLE_CART_MUTATION } from '../Cart.js';
import { NavContainer } from './styles';
import Signout from '../Signout';
import CartCount from '../CartCount/index.js';
import { useCurrentUser } from '../../hooks/useCurrentUser.js';

export default function Nav() {
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  const user = useCurrentUser();
  if (!user) return null;
  const { me } = user;
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
          <div onClick={toggleCart}>
            My cart
            <CartCount count={me.cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0)}></CartCount>
          </div>
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
  );
}