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
} from 'modules/playlist/redux'
import { RootState } from 'store/types'

const PlaylistTrackContextMenu = () => {
  const playlists = useSelector((state: RootState) => playlistsSelector(state))
  const currentPlaylist = useSelector(
    (state: RootState) => state.playlist.currentPlaylist.playlist
  )

  const dispatch = useDispatch()

  const playlistsItems = playlists.map((item) => (
    <Item
      key={item.id}
      onClick={(menuItem) => dispatch(
        addTrackToPlaylist({
          playlistId: item.id,
          // @ts-ignore
          trackId: menuItem.props.id,
        })
      )}
    >
      {item.title}
    </Item>
  ))

  return (
    <ContextMenu id="playlist-track-context-menu">
      <Item
        // @ts-ignore
        onClick={(menuItem) => dispatch(playTrack(menuItem.props.data.track.id))}
      >
        Play now
      </Item>
      <Item
        // @ts-ignore
        onClick={(menuItem) => dispatch(addTrack(menuItem.props.data.track.id))}
      >
        Add to queue
      </Item>
      <Separator />
      <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
      <Separator />
      <Item
        onClick={(menuItem) => dispatch(
          // @ts-ignore
          playlistRemoveTrack(
            currentPlaylist.id,
            menuItem.props.data.position
          )
        )}
      >
        Remove from playlist
      </Item>
    </ContextMenu>
  )
}

export default PlaylistTrackContextMenu
