import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Router from 'next/router';
import Form from '../_Shared/Form';
import Error from '../_Shared/ErrorMessage';

const CREATE_ITEM_MUTATION = gql`
  mutation CREATE_ITEM_MUTATION(
    $title: String!
    $description: String!
    $price: Int!
    $image: String
    $largeImage: String
  ) {
    createItem(
      title: $title
      description: $description
      price: $price
      image: $image
      largeImage: $largeImage
    ) {
      id
    }
  }
`;

function CreateItem() {
  const [inputs, setInputs] = useState({
    title: '',
    description: '',
    price: 0,
    image: '',
    largerImage: '',
  });

  const handleChange = e => {
    const { name, type, value } = e.target;
    const val = type === 'number' ? parseFloat(value) : value;
    setInputs(inputs => ({ ...inputs, [name]: val }));
  }

  const uploadFile = async e => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'shopping');

    const res = await fetch('https://api.cloudinary.com/v1_1/lkameya/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();
    setInputs(inputs => ({
      ...inputs,
      image: file.secure_url,
      largeImage: file.eager[0].secure_url,
    }));
  };

  return (
    <Mutation mutation={CREATE_ITEM_MUTATION} variables={inputs}>
      {(createItem, { loading, error }) => (
        <Form
          data-test="form"
          onSubmit={async e => {
            e.preventDefault();
            const res = await createItem();
            Router.push({
              pathname: '/item',
              query: { id: res.data.createItem.id },
            });
          }}
        >
          <Error error={error} />
          <fieldset disabled={loading} aria-busy={loading}>
            <label htmlFor="file">
              Image
                <input
                type="file"
                id="file"
                name="file"
                placeholder="Upload an image"
                required
                onChange={uploadFile}
              />
              {inputs.image && (
                <img width="200" src={inputs.image} alt="Upload Preview" />
              )}
            </label>

            <label htmlFor="title">
              Title
            <input
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                required
                value={inputs.title}
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
                value={inputs.price}
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
                value={inputs.description}
                onChange={handleChange}
              />
            </label>
            <button type="submit">Submit</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  )
}

export default CreateItem;
export { CREATE_ITEM_MUTATION };
