import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Menu as ContextMenu, Item, Submenu, Separator,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { addTrack, playTrack } from 'modules/player/redux'
import {
  playlistsSelector,
  addTrack as addTrackToPlaylist,
} from 'modules/playlist/redux'

const TrackContextMenu = () => {
  const playlists = useSelector((state) => playlistsSelector(state))
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
    <ContextMenu id="track-context-menu">
      <Item onClick={(menuItem) => dispatch(playTrack(menuItem.props.id))}>
        Play now
      </Item>
      <Item onClick={(menuItem) => dispatch(addTrack(menuItem.props.id))}>
        Add to queue
      </Item>
      {playlists.length > 0 && <Separator />}
      {playlists.length > 0 && (
        <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
      )}
    </ContextMenu>
  )
}

export default TrackContextMenu
