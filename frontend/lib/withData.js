import withApollo from 'next-with-apollo';
import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/link-context';
import { getDataFromTree } from '@apollo/react-ssr';
import { endpoint, prodEndpoint } from '../config';
import { LOCAL_STATE_QUERY } from '../components/Cart.js';

const httpLink = createHttpLink({
  uri: prodEndpoint,
});

const authLink = setContext((_, { headers }) => {
  const token = localStorage.getItem('token');
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    }
  }
});

const cache = new InMemoryCache();
cache.writeQuery({
  query: LOCAL_STATE_QUERY,
  data: {
    cartOpen: false
  },
});

function createClient({ headers, initialState }) {
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache,
    resolvers: {
      Mutation: {
        toggleCart: (_, variables, { cache }) => {
          // read the cartOpen value from the cache
          const { cartOpen } = cache.readQuery({
            query: LOCAL_STATE_QUERY,
          });
          const data = {
            data: { cartOpen: !cartOpen },
          };
          cache.writeQuery({
            query: LOCAL_STATE_QUERY,
            data: { cartOpen: !cartOpen },
          });
          return data;
        }
      },
    },
  });
}

export default withApollo(createClient);
