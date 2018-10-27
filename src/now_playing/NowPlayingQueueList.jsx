import React from 'react'
import PropTypes from 'prop-types'
import { List, WindowScroller } from 'react-virtualized'
import 'react-virtualized/styles.css'
import NowPlayingQueueItem from './NowPlayingQueueItem'

class NowPlayingQueueList extends React.Component {
  // Magic function used by react-virtualized.
  rowRenderer = ({
    items, key, index, style,
  }) => {
    const { itemHeight, current } = this.props

    return (
      <NowPlayingQueueItem
        item={items[index]}
        index={index}
        key={key}
        style={style}
        itemHeight={itemHeight}
        current={current}
      />
    )
  }

  render() {
    const { items, itemHeight } = this.props

    return (
      <WindowScroller>
        {({
          height, isScrolling, onChildScroll, scrollTop,
        }) => (
          <List
            autoHeight
            height={height}
            isScrolling={isScrolling}
            onScroll={onChildScroll}
            rowCount={items.length}
            rowHeight={itemHeight}
            rowRenderer={({ key, index, style }) => this.rowRenderer({
              items,
              key,
              index,
              style,
            })
            }
            scrollTop={scrollTop}
            width={1000}
          />
        )}
      </WindowScroller>
    )
  }
}
NowPlayingQueueList.propTypes = {
  itemHeight: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
  items: PropTypes.arrayOf(PropTypes.shape()).isRequired,
}

export default NowPlayingQueueList
