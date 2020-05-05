import { gql, useMutation } from '@apollo/client';
import waait from 'waait';
import { CURRENT_USER_QUERY } from '../../hooks/useCurrentUser';
import Router from 'next/router';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

function Signout() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    onCompleted: () => localStorage.clear() || waait(10) || Router.push({ pathname: '/login' }),
    refetchQueries: () => [{ query: CURRENT_USER_QUERY }],
  })

  return (
    <a onClick={signout}>Sign out</a>
  )
}

export default Signout;
