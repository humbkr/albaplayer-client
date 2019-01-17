import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { Menu as ContextMenu, Item } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { operations } from '../../player/duck'

class AlbumContextMenu extends Component {
  handlePlayNow = ({ props }) => {
    this.props.handlePlayNow(props.id)
  }

  handleAddToQueue = ({ props }) => {
    this.props.handleAddToQueue(props.id)
  }

  render() {
    return (
      <ContextMenu id="album-context-menu">
        <Item onClick={this.handlePlayNow}>Play now</Item>
        <Item onClick={this.handleAddToQueue}>Add to queue</Item>
      </ContextMenu>
    )
  }
}
AlbumContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  handlePlayNow: (albumId) => {
    dispatch(operations.playAlbum(albumId))
  },
  handleAddToQueue: (albumId) => {
    dispatch(operations.addAlbum(albumId))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(AlbumContextMenu)
