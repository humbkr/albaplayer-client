import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { AutoSizer, List } from 'react-virtualized';
import LibraryBrowserListItem from './LibraryBrowserListItem';


const LibraryBrowserListWrapper = styled.div`
  flex: 1 1 auto;
`;

const LibraryBrowserList = (props) => {
  const Display = props.itemDisplay;
  const itemsList = props.items.map(item => (<Display item={item} />));

  // Add a "All" item at the beginning of the list
  const itemAll = {
    id: '0',
    name: 'All',
    title: 'All',
    artistId: '0',
    albumId: '0',
  };
  itemsList.unshift(<Display item={itemAll} />);

  // Magic function used by react-virtualized.
  // eslint-disable-next-line
  function rowRenderer({key, index, isScrolling, isVisible, style}) {
    return (
      <LibraryBrowserListItem border key={key} style={style}>
        {itemsList[index]}
      </LibraryBrowserListItem>
    );
  }

  return (
    <LibraryBrowserListWrapper>
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={itemsList.length}
            rowHeight={parseInt(props.theme.itemHeight, 0)}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    </LibraryBrowserListWrapper>
  );
};
LibraryBrowserList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  itemDisplay: PropTypes.func.isRequired,
};


export default withTheme(LibraryBrowserList);
