import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Menu as ContextMenu, Item, Submenu, Separator,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { addTrack, playTrack } from 'modules/player/redux'
import {
  playlistsSelector,
  playlistRemoveTrack,
  addTrack as addTrackToPlaylist,
} from '../redux'

const PlaylistTrackContextMenu = () => {
  const playlists = useSelector((state) => playlistsSelector(state))
  const currentPlaylist = useSelector(
    (state) => state.playlist.currentPlaylist.playlist
  )

  const dispatch = useDispatch()

  const playlistsItems = playlists.map((item) => (
    <Item
      key={item.id}
      onClick={(menuItem) => dispatch(
        addTrackToPlaylist({
          playlistId: item.id,
          trackId: menuItem.props.id,
        })
      )}
    >
      {item.title}
    </Item>
  ))

  return (
    <ContextMenu id="playlist-track-context-menu">
      <Item onClick={(menuItem) => dispatch(playTrack(menuItem.props.id))}>
        Play now
      </Item>
      <Item onClick={(menuItem) => dispatch(addTrack(menuItem.props.id))}>
        Add to queue
      </Item>
      <Separator />
      <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
      <Separator />
      <Item
        onClick={(menuItem) => dispatch(
          playlistRemoveTrack(currentPlaylist.id, menuItem.props.position)
        )}
      >
        Remove from playlist
      </Item>
    </ContextMenu>
  )
}

export default PlaylistTrackContextMenu
