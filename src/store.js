import { configureStore, getDefaultMiddleware } from '@reduxjs/toolkit'
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import libraryReducer from './modules/library/redux'
import libraryBrowserReducer from './modules/browser/redux'
import playerReducer from './modules/player/redux'
import playlistReducer from './modules/playlist/redux'
import settingsReducer from './modules/settings/redux'

const rootPersistConfig = {
  key: 'root',
  storage,
  whitelist: ['playlist'],
}

const rootReducer = (state = {}, action) => ({
  library: libraryReducer(state.library, action),
  libraryBrowser: libraryBrowserReducer(state.libraryBrowser, action),
  queue: playerReducer.queue(state.queue, action),
  player: playerReducer.player(state.player, action),
  playlist: playlistReducer(state.playlist, action),
  settings: settingsReducer(state.settings, action),
})

const persistanceReducer = persistReducer(rootPersistConfig, rootReducer)

const store = configureStore({
  reducer: persistanceReducer,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      // Ignore non serializable data for redux-persist actions.
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
    },
  }),
})

const persistor = persistStore(store)

export { store, persistor }
