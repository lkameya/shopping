import React from 'react';
import { Mutation } from '@apollo/react-components';
import PropTypes from 'prop-types';
import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User';
import { BigButton } from './styles';

const REMOVE_FROM_CART_MUTATION = gql`
  mutation removeFromCart($id: ID!) {
    removeFromCart(id: $id) {
      id
    }
  }
`;

RemoveFromCart.propTypes = {
  id: PropTypes.string.isRequired,
};

function RemoveFromCart({ id }) {
  const [removeFromCart, { loading, error }] = useMutation(REMOVE_FROM_CART_MUTATION, {
    variables: { id },
    // TODO not working because data.me.cart is ready only;
    update(cache, payload) {
      const data = cache.readQuery({ query: CURRENT_USER_QUERY });
      const cartItemId = payload.data.removeFromCart.id;
      data.me.cart = data.me.cart.filter(cartItem => cartItem.id !== cartItemId);
      cache.writeQuery({ query: CURRENT_USER_QUERY, data });
    },
    optimisticResponse: {
      __typename: 'Mutation',
      removeFromCart: {
        __typename: 'CartItem',
        id,
      }
    },
  })

  return (
    <BigButton
      disabled={loading}
      onClick={() => {
        removeFromCart().catch(err => alert(err.message));
      }}
      title="Delete Item"
    >
      &times;
    </BigButton>
  );
}

export default RemoveFromCart;
export { REMOVE_FROM_CART_MUTATION };