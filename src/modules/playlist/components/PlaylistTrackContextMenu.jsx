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
} from '../duck'

const PlaylistTrackContextMenu = (props) => {
  const {
    handlePlayNow,
    handleAddToQueue,
    playlists,
    handleAddToPlaylist,
    playlistRemoveTrack,
    currentPlaylist,
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
    <ContextMenu id="playlist-track-context-menu">
      <Item onClick={(menuItem) => handlePlayNow(menuItem.props.id)}>
        Play now
      </Item>
      <Item onClick={(menuItem) => handleAddToQueue(menuItem.props.id)}>
        Add to queue
      </Item>
      <Separator />
      <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
      <Separator />
      <Item
        onClick={(menuItem) => playlistRemoveTrack(currentPlaylist.id, menuItem.props.position)
        }
      >
        Remove from playlist
      </Item>
    </ContextMenu>
  )
}
PlaylistTrackContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleAddToPlaylist: PropTypes.func.isRequired,
  playlistRemoveTrack: PropTypes.func.isRequired,
  currentPlaylist: PropTypes.objectOf(PropTypes.shape).isRequired,
}

const mapStateToProps = (state) => ({
  playlists: playlistSelectors.getPlaylists(state),
  currentPlaylist: state.playlist.currentPlaylist.playlist,
})
const mapDispatchToProps = (dispatch) => ({
  handlePlayNow: (trackId) => {
    dispatch(operations.playTrack(trackId))
  },
  handleAddToQueue: (trackId) => {
    dispatch(operations.addTrack(trackId))
  },
  handleAddToPlaylist: (playlistId, trackId) => {
    dispatch(playlistActions.playlistAddTrack(playlistId, trackId))
  },
  playlistRemoveTrack: (playlistId, trackId) => {
    dispatch(playlistActions.playlistRemoveTrack(playlistId, trackId))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistTrackContextMenu)
