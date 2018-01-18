import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import HOCAudio from './HOCAudio';
import SongInfo from './SongInfo';
import MainPlayer from './MainPlayer';


const AudioPlayerWrapper = styled.div`
  width: 100%;
`;

class AudioPlayer extends React.PureComponent {
  static propTypes = {
    width: PropTypes.number,
    height: PropTypes.number,
    autoPlay: PropTypes.bool,
    color: PropTypes.string,
    songInfo: PropTypes.shape({
      title: PropTypes.string,
      artist: PropTypes.string,
      cover: PropTypes.string,
      position: PropTypes.number
    }),
    controlStates: PropTypes.shape({
      playing: PropTypes.bool,
      playingState: PropTypes.oneOf([0, 1, 2]),
      volume: PropTypes.number
    }),
    controlCallbacks: PropTypes.shape({
      setVolume: PropTypes.func,
      togglePlayPause: PropTypes.func,
      togglePlayingState: PropTypes.func,
      skipToNext: PropTypes.func,
      skipToPrevious: PropTypes.func
    }),
    timelineStates: PropTypes.shape({
      title: PropTypes.string,
      playing: PropTypes.bool,
      progress: PropTypes.number,
      duration: PropTypes.number
    }),
    timelineCallbacks: PropTypes.shape({
      setProgress: PropTypes.func,
      togglePlayPause: PropTypes.func
    })
  };
  static defaultProps = {
    width: 400,
    height: 300,
    color: '#fff',
    autoPlay: false
  };
  static childContextTypes = {
    color: PropTypes.string
  };

  getChildContext() {
    return { color: this.props.color };
  }

  render() {
    const {
      width,
      songInfo,
      controlStates,
      controlCallbacks,
      timelineStates,
      timelineCallbacks
    } = this.props;

    const height = this.props.height;
    const newStyle = Object.assign({}, {
      width: `${width}px`,
      height: `${height}px`
    }, this.props.style);

    const _width = parseInt(newStyle.width, 0);

    console.log('in AudioPlayer render');
    console.log(this.props.track);

    return (
      <AudioPlayerWrapper>
        <SongInfo
          {...songInfo}
        />
        <MainPlayer
          width={_width}
          controlStates={controlStates}
          controlCallbacks={controlCallbacks}
          timelineStates={timelineStates}
          timelineCallbacks={timelineCallbacks}
        />
      </AudioPlayerWrapper>
    );
  }
}

export default HOCAudio(AudioPlayer);
