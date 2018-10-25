import React from 'react'
import PropTypes from 'prop-types'
import VirtualList from 'react-virtual-list'
import NowPlayingQueueItem from './NowPlayingQueueItem'

const NowPlayingQueueList = (props) => {
  const { virtual, itemHeight, current } = props

  return (
    <ul style={virtual.style}>
      {virtual.items.map(item => (
        <NowPlayingQueueItem
          key={item.position}
          item={item}
          itemHeight={itemHeight}
          current={current}
        />
      ))}
    </ul>
  )
}
NowPlayingQueueList.propTypes = {
  virtual: PropTypes.shape().isRequired,
  itemHeight: PropTypes.number.isRequired,
  current: PropTypes.number.isRequired,
}

export default VirtualList()(NowPlayingQueueList)
