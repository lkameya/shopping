import { gql, useQuery } from '@apollo/client';
import Error from '../_Shared/ErrorMessage';
import styled from 'styled-components';
import Head from 'next/head';
import { ItemContainer } from './styles';
import AddToCart from '../AddToCart';
import formatMoney from '../../lib/formatMoney';
import Loading from '../_Shared/Loading';

const SingleItemStyles = styled.div`
  max-width: 1200px;
  margin: 2rem auto;
  box-shadow: ${props => props.theme.bs};
  display: grid;
  grid-auto-columns: 1fr;
  grid-auto-flow: auto;
  min-height: 800px;
  img {
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .details {
    margin: 3rem;
    font-size: 2rem;
  }
`;

const SINGLE_ITEM_QUERY = gql`
  query SINGLE_ITEM_QUERY($id: ID!) {
    item(where: { id: $id }) {
      id
      title
      price
      description
      largeImage
    }
  }
`;

function SingleItem({ id }) {
  const { data, loading, error } = useQuery(SINGLE_ITEM_QUERY, {
    variables: { id }
  });

  if (loading) return <Loading />;
  const { item } = data;
  if (error) return <Error error={error} />;
  if (!data.item) return <p>No item found!</p>;

  return (
    <ItemContainer>
      <Head>
        <title>Thrift Store | {item.title}</title>
      </Head>
      <div className="imageContainer">
        <div><img src={data.item.largeImage} /></div>
      </div>
      <div className="details">
        <h4>{formatMoney(item.price)}</h4>
        <hr />
        <h2>{item.title}</h2>
        <span>{item.description}</span>
        <AddToCart id={item.id} />
      </div>
    </ItemContainer>
  );
}

export default SingleItem;
export { SINGLE_ITEM_QUERY };
