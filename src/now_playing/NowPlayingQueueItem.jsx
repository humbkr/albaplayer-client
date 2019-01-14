import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'
import { connect } from 'react-redux'
import ActionButtonIcon from '../common/ActionButtonIcon'
import { setTrackFromQueue } from '../player/actions'
import { playerTogglePlayPause } from '../player/actionsPlayer'
import { queueRemoveTrack } from '../player/actionsQueue'

// Required to control the div independently.
const QueueItemPosition = styled.div``

const QueueActionButtonIcon = styled(ActionButtonIcon)`
  display: none;
  color: ${props => props.theme.buttons.color};

  :hover {
    color: ${props => props.theme.buttons.colorHover};
  }
`

const QueueItemActions = styled.div`
  display: none;
  vertical-align: middle;
  text-align: right;
  color: ${props => props.theme.textSecondaryColor};
`

const QueueItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px 40% auto 44px;
  height: ${props => props.theme.itemHeight};
  border-bottom: 1px solid ${props => props.theme.separatorColor};
  ${props => (props.isCurrent ? 'font-weight: bold' : '')};

  > * {
    align-self: center;
  }

  :hover {
    background-color: ${props => props.theme.highlight};

    ${QueueItemPosition} {
      display: none;
    }

    ${QueueActionButtonIcon}, ${QueueItemActions} {
      display: block;
    }
  }
`

const QueueItemFirstColumn = styled.div`
  justify-self: center;
  color: ${props => props.theme.textSecondaryColor};
`

const QueueItemInfo = styled.div`
  font-weight: normal;
  color: ${props => props.selected
    ? props.theme.textHighlightColor
    : props.theme.textSecondaryColor};
`

class NowPlayingQueueItem extends React.Component {
  handlePlayBackButton = () => {
    const {
      item,
      current,
      isPlaying,
      handlePlayNewTrack,
      handleSetPlayback,
    } = this.props
    const isCurrent = current + 1 === item.position

    if (isCurrent && isPlaying) {
      // Pause playback.
      handleSetPlayback(false)
    } else if (isCurrent) {
      // Resume playback.
      handleSetPlayback(true)
    } else {
      handlePlayNewTrack(item.position - 1)
    }
  }

  handleRemoveTrack = () => {
    this.props.handleRemoveTrack(this.props.item.position - 1)
  }

  render() {
    const {
      item, current, style, isPlaying,
    } = this.props
    const isCurrent = current + 1 === item.position
    const playbackButtonIcon = isCurrent && isPlaying ? 'pause' : 'play_arrow'

    return (
      <ContextMenuProvider
        style={style}
        id="queue-item-context-menu"
        data={item}
      >
        <QueueItemWrapper isCurrent={isCurrent}>
          <QueueItemFirstColumn>
            <QueueItemPosition>{item.position}</QueueItemPosition>
            <QueueActionButtonIcon
              icon={playbackButtonIcon}
              onClick={this.handlePlayBackButton}
            />
          </QueueItemFirstColumn>
          <div>{item.title}</div>
          <QueueItemInfo>{item.artist.name}</QueueItemInfo>
          <QueueItemActions>
            <ActionButtonIcon icon="delete" onClick={this.handleRemoveTrack} />
          </QueueItemActions>
        </QueueItemWrapper>
      </ContextMenuProvider>
    )
  }
}
NowPlayingQueueItem.propTypes = {
  item: PropTypes.shape({
    position: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
  }).isRequired,
  style: PropTypes.shape().isRequired,
  current: PropTypes.number.isRequired,
  handleSetPlayback: PropTypes.func.isRequired,
  handlePlayNewTrack: PropTypes.func.isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
  isPlaying: PropTypes.bool.isRequired,
}

const mapStateToProps = state => ({
  isPlaying: state.player.playing,
  library: state.library,
})

const mapDispatchToProps = dispatch => ({
  handleSetPlayback: (value) => {
    dispatch(playerTogglePlayPause(value))
  },
  handlePlayNewTrack: (position) => {
    dispatch(setTrackFromQueue(position))
    dispatch(playerTogglePlayPause(true))
  },
  handleRemoveTrack: (position) => {
    dispatch(queueRemoveTrack(position))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(NowPlayingQueueItem)
