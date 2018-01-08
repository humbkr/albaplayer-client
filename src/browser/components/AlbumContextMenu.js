import React, { Component } from 'react'
import { ContextMenu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'
import { queueAddAlbum, queuePlayAlbum } from "../../queue/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class AlbumContextMenu extends Component {
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
      <ContextMenu id='album-context-menu'>
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
AlbumContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    handlePlayNow: albumId => {
      dispatch(queuePlayAlbum(albumId))
    },
    handleAddToQueue: albumId => {
      dispatch(queueAddAlbum(albumId))
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(AlbumContextMenu)
