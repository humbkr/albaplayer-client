import React from 'react';
import PropTypes from 'prop-types';
import styled from "styled-components";
import * as Buttons from './buttons/index';
import {
  PLAYER_REPEAT_LOOP_ALL, PLAYER_REPEAT_LOOP_ONE,
  PLAYER_REPEAT_NO_REPEAT
} from "../actions";

const ControlsWrapper = styled.div`
  margin: 10px 0;
`;

const ControlsPrimary = styled.div`
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
  togglePlayPause,
  shuffle,
  toggleShuffle,
  repeat,
  toggleRepeat,
  volume,
  toggleVolume,
  skipToNext,
  skipToPrevious,
}) => {

  let PlayPauseButton;
  switch (playing) {
    case true:
      PlayPauseButton = Buttons.PauseBtn;
      break;
    case false:
      PlayPauseButton = Buttons.PlayBtn;
      break;
    default:
      break;
  }

  let RepeatButton;
  let repeatButtonEnabled = false;
  switch (repeat) {
    case PLAYER_REPEAT_NO_REPEAT:
      RepeatButton = Buttons.CycleBtn;
      break;
    case PLAYER_REPEAT_LOOP_ALL:
      RepeatButton = Buttons.CycleBtn;
      repeatButtonEnabled = true;
      break;
    case PLAYER_REPEAT_LOOP_ONE:
      RepeatButton = Buttons.RepeatBtn;
      repeatButtonEnabled = true;
      break;
    default:
      break;
  }

  let VolumeButton;
  if (volume > 0) {
    if (volume > 0.5) {
      VolumeButton = Buttons.VolumeHighBtn;
    } else {
      VolumeButton = Buttons.VolumeLowBtn;
    }
  } else {
    VolumeButton = Buttons.VolumeMutedBtn;
  }

  return (
    <ControlsWrapper>
      <ControlsPrimary>
        <Buttons.SkipPrevBtn onClick={skipToPrevious} />
        <PlayPauseButton onClick={togglePlayPause} size={45} />
        <Buttons.SkipNextBtn onClick={skipToNext} />
      </ControlsPrimary>
      <ControlsSecondary>
        <div><VolumeButton onClick={toggleVolume} size={22} /></div>
        <div><RepeatButton onClick={toggleRepeat} enabled={repeatButtonEnabled} /></div>
        <div><Buttons.ShuffleBtn onClick={toggleShuffle} enabled={shuffle} /></div>
        <div></div>
      </ControlsSecondary>
    </ControlsWrapper>
  );
};
Controls.propTypes = {
  playing: PropTypes.bool.isRequired,
  shuffle: PropTypes.bool.isRequired,
  togglePlayPause: PropTypes.func.isRequired,
  skipToNext: PropTypes.func.isRequired,
  skipToPrevious: PropTypes.func.isRequired
};

export default Controls;
