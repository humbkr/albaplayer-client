import {
  QUEUE_ADD_ALBUM,
  QUEUE_ADD_ARTIST,
  QUEUE_ADD_TRACK,
  QUEUE_CLEAR,
  QUEUE_REMOVE_TRACK, QUEUE_SET_CURRENT,
} from './actionsQueue';
import { immutableRemove } from '../utils';


const initialState = {
  tracks: [],
  current: undefined,
};

function queue(state = initialState, action, library) {
  switch (action.type) {
    case QUEUE_ADD_TRACK:
      return Object.assign({}, state, {
        tracks: [
          ...state.tracks,
          library.tracks[action.trackId],
        ],
        current: state.current,
      });
    case QUEUE_ADD_ALBUM:
      return Object.assign({}, state, {
        tracks: [
          ...state.tracks,
          ...library.tracks.filter(item => (action.albumId === item.albumId)),
        ],
        current: state.current,
      });
    case QUEUE_ADD_ARTIST:
      return Object.assign({}, state, {
        tracks: [
          ...state.tracks,
          ...library.tracks.filter(item => (action.artistId === item.artistId)),
        ],
        current: state.current,
      });
    case QUEUE_REMOVE_TRACK:
      return Object.assign({}, state, {
        tracks: immutableRemove(state.tracks, action.trackIndex),
        current: state.current,
      });
    case QUEUE_CLEAR:
      return Object.assign({}, state, {
        tracks: [],
        current: '',
      });
    case QUEUE_SET_CURRENT:
      return Object.assign({}, state, {
        ...state,
        current: action.position,
      });

    default:
      return state;
  }
}


export default queue;
