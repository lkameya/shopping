import React, { useState } from 'react';
import { gql, useMutation, useQuery } from '@apollo/client';
import Form from '../_Shared/Form';
import Loading from '../_Shared/Loading';

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      description
      price
    }
  }
`;
const UPDATE_ITEM_MUTATION = gql`
  mutation UPDATE_ITEM_MUTATION($id: ID!, $title: String, $description: String, $price: Int) {
    updateItem(id: $id, title: $title, description: $description, price: $price) {
      id
      title
      description
      price
    }
  }
`;

function UpdateItem({ id }) {
  const [inputs, setInputs] = useState({});
  const [updateItem, { error, loading: saving }] = useMutation(UPDATE_ITEM_MUTATION, {
    variables: inputs,
  });

  const { data, loading } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id },
  });

  const handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setInputs(inputs => ({ ...inputs, [name]: val }));
  }

  const handleUpdate = async (e, updateItemMutation) => {
    e.preventDefault();
    await updateItemMutation({
      variables: {
        id,
        ...inputs,
      },
    });
  };

  if (loading) return <Loading />;
  if (!data.item) return <p>No Item Found for ID {id}</p>;

  return (
    <Form onSubmit={e => handleUpdate(e, updateItem)}>
      <fieldset disabled={saving} aria-busy={saving}>
        <label htmlFor="title">
          Title
          <input
            type="text"
            id="title"
            name="title"
            placeholder="Title"
            required
            defaultValue={data.item.title}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="price">
          Price
                      <input
            type="number"
            id="price"
            name="price"
            placeholder="Price"
            required
            defaultValue={data.item.price}
            onChange={handleChange}
          />
        </label>

        <label htmlFor="description">
          Description
          <textarea
            id="description"
            name="description"
            placeholder="Enter A Description"
            required
            defaultValue={data.item.description}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sav{loading ? 'ing' : 'e'} Changes</button>
      </fieldset>
    </Form>
  );
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
