import { emptyLibrary, getLibrary, scanLibrary } from './backend/api';
import apolloClient from './backend/apollo';

const LIBRARY_INIT_START = 'LIBRARY_INIT_START';
const libraryInitStart = () => (
  {
    type: LIBRARY_INIT_START,
  }
);

const LIBRARY_INIT_SUCCESS = 'LIBRARY_INIT_SUCCESS';
const libraryInitSuccess = response => (
  {
    type: LIBRARY_INIT_SUCCESS,
    response: response.data,
  }
);

const LIBRARY_INIT_FAILURE = 'LIBRARY_INIT_FAILURE';
const libraryInitFailure = response => (
  {
    type: LIBRARY_INIT_FAILURE,
    response,
  }
);

const LIBRARY_UPDATE_START = 'LIBRARY_UPDATE_START';
const libraryUpdateStart = () => (
  {
    type: LIBRARY_UPDATE_START,
  }
);

const LIBRARY_UPDATE_SUCCESS = 'LIBRARY_UPDATE_SUCCESS';
const libraryUpdateSuccess = response => (
  {
    type: LIBRARY_UPDATE_SUCCESS,
    response: response.data,
  }
);

const LIBRARY_UPDATE_FAILURE = 'LIBRARY_UPDATE_FAILURE';
const libraryUpdateFailure = response => (
  {
    type: LIBRARY_UPDATE_FAILURE,
    response,
  }
);

const LIBRARY_ERASE_START = 'LIBRARY_ERASE_START';
const libraryEraseStart = () => (
  {
    type: LIBRARY_ERASE_START,
  }
);

const LIBRARY_ERASE_SUCCESS = 'LIBRARY_ERASE_SUCCESS';
const libraryEraseSuccess = response => (
  {
    type: LIBRARY_ERASE_SUCCESS,
    response: response.data,
  }
);

const LIBRARY_ERASE_FAILURE = 'LIBRARY_ERASE_FAILURE';
const libraryEraseFailure = response => (
  {
    type: LIBRARY_ERASE_FAILURE,
    response,
  }
);

const fetchLibrary = () => (
  (dispatch) => {
    // First the app state is updated to inform that the API call is starting.
    dispatch(libraryInitStart());

    // Then we make the API call.
    return getLibrary()
      .then((response) => {
        dispatch(libraryInitSuccess(response));
      })
      .catch((response) => {
        dispatch(libraryInitFailure(response));
      });
  }
);

const shouldFetchLibrary = (state) => {
  const libraryData = state.library;

  if (!libraryData.isInitialized) {
    return true;
  } else if (libraryData.isFetching) {
    return false;
  }

  return false;
};

const initLibrary = force => (
  (dispatch, getState) => {
    if (force || shouldFetchLibrary(getState())) {
      return dispatch(fetchLibrary());
    }
    return null;
  }
);

const updateLibrary = () => (
  (dispatch) => {
    // First the app state is updated to inform that the API call is starting.
    dispatch(libraryUpdateStart());

    // Then we make the API call.
    return scanLibrary()
      .then((response) => {
        // TODO: not fan of calling apolloClient here.
        apolloClient.resetStore();
        dispatch(libraryUpdateSuccess(response));
        dispatch(initLibrary(true));
      })
      .catch((response) => {
        dispatch(libraryUpdateFailure(response));
      });
  }
);

const eraseLibrary = () => (
  (dispatch) => {
    // First the app state is updated to inform that the API call is starting.
    dispatch(libraryEraseStart());

    // Then we make the API call.
    return emptyLibrary()
      .then((response) => {
        // TODO: not fan of calling apolloClient here.
        apolloClient.resetStore();
        dispatch(libraryEraseSuccess(response));
        dispatch(initLibrary(true));
      })
      .catch((response) => {
        dispatch(libraryEraseFailure(response));
      });
  }
);

export {
  LIBRARY_INIT_START,
  LIBRARY_INIT_SUCCESS,
  LIBRARY_INIT_FAILURE,
  LIBRARY_UPDATE_START,
  LIBRARY_UPDATE_SUCCESS,
  LIBRARY_UPDATE_FAILURE,
  LIBRARY_ERASE_START,
  LIBRARY_ERASE_SUCCESS,
  LIBRARY_ERASE_FAILURE,
  initLibrary,
  updateLibrary,
  eraseLibrary,
};
