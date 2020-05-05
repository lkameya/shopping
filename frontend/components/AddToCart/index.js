import { gql, useMutation, useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../hooks/useCurrentUser';
import StyledButton from '../_Shared/Button';
import ErrorMessage from '../_Shared/ErrorMessage';
import { TOGGLE_CART_MUTATION, LOCAL_STATE_QUERY } from '../Cart.js';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

function AddToCart({ id }) {
  const { data } = useQuery(LOCAL_STATE_QUERY);
  const [toggleCart] = useMutation(TOGGLE_CART_MUTATION);
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => !data.cartOpen ? toggleCart() : null,
  });


  return (
    <>
      <StyledButton disabled={loading} onClick={addToCart}>
        Add{loading && 'ing'} to cart
      </StyledButton>
      {error && <ErrorMessage error={error} />}
    </>
  );
}

export default AddToCart;
export { ADD_TO_CART_MUTATION };
