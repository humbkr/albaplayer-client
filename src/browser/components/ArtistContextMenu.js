import React, { Component } from 'react'
import { ContextMenu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'
import { addArtist, playArtist } from "../../queue/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class ArtistContextMenu extends Component {
  constructor(props) {
    super(props);

    this.handlePlayNow = this.handlePlayNow.bind(this);
    this.handleAddToQueue = this.handleAddToQueue.bind(this);
  }

  handlePlayNow(targetNode, ref, data) {
    const item = ref.props.item;
    this.props.handlePlayNow(item.id);
  }

  handleAddToQueue(targetNode, ref, data) {
    const item = ref.props.item;
    this.props.handleAddToQueue(item.id);
  }

  render() {
    return (
      <ContextMenu id='artist-context-menu'>
        <Item onClick={this.handlePlayNow}>
          Play now
        </Item>
        <Item onClick={this.handleAddToQueue}>
          Add to queue
        </Item>
      </ContextMenu>
    )
  }
}
ArtistContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    handlePlayNow: artistId => {
      dispatch(playArtist(artistId))
    },
    handleAddToQueue: artistId => {
      dispatch(addArtist(artistId))
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(ArtistContextMenu)
