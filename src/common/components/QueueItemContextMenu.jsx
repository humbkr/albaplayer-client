import React, { Component } from 'react'
import { Menu as ContextMenu, Item } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { actions, operations } from '../../modules/player/duck'

class QueueItemContextMenu extends Component {
  handlePlayTrack = ({ props }) => {
    // Position is the position to display so it starts ar 1,
    // bit the position in the state queue starts from 0.
    this.props.handlePlayTrack(props.position - 1)
  }

  handleRemoveTrack = ({ props }) => {
    // Position is the position to display so it starts ar 1,
    // bit the position in the state queue starts from 0.
    this.props.handleRemoveTrack(props.position - 1)
  }

  render() {
    return (
      <ContextMenu id="queue-item-context-menu">
        <Item onClick={this.handlePlayTrack}>Play track</Item>
        <Item onClick={this.handleRemoveTrack}>Remove track from queue</Item>
      </ContextMenu>
    )
  }
}
QueueItemContextMenu.propTypes = {
  handlePlayTrack: PropTypes.func.isRequired,
  handleRemoveTrack: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  handlePlayTrack: (position) => {
    dispatch(operations.setTrackFromQueue(position))
    dispatch(actions.playerTogglePlayPause(true))
  },
  handleRemoveTrack: (position) => {
    dispatch(actions.queueRemoveTrack(position))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(QueueItemContextMenu)
