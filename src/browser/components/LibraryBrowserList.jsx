import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { AutoSizer, List } from 'react-virtualized'
import LibraryBrowserListItem from './LibraryBrowserListItem'

const LibraryBrowserListWrapper = styled.div`
  flex: 1 1 auto;
`

const LibraryBrowserList = (props) => {
  const Display = props.itemDisplay
  const itemsList = props.items
  const currentPosition = props.currentPosition

  // Magic function used by react-virtualized.
  // eslint-disable-next-line
  function rowRenderer({ key, index, isScrolling, isVisible, style }) {
    return (
      <LibraryBrowserListItem border key={key} style={style}>
        <Display item={itemsList[index]} index={index} />
      </LibraryBrowserListItem>
    )
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
            scrollToIndex={currentPosition}
          />
        )}
      </AutoSizer>
    </LibraryBrowserListWrapper>
  )
}
LibraryBrowserList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  itemDisplay: PropTypes.func.isRequired,
  currentPosition: PropTypes.number.isRequired,
}

export default withTheme(LibraryBrowserList)
