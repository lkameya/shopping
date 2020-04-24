import React, { useState, useEffect } from 'react';
import Downshift, { resetIdCounter } from 'downshift';
import Router from 'next/router';
import { ApolloConsumer } from '@apollo/react-components';
import { gql } from '@apollo/client';
import debounce from 'lodash.debounce';
import { DropDown, DropDownItem, SearchContainer } from './styles';

const SEARCH_ITEMS_QUERY = gql`
  query SEARCH_ITEMS_QUERY($searchTerm: String!) {
    items(where: { OR: [{ title_contains: $searchTerm }, { description_contains: $searchTerm }] }) {
      id
      image
      title
    }
  }
`;

function routeToItem(item) {
  Router.push({
    pathname: '/item',
    query: {
      id: item.id,
    },
  });
}

function Search() {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);

  resetIdCounter();
  const onChange = debounce(async (e, client) => {
    console.log('Searching...');

    setLoading(true);

    const res = await client.query({
      query: SEARCH_ITEMS_QUERY,
      variables: { searchTerm: e.target.value },
    });

    setItems(res.data.items);
    setLoading(false);
  }, 350);

  return (
    <SearchContainer>
      <Downshift onChange={routeToItem} itemToString={item => (item === null ? '' : item.title)}>
        {({ getInputProps, getItemProps, isOpen, inputValue, highlightedIndex }) => (
          <div>
            <ApolloConsumer>
              {client => (
                <input
                  {...getInputProps({
                    type: 'search',
                    placeholder: 'Search For An Item',
                    id: 'search',
                    className: loading ? 'loading' : '',
                    onChange: e => {
                      e.persist();
                      onChange(e, client);
                    },
                  })}
                />
              )}
            </ApolloConsumer>
            {isOpen && (
              <DropDown>
                {items.map((item, index) => (
                  <DropDownItem
                    {...getItemProps({ item })}
                    key={item.id}
                    highlighted={index === highlightedIndex}
                  >
                    <img width="50" src={item.image} alt={item.title} />
                    {item.title}
                  </DropDownItem>
                ))}
                {!items.length &&
                  !loading && <DropDownItem> Nothing Found {inputValue}</DropDownItem>}
              </DropDown>
            )}
          </div>
        )}
      </Downshift>
    </SearchContainer>
  );
}

export default Search;
