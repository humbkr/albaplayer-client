import React, { Component } from 'react'
import { ContextMenu, Item } from 'react-contexify';
import 'react-contexify/dist/ReactContexify.min.css'
import { queueAddTrack, queuePlayTrack } from "../../queue/actions";
import { connect } from "react-redux";
import PropTypes from "prop-types";


class TrackContextMenu extends Component {
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
      <ContextMenu id='track-context-menu'>
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
TrackContextMenu.propTypes = {
  handlePlayNow: PropTypes.func.isRequired,
  handleAddToQueue: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => {
  return {
    handlePlayNow: trackId => {
      dispatch(queuePlayTrack(trackId))
    },
    handleAddToQueue: trackId => {
      dispatch(queueAddTrack(trackId))
    }
  }
};

export default connect(
  null,
  mapDispatchToProps
)(TrackContextMenu)
