import { createSlice } from '@reduxjs/toolkit'
import storage from 'redux-persist/es/storage'
import { persistReducer } from 'redux-persist'
import { api, apolloClient } from 'api'
import { initLibrary } from 'modules/library/redux'

const initialState = {
  library: {
    isUpdating: false,
    error: '',
    config: {},
  },
  theme: 'default',
}

const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    init(state, action) {
      const data = action.payload
      state.library.error = ''
      state.library.config = data.settings
    },
    libraryUpdateStart(state) {
      state.library.error = ''
      state.library.isUpdating = true
    },
    libraryUpdateSuccess(state) {
      state.library.error = ''
      state.library.isUpdating = false
    },
    libraryUpdateFailure(state, action) {
      state.library.error = api.processApiError(action.payload)
      state.library.isUpdating = false
    },
    libraryEraseStart(state) {
      state.library.error = ''
      state.library.isUpdating = true
    },
    libraryEraseSuccess(state) {
      state.library.error = ''
      state.library.isUpdating = false
    },
    libraryEraseFailure(state, action) {
      state.library.error = api.processApiError(action.payload)
      state.library.isUpdating = false
    },
    setTheme(state, action) {
      state.theme = action.payload
    },
  },
})

const settingsPersistConfig = {
  key: 'settings',
  storage,
  whitelist: ['theme'],
}

export const {
  init,
  libraryUpdateStart,
  libraryUpdateSuccess,
  libraryUpdateFailure,
  libraryEraseStart,
  libraryEraseSuccess,
  libraryEraseFailure,
  setTheme,
} = settingsSlice.actions
export default persistReducer(settingsPersistConfig, settingsSlice.reducer)

export const initSettings = () => (dispatch) => api
  .getSettings()
  .then((response) => {
    dispatch(init(response.data))
  })
  .catch((response) => {
    dispatch(libraryUpdateFailure(response))
  })

export const updateLibrary = () => (dispatch) => {
  // First the app state is updated to inform that the API call is starting.
  dispatch(libraryUpdateStart())

  // Then we make the API call.
  return api
    .scanLibrary()
    .then(() => {
      // TODO: not fan of calling apolloClient here.
      apolloClient.resetStore().then(() => {
        dispatch(libraryUpdateSuccess())
        dispatch(initLibrary(true))
      })
    })
    .catch((response) => {
      dispatch(libraryUpdateFailure(response))
    })
}

export const eraseLibrary = () => (dispatch) => {
  // First the app state is updated to inform that the API call is starting.
  dispatch(libraryEraseStart())

  // Then we make the API call.
  return api
    .emptyLibrary()
    .then(() => {
      // TODO: not fan of calling apolloClient here.
      apolloClient.resetStore().then(() => {
        dispatch(libraryEraseSuccess())
        dispatch(initLibrary(true))
      })
    })
    .catch((response) => {
      dispatch(libraryEraseFailure(response))
    })
}
