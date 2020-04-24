import { useState } from 'react';
import { gql, useMutation } from '@apollo/client';
import Form from '../_Shared/Form';
import Error from '../_Shared/ErrorMessage';

const REQUEST_RESET_MUTATION = gql`
  mutation REQUEST_RESET_MUTATION($email: String!) {
    requestReset(email: $email) {
      message
    }
  }
`;

function RequestReset() {
  const [email, setEmail] = useState('');
  const [reset, { error, loading, called }] = useMutation(REQUEST_RESET_MUTATION, {
    variables: { email },
  });

  const handleChange = e => {
    setEmail(e.target.value);
  }

  return (
    <Form method="post" onSubmit={async e => {
      e.preventDefault();
      await reset();
      setEmail('');
    }}>
      <fieldset disabled={loading} aria-busy={loading}>
        <h2>Request password reset</h2>
        <Error error={error} />
        {!error && !loading && called && <p>Success! Check your email for a reset link</p>}
        <label htmlFor="email">
          Email
            <input
            type="email"
            name="email"
            placeholder="email"
            value={email}
            onChange={handleChange} />
        </label>
        <button type="submit">Request Reset!</button>
      </fieldset>
    </Form>
  );
}

export default RequestReset;
export { REQUEST_RESET_MUTATION };
