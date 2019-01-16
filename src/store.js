import { createStore, applyMiddleware, compose } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import library from './reducers'
import libraryBrowser from './modules/browser/duck/reducers'
import queue from './modules/player/reducersQueue'
import player from './modules/player/reducersPlayer'
import settings from './modules/settings/reducers'

const customReducer = (state = {}, action) => ({
  library: library(state.library, action),
  libraryBrowser: libraryBrowser(state.libraryBrowser, action, state.library),
  queue: queue(state.queue, action, state.library),
  player: player(state.player, action),
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
