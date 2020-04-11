import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../_Shared/Form';
import Error from '../_Shared/ErrorMessage';
import { CURRENT_USER_QUERY } from '../User';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      id
      email
      name
    }
  }
`;

function Signup() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const saveToState = e => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  return (
    <Mutation
      mutation={SIGNUP_MUTATION}
      variables={inputs}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
    >
      {(signup, { error, loading }) => (
        <Form
          method="post"
          onSubmit={async e => {
            e.preventDefault();
            await signup();
            setInputs({ name: '', email: '', password: '' });
          }}
        >
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign Up for An Account</h2>
            <Error error={error} />
            <label htmlFor="email">
              Email
                <input
                type="email"
                name="email"
                placeholder="email"
                value={inputs.email}
                onChange={saveToState}
              />
            </label>
            <label htmlFor="name">
              Name
                <input
                type="text"
                name="name"
                placeholder="name"
                value={inputs.name}
                onChange={saveToState}
              />
            </label>
            <label htmlFor="password">
              Password
                <input
                type="password"
                name="password"
                placeholder="password"
                value={inputs.password}
                onChange={saveToState}
              />
            </label>
            <button type="submit">Sign Up!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
}

export default Signup;
export { SIGNUP_MUTATION };
