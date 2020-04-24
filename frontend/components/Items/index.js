import { gql, useQuery } from '@apollo/client';
import Item from '../Item';
import { perPage } from '../../config';
import { ItemsContainer } from './styles';
import { useCurrentUser } from '../../hooks/useCurrentUser';
import Loading from '../_Shared/Loading';

const ALL_ITEMS_QUERY = gql`
  query ALL_ITEMS_QUERY($skip: Int = 0, $first: Int = ${perPage}) {
    items(first: $first, skip: $skip, orderBy: createdAt_DESC) {
      id
      title
      price
      description
      image
      largeImage
    }
  }
`;

function Items({ page }) {
  const { loading, error, data } = useQuery(ALL_ITEMS_QUERY, {
    variables: { skip: page * perPage - perPage },
    //fetchPolicy: "network-only"
  });

  const me = useCurrentUser();

  if (loading || !me || !data) return <Loading />;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <ItemsContainer>
      {data.items.map(item =>
        <Item item={item} key={item.id} />)}
    </ItemsContainer>
  )
}

export default Items;
export { ALL_ITEMS_QUERY };
