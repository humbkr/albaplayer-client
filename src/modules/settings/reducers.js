import {
  LIBRARY_ERASE_FAILURE,
  LIBRARY_ERASE_START,
  LIBRARY_ERASE_SUCCESS,
  LIBRARY_UPDATE_FAILURE,
  LIBRARY_UPDATE_START,
  LIBRARY_UPDATE_SUCCESS,
  SETTINGS_INIT,
} from './actions'
import { processApiError } from '../../api/api'

const initialState = {
  library: {
    isUpdating: false,
    error: '',
    config: {},
  },
}

function settings(state = initialState, action) {
  switch (action.type) {
    case SETTINGS_INIT:
      return Object.assign({}, state, {
        ...state,
        library: {
          ...state.library,
          error: '',
          config: action.response.settings,
        },
      })

    case LIBRARY_ERASE_START:
    case LIBRARY_UPDATE_START:
      return Object.assign({}, state, {
        ...state,
        library: {
          ...state.library,
          isUpdating: true,
          error: '',
        },
      })

    case LIBRARY_ERASE_SUCCESS:
    case LIBRARY_UPDATE_SUCCESS:
      return Object.assign({}, state, {
        ...state,
        library: {
          ...state.library,
          isUpdating: false,
          error: '',
        },
      })

    case LIBRARY_ERASE_FAILURE:
    case LIBRARY_UPDATE_FAILURE:
      return Object.assign({}, state, {
        ...state,
        isUpdating: false,
        library: {
          ...state.library,
          isUpdating: false,
          error: processApiError(action.response),
        },
      })

    default:
      return state
  }
}

export default settings
