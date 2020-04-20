import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container } from './styles';
import DeleteItem from '../DeleteItem';
import formatMoney from '../../lib/formatMoney';

Item.propTypes = {
  item: PropTypes.object.isRequired,
}

function Item({ item }) {
  return (
    <Link href={{
      pathname: 'item',
      query: {
        id: item.id
      }
    }}>
      <Container>
        {item.image && <img src={item.image} alt={item.title} />}
        <span>{item.title}</span>
        <span>{formatMoney(item.price)}</span>
        <div>
          <Link
            href={{
              pathname: 'update',
              query: { id: item.id },
            }}
          >
            <a>Edit ✏️</a>
          </Link>
          {/* <AddToCart id={item.id} /> */}
          <DeleteItem id={item.id}>Delete This Item</DeleteItem>
        </div>
      </Container>
    </Link>
  );
}


export default Item;

