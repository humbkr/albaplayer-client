import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { ArrowKeyStepper, AutoSizer, List } from 'react-virtualized'
import ListItem from './ListItem'
import PlaylistTeaser from './PlaylistTeaser'

class PlaylistList extends React.Component {
  selectRow = ({ scrollToRow }) => {
    const { items } = this.props
    this.props.onItemClick(items[scrollToRow], scrollToRow)
  }

  // Magic function used by react-virtualized.
  rowRenderer = ({
    items, scrollToRow, key, index, style,
  }) => {
    const selected = index === scrollToRow

    return (
      <ListItem
        className={selected ? 'selected' : ''}
        selected={selected}
        border
        key={key}
        style={style}
        onClick={() => this.selectRow({ scrollToRow: index, item: items[index] })
        }
        onContextMenu={() => this.selectRow({ scrollToRow: index, item: items[index] })
        }
      >
        <PlaylistTeaser item={items[index]} />
      </ListItem>
    )
  }

  render() {
    const { items, onKeyDown, forwardedRef } = this.props
    const scrollToRow = this.props.currentPosition

    return (
      <Wrapper onKeyDown={onKeyDown}>
        <ArrowKeyStepper
          // This class is used to manage the focused style in Playlists.jsx.
          className="autosizer-wrapper"
          columnCount={1}
          rowCount={items.length}
          mode="cells"
          isControlled
          onScrollToChange={this.selectRow}
          scrollToRow={scrollToRow}
        >
          {({
            onSectionRendered,
            // eslint-disable-next-line no-shadow
            scrollToRow,
          }) => (
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
      </Wrapper>
    )
  }
}
PlaylistList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  theme: PropTypes.objectOf(PropTypes.shape).isRequired,
  currentPosition: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}

const ThemedPlaylistList = withTheme(PlaylistList)

export default React.forwardRef((props, ref) => (
  <ThemedPlaylistList {...props} forwardedRef={ref} />
))

const Wrapper = styled.div`
  flex: 1;

  // Needed for the autosizer to work correctly.
  .autosizer-wrapper {
    overflow: auto;
    height: 100%;
  }
`
