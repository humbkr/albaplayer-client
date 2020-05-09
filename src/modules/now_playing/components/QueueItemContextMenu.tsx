import React, { FunctionComponent } from 'react'
import {
  Menu as ContextMenu, Item, Separator, Submenu,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { MenuItemEventHandler } from 'react-contexify/lib/types'
import { useDispatch, useSelector } from 'react-redux'
import {
  setItemFromQueue,
  playerTogglePlayPause,
  queueRemoveTrack,
} from 'modules/player/redux'
import {
  playlistsSelector,
  addTrack as addTrackToPlaylist,
} from 'modules/playlist/redux'
import Playlist from 'modules/playlist/types/Playlist'
import { RootState } from 'store/types'
import Track from '../../../types/Track'

interface MenuItemEventHandlerTrack extends MenuItemEventHandler {
  props: {
    position: number
    track: Track
  }
}

const QueueItemContextMenu: FunctionComponent = () => {
  const playlists: Playlist[] = useSelector((state: RootState) => playlistsSelector(state))
  const dispatch = useDispatch()

  const handlePlayTrack = (position: number) => {
    dispatch(setItemFromQueue(position))
    dispatch(playerTogglePlayPause(true))
  }

  const handleAddTrackToPlaylist = (
    menuItem: MenuItemEventHandlerTrack,
    playlist: Playlist
  ) => {
    dispatch(
      addTrackToPlaylist({
        playlistId: playlist.id,
        trackId: menuItem.props?.track?.id,
      })
    )
  }

  const playlistsItems = playlists.map((item: Playlist) => (
    <Item
      key={item.id}
      // @ts-ignore
      onClick={(menuItem: MenuItemEventHandlerTrack) => handleAddTrackToPlaylist(menuItem, item)}
    >
      {item.title}
    </Item>
  ))

  return (
    <ContextMenu id="queue-item-context-menu">
      <Item
        // @ts-ignore
        onClick={(menuItem: MenuItemEventHandlerTrack) => handlePlayTrack(menuItem.props?.position - 1)}
      >
        Play track
      </Item>
      <Item
        // @ts-ignore
        onClick={(menuItem: MenuItemEventHandlerTrack) => dispatch(queueRemoveTrack(menuItem.props?.position - 1))}
      >
        Remove track from queue
      </Item>
      <Separator />
      <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
    </ContextMenu>
  )
}

export default QueueItemContextMenu
