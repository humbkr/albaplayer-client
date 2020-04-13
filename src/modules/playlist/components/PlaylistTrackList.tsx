import React, { FunctionComponent, Ref } from 'react'
import styled, { withTheme } from 'styled-components'
import { ArrowKeyStepper, AutoSizer, List } from 'react-virtualized'
import {
  arrayMove,
  SortableContainer,
  SortableElement,
} from 'react-sortable-hoc'
import ListItem from 'modules/playlist/components/ListItem'
import PlaylistItem from 'modules/playlist/components/PlaylistItem'
import { AppTheme } from 'themes/types'
import PlaylistItemType from '../types/PlaylistItem'

interface SortableElementProps {
  item: PlaylistItemType
  selected: boolean
  onSelectRow: (p: {}) => void
  handleRemoveTrack: (trackIndex: number) => void
  style: {}
}

// Make Track item sortable.
const SortableItem = SortableElement(
  ({
    selected,
    style,
    handleRemoveTrack,
    item,
    onSelectRow,
  }: SortableElementProps) => (
    <ListItem
      className={selected ? 'selected' : ''}
      selected={selected}
      border
      style={style}
      onContextMenu={() => onSelectRow({ scrollToRow: item.position - 1 })}
      onClick={() => onSelectRow({ scrollToRow: item.position - 1 })}
    >
      <PlaylistItem
        item={item}
        selected={selected}
        handleRemoveTrack={handleRemoveTrack}
      />
    </ListItem>
  )
)

interface VirtualListProps {
  items: PlaylistItemType[]
  handleRemoveTrack: () => void
  forwardedRef: Ref<HTMLElement>
  height: number
  width: number
  scrollToRow: number
  rowHeight: number
  onRowsRendered: () => void
  onSelectRow: (p: {}) => void
}

const VirtualList = ({
  forwardedRef,
  width,
  height,
  items,
  rowHeight,
  scrollToRow,
  onRowsRendered,
  handleRemoveTrack,
  onSelectRow,
}: VirtualListProps) => {
  // Magic function used by react-virtualized.
  const rowRenderer = ({
    // eslint-disable-next-line no-shadow
    items,
    scrollToRow,
    index,
    style,
  }: {
    items: PlaylistItemType[]
    scrollToRow: number
    index: number
    style: {}
  }) => {
    const selected = index === scrollToRow

    return (
      <SortableItem
        // @ts-ignore
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

  return (
    <List
      // @ts-ignore
      ref={forwardedRef}
      width={width}
      height={height}
      rowHeight={rowHeight}
      rowCount={items.length}
      rowRenderer={({ key, index, style }) => rowRenderer({
        items,
        scrollToRow,
        // @ts-ignore
        key,
        index,
        style,
      })}
      onRowsRendered={onRowsRendered}
      scrollToIndex={scrollToRow}
    />
  )
}

// Make list a sortable container.
const SortableList = SortableContainer(VirtualList)

interface PlaylistTrackListProps {
  playlistId: string
  items: PlaylistItemType[]
  currentPosition: number
  onItemClick: (trackId: string, trackIndex: number) => void
  onKeyDown: (e: React.KeyboardEvent) => void
  handleRemoveTrack: (trackIndex: number) => void
  onTrackListUpdate: (
    playlistId: string,
    newTrackList: PlaylistItemType[]
  ) => void
}

interface PlaylistTrackListInternalProps extends PlaylistTrackListProps {
  theme: AppTheme
  forwardedRef: Ref<HTMLElement>
}

// Final list element.
// eslint-disable-next-line react/no-multi-comp
const PlaylistTrackList: FunctionComponent<PlaylistTrackListInternalProps> = ({
  items,
  playlistId,
  currentPosition,
  onKeyDown,
  forwardedRef,
  handleRemoveTrack,
  onItemClick,
  onTrackListUpdate,
  theme,
}) => {
  const selectRow = ({ scrollToRow }: { scrollToRow: number }) => {
    onItemClick(items[scrollToRow].track.id, scrollToRow)
  }

  const onSortEnd = ({
    oldIndex,
    newIndex,
  }: {
    oldIndex: number
    newIndex: number
  }) => {
    if (oldIndex !== newIndex) {
      onTrackListUpdate(playlistId, arrayMove(items, oldIndex, newIndex))
    }
  }

  return (
    <Wrapper onKeyDown={onKeyDown}>
      <ArrowKeyStepper
        // This class is used to manage the focused style in Playlists.jsx.
        className="autosizer-wrapper"
        columnCount={1}
        rowCount={items.length}
        mode="cells"
        isControlled
        onScrollToChange={selectRow}
        scrollToRow={currentPosition}
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
                rowHeight={parseInt(theme.itemHeight, 0)}
                items={items}
                scrollToRow={scrollToRow}
                // @ts-ignore
                onRowsRendered={({ startIndex, stopIndex }) => {
                  // @ts-ignore
                  onSectionRendered({
                    rowStartIndex: startIndex,
                    rowStopIndex: stopIndex,
                  })
                }}
                onSortEnd={onSortEnd}
                // @ts-ignore
                onSelectRow={selectRow}
                // @ts-ignore
                handleRemoveTrack={handleRemoveTrack}
              />
            )}
          </AutoSizer>
        )}
      </ArrowKeyStepper>
    </Wrapper>
  )
}

const ThemedPlaylistTrackList = withTheme(PlaylistTrackList)

export default React.forwardRef<HTMLElement, PlaylistTrackListProps>(
  (props, ref) => (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <ThemedPlaylistTrackList {...props} forwardedRef={ref} />
  )
)

const Wrapper = styled.div`
  flex: 1;

  // Needed for the autosizer to work correctly.
  .autosizer-wrapper {
    overflow: auto;
    height: 100%;
  }
`
