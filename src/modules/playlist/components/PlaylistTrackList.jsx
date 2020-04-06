// eslint-disable-next-line max-classes-per-file
import React from 'react'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { ArrowKeyStepper, AutoSizer, List } from 'react-virtualized'
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc'
import ListItem from './ListItem'
import PlaylistTrack from './PlaylistTrack'

// Make Track item sortable.
const SortableItem = SortableElement((props) => {
  const {
    selected, style, handleRemoveTrack, item, onSelectRow,
  } = props

  return (
    <ListItem
      className={selected ? 'selected' : ''}
      selected={selected}
      border
      style={style}
      onContextMenu={() => onSelectRow({ scrollToRow: item.position - 1 })}
      onClick={() => onSelectRow({ scrollToRow: item.position - 1 })}
    >
      <PlaylistTrack
        item={item}
        selected={selected}
        handleRemoveTrack={handleRemoveTrack}
      />
    </ListItem>
  )
})
SortableItem.propTypes = {
  item: PropTypes.shape({
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  selected: PropTypes.bool,
  onSelectRow: PropTypes.func.isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
  style: PropTypes.shape().isRequired,
}

class VirtualList extends React.Component {
  // Magic function used by react-virtualized.
  rowRenderer = ({
    items, scrollToRow, index, style,
  }) => {
    const { handleRemoveTrack, onSelectRow } = this.props
    const selected = index === scrollToRow

    return (
      <SortableItem
        className={selected ? 'selected' : ''}
        selected={selected}
        border
        style={style}
        key={index}
        index={index}
        item={items[index]}
        onSelectRow={onSelectRow}
        handleRemoveTrack={handleRemoveTrack}
      />
    )
  }

  render() {
    const {
      forwardedRef,
      width,
      height,
      items,
      rowHeight,
      scrollToRow,
      onRowsRendered,
    } = this.props

    return (
      <List
        ref={forwardedRef}
        width={width}
        height={height}
        rowHeight={rowHeight}
        rowCount={items.length}
        rowRenderer={({ key, index, style }) => this.rowRenderer({
          items,
          scrollToRow,
          key,
          index,
          style,
        })}
        onRowsRendered={onRowsRendered}
        scrollToIndex={scrollToRow}
      />
    )
  }
}
VirtualList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  scrollToRow: PropTypes.number.isRequired,
  onRowsRendered: PropTypes.func.isRequired,
  rowHeight: PropTypes.number.isRequired,
  onSelectRow: PropTypes.func.isRequired,
}

// Make list a sortable container.
const SortableList = SortableContainer(VirtualList)

SortableList.propTypes = {
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  scrollToRow: PropTypes.number.isRequired,
  onRowsRendered: PropTypes.func.isRequired,
  rowHeight: PropTypes.number.isRequired,
  onSelectRow: PropTypes.func.isRequired,
}

// Final list element.
// eslint-disable-next-line react/no-multi-comp
class PlaylistTrackList extends React.Component {
  selectRow = ({ scrollToRow }) => {
    const { items, onItemClick } = this.props
    onItemClick(items[scrollToRow].id, scrollToRow)
  }

  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const { playlistId, items, onTrackListUpdate } = this.props
      onTrackListUpdate(playlistId, arrayMove(items, oldIndex, newIndex))
    }
  }

  render() {
    const {
      items, onKeyDown, forwardedRef, handleRemoveTrack,
    } = this.props
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
                <SortableList
                  distance={1}
                  forwardedRef={forwardedRef}
                  width={width}
                  height={height}
                  rowHeight={parseInt(this.props.theme.itemHeight, 0)}
                  items={items}
                  scrollToRow={scrollToRow}
                  onRowsRendered={({ startIndex, stopIndex }) => {
                    onSectionRendered({
                      rowStartIndex: startIndex,
                      rowStopIndex: stopIndex,
                    })
                  }}
                  onSortEnd={this.onSortEnd}
                  onSelectRow={this.selectRow}
                  handleRemoveTrack={handleRemoveTrack}
                />
              )}
            </AutoSizer>
          )}
        </ArrowKeyStepper>
      </Wrapper>
    )
  }
}
PlaylistTrackList.propTypes = {
  playlistId: PropTypes.string.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape).isRequired,
  theme: PropTypes.objectOf(PropTypes.shape).isRequired,
  currentPosition: PropTypes.number.isRequired,
  onItemClick: PropTypes.func.isRequired,
  onKeyDown: PropTypes.func.isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
  onTrackListUpdate: PropTypes.func.isRequired,
}

const ThemedPlaylistTrackList = withTheme(PlaylistTrackList)

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ThemedPlaylistTrackList {...props} forwardedRef={ref} />
))

const Wrapper = styled.div`
  flex: 1;

  // Needed for the autosizer to work correctly.
  .autosizer-wrapper {
    overflow: auto;
    height: 100%;
  }
`
