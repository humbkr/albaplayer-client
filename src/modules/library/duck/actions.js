import types from './types'

const libraryInitStart = () => ({
  type: types.LIBRARY_INIT_START,
})

const libraryInitSuccess = (response) => ({
  type: types.LIBRARY_INIT_SUCCESS,
  response: response.data,
})

const libraryInitFailure = (response) => ({
  type: types.LIBRARY_INIT_FAILURE,
  response,
})

export default {
  libraryInitStart,
  libraryInitSuccess,
  libraryInitFailure,
}
