import React, { Component } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { ALL_ITEMS_QUERY } from '../Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

function DeleteItem({ id, children }) {

  const update = (cache, payload) => {
    // manually update the cache on the client, so it matches the server
    const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
    data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
    cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
  };

  return (
    <Mutation
      mutation={DELETE_ITEM_MUTATION}
      variables={{ id }}
      update={update}
    >
      {(deleteItem, { error }) => (
        <button
          onClick={() => {
            if (confirm('Are you sure you want to delete this item?')) {
              deleteItem().catch(err => {
                alert(error);
              });
            }
          }}
        >
          {children}
        </button>
      )}
    </Mutation>
  );
}

export default DeleteItem;
