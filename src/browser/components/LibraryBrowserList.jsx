import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { ArrowKeyStepper, AutoSizer, List } from 'react-virtualized'
import LibraryBrowserListItem from './LibraryBrowserListItem'

const LibraryBrowserListWrapper = styled.div`
  display: flex;
  flex: 1;

  // Needed for the autosizer to work correctly.
  .autosizer-wrapper {
    flex: 1;
    overflow: auto;
  }
`

class LibraryBrowserList extends React.Component {
  selectRow = ({ scrollToRow, itemId }) => {
    let itemID = itemId
    if (itemID === undefined) {
      // Get the item id from the list.
      const { items } = this.props
      itemID = items[scrollToRow].id
    }
    this.props.onItemClick(itemID, scrollToRow)
  }

  // Magic function used by react-virtualized.
  rowRenderer = ({
    items, scrollToRow, key, index, style,
  }) => {
    const Display = this.props.itemDisplay
    const selected = { selected: index === scrollToRow }

    return (
      <LibraryBrowserListItem
        className={selected.selected ? 'selected' : ''}
        border
        key={key}
        style={style}
        {...selected}
        onClick={() => this.selectRow({ scrollToRow: index, itemId: items[index].id })
        }
      >
        <Display item={items[index]} index={index} />
      </LibraryBrowserListItem>
    )
  }

  render() {
    const { items, onKeyDown, forwardedRef } = this.props
    const scrollToRow = this.props.currentPosition

    return (
      <LibraryBrowserListWrapper onKeyDown={onKeyDown}>
        <ArrowKeyStepper
          // This class is used to manage the focused style in LibraryBrowserPane.
          className="autosizer-wrapper"
          columnCount={1}
          rowCount={items.length}
          mode="cells"
          isControlled
          onScrollToChange={this.selectRow}
          scrollToRow={scrollToRow}
        >
          {
            // eslint-disable-next-line no-shadow
          }
          {({ onSectionRendered, scrollToRow }) => (
            <AutoSizer>
              {({ height, width }) => (
                <List
                  ref={forwardedRef}
                  width={width}
                  height={height}
                  rowHeight={parseInt(this.props.theme.itemHeight, 0)}
                  rowCount={items.length}
                  rowRenderer={({ key, index, style }) => this.rowRenderer({
                    items,
                    scrollToRow,
                    key,
                    index,
                    style,
                  })
                  }
                  onRowsRendered={({ startIndex, stopIndex }) => {
                    onSectionRendered({
                      rowStartIndex: startIndex,
                      rowStopIndex: stopIndex,
                    })
                  }}
                  scrollToIndex={scrollToRow}
                />
              )}
            </AutoSizer>
          )}
        </ArrowKeyStepper>
      </LibraryBrowserListWrapper>
    )
  }
}
LibraryBrowserList.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  itemDisplay: PropTypes.func.isRequired,
  currentPosition: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}

const ThemedLibraryBrowserList = withTheme(LibraryBrowserList)

export default React.forwardRef((props, ref) => (
  <ThemedLibraryBrowserList {...props} forwardedRef={ref} />
))
