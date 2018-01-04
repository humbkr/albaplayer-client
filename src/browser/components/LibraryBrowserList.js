import React, { Component } from 'react'
import PropTypes from "prop-types"
import styled, { withTheme } from "styled-components"
import { AutoSizer, List } from 'react-virtualized'

const LibraryBrowserListItem = styled.div`
  width: 100%;
  ${props => props.border ? 'border-top: 1px solid ' + props.theme.separatorColor : ''};
  
  // The items MUST ALWAYS have a fixed height for the list to work.
  height: ${props => props.theme.itemHeight};
  overflow-y: hidden;
  
  :hover {
    background-color: ${props => props.theme.highlight};
  }
  
  > * {
    display: block;
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
`;

class LibraryBrowserList extends Component {
  render() {
    const Display = this.props.itemDisplay;
    const itemsList = this.props.items.map(item => (<Display item={item}/>));

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
