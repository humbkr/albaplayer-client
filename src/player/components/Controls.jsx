import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import * as Buttons from './buttons/index';
import VolumeContainer from './VolumeContainer';

const ControlsMain = styled.div`
  display: table;
  margin: 0 auto 15px;
  
  > * {
    display: table-cell;
    vertical-align: middle;
  }
`;

const ControlsSecondary = styled.div`
  display: table;
  margin: 0 auto;
  width: 100%;
  
  > * {
    display: table-cell;
    vertical-align: middle;
    width: 25%;
    text-align: center;
  }
`;

const Controls = ({
  playing,
  volume,
  playingState,
  setVolume,
  togglePlayPause,
  togglePlayingState,
  skipToNext,
  skipToPrevious,
  volumeOrientationDown
}) => {
  let PlayPauseBtn;
  let PlayingStateBtn;
  switch (playing) {
    case true:
      PlayPauseBtn = Buttons.PauseBtn;
      break;
    case false:
      PlayPauseBtn = Buttons.PlayBtn;
      break;
    default:
      break;
  }
  switch (playingState) {
    case 0:
      PlayingStateBtn = Buttons.CycleBtn;
      break;
    case 1:
      PlayingStateBtn = Buttons.RepeatBtn;
      break;
    case 2:
      PlayingStateBtn = Buttons.ShuffleBtn;
      break;
    default:
      break;
  }
  return (
    <div>
      <ControlsMain>
        <Buttons.SkipPrevBtn onClick={skipToPrevious} />
        <PlayPauseBtn onClick={togglePlayPause} size={45}/>
        <Buttons.SkipNextBtn onClick={skipToNext} />
      </ControlsMain>
      <ControlsSecondary>
        <div>
          <VolumeContainer
            volume={volume}
            setVolume={setVolume}
            volumeOrientationDown={volumeOrientationDown}
          />
        </div>
        <div></div>
        <div></div>
        <div>
          <PlayingStateBtn onClick={togglePlayingState} />
        </div>
      </ControlsSecondary>
    </div>
  );
};
Controls.propTypes = {
  playing: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  playingState: PropTypes.number.isRequired,
  setVolume: PropTypes.func.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  togglePlayingState: PropTypes.func.isRequired,
  skipToNext: PropTypes.func.isRequired,
  skipToPrevious: PropTypes.func.isRequired
};

export default Controls;
