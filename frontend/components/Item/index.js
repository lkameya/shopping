import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import { Container } from './styles';
import DeleteItem from '../DeleteItem';
import AddToCart from '../AddToCart';

Item.propTypes = {
  item: PropTypes.object.isRequired,
}

function Item({ item }) {
  return (
    <Container>
      {item.image && <img src={item.image} alt={item.title} />}
      <p>{item.description}</p>
      <div className="buttonList">
        <Link
          href={{
            pathname: 'update',
            query: { id: item.id },
          }}
        >
          <a>Edit ✏️</a>
        </Link>
        <AddToCart id={item.id} />
        <DeleteItem id={item.id}>Delete This Item</DeleteItem>
      </div>
    </Container>
  );
}


export default Item;

