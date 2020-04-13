import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Menu as ContextMenu, Item, Submenu, Separator,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { addPlaylist, playPlaylist } from 'modules/player/redux'
import { addPlaylist as addPlaylistToPlaylist } from 'modules/playlist/redux'
// eslint-disable-next-line import/no-cycle
import { RootState } from 'store/types'
import { EditPlaylistContext } from './PlaylistListPane'
import Playlist from '../types/Playlist'

const PlaylistContextMenu = () => {
  const playlists = useSelector((state: RootState) => Object.values(state.playlist.playlists))

  const dispatch = useDispatch()

  // @ts-ignore
  const playlistsItems = playlists.map((item: Playlist) => (
    <Item
      key={item.id}
      onClick={(menuItem) => dispatch(
        addPlaylistToPlaylist({
          playlistId: item.id,
          // @ts-ignore
          playlistToAddId: menuItem.props.id,
        })
      )}
    >
      {item.title}
    </Item>
  ))

  return (
    <EditPlaylistContext.Consumer>
      {(value: any) => (
        <ContextMenu id="playlist-context-menu">
          <Item
            // @ts-ignore
            onClick={(menuItem) => dispatch(playPlaylist(menuItem.props.id))}
          >
            Play now
          </Item>
          <Item
            // @ts-ignore
            onClick={(menuItem) => dispatch(addPlaylist(menuItem.props.id))}
          >
            Add to queue
          </Item>
          <Separator />
          <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
          <Separator />
          <Item onClick={() => value('edit')}>Edit playlist...</Item>
        </ContextMenu>
      )}
    </EditPlaylistContext.Consumer>
  )
}

export default PlaylistContextMenu
