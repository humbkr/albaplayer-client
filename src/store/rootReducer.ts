import { combineReducers } from 'redux'
import libraryReducer from '../modules/library/redux'
import libraryBrowserReducer from '../modules/browser/redux'
import playerReducer from '../modules/player/redux'
import playlistReducer from '../modules/playlist/redux'
import settingsReducer from '../modules/settings/redux'

const rootReducer = combineReducers({
  library: libraryReducer,
  libraryBrowser: libraryBrowserReducer,
  queue: playerReducer.queue,
  player: playerReducer.player,
  playlist: playlistReducer,
  settings: settingsReducer,
})

export default rootReducer
