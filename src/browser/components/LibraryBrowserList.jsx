import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import { AutoSizer, List } from 'react-virtualized';
import LibraryBrowserListItem from './LibraryBrowserListItem';


const LibraryBrowserListWrapper = styled.div`
  flex: 1 1 auto;
`;

class LibraryBrowserList extends React.Component {
  selectRow = ({ scrollToRow, itemId }) => {
    this.props.onItemClick(itemId, scrollToRow);
  };

  // Magic function used by react-virtualized.
  rowRenderer = ({ items, scrollToRow, key, index, style }) => {
    const Display = this.props.itemDisplay;

    // TODO manage selected.
    const selected = { selected: (index === scrollToRow) };

    return (
      <LibraryBrowserListItem
        border
        key={key}
        style={style}
        {...selected}
        onClick={() => this.selectRow({ scrollToRow: index, itemId: items[index].id })}
      >
        <Display item={items[index]} index={index} />
      </LibraryBrowserListItem>
    );
  };

  render() {
    const { items, currentPosition } = this.props;

    return (
      <LibraryBrowserListWrapper>
        <AutoSizer>
          {({ height, width }) => (
            <List
              width={width}
              height={height}
              rowCount={items.length}
              rowHeight={parseInt(this.props.theme.itemHeight, 0)}
              rowRenderer={({ key, index, style }) =>
                this.rowRenderer({ items, scrollToRow: currentPosition, key, index, style })
              }
              scrollToIndex={currentPosition}
            />
          )}
        </AutoSizer>
      </LibraryBrowserListWrapper>
    );
  }
}
LibraryBrowserList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  itemDisplay: PropTypes.func.isRequired,
  currentPosition: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
};


export default withTheme(LibraryBrowserList);
