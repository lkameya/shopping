import { gql, useMutation } from '@apollo/client';
import { ALL_ITEMS_QUERY } from '../Items';

const DELETE_ITEM_MUTATION = gql`
  mutation DELETE_ITEM_MUTATION($id: ID!) {
    deleteItem(id: $id) {
      id
    }
  }
`;

function DeleteItem({ id, children }) {
  const [deleteItem, { error }] = useMutation(DELETE_ITEM_MUTATION, {
    variables: { id },
    update(cache, payload) {
      const data = cache.readQuery({ query: ALL_ITEMS_QUERY });
      data.items = data.items.filter(item => item.id !== payload.data.deleteItem.id);
      cache.writeQuery({ query: ALL_ITEMS_QUERY, data });
    }
  })

  return (
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
  );
}

export default DeleteItem;
