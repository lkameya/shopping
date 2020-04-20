import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import Head from 'next/head';
import gql from 'graphql-tag';
import formatMoney from '../../lib/formatMoney';
import Error from '../_Shared/ErrorMessage';
import OrderContainer from './styles';

const SINGLE_ORDER_QUERY = gql`
  query SINGLE_ORDER_QUERY($id: ID!) {
    order(id: $id) {
      id
      charge
      total
      createdAt
      user {
        id
      }
      items {
        id
        title
        description
        price
        image
        quantity
      }
    }
  }
`;

Order.propTypes = {
  id: PropTypes.string.isRequired,
}

function Order({ id }) {
  return (
    <Query query={SINGLE_ORDER_QUERY} variables={{ id }}>
      {({ data, error, loading }) => {
        if (error) return <Error error={error} />;
        if (loading) return <p>Loading...</p>;
        const order = data.order;
        return (
          <OrderContainer data-test="order">
            <Head>
              <title>Wears - Order {order.id}</title>
            </Head>
            <p>
              <span>Order ID:</span>
              <span>{id}</span>
            </p>
            <p>
              <span>Charge</span>
              <span>{order.charge}</span>
            </p>
            <p>
              <span>Order Total</span>
              <span>{formatMoney(order.total)}</span>
            </p>
            <p>
              <span>Item Count</span>
              <span>{order.items.length}</span>
            </p>
            <div className="items">
              {order.items.map(item => (
                <div className="order-item" key={item.id}>
                  <img src={item.image} alt={item.title} />
                  <div className="item-details">
                    <h2>{item.title}</h2>
                    <p>Qty: {item.quantity}</p>
                    <p>Each: {formatMoney(item.price)}</p>
                    <p>SubTotal: {formatMoney(item.price * item.quantity)}</p>
                    <p>{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </OrderContainer>
        );
      }}
    </Query>
  );
}

export default Order;
export { SINGLE_ORDER_QUERY };
