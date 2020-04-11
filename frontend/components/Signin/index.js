import React, { useState } from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import Form from '../_Shared/Form';
import Error from '../_Shared/ErrorMessage';
import { CURRENT_USER_QUERY } from '../User';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

function Signin() {
  const [inputs, setInputs] = useState({
    email: '',
    password: '',
  });

  const saveToState = e => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  return (
    <Mutation mutation={SIGN_IN_MUTATION} variables={inputs}
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(signin, { error, loading }) => (
        <Form method="post" onSubmit={async e => {
          e.preventDefault();
          await signin();
          setInputs({ email: '', password: '' });
        }}>
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Sign In for an account</h2>
            <Error error={error} />
            <label htmlFor="email">
              Email
            <input
                type="email"
                name="email"
                placeholder="email"
                value={inputs.email}
                onChange={saveToState} />
            </label>
            <label htmlFor="password">
              Password
            <input
                type="password"
                name="password"
                placeholder="password"
                value={inputs.password}
                onChange={saveToState} />
            </label>

            <button type="submit">Sign In!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
}

export default Signin;
