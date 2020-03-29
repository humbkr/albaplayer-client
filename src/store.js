import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
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

// Common middleware
const middleware = [thunkMiddleware]

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

const store = createStore(
  persistanceReducer,
  composeEnhancers(applyMiddleware(...middleware))
)

const persistor = persistStore(store)

export { store, persistor }
