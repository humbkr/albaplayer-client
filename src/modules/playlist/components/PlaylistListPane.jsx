import React, { useState } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import KeyboardNavPlayPopup from 'common/components/KeyboardNavPlayPopup'
import { addTrack, playTrack } from 'modules/player/redux'
import PlaylistsListHeader from './PlaylistListHeader'
import PlaylistAddPopup from './PlaylistAddPopup'
import PlaylistList from './PlaylistList'
import {
  playlistsSelector,
  playlistCreatePlaylist,
  playlistUpdateInfo,
  playlistSelectPlaylist,
} from '../redux'
// eslint-disable-next-line import/no-cycle
import PlaylistContextMenu from './PlaylistContextMenu'
import ListItem from './ListItem'

// Playlist edition must be accessible to the children of this component.
const EditPlaylistContext = React.createContext()

function PlaylistListPane({ switchPaneHandler, forwardedRef }) {
  const [modalPlayerIsOpen, setModalPlayerIsOpen] = useState(false)
  const [modalPlaylistIsOpen, setModalPlaylistIsOpen] = useState(false)
  const [modalPlaylistMode, setModalPlaylistMode] = useState(null)

  const selected = useSelector(
    (state) => state.playlist.currentPlaylist.playlist
  )
  const currentPosition = useSelector(
    (state) => state.playlist.currentPlaylist.position
  )
  const playlists = useSelector((state) => playlistsSelector(state))

  const dispatch = useDispatch()

  const onKeyDown = (e) => {
    if (e.keyCode === 13) {
      setModalPlayerIsOpen(true)
    } else {
      switchPaneHandler(e)
    }
  }

  const handlePlayNow = (trackId) => {
    dispatch(playTrack(trackId))
  }
  const handleAddToQueue = (trackId) => {
    dispatch(addTrack(trackId))
  }

  const handleCreatePlaylist = (playlist) => {
    dispatch(playlistCreatePlaylist(playlist))
  }

  const handleEditPlaylist = (playlist) => {
    dispatch(playlistUpdateInfo(playlist))
  }

  const handleSelectPlaylist = (playlist, playlistIndex) => {
    dispatch(
      playlistSelectPlaylist({ selectedPlaylist: playlist, playlistIndex })
    )
  }

  /**
   * @param mode string
   *   edit|add
   */
  const openPlaylistModal = (mode) => {
    setModalPlaylistIsOpen(true)
    setModalPlaylistMode(mode)
  }

  return (
    <Wrapper>
      <EditPlaylistContext.Provider value={openPlaylistModal}>
        <List>
          <PlaylistsListHeader onAddClick={() => openPlaylistModal()} />
          <PlaylistList
            items={playlists}
            selected={selected}
            currentPosition={currentPosition}
            onItemClick={handleSelectPlaylist}
            onKeyDown={onKeyDown}
            onEditPlaylist={openPlaylistModal}
            ref={forwardedRef}
          />
          <PlaylistAddPopup
            id="playlist-add-modal"
            onClose={() => setModalPlaylistIsOpen(false)}
            isOpen={modalPlaylistIsOpen}
            mode={modalPlaylistMode}
            playlist={selected}
            handleCreatePlaylist={handleCreatePlaylist}
            handleEditPlaylist={handleEditPlaylist}
          />
          <KeyboardNavPlayPopup
            id="playlists-nav-modal"
            isOpen={modalPlayerIsOpen}
            onClose={() => setModalPlayerIsOpen(false)}
            itemId={selected ? selected.id : null}
            handlePlayNow={handlePlayNow}
            handleAddToQueue={handleAddToQueue}
          />
        </List>
        <PlaylistContextMenu />
      </EditPlaylistContext.Provider>
    </Wrapper>
  )
}
PlaylistListPane.propTypes = {
  switchPaneHandler: PropTypes.func.isRequired,
  forwardedRef: PropTypes.shape().isRequired,
}

export default React.forwardRef((props, ref) => (
  // eslint-disable-next-line react/jsx-props-no-spreading
  <PlaylistListPane {...props} forwardedRef={ref} />
))

export { EditPlaylistContext }

const Wrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 34%;
  height: 100%;
  border-right: 1px solid ${(props) => props.theme.separatorColor};

  :focus-within {
    // Can't find a way to manage that directly in the
    // ListItem component.
    ${ListItem}.selected {
      ${(props) => `background-color: ${props.theme.highlightFocus}`};
    }
  }
`
const List = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`
