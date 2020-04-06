import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Menu as ContextMenu, Item, Submenu, Separator,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { addArtist, playArtist } from 'modules/player/redux'
import {
  playlistsSelector,
  addArtist as addArtistToPlaylist,
} from 'modules/playlist/redux'

const ArtistContextMenu = () => {
  const playlists = useSelector((state) => playlistsSelector(state))
  const dispatch = useDispatch()

  const playlistsItems = playlists.map((item) => (
    <Item
      key={item.id}
      onClick={(menuItem) => dispatch(addArtistToPlaylist(item.id, menuItem.props.id))}
    >
      {item.title}
    </Item>
  ))

  return (
    <ContextMenu id="artist-context-menu">
      <Item onClick={(menuItem) => dispatch(playArtist(menuItem.props.id))}>
        Play now
      </Item>
      <Item onClick={(menuItem) => dispatch(addArtist(menuItem.props.id))}>
        Add to queue
      </Item>
      {playlists.length > 0 && <Separator />}
      {playlists.length > 0 && (
        <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
      )}
    </ContextMenu>
  )
}

export default ArtistContextMenu
