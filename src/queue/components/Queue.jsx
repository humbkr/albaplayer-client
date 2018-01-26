import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withTheme } from 'styled-components';
import QueueHeader from './QueueHeader';
import QueueList from './QueueList';
import QueueItemContextMenu from './QueueItemContextMenu';


const Queue = (props) => {
  const tracks = props.tracks;

  // Add a position info to each playlist element.
  const items = tracks.map((item, index) => (
    { ...item, position: index + 1 }
  ));

  return (
    <div>
      <QueueHeader />
      { items.length > 0 &&
        <QueueList
          itemHeight={parseInt(props.theme.itemHeight, 0)}
          current={props.current}
        />
      }
      <QueueItemContextMenu />
    </div>
  );
};

Queue.propTypes = {
  theme: PropTypes.objectOf(PropTypes.shape()).isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  current: PropTypes.number,
};
Queue.defaultProps = {
  current: 0,
};

const mapStateToProps = state => (
  {
    tracks: state.queue.tracks,
    current: state.queue.current,
  }
);


export default connect(mapStateToProps)(withTheme(Queue));
