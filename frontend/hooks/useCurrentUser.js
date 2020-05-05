import { gql, useQuery } from '@apollo/client';

const CURRENT_USER_QUERY = gql`
  query {
    me {
      id
      email
      name
      permissions
      cart {
        id
        quantity
        item {
          id
          price
          image
          title
          description
        }
      }
    }
  }
`;

export function useCurrentUser() {
  const { data, loading } = useQuery(CURRENT_USER_QUERY, { fetchPolicy: "network-only" });

  if (!data) return null;

  const { me } = data;
  return {
    me
  }
}

export { CURRENT_USER_QUERY };