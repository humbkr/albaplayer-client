import { combineReducers } from 'redux';
import {
  LIBRARY_BROWSER_INIT_START,
  LIBRARY_BROWSER_INIT_SUCCESS
} from "./actions";


const initialState = {
  // Data from server.
  original: {
    isFetching: false,
    isInitialized: false,
    artists: [],
    albums: [],
    tracks: []
  },
  // UI state.
  current: {
    artists: [],
    albums: [],
    tracks: [],
    selectedArtists: 0,
    selectedAlbums: 0,
    selectedTracks: 0
  }
};

function libraryBrowser(state = initialState, action) {
  switch (action.type) {
    case LIBRARY_BROWSER_INIT_START:
      return Object.assign({}, state, {
        original: {
          ...state.original,
          isFetching: true
        },
        current: state.current
      });
    case LIBRARY_BROWSER_INIT_SUCCESS:
      return Object.assign({}, state, {
        original: {
          ...state.original,
          isFetching: false,
          isInitialized: true,
          artists: action.response.artists,
          albums: action.response.albums,
          tracks: action.response.tracks
        },
        current: state.current
      });

    default:
      return state;
  }
}

// Root reducer.
const rootReducer = combineReducers({
  libraryBrowser
});

export default rootReducer;
