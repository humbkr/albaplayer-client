import React from 'react';
import PropTypes from 'prop-types';
import styled, { withTheme } from "styled-components";
import TrackInfo from "./TrackInfo";
import Controls from "./Controls";
import Audio from "./Audio";
import Timeline from "./Timeline";


const PlayerWrapper = styled.div`
  width: 100%;
`;

class Player extends React.Component {
  getChildContext() {
    return {
      // For controls buttons.
      color: "#fff",
      colorEnabled: "#f97c4b",
    };
  }

  constructor(props) {
    super(props);
    this.state = { progressTime: 0 };
    this.updateProgressTime = this.updateProgressTime.bind(this);
  }
  componentWillReceiveProps(newProps) {
    this.setState({ progressTime: newProps.timelineState.progress });
  }
  updateProgressTime(progressTime) {
    this.setState({ progressTime });
  }

  render() {
    const {
      track,
      // Properties added by the Audio HOC.
      timelineState,
      timelineCallbacks,
      controlState,
      controlCallbacks,
    } = this.props;

    return (
      <PlayerWrapper>
        <TrackInfo track={track}/>
        <Timeline
          appWidth={parseInt(this.props.theme.sidebar.width, 0)}
          updateProgressTime={this.updateProgressTime}
          {...timelineState}
          {...timelineCallbacks}
        />
        <Controls
          {...controlState}
          {...controlCallbacks}
        />
      </PlayerWrapper>
    );
  }
}
Player.propTypes = {
  track: PropTypes.object,
  controlState: PropTypes.shape({
    playing: PropTypes.bool.isRequired,
    shuffle: PropTypes.bool.isRequired,
    repeat: PropTypes.number.isRequired,
    volume: PropTypes.number.isRequired,
  }),
  controlCallbacks: PropTypes.shape({
    togglePlayPause: PropTypes.func.isRequired,
    toggleRepeat: PropTypes.func.isRequired,
    toggleVolume: PropTypes.func.isRequired,
    skipToPrevious: PropTypes.func.isRequired,
    skipToNext: PropTypes.func.isRequired,

  }),
};
Player.childContextTypes = {
  color: PropTypes.string,
  colorEnabled: PropTypes.string
};


export default Audio(withTheme(Player));
