import React, { Component } from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import styled from 'styled-components';
import Item from '../Item';
import Pagination from '../Pagination';
import { perPage } from '../../config';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

const Center = styled.div`
    width: 100%;
`;

const ItemsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr) );
  grid-gap: 10px;

  @media (min-width: 1025px) {
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr) );
    grid-gap: 30px;
  }
`;

function Items({ page }) {
  return (
    <Query
      query={ALL_ITEMS_QUERY}
      fetchPolicy="network-only"
      variables={{
        skip: page * perPage - perPage,
      }}
    >
      {({ data, error, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (error) return <p>Error: {error.message}</p>;
        return (
          <Center>
            <ItemsList>
              {data.items.map(item =>
                <Item item={item} key={item.id} />)}
            </ItemsList>
          </Center>
        );
      }}
    </Query>
  )
}

export default Items;
export { ALL_ITEMS_QUERY };
