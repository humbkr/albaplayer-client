import React from 'react'
import {
  Menu as ContextMenu, Item, Separator, Submenu,
} from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions, operations } from '../../player/duck/index'
import {
  actions as playlistActions,
  selectors as playlistSelectors,
} from '../../playlist/duck'

const QueueItemContextMenu = ({
  handlePlayTrack,
  handleRemoveTrack,
  handleAddToPlaylist,
  playlists,
}) => {
  const playlistsItems = playlists.map((item) => (
    <Item
      key={item.id}
      onClick={(menuItem) => handleAddToPlaylist(item.id, menuItem.props.id)}
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
        onClick={(menuItem) => handleRemoveTrack(menuItem.props.position - 1)}
      >
        Remove track from queue
      </Item>
      <Separator />
      <Submenu label="Add to playlist...">{playlistsItems}</Submenu>
    </ContextMenu>
  )
}
QueueItemContextMenu.propTypes = {
  handlePlayTrack: PropTypes.func.isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
  handleAddToPlaylist: PropTypes.func.isRequired,
  playlists: PropTypes.arrayOf(PropTypes.shape).isRequired,
}

const mapStateToProps = (state) => ({
  playlists: playlistSelectors.getPlaylists(state),
})
const mapDispatchToProps = (dispatch) => ({
  handlePlayTrack: (position) => {
    dispatch(operations.setTrackFromQueue(position))
    dispatch(actions.playerTogglePlayPause(true))
  },
  handleRemoveTrack: (position) => {
    dispatch(actions.queueRemoveTrack(position))
  },
  handleAddToPlaylist: (playlistId, trackId) => {
    dispatch(playlistActions.playlistAddTrack(playlistId, trackId))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QueueItemContextMenu)
