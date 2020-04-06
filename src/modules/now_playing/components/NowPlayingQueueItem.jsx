import React from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { MenuProvider as ContextMenuProvider } from 'react-contexify'
import { useDispatch, useSelector } from 'react-redux'
import ActionButtonIcon from 'common/components/ActionButtonIcon'
import {
  playerTogglePlayPause,
  queueRemoveTrack,
  setTrackFromQueue,
} from 'modules/player/redux'

function NowPlayingQueueItem({ item, current, style }) {
  const isPlaying = useSelector((state) => state.player.playing)
  const dispatch = useDispatch()

  const handlePlayBackButton = () => {
    const isCurrent = current + 1 === item.position

    if (isCurrent && isPlaying) {
      // Pause playback.
      dispatch(playerTogglePlayPause(false))
    } else if (isCurrent) {
      // Resume playback.
      dispatch(playerTogglePlayPause(true))
    } else {
      dispatch(setTrackFromQueue(item.position - 1))
      dispatch(playerTogglePlayPause(true))
    }
  }

  const handleRemoveTrack = () => {
    dispatch(queueRemoveTrack(item.position - 1))
  }

  const isCurrent = current + 1 === item.position
  const playbackButtonIcon = isCurrent && isPlaying ? 'pause' : 'play_arrow'

  return (
    <ContextMenuProvider style={style} id="queue-item-context-menu" data={item}>
      <QueueItemWrapper isCurrent={isCurrent}>
        <QueueItemFirstColumn>
          <QueueItemPosition>{item.position}</QueueItemPosition>
          <QueueActionButtonIcon
            icon={playbackButtonIcon}
            onClick={handlePlayBackButton}
          />
        </QueueItemFirstColumn>
        <div>{item.title}</div>
        <QueueItemInfo>{item.artist.name}</QueueItemInfo>
        <QueueItemActions>
          <ActionButtonIcon icon="delete" onClick={handleRemoveTrack} />
        </QueueItemActions>
      </QueueItemWrapper>
    </ContextMenuProvider>
  )
}
NowPlayingQueueItem.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape).isRequired,
  style: PropTypes.shape().isRequired,
  current: PropTypes.number.isRequired,
}

export default NowPlayingQueueItem

// Required to control the div independently.
const QueueItemPosition = styled.div``
const QueueActionButtonIcon = styled(ActionButtonIcon)`
  display: none;
  color: ${(props) => props.theme.buttons.color};

  :hover {
    color: ${(props) => props.theme.buttons.colorHover};
  }
`
const QueueItemActions = styled.div`
  display: none;
  vertical-align: middle;
  text-align: right;
  color: ${(props) => props.theme.textSecondaryColor};
`
const QueueItemWrapper = styled.div`
  display: grid;
  grid-template-columns: 60px 40% auto 44px;
  height: ${(props) => props.theme.itemHeight};
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};
  ${(props) => (props.isCurrent ? 'font-weight: bold' : '')};
  background-color: ${(props) => props.theme.backgroundColor};

  > * {
    align-self: center;
  }

  :hover {
    background-color: ${(props) => props.theme.highlight};

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
  color: ${(props) => props.theme.textSecondaryColor};
`
const QueueItemInfo = styled.div`
  font-weight: normal;
  color: ${(props) => (props.selected
    ? props.theme.textHighlightColor
    : props.theme.textSecondaryColor)};
`
