import React from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import CartContainer from './styles';
import CloseButton from '../_Shared/CloseButton';
import CartItem from '../CartItem';
import calcTotalPrice from '../../lib/calcTotalPrice';
import formatMoney from '../../lib/formatMoney';
import Checkout from '../Checkout';
import StyledButton from '../_Shared/Button';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const LOCAL_STATE_QUERY = gql`
  query {
    cartOpen @client
  }
`;

const TOGGLE_CART_MUTATION = gql`
  mutation {
    toggleCart @client
  }
`;

function Cart() {
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  const { data } = useQuery(LOCAL_STATE_QUERY);
  const user = useCurrentUser();

  if (!user) return null;
  const { me } = user;
  if (!me) return null;
  return (
    <CartContainer open={data.cartOpen}>
      <header>
        <CloseButton onClick={toggleCart} title="close">
          &times;
        </CloseButton>
        <div>{me.name}'s Cart</div>
        <p>
          You Have {me.cart.length} Item{me.cart.length === 1 ? '' : 's'} in your cart.
        </p>
      </header>
      <ul>{me.cart.map(cartItem => <CartItem key={cartItem.id} cartItem={cartItem} />)}</ul>
      <footer>
        <p>Total: {formatMoney(calcTotalPrice(me.cart))}</p>
        {me.cart.length && (
          <Checkout>
            <StyledButton>Checkout</StyledButton>
          </Checkout>
        )}
      </footer>
    </CartContainer>
  )
}

export default Cart;
export { LOCAL_STATE_QUERY, TOGGLE_CART_MUTATION };
