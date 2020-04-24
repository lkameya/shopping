import React, { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Form from '../_Shared/Form';
import Error from '../_Shared/ErrorMessage';
import { CURRENT_USER_QUERY } from '../../hooks/useCurrentUser';
import { RegisterContainer } from './styles';
import Router from 'next/router';
import Loading from '../_Shared/Loading';

const SIGNUP_MUTATION = gql`
  mutation SIGNUP_MUTATION($email: String!, $name: String!, $password: String!) {
    signup(email: $email, name: $name, password: $password) {
      token
    }
  }
`;

function Signup() {
  const [inputs, setInputs] = useState({
    name: '',
    email: '',
    password: '',
  });

  const [signup, { loading, error, data }] = useMutation(SIGNUP_MUTATION, {
    variables: inputs,
    refetchQueries: (data) => [{ query: CURRENT_USER_QUERY }],
    onCompleted: ({ signup: { token } }) => localStorage.setItem('token', token) || Router.push({ pathname: '/items' }),
  });

  const saveToState = e => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  if (loading) return <Loading />;

  return (
    <RegisterContainer>
      <Form
        method="post"
        onSubmit={async e => {
          e.preventDefault();
          await signup();
          setInputs({ name: '', email: '', password: '' });
        }}
      >
        <fieldset disabled={loading} aria-busy={loading}>
          <h2>Register</h2>
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
    </RegisterContainer>
  );
}

export default Signup;
export { SIGNUP_MUTATION };
