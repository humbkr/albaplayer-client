import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Menu as ContextMenu, Item, Submenu, Separator,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { addAlbum, playAlbum } from 'modules/player/redux'
import {
  playlistsSelector,
  addAlbum as addAlbumToPlaylist,
} from 'modules/playlist/redux'
import { RootState } from 'store/types'

const AlbumContextMenu = () => {
  const playlists = useSelector((state: RootState) => playlistsSelector(state))
  const dispatch = useDispatch()

  const playlistsItems = playlists.map((item) => (
    <Item
      key={item.id}
      onClick={(menuItem: any) => dispatch(
        addAlbumToPlaylist({
          playlistId: item.id,
          albumId: menuItem.props.data.id,
        })
      )}
    >
      {item.title}
    </Item>
  ))

  return (
    <ContextMenu id="album-context-menu">
      <Item
        onClick={(menuItem: any) => dispatch(playAlbum(menuItem.props.data.id))}
      >
        Play now
      </Item>
      <Item
        onClick={(menuItem: any) => dispatch(addAlbum(menuItem.props.data.id))}
      >
        Add to queue
      </Item>
      {playlists.length > 0 && <Separator />}
      {playlists.length > 0 && (
        <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
      )}
    </ContextMenu>
  )
}

export default AlbumContextMenu
