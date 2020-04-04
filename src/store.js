import { configureStore } from '@reduxjs/toolkit'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import libraryReducer from './modules/library/duck'
import libraryBrowserReducer from './modules/browser/duck'
import playerReducer from './modules/player/duck'
import playlistReducer from './modules/playlist/duck'
import settingsReducer from './modules/settings/duck'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['playlist'],
}

const rootReducer = (state = {}, action) => ({
  library: libraryReducer(state.library, action),
  libraryBrowser: libraryBrowserReducer(
    state.libraryBrowser,
    action,
    state.library
  ),
  queue: playerReducer.queue(
    state.queue,
    action,
    state.library,
    state.playlist
  ),
  player: playerReducer.player(state.player, action),
  playlist: playlistReducer(state.playlist, action, state.library),
  settings: settingsReducer(state.settings, action),
})

const persistanceReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
  reducer: persistanceReducer,
})

const persistor = persistStore(store)

export { store, persistor }
