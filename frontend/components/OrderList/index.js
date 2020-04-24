import React from 'react';
import { Query } from '@apollo/react-components';
import Link from 'next/link';
import { gql, useQuery } from '@apollo/client';
import Error from '../_Shared/ErrorMessage';
import formatMoney from '../../lib/formatMoney';
import { OrderItemStyles, OrderUl } from './styles';

const USER_ORDERS_QUERY = gql`
  query USER_ORDERS_QUERY {
    orders(orderBy: createdAt_DESC) {
      id
      total
      createdAt
      items {
        id
        title
        price
        description
        quantity
        image
      }
    }
  }
`;

function OrderList() {
  const { data, loading, error } = useQuery(USER_ORDERS_QUERY);

  if (!data) return null;
  const orders = data.orders;
  if (loading) return null;
  if (error) return <Error erorr={error} />;

  return (
    <div>
      <h2>You have {orders.length} orders</h2>
      <OrderUl>
        {orders.map(order => (
          <OrderItemStyles key={order.id}>
            <Link
              href={{
                pathname: '/order',
                query: { id: order.id },
              }}
            >
              <a>
                <div className="order-meta">
                  <p>{order.items.reduce((a, b) => a + b.quantity, 0)} Items</p>
                  <p>{order.items.length} Products</p>
                  {/* <p>{formatDistance(order.createdAt, new Date())}</p> */}
                  <p>{formatMoney(order.total)}</p>
                </div>
                <div className="images">
                  {order.items.map(item => (
                    <img key={item.id} src={item.image} alt={item.title} />
                  ))}
                </div>
              </a>
            </Link>
          </OrderItemStyles>
        ))}
      </OrderUl>
    </div>
  );
}

export default OrderList;