import { getLibrary } from './backend/api';

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

const initLibrary = () => (
  (dispatch, getState) => {
    if (shouldFetchLibrary(getState())) {
      return dispatch(fetchLibrary());
    }
    return null;
  }
);

export {
  LIBRARY_INIT_START,
  LIBRARY_INIT_SUCCESS,
  LIBRARY_INIT_FAILURE,
  initLibrary,
};
