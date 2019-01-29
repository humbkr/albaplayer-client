import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Menu as ContextMenu, Item, Submenu, Separator,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { operations } from '../../player/duck'
import { actions as playlistActions } from '../duck'
import { EditPlaylistContext } from './PlaylistListPane'

const PlaylistContextMenu = (props) => {
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
    <EditPlaylistContext.Consumer>
      {(value) => (
        <ContextMenu id="playlist-context-menu">
          <Item onClick={(menuItem) => handlePlayNow(menuItem.props.id)}>
            Play now
          </Item>
          <Item onClick={(menuItem) => handleAddToQueue(menuItem.props.id)}>
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
PlaylistContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape).isRequired,
  handleAddToPlaylist: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  playlists: Object.values(state.playlist.playlists),
})

const mapDispatchToProps = (dispatch) => ({
  handlePlayNow: (playlistId) => {
    dispatch(operations.playPlaylist(playlistId))
  },
  handleAddToQueue: (playlistId) => {
    dispatch(operations.addPlaylist(playlistId))
  },
  handleAddToPlaylist: (toAddId, toAddToId) => {
    dispatch(playlistActions.playlistAddPlaylist(toAddId, toAddToId))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaylistContextMenu)
