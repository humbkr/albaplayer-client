import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import { queueReplace, queueSetCurrent } from 'modules/player/redux'
import NowPlayingQueueHeader from './NowPlayingQueueHeader'
import NowPlayingQueueList from './NowPlayingQueueList'
import NowPlayingQueueActions from './NowPlayingQueueActions'
import QueueItemContextMenu from './QueueItemContextMenu'

const NowPlayingQueue = ({ theme }) => {
  const { tracks, current } = useSelector((state) => state.queue)
  const dispatch = useDispatch()

  // Add a position info to each playlist element.
  const items = tracks.map((item, index) => ({ ...item, position: index + 1 }))

  const handleUpdateQueue = (newQueue, newCurrent) => {
    dispatch(queueReplace(newQueue))
    dispatch(queueSetCurrent(newCurrent))
  }

  return (
    <>
      <QueueTitle>Queue</QueueTitle>
      <NowPlayingQueueActions />
      <NowPlayingQueueHeader />
      {items.length > 0 && (
        <NowPlayingQueueList
          items={items}
          itemHeight={parseInt(theme.itemHeight, 0)}
          current={current}
          onQueueUpdate={handleUpdateQueue}
        />
      )}
      <QueueItemContextMenu />
    </>
  )
}
NowPlayingQueue.propTypes = {
  theme: PropTypes.objectOf(PropTypes.shape).isRequired,
}

export default withTheme(NowPlayingQueue)

const QueueTitle = styled.h2`
  display: inline;
`
