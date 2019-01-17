import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Menu as ContextMenu, Item } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { operations } from '../../player/duck'

class ArtistContextMenu extends Component {
  handlePlayNow = ({ props }) => {
    this.props.handlePlayNow(props.id)
  }

  handleAddToQueue = ({ props }) => {
    this.props.handleAddToQueue(props.id)
  }

  render() {
    return (
      <ContextMenu id="artist-context-menu">
        <Item onClick={this.handlePlayNow}>Play now</Item>
        <Item onClick={this.handleAddToQueue}>Add to queue</Item>
      </ContextMenu>
    )
  }
}
ArtistContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  handlePlayNow: (artistId) => {
    dispatch(operations.playArtist(artistId))
  },
  handleAddToQueue: (artistId) => {
    dispatch(operations.addArtist(artistId))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(ArtistContextMenu)
