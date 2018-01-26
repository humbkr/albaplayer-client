import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { ContextMenu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import { addAlbum, playAlbum } from '../../queue/actions';


class AlbumContextMenu extends Component {
  handlePlayNow = (targetNode, ref) => {
    this.props.handlePlayNow(ref.props.item.id);
  };

  handleAddToQueue = (targetNode, ref) => {
    this.props.handleAddToQueue(ref.props.item.id);
  };

  render() {
    return (
      <ContextMenu id="album-context-menu">
        <Item onClick={this.handlePlayNow}>
          Play now
        </Item>
        <Item onClick={this.handleAddToQueue}>
          Add to queue
        </Item>
      </ContextMenu>
    );
  }
}
AlbumContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    handlePlayNow: (albumId) => {
      dispatch(playAlbum(albumId));
    },
    handleAddToQueue: (albumId) => {
      dispatch(addAlbum(albumId));
    },
  }
);

export default connect(
  null,
  mapDispatchToProps,
)(AlbumContextMenu);
