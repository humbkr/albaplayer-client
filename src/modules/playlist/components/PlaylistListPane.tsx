import React, { FunctionComponent, Ref, useState } from 'react'
import styled from 'styled-components'
import { useDispatch, useSelector } from 'react-redux'
import KeyboardNavPlayPopup from 'common/components/KeyboardNavPlayPopup'
import { addTrack, playTrack } from 'modules/player/redux'
import PlaylistsListHeader from 'modules/playlist/components/PlaylistListHeader'
import PlaylistAddPopup from 'modules/playlist/components/PlaylistAddPopup'
import PlaylistList from 'modules/playlist/components/PlaylistList'
import {
  playlistsSelector,
  playlistCreatePlaylist,
  playlistUpdateInfo,
  playlistSelectPlaylist,
} from 'modules/playlist/redux'
// eslint-disable-next-line import/no-cycle
import PlaylistContextMenu from 'modules/playlist/components/PlaylistContextMenu'
import ListItem from 'modules/playlist/components/ListItem'
import { RootState } from 'store/types'
import Playlist from '../types/Playlist'

interface Props {
  switchPaneHandler: (e: React.KeyboardEvent) => void
}

interface InternalProps extends Props {
  forwardedRef: Ref<HTMLElement>
}

// Playlist edition must be accessible to the children of this component.
const EditPlaylistContext = React.createContext(null)

const PlaylistListPane: FunctionComponent<InternalProps> = ({
  switchPaneHandler,
  forwardedRef,
}) => {
  const [modalPlayerIsOpen, setModalPlayerIsOpen] = useState(false)
  const [modalPlaylistIsOpen, setModalPlaylistIsOpen] = useState(false)
  const [modalPlaylistMode, setModalPlaylistMode] = useState('add')

  const selected = useSelector(
    (state: RootState) => state.playlist.currentPlaylist.playlist
  )
  const currentPosition = useSelector(
    (state: RootState) => state.playlist.currentPlaylist.position
  )
  const playlists = useSelector((state: RootState) => playlistsSelector(state))

  const dispatch = useDispatch()

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.keyCode === 13) {
      setModalPlayerIsOpen(true)
    } else {
      switchPaneHandler(e)
    }
  }

  const handlePlayNow = (trackId: string) => {
    dispatch(playTrack(trackId))
  }
  const handleAddToQueue = (trackId: string) => {
    dispatch(addTrack(trackId))
  }

  const handleCreatePlaylist = (playlist: Playlist) => {
    dispatch(playlistCreatePlaylist(playlist))
  }

  const handleEditPlaylist = (playlist: Playlist) => {
    dispatch(playlistUpdateInfo(playlist))
  }

  const handleSelectPlaylist = (playlist: Playlist, playlistIndex: number) => {
    dispatch(
      playlistSelectPlaylist({ selectedPlaylist: playlist, playlistIndex })
    )
  }

  /**
   * @param mode string
   *   edit|add
   */
  const openPlaylistModal = (mode: string = 'add') => {
    setModalPlaylistIsOpen(true)
    setModalPlaylistMode(mode)
  }

  return (
    <Wrapper>
      <EditPlaylistContext.Provider
        // @ts-ignore
        value={openPlaylistModal}
      >
        <List>
          <PlaylistsListHeader onAddClick={() => openPlaylistModal()} />
          <PlaylistList
            items={playlists}
            currentPosition={currentPosition}
            onItemClick={handleSelectPlaylist}
            onKeyDown={onKeyDown}
            ref={forwardedRef}
          />
          <PlaylistAddPopup
            id="playlist-add-modal"
            onClose={() => setModalPlaylistIsOpen(false)}
            isOpen={modalPlaylistIsOpen}
            mode={modalPlaylistMode}
            playlist={selected}
            onCreatePlaylist={handleCreatePlaylist}
            onEditPlaylist={handleEditPlaylist}
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

export default React.forwardRef<HTMLElement, Props>((props, ref) => (
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
