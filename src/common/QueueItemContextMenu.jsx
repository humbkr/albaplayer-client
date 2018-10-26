import React, { Component } from 'react'
import { ContextMenu, Item } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { playerTogglePlayPause } from '../player/actionsPlayer'
import { queueRemoveTrack } from '../player/actionsQueue'
import { setTrackFromQueue } from '../player/actions'

class QueueItemContextMenu extends Component {
  handlePlayTrack = ({ dataFromProvider }) => {
    // Position is the position to display so it starts ar 1,
    // bit the position in the state queue starts from 0.
    this.props.handlePlayTrack(dataFromProvider.position - 1)
  }

  handleRemoveTrack = ({ dataFromProvider }) => {
    // Position is the position to display so it starts ar 1,
    // bit the position in the state queue starts from 0.
    this.props.handleRemoveTrack(dataFromProvider.position - 1)
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

const mapDispatchToProps = dispatch => ({
  handlePlayTrack: (position) => {
    dispatch(setTrackFromQueue(position))
    dispatch(playerTogglePlayPause(true))
  },
  handleRemoveTrack: (position) => {
    dispatch(queueRemoveTrack(position))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(QueueItemContextMenu)
