import {
  LIBRARY_ERASE_FAILURE,
  LIBRARY_ERASE_START,
  LIBRARY_ERASE_SUCCESS,
  LIBRARY_INIT_FAILURE,
  LIBRARY_INIT_START,
  LIBRARY_INIT_SUCCESS,
  LIBRARY_UPDATE_FAILURE,
  LIBRARY_UPDATE_START,
  LIBRARY_UPDATE_SUCCESS,
} from './actions';


const initialState = {
  isFetching: false,
  isUpdating: false,
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

    case LIBRARY_ERASE_START:
    case LIBRARY_UPDATE_START:
      return Object.assign({}, state, {
        ...state,
        isUpdating: true,
      });

    case LIBRARY_ERASE_SUCCESS:
    case LIBRARY_ERASE_FAILURE:
    case LIBRARY_UPDATE_SUCCESS:
    case LIBRARY_UPDATE_FAILURE:
      return Object.assign({}, state, {
        ...state,
        isUpdating: false,
      });

    default:
      return state;
  }
}


export default library;
