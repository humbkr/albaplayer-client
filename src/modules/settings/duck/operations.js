import { operations } from '../../library/duck'
import types from './types'
import { api, apolloClient } from '../../../api'

const settingsInit = (response) => ({
  type: types.SETTINGS_INIT,
  response: response.data,
})

const libraryUpdateStart = () => ({
  type: types.LIBRARY_UPDATE_START,
})

const libraryUpdateSuccess = (response) => ({
  type: types.LIBRARY_UPDATE_SUCCESS,
  response: response.data,
})

const libraryUpdateFailure = (response) => ({
  type: types.LIBRARY_UPDATE_FAILURE,
  response,
})

const libraryEraseStart = () => ({
  type: types.LIBRARY_ERASE_START,
})

const libraryEraseSuccess = (response) => ({
  type: types.LIBRARY_ERASE_SUCCESS,
  response: response.data,
})

const libraryEraseFailure = (response) => ({
  type: types.LIBRARY_ERASE_FAILURE,
  response,
})

const initSettings = () => (dispatch) => api
  .getSettings()
  .then((response) => {
    dispatch(settingsInit(response))
  })
  .catch((response) => {
    dispatch(libraryUpdateFailure(response))
  })

const updateLibrary = () => (dispatch) => {
  // First the app state is updated to inform that the API call is starting.
  dispatch(libraryUpdateStart())

  // Then we make the API call.
  return api
    .scanLibrary()
    .then((response) => {
      // TODO: not fan of calling apolloClient here.
      apolloClient.resetStore().then(() => {
        dispatch(libraryUpdateSuccess(response))
        dispatch(operations.initLibrary(true))
      })
    })
    .catch((response) => {
      dispatch(libraryUpdateFailure(response))
    })
}

const eraseLibrary = () => (dispatch) => {
  // First the app state is updated to inform that the API call is starting.
  dispatch(libraryEraseStart())

  // Then we make the API call.
  return api
    .emptyLibrary()
    .then((response) => {
      // TODO: not fan of calling apolloClient here.
      apolloClient.resetStore().then(() => {
        dispatch(libraryEraseSuccess(response))
        dispatch(operations.initLibrary(true))
      })
    })
    .catch((response) => {
      dispatch(libraryEraseFailure(response))
    })
}

export default {
  updateLibrary,
  eraseLibrary,
  initSettings,
}
