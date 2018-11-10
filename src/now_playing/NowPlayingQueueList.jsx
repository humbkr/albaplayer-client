import React from 'react'
import PropTypes from 'prop-types'
import { AutoSizer, List, WindowScroller } from 'react-virtualized'
import {
  SortableContainer,
  SortableElement,
  arrayMove,
} from 'react-sortable-hoc'
import 'react-virtualized/styles.css'
import NowPlayingQueueItem from './NowPlayingQueueItem'

// Make Queue item sortable.
const SortableItem = SortableElement((props) => {
  const { item, style, current } = props

  return <NowPlayingQueueItem item={item} style={style} current={current} />
})
SortableItem.propTypes = {
  item: PropTypes.shape().isRequired,
  style: PropTypes.shape().isRequired,
  current: PropTypes.number.isRequired,
}

// List managed by react-virtualized.
class VirtualList extends React.Component {
  // Magic function used by react-virtualized.
  rowRenderer = ({
    items, key, index, style,
  }) => {
    const { current } = this.props

    return (
      <SortableItem
        item={items[index]}
        index={index}
        key={key}
        style={style}
        current={current}
      />
    )
  }

  render() {
    const {
      items,
      rowHeight,
      height,
      width,
      isScrolling,
      onScroll,
      scrollTop,
    } = this.props

    return (
      <List
        autoHeight
        height={height}
        isScrolling={isScrolling}
        onScroll={onScroll}
        rowCount={items.length}
        rowHeight={rowHeight}
        rowRenderer={({ key, index, style }) => this.rowRenderer({
          items,
          key,
          index,
          style,
        })
        }
        scrollTop={scrollTop}
        width={width}
      />
    )
  }
}
VirtualList.propTypes = {
  rowHeight: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  height: PropTypes.number.isRequired,
  width: PropTypes.number.isRequired,
  isScrolling: PropTypes.bool.isRequired,
  onScroll: PropTypes.func.isRequired,
  scrollTop: PropTypes.number.isRequired,
}

// Make list a sortable container.
const SortableList = SortableContainer(VirtualList)

// Final list element.
// eslint-disable-next-line react/no-multi-comp
class NowPlayingQueueList extends React.Component {
  onSortEnd = ({ oldIndex, newIndex }) => {
    if (oldIndex !== newIndex) {
      const { items, onQueueUpdate, current } = this.props
      let newCurrent = current
      if (oldIndex < current && newIndex >= current) {
        newCurrent--
      } else if (oldIndex > current && newIndex <= current) {
        newCurrent++
      } else if (oldIndex === current) {
        newCurrent = newIndex
      }

      onQueueUpdate(arrayMove(items, oldIndex, newIndex), newCurrent)
    }
  }

  render() {
    const { items, itemHeight, current } = this.props

    return (
      <WindowScroller>
        {({
          height, isScrolling, onChildScroll, scrollTop,
        }) => (
          <AutoSizer disableHeight>
            {({ width }) => (
              <SortableList
                current={current}
                items={items}
                width={width}
                height={height}
                rowHeight={itemHeight}
                isScrolling={isScrolling}
                onScroll={onChildScroll}
                scrollTop={scrollTop}
                onSortEnd={this.onSortEnd}
              />
            )}
          </AutoSizer>
        )}
      </WindowScroller>
    )
  }
}
NowPlayingQueueList.propTypes = {
  itemHeight: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  onQueueUpdate: PropTypes.func.isRequired,
}

export default NowPlayingQueueList
