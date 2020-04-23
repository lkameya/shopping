import React, { Component } from 'react';
import { Mutation } from '@apollo/react-components';
import { gql } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

const Signout = () => (
  <Mutation mutation={SIGN_OUT_MUTATION}
    refetchQueries={[{ query: CURRENT_USER_QUERY }]}>
    {signout => <a onClick={signout}>Sign out</a>}
  </Mutation>
)

export default Signout;
