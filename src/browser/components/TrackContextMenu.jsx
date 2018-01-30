import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ContextMenu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css';
import { addTrack, playTrack } from '../../player/actions';


class TrackContextMenu extends Component {
  handlePlayNow = (targetNode, ref) => {
    const item = ref.props.item;
    this.props.handlePlayNow(item.id);
  };

  handleAddToQueue = (targetNode, ref) => {
    const item = ref.props.item;
    this.props.handleAddToQueue(item.id);
  };

  render() {
    return (
      <ContextMenu id="track-context-menu">
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
TrackContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => (
  {
    handlePlayNow: (trackId) => {
      dispatch(playTrack(trackId));
    },
    handleAddToQueue: (trackId) => {
      dispatch(addTrack(trackId));
    },
  }
);


export default connect(
  null,
  mapDispatchToProps,
)(TrackContextMenu);