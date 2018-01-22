import {
  PLAYER_TOGGLE_PLAY_PAUSE, PLAYER_SET_TRACK,
  PLAYER_TOGGLE_SHUFFLE, PLAYER_TOGGLE_REPEAT, PLAYER_REPEAT_NO_REPEAT,
  PLAYER_TOGGLE_VOLUME, PLAYER_SET_DURATION, PLAYER_SET_PROGRESS
} from "./actions";

const initialState = {
  // Controls and audio state.
  playing: false,
  repeat: PLAYER_REPEAT_NO_REPEAT,
  shuffle: false,
  volume: 1,
  volumeMuted : 1,
  duration: 0,
  progress: 0,
  // Track currently loaded in audio.
  track: null,
};

function audioPlayer(state = initialState, action) {
  switch (action.type) {
    case PLAYER_TOGGLE_PLAY_PAUSE:
      return {
        ...state,
        playing: !state.playing
      };
    case PLAYER_TOGGLE_SHUFFLE:
      return {
        ...state,
        shuffle: !state.shuffle
      };
    case PLAYER_TOGGLE_REPEAT:
      return {
        ...state,
        repeat: setCycleNumPos(state.repeat, 1, 3)
      };
    case PLAYER_TOGGLE_VOLUME:
      return {
        ...state,
        // Save current volume.
        volumeMuted: state.volume,
        // If volume > 0 it's not muted, else put the saved value back.
        volume: (state.volume > 0) ? 0 : state.volumeMuted
      };
    case PLAYER_SET_TRACK:
      return {
        ...state,
        track: action.track
      };
    case PLAYER_SET_DURATION:
      return {
        ...state,
        duration: action.duration
      };
    case PLAYER_SET_PROGRESS:
      return {
        ...state,
        progress: action.currentTime
      };
    default:
      return state;
  }
}

/*
 * Calculates the next / previous position in an list of consecutive integers
 * when looping.
 *
 * @param currentPosition integer
 *   The current value in the list.
 * @param change integer
 *   The number of positions you want to switch from. Negative value to go
 *   backward.
 * @param length integer
 *   The length of the list of integers.
 *
 */
function setCycleNumPos(currentValue, change, length) {
  let newPos = currentValue + change;
  if (newPos >= length) {
    newPos -= length;
  }
  if (newPos < 0) {
    newPos += length;
  }
  return newPos;
}

export default audioPlayer;
