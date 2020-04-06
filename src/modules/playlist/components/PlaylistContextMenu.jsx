import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Menu as ContextMenu, Item, Submenu, Separator,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { addPlaylist, playPlaylist } from 'modules/player/redux'
import { addPlaylist as addPlaylistToPlaylist } from '../redux'
// eslint-disable-next-line import/no-cycle
import { EditPlaylistContext } from './PlaylistListPane'

const PlaylistContextMenu = () => {
  const playlists = useSelector((state) => Object.values(state.playlist.playlists))

  const dispatch = useDispatch()

  const playlistsItems = playlists.map((item) => (
    <Item
      key={item.id}
      onClick={(menuItem) => dispatch(
        addPlaylistToPlaylist({
          playlistId: item.id,
          playlistToAddId: menuItem.props.id,
        })
      )}
    >
      {item.title}
    </Item>
  ))

  return (
    <EditPlaylistContext.Consumer>
      {(value) => (
        <ContextMenu id="playlist-context-menu">
          <Item
            onClick={(menuItem) => dispatch(playPlaylist(menuItem.props.id))}
          >
            Play now
          </Item>
          <Item
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
