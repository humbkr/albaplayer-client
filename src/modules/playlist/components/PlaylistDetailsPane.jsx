import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import ActionButtonIcon from 'common/components/ActionButtonIcon'
import KeyboardNavPlayPopup from 'common/components/KeyboardNavPlayPopup'
import {
  addTrack,
  playTrack,
  playPlaylist,
  addPlaylist,
} from 'modules/player/redux'
import PlaylistTrackList from './PlaylistTrackList'
import ListItem from './ListItem'
import {
  playlistRemoveTrack,
  playlistSelectTrack,
  playlistUpdateTracks,
  playlistDeletePlaylist,
} from '../redux'
import PlaylistTrackContextMenu from './PlaylistTrackContextMenu'

/**
 * @return {null}
 */
function PlaylistDetailsPane({ switchPaneHandler, forwardedRef }) {
  const [modalIsOpen, setModalIsOpen] = useState(false)

  const item = useSelector((state) => state.playlist.currentPlaylist.playlist)
  const currentPosition = useSelector(
    (state) => state.playlist.currentTrack.position
  )
  const currentTrackId = useSelector((state) => state.playlist.currentTrack.id)

  const dispatch = useDispatch()

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setModalIsOpen(true)
    } else {
      switchPaneHandler(e)
    }
  }

  const handleRemoveTrack = (trackPosition) => {
    dispatch(playlistRemoveTrack({ playlistId: item.id, trackPosition }))
  }

  const handlePlaylistSelectTrack = (trackId, trackIndex) => {
    dispatch(playlistSelectTrack({ trackId, trackIndex }))
  }

  const handlePlaylistUpdateTracklist = (playlistId, newTrackList) => {
    dispatch(playlistUpdateTracks({ playlistId, newTrackList }))
  }

  const handleTrackPlayNow = (trackId) => {
    dispatch(playTrack(trackId))
  }
  const handleTrackAddToQueue = (trackId) => {
    dispatch(addTrack(trackId))
  }

  const handlePlaylistPlayNow = (playlist) => {
    if (playlist.tracks.length > 0) {
      dispatch(playPlaylist(playlist.id))
    }
  }
  const handlePlaylistAddToQueue = (playlist) => {
    if (playlist.tracks.length > 0) {
      dispatch(addPlaylist(playlist.id))
    }
  }

  // If no playlist is selected, display nothing.
  if (!item) {
    return null
  }

  return (
    <Wrapper>
      <List>
        <Header>
          <Info>
            <Title>{item.title}</Title>
            <Subtitle>
              {item.date} - {item.tracks.length} track(s)
            </Subtitle>
          </Info>
          <Actions>
            <PlaylistActionButtons
              icon="play_arrow"
              size={30}
              onClick={() => handlePlaylistPlayNow(item)}
            />
            <PlaylistActionButtons
              icon="playlist_add"
              size={30}
              onClick={() => handlePlaylistAddToQueue(item)}
            />
            <PlaylistActionButtons
              icon="delete"
              size={25}
              onClick={() => {
                if (
                  // eslint-disable-next-line no-alert
                  window.confirm(
                    'Are you sure you wish to delete this playlist?'
                  )
                ) {
                  dispatch(playlistDeletePlaylist(item))
                }
              }}
            />
          </Actions>
        </Header>
        <PlaylistTrackList
          playlistId={item.id}
          items={item.tracks}
          currentPosition={currentPosition}
          onItemClick={handlePlaylistSelectTrack}
          handleRemoveTrack={handleRemoveTrack}
          onTrackListUpdate={handlePlaylistUpdateTracklist}
          onKeyDown={onKeyDown}
          ref={forwardedRef}
        />
        <KeyboardNavPlayPopup
          id="playlist-tracks-nav-modal"
          isOpen={modalIsOpen}
          onClose={() => setModalIsOpen(false)}
          itemId={currentTrackId}
          handlePlayNow={handleTrackPlayNow}
          handleAddToQueue={handleTrackAddToQueue}
        />
      </List>
      <PlaylistTrackContextMenu />
    </Wrapper>
  )
}
PlaylistDetailsPane.propTypes = {
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <PlaylistDetailsPane {...props} forwardedRef={ref} />
))

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 66%;
  height: 100%;

  :focus-within {
    // Can't find a way to manage that directly in the
    // ListItem component.
    ${ListItem}.selected {
      ${(props) => `background-color: ${props.theme.highlightFocus}`};
    }
    ${ListItem} .selected {
      ${(props) => `color: ${props.theme.textHighlightFocusColor}`};
    }
  }
`
const List = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: ${(props) => props.theme.itemHeight};
  border-bottom: 1px solid ${(props) => props.theme.separatorColor};
`
const Actions = styled.div`
  display: inline-block;
`
const PlaylistActionButtons = styled(ActionButtonIcon)`
  color: ${(props) => props.theme.buttons.color};

  :hover {
    color: ${(props) => props.theme.buttons.colorHover};
  }
`
const Info = styled.div`
  display: inline-block;
  padding-left: 15px;
`
const Title = styled.h1`
  font-size: 1.3em;
`
const Subtitle = styled.p`
  font-size: 0.8em;
  margin-top: 2px;
  font-weight: normal;
  color: ${(props) => props.theme.textSecondaryColor};
`
