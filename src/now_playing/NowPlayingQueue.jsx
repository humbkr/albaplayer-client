import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled, { withTheme } from 'styled-components';
import NowPlayingQueueHeader from './NowPlayingQueueHeader';
import NowPlayingQueueList from './NowPlayingQueueList';
import NowPlayingQueueActions from './NowPlayingQueueActions';
import QueueItemContextMenu from '../common/QueueItemContextMenu';

const QueueTitle = styled.h2`
  display: inline;
`;

const NowPlayingQueue = (props) => {
  const tracks = props.tracks;

  // Add a position info to each playlist element.
  const items = tracks.map((item, index) => (
    { ...item, position: index + 1 }
  ));

  return (
    <div>
      <QueueTitle>Queue</QueueTitle>
      <NowPlayingQueueActions />
      <NowPlayingQueueHeader />
      { items.length > 0 &&
        <NowPlayingQueueList
          items={items}
          itemHeight={parseInt(props.theme.itemHeight, 0)}
          current={props.current}
        />
      }
      <QueueItemContextMenu />
    </div>
  );
};

NowPlayingQueue.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  theme: PropTypes.object.isRequired,
  tracks: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
  })).isRequired,
  current: PropTypes.number,
};
NowPlayingQueue.defaultProps = {
  current: 0,
};

const mapStateToProps = state => (
  {
    tracks: state.queue.tracks,
    current: state.queue.current,
  }
);


export default connect(mapStateToProps)(withTheme(NowPlayingQueue));
