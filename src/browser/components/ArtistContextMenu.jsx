import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { ContextMenu, Item } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.min.css'
import { addArtist, playArtist } from '../../player/actions'

class ArtistContextMenu extends Component {
  handlePlayNow = (targetNode, ref) => {
    const item = ref.props.item
    this.props.handlePlayNow(item.id)
  }

  handleAddToQueue = (targetNode, ref) => {
    const item = ref.props.item
    this.props.handleAddToQueue(item.id)
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

const mapDispatchToProps = dispatch => ({
  handlePlayNow: artistId => {
    dispatch(playArtist(artistId))
  },
  handleAddToQueue: artistId => {
    dispatch(addArtist(artistId))
  },
})

export default connect(
  null,
  mapDispatchToProps
)(ArtistContextMenu)
