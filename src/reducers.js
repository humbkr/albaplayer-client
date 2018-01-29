import { LIBRARY_INIT_FAILURE, LIBRARY_INIT_START, LIBRARY_INIT_SUCCESS } from './actions';


const initialState = {
  isFetching: false,
  isInitialized: false,
  initHasFailed: false,
  artists: [],
  albums: [],
  tracks: [],
};

function library(state = initialState, action) {
  switch (action.type) {
    case LIBRARY_INIT_START:
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });

    case LIBRARY_INIT_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        isInitialized: true,
        artists: action.response.artists,
        albums: action.response.albums,
        tracks: action.response.tracks,
      });

    case LIBRARY_INIT_FAILURE:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        isInitialized: false,
        initHasFailed: true,
      });

    default:
      return state;
  }
}


export default library;
