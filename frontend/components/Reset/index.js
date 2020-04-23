import React, { useState } from 'react';
import { Mutation } from '@apollo/react-components';
import { gql } from '@apollo/client';
import Proptypes from 'prop-types';
import Form from '../_Shared/Form';
import Error from '../_Shared/ErrorMessage';
import { CURRENT_USER_QUERY } from '../User';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION($resetToken: String!, $password: String!, $confirmPassword: String!) {
    resetPassword(resetToken: $resetToken, password: $password, confirmPassword: $confirmPassword) {
      id
      email
      name
    }
  }
`;

Reset.propTypes = {
  resetToken: Proptypes.string.isRequired
}

function Reset({ resetToken }) {
  const [inputs, setInputs] = useState({
    password: '',
    confirmPassword: '',
  });

  const saveToState = e => {
    const { name, value } = e.target;
    setInputs(inputs => ({ ...inputs, [name]: value }));
  };

  return (
    <Mutation mutation={RESET_MUTATION} variables={{
      resetToken,
      password: inputs.password,
      confirmPassword: inputs.confirmPassword
    }} refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
      {(reset, { error, loading, called }) => (
        <Form method="post" onSubmit={async e => {
          e.preventDefault();
          await reset();
          setInputs({ password: '', confirmPassword: '' });
        }}>
          <fieldset disabled={loading} aria-busy={loading}>
            <h2>Reset your password</h2>
            <Error error={error} />
            <label htmlFor="password">
              Password
              <input
                type="password"
                name="password"
                placeholder="password"
                value={inputs.password}
                onChange={saveToState} />
            </label>
            <label htmlFor="confirmPassword">
              Confirm your password
              <input
                type="password"
                name="confirmPassword"
                placeholder="confirmPassword"
                value={inputs.confirmPassword}
                onChange={saveToState} />
            </label>
            <button type="submit">Reset!</button>
          </fieldset>
        </Form>
      )}
    </Mutation>
  );
}

export default Reset;
