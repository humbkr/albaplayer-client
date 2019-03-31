import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import types from './types'
import { api } from '../../../api'

const initialState = {
  library: {
    isUpdating: false,
    error: '',
    config: {},
  },
  theme: 'default',
}

function settings(state = initialState, action) {
  switch (action.type) {
    case types.SETTINGS_INIT:
      return {
        ...state,
        library: {
          ...state.library,
          error: '',
          config: action.response.settings,
        },
      }

    case types.LIBRARY_ERASE_START:
    case types.LIBRARY_UPDATE_START:
      return {
        ...state,
        library: {
          ...state.library,
          isUpdating: true,
          error: '',
        },
      }

    case types.LIBRARY_ERASE_SUCCESS:
    case types.LIBRARY_UPDATE_SUCCESS:
      return {
        ...state,
        library: {
          ...state.library,
          isUpdating: false,
          error: '',
        },
      }

    case types.LIBRARY_ERASE_FAILURE:
    case types.LIBRARY_UPDATE_FAILURE:
      return {
        ...state,
        isUpdating: false,
        library: {
          ...state.library,
          isUpdating: false,
          error: api.processApiError(action.response),
        },
      }

    case types.SET_THEME:
      return {
        ...state,
        theme: action.theme,
      }

    default:
      return state
  }
}

const settingsPersistConfig = {
  key: 'settings',
  storage,
  whitelist: ['theme'],
}

export default persistReducer(settingsPersistConfig, settings)
