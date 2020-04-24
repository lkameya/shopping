import { gql, useMutation } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User';

const SIGN_OUT_MUTATION = gql`
  mutation SIGN_OUT_MUTATION {
    signout {
      message
    }
  }
`;

function Signout() {
  const [signout] = useMutation(SIGN_OUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
    onCompleted: () => localStorage.removeItem('token')
  })

  return (
    <a onClick={signout}>Sign out</a>
  )
}

export default Signout;
