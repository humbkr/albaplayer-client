import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withTheme } from 'styled-components'
import { AutoSizer, List } from 'react-virtualized'
import LibraryBrowserListItem from './LibraryBrowserListItem'


class LibraryBrowserList extends Component {
  render() {
    const Display = this.props.itemDisplay;
    let itemsList = this.props.items.map(item => (<Display item={item}/>));

    // Add a "All" item at the beginning of the list
    const itemAll = {
      id: '0',
      name: 'All',
      title: 'All',
      artistId: '0',
      albumId: '0',
    };
    itemsList.unshift(<Display item={itemAll}/>);

    // Magic function used by react-virtualized.
    function rowRenderer ({key, index, isScrolling, isVisible, style}) {
      return (
        <LibraryBrowserListItem border key={key} style={style}>
          {itemsList[index]}
        </LibraryBrowserListItem>
      )
    }

    return (
      <AutoSizer>
        {({ height, width }) => (
          <List
            width={width}
            height={height}
            rowCount={itemsList.length}
            rowHeight={parseInt(this.props.theme.itemHeight, 0)}
            rowRenderer={rowRenderer}
          />
        )}
      </AutoSizer>
    );
  }
}
LibraryBrowserList.propTypes = {
  items: PropTypes.array.isRequired,
  itemDisplay: PropTypes.func
};


export default withTheme(LibraryBrowserList);
