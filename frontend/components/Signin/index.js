import React, { useState } from 'react';
import { Mutation } from '@apollo/react-components';
import { gql } from '@apollo/client';
import Form from '../_Shared/Form';
import Error from '../_Shared/ErrorMessage';
import { CURRENT_USER_QUERY } from '../User';
import { LoginContainer } from './styles';
import Router from 'next/router';
import Link from 'next/link';

const SIGN_IN_MUTATION = gql`
  mutation SIGN_IN_MUTATION($email: String!, $password: String!) {
    signin(email: $email, password: $password) {
      id
      email
      name
    }
  }
`;

function Signin(props) {
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
      refetchQueries={[{ query: CURRENT_USER_QUERY }]}
      onCompleted={() => Router.push({
        pathname: '/items',
      })}>
      {(signin, { error, loading }) => (
        <LoginContainer>
          <Form method="post" onSubmit={async e => {
            e.preventDefault();
            await signin();
            setInputs({ email: '', password: '' });
          }}>
            <fieldset disabled={loading} aria-busy={loading}>
              <h2>Sign In</h2>
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
          <span> Don't have an account? <Link href={{ pathname: '/signup' }}><a>Sign up</a></Link></span>
        </LoginContainer>
      )}
    </Mutation>
  );
}

export default Signin;
