import { useQuery } from '@apollo/client';
import Signin from '../Signin';
import { useCurrentUser } from '../../hooks/useCurrentUser';

function PleaseSignin(props) {
  const user = useCurrentUser();
  if (!user) return null;
  const { me } = user;
  if (!me) {
    return (
      <div>
        <p>Please Sign In before continuing</p>
        <Signin />
      </div>
    );
  }

  return props.children;
}

export default PleaseSignin;
