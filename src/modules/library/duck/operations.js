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

const shouldFetchLibrary = (state) => {
  const libraryData = state.library

  if (!libraryData.isInitialized) {
    return true
  }
  if (libraryData.isFetching) {
    return false
  }

  return false
}

const initLibrary = (force) => (dispatch, getState) => {
  if (force || shouldFetchLibrary(getState())) {
    return dispatch(fetchLibrary())
  }
  return null
}

export default {
  initLibrary,
}
