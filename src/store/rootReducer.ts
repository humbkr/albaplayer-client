import { combineReducers } from 'redux'
import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import libraryReducer from '../modules/library/redux'
import libraryBrowserReducer from '../modules/browser/redux'
import playerReducer from '../modules/player/redux'
import playlistReducer from '../modules/playlist/redux'
import settingsReducer from '../modules/settings/redux'

const settingsPersistConfig = {
  key: 'settings',
  storage,
  whitelist: ['theme'],
}

const rootReducer = combineReducers({
  library: libraryReducer,
  libraryBrowser: libraryBrowserReducer,
  queue: playerReducer.queue,
  player: playerReducer.player,
  playlist: playlistReducer,
  settings: persistReducer(settingsPersistConfig, settingsReducer),
})

export default rootReducer