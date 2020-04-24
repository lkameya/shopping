import StripeCheckout from 'react-stripe-checkout';
import { gql, useMutation } from '@apollo/client';
import Router from 'next/router';
import NProgress from 'nprogress';
import calcTotalPrice from '../../lib/calcTotalPrice';
import { CURRENT_USER_QUERY } from '../User';
import { useCurrentUser } from '../../hooks/useCurrentUser';

const CREATE_ORDER_MUTATION = gql`
  mutation createOrder($token: String!) {
    createOrder(token: $token) {
      id
      charge
      total
      items {
        id
        title
      }
    }
  }
`;

function totalItems(cart) {
  return cart.reduce((tally, cartItem) => tally + cartItem.quantity, 0);
}

function Checkout({ children }) {
  const [createOrder] = useMutation(CREATE_ORDER_MUTATION, {
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }]
  });

  const user = useCurrentUser();
  if (!user) return null;
  const { me } = user;

  const onToken = async (res, createOrder) => {
    NProgress.start();
    const order = await createOrder({
      variables: {
        token: res.id,
      },
    }).catch(err => {
      alert(err.message);
    });
    Router.push({
      pathname: '/order',
      query: { id: order.data.createOrder.id },
    });
  };

  return (
    <StripeCheckout
      amount={calcTotalPrice(me.cart)}
      name="Wears"
      description={`Order of ${totalItems(me.cart)} items!`}
      image={me.cart.length && me.cart[0].item && me.cart[0].item.image}
      stripeKey="pk_test_bXMWUkfPQbOBbnT4xEiJU8Ob00kjGJSn5Q"
      currency="USD"
      email={me.email}
      token={res => onToken(res, createOrder)}
    >
      {children}
    </StripeCheckout>
  );
}

export default Checkout;
export { CREATE_ORDER_MUTATION };