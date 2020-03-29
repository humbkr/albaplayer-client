import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Menu as ContextMenu, Item, Submenu, Separator,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { operations } from '../../player/duck'
import {
  actions as playlistActions,
  selectors as playlistSelectors,
} from '../../playlist/duck'

const ArtistContextMenu = (props) => {
  const {
    handlePlayNow,
    handleAddToQueue,
    playlists,
    handleAddToPlaylist,
  } = props
  const playlistsItems = playlists.map((item) => (
    <Item
      key={item.id}
      onClick={(menuItem) => handleAddToPlaylist(item.id, menuItem.props.id)}
    >
      {item.title}
    </Item>
  ))

  return (
    <ContextMenu id="artist-context-menu">
      <Item onClick={(menuItem) => handlePlayNow(menuItem.props.id)}>
        Play now
      </Item>
      <Item onClick={(menuItem) => handleAddToQueue(menuItem.props.id)}>
        Add to queue
      </Item>
      {playlists.length > 0 && (
        <>
          <Separator />
          <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
        </>
      )}
    </ContextMenu>
  )
}
ArtistContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleAddToPlaylist: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  playlists: playlistSelectors.getPlaylists(state),
})

const mapDispatchToProps = (dispatch) => ({
  handlePlayNow: (artistId) => {
    dispatch(operations.playArtist(artistId))
  },
  handleAddToQueue: (artistId) => {
    dispatch(operations.addArtist(artistId))
  },
  handleAddToPlaylist: (playlistId, artistId) => {
    dispatch(playlistActions.playlistAddArtist(playlistId, artistId))
  },
})

export default connect(mapStateToProps, mapDispatchToProps)(ArtistContextMenu)
