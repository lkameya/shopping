import { useQuery } from '@apollo/client';
import { CURRENT_USER_QUERY } from '../User';
import Signin from '../Signin';

function PleaseSignin(props) {
  const { data, loading } = useQuery(CURRENT_USER_QUERY);

  if (!data || loading) return <p> Loading ...</p>;
  if (!data.me) {
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
