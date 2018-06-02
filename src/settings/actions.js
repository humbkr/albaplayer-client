import { emptyLibrary, getSettings, scanLibrary } from '../backend/api';
import { initLibrary } from '../actions';
import apolloClient from '../backend/apollo';

const SETTINGS_INIT = 'SETTINGS_INIT';
const settingsInit = response => (
  {
    type: SETTINGS_INIT,
    response: response.data,
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

const initSettings = () => (
  (dispatch) => {
    return getSettings()
      .then((response) => {
        dispatch(settingsInit(response));
      })
      .catch((response) => {
        //dispatch(libraryUpdateFailure(response));
      });
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
  SETTINGS_INIT,
  LIBRARY_UPDATE_START,
  LIBRARY_UPDATE_SUCCESS,
  LIBRARY_UPDATE_FAILURE,
  LIBRARY_ERASE_START,
  LIBRARY_ERASE_SUCCESS,
  LIBRARY_ERASE_FAILURE,
  updateLibrary,
  eraseLibrary,
  initSettings,
};
