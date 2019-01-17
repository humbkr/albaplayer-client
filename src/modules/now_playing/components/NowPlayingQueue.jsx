import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import styled, { withTheme } from 'styled-components'
import NowPlayingQueueHeader from './NowPlayingQueueHeader'
import NowPlayingQueueList from './NowPlayingQueueList'
import NowPlayingQueueActions from './NowPlayingQueueActions'
import QueueItemContextMenu from '../../../common/components/QueueItemContextMenu'
import { actions } from '../../player/duck'

const QueueTitle = styled.h2`
  display: inline;
`

const NowPlayingQueue = (props) => {
  const { tracks, current, handleUpdateQueue } = props

  // Add a position info to each playlist element.
  const items = tracks.map((item, index) => ({ ...item, position: index + 1 }))

  return (
    <React.Fragment>
      <QueueTitle>Queue</QueueTitle>
      <NowPlayingQueueActions />
      <NowPlayingQueueHeader />
      {items.length > 0 && (
        <NowPlayingQueueList
          items={items}
          itemHeight={parseInt(props.theme.itemHeight, 0)}
          current={current}
          onQueueUpdate={handleUpdateQueue}
        />
      )}
      <QueueItemContextMenu />
    </React.Fragment>
  )
}
NowPlayingQueue.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  tracks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    })
  ).isRequired,
  current: PropTypes.number,
  handleUpdateQueue: PropTypes.func.isRequired,
}
NowPlayingQueue.defaultProps = {
  current: 0,
}

const mapStateToProps = (state) => ({
  tracks: state.queue.tracks,
  current: state.queue.current,
})
const mapDispatchToProps = (dispatch) => ({
  handleUpdateQueue: (newQueue, newCurrent) => {
    dispatch(actions.queueUpdate(newQueue))
    dispatch(actions.queueSetCurrent(newCurrent))
  },
})

export default withTheme(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(NowPlayingQueue)
)
