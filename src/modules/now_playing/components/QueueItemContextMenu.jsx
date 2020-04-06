import React from 'react'
import {
  Menu as ContextMenu, Item, Separator, Submenu,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { useDispatch, useSelector } from 'react-redux'
import {
  setTrackFromQueue,
  playerTogglePlayPause,
  queueRemoveTrack,
} from 'modules/player/redux'
import {
  playlistsSelector,
  addTrack as addTrackToPlaylist,
} from 'modules/playlist/redux'

const QueueItemContextMenu = () => {
  const playlists = useSelector((state) => playlistsSelector(state))
  const dispatch = useDispatch()

  const handlePlayTrack = (position) => {
    dispatch(setTrackFromQueue(position))
    dispatch(playerTogglePlayPause(true))
  }

  const playlistsItems = playlists.map((item) => (
    <Item
      key={item.id}
      onClick={(menuItem) => dispatch(addTrackToPlaylist(item.id, menuItem.props.id))}
    >
      {item.title}
    </Item>
  ))

  return (
    <ContextMenu id="queue-item-context-menu">
      <Item
        onClick={(menuItem) => handlePlayTrack(menuItem.props.position - 1)}
      >
        Play track
      </Item>
      <Item
        onClick={(menuItem) => dispatch(queueRemoveTrack(menuItem.props.position - 1))}
      >
        Remove track from queue
      </Item>
      <Separator />
      <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
    </ContextMenu>
  )
}

export default QueueItemContextMenu
