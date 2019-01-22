import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import library from './modules/library/duck/reducers'
import libraryBrowser from './modules/browser/duck'
import player from './modules/player/duck'
import playlist from './modules/playlist/duck'
import settings from './modules/settings/duck'

const customReducer = (state = {}, action) => ({
  library: library(state.library, action),
  libraryBrowser: libraryBrowser(state.libraryBrowser, action, state.library),
  queue: player.queue(state.queue, action, state.library),
  player: player.player(state.player, action),
  playlist: playlist(state.playlist, action),
  settings: settings(state.settings, action),
})

// Common middleware
let middleware = [thunkMiddleware]

if (process.env.REACT_APP_DEBUG_MODE === 'true') {
  const loggerMiddleware = createLogger()
  middleware = [...middleware, loggerMiddleware]
}

// eslint-disable-next-line no-underscore-dangle
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export default function configureStore() {
  return createStore(
    customReducer,
    composeEnhancers(applyMiddleware(...middleware))
  )
}
