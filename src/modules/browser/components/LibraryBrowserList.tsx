import React, { ComponentType, FunctionComponent, Ref } from 'react'
import styled, { withTheme } from 'styled-components'
import { ArrowKeyStepper, AutoSizer, List } from 'react-virtualized'
import LibraryBrowserListItem from './LibraryBrowserListItem'
import { AppTheme } from '../../../themes/types'

interface ItemDisplayProps {
  item: any
  index: number
  selected: boolean
}

interface Props {
  items: Array<any>
  itemDisplay: ComponentType<ItemDisplayProps>
  currentPosition: number
  onItemClick: (itemId: string, index: number) => void
  onKeyDown: (e: React.KeyboardEvent) => void
}

interface InternalProps extends Props {
  theme: AppTheme
  forwardedRef: Ref<HTMLDivElement>
}

const LibraryBrowserList: FunctionComponent<InternalProps> = ({
  theme,
  items,
  itemDisplay,
  currentPosition,
  onItemClick,
  onKeyDown,
  forwardedRef,
}) => {
  const selectRow = ({
    scrollToRow,
    itemId,
  }: {
    scrollToRow: any
    itemId: string
  }) => {
    let itemID = itemId
    if (itemID === undefined) {
      // Get the item id from the list.
      itemID = items[scrollToRow].id
    }
    onItemClick(itemID, scrollToRow)
  }

  // Magic function used by react-virtualized.
  const rowRenderer = ({
    // eslint-disable-next-line no-shadow
    items,
    scrollToRow,
    key,
    index,
    style,
  }: {
    items: Array<any>
    scrollToRow: any
    key: string
    index: number
    style: any
  }) => {
    const Display: ComponentType<ItemDisplayProps> = itemDisplay
    const selected = { selected: index === scrollToRow }

    return (
      <LibraryBrowserListItem
        className={selected.selected ? 'selected' : ''}
        border
        key={key}
        style={style}
        selected={selected.selected}
        onClick={() => selectRow({ scrollToRow: index, itemId: items[index].id })}
        onContextMenu={() => selectRow({ scrollToRow: index, itemId: items[index].id })}
      >
        <Display
          item={items[index]}
          index={index}
          selected={selected.selected}
        />
      </LibraryBrowserListItem>
    )
  }

  return (
    <LibraryBrowserListWrapper onKeyDown={onKeyDown}>
      <ArrowKeyStepper
        // This class is used to manage the focused style in LibraryBrowserPane.
        className="autosizer-wrapper"
        columnCount={1}
        rowCount={items.length}
        mode="cells"
        isControlled
        // @ts-ignore
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
              <List
                // @ts-ignore
                ref={forwardedRef}
                width={width}
                height={height}
                rowHeight={parseInt(theme.itemHeight, 0)}
                rowCount={items.length}
                rowRenderer={({ key, index, style }) => rowRenderer({
                  items,
                  scrollToRow,
                  key,
                  index,
                  style,
                })}
                onRowsRendered={({ startIndex, stopIndex }) => {
                  // @ts-ignore
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

const ThemedLibraryBrowserList = withTheme(LibraryBrowserList)

export default React.forwardRef<HTMLDivElement, Props>((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <ThemedLibraryBrowserList {...props} forwardedRef={ref} />
))

const LibraryBrowserListWrapper = styled.div`
  display: flex;
  flex: 1;

  // Needed for the autosizer to work correctly.
  .autosizer-wrapper {
    flex: 1;
    overflow: auto;
  }
`
