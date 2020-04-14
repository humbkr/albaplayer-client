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
      onClick={(menuItem) => dispatch(
        addAlbumToPlaylist({
          playlistId: item.id,
          // @ts-ignore
          albumId: menuItem.props.id,
        })
      )}
    >
      {item.title}
    </Item>
  ))

  return (
    <ContextMenu id="album-context-menu">
      <Item
        // @ts-ignore
        onClick={(menuItem) => dispatch(playAlbum(menuItem.props.id))}
      >
        Play now
      </Item>
      <Item
        // @ts-ignore
        onClick={(menuItem) => dispatch(addAlbum(menuItem.props.id))}
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
