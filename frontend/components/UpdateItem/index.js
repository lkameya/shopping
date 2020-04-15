import React, { useState } from 'react';
import { Mutation, Query } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../_Shared/Form';
import Error from '../_Shared/ErrorMessage';

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

  return (
    <Query
      query={SINGLE_ITEM_QUERY}
      variables={{
        id,
      }}
    >
      {({ data, loading }) => {
        if (loading) return <p>Loading...</p>;
        if (!data.item) return <p>No Item Found for ID {id}</p>;
        return (
          <Mutation mutation={UPDATE_ITEM_MUTATION} variables={inputs}>
            {(updateItem, { loading, error }) => (
              <Form onSubmit={e => handleUpdate(e, updateItem)}>
                <fieldset disabled={loading} aria-busy={loading}>
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
            )}
          </Mutation>
        );
      }}
    </Query>
  );
}

export default UpdateItem;
export { UPDATE_ITEM_MUTATION };
