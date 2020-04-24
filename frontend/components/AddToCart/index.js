import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User';
import StyledButton from '../_Shared/Button';

const ADD_TO_CART_MUTATION = gql`
  mutation addToCart($id: ID!) {
    addToCart(id: $id) {
      id
      quantity
    }
  }
`;

function AddToCart({ id }) {
  const [addToCart, { loading }] = useMutation(ADD_TO_CART_MUTATION, {
    variables: { id },
    refetchQueries: [{ query: CURRENT_USER_QUERY }]
  });

  return (
    <StyledButton disabled={loading} onClick={addToCart}>
      Add{loading && 'ing'} to cart
    </StyledButton>
  );
}

export default AddToCart;
export { ADD_TO_CART_MUTATION };
