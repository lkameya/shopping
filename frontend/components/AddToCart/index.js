import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../../hooks/useCurrentUser';
import StyledButton from '../_Shared/Button';
import ErrorMessage from '../_Shared/ErrorMessage';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

function AddToCart({ id }) {
  const [addToCart, { loading, error }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }]
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
