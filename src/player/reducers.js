import {

} from "./actions"
import {
  PLAYER_TOGGLE_PLAY,
  PLAYER_PLAY_PREVIOUS,
  PLAYER_PLAY_NEXT
} from "./actions";
import { DEV_BACKEND_URL } from "../dev";
import { PLAYER_SET_PROGRESS } from "./actions";
import { PLAYER_SET_DURATION } from "./actions";
import { PLAYER_SET_VOLUME } from "./actions";
import { PLAYER_SKIP_TO_PREVIOUS } from "./actions";
import { PLAYER_SKIP_TO_NEXT } from "./actions";
import { PLAYER_TOGGLE_PLAYING_STATE } from "./actions";

const PLAYING_STATE_CYCLE = 0;
const PLAYING_STATE_REPEAT = 1;
const PLAYING_STATE_SHUFFLE = 2;


const initialState = {
  playing: false,
  // A boolean to determine whether to play the next song or not
  playNext: false,
  track: null,
  playingState: PLAYING_STATE_CYCLE,
  progress: 0,
  duration: 0,
  volume: 1,
};

function player(state = initialState, action, queue) {
  switch (action.type) {
    case PLAYER_SET_DURATION:
      return Object.assign({}, state, {
        ...state,
        duration: action.duration
      });
    case PLAYER_TOGGLE_PLAY:
      return Object.assign({}, state, {
        ...state,
        playing: (action.forcedValue !== undefined) ? action.forcedValue : !state.playing
      });
    case PLAYER_SET_PROGRESS:
      return Object.assign({}, state, {
        ...state,
        playing: true,
        progress: action.currentTime
      });
    case PLAYER_SET_VOLUME:
      return Object.assign({}, state, {
        ...state,
        volume: action.volume
      });
    case PLAYER_TOGGLE_PLAYING_STATE:
      return Object.assign({}, state, {
        ...state,
        playingState: setCycleNumPos(state.playingState, 1, 3)
      });
    case PLAYER_SKIP_TO_PREVIOUS:
    case PLAYER_SKIP_TO_NEXT:
      // TODO this is only for dev.
      const trackMod = Object.assign({}, action.track, {
        ...action.track,
        src: DEV_BACKEND_URL + action.track.src,
        cover: DEV_BACKEND_URL + action.track.cover,
      });

      return Object.assign({}, state, {
        ...state,
        track: trackMod,
        playing: true
      });

    default:
      return state;
  }
}

/*
 * Calculates the next / previous position in an array whrn looping.
 */
function setCycleNumPos(currentVal, change, length) {
  let newPos = currentVal + change;
  if (newPos >= length) {
    newPos -= length;
  }
  if (newPos < 0) {
    newPos += length;
  }
  return newPos;
}

export {
  PLAYING_STATE_CYCLE,
  PLAYING_STATE_REPEAT,
  PLAYING_STATE_SHUFFLE
}

export default player;
