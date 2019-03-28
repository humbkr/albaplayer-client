import { api } from '../../../api'
import actions from './actions'

const fetchLibrary = () => (dispatch) => {
  // First the app state is updated to inform that the API call is starting.
  dispatch(actions.libraryInitStart())

  // Then we make the API call.
  return api
    .getLibrary()
    .then((response) => {
      dispatch(actions.libraryInitSuccess(response))
    })
    .catch((response) => {
      // TODO log failure.
      dispatch(actions.libraryInitFailure(response))
    })
}

const shouldFetchLibrary = async (dispatch, libraryState) => {
  // We should fetch if library is not initialized.
  if (!libraryState.isInitialized) {
    if (libraryState.tracks && Object.values(libraryState.tracks).length < 1) {
      return true
    }

    // Get last scan date from backend. If backend last scan > local version, we
    // have to fetch, else we can reuse the local data.
    api
      .getVariable('library_last_updated')
      .then((response) => {
        const remoteLastScan = response.data.variable.value
        if (remoteLastScan > libraryState.lastScan) {
          dispatch(actions.librarySetLastScan(remoteLastScan))
          return true
        }
        return false
      })
      .catch(() => {
        // TODO log failure.
      })
  }

  // If the library is currently fetching, nothing to do.
  if (libraryState.isFetching) {
    return false
  }

  return false
}

const initLibrary = (force) => (dispatch, getState) => {
  if (force || shouldFetchLibrary(dispatch, getState().library)) {
    return dispatch(fetchLibrary())
  }
  return null
}

export default {
  initLibrary,
}
