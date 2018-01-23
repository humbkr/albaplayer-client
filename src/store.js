import { createStore, applyMiddleware } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import library from './reducers'
import libraryBrowser from './browser/reducers'
import queue from './queue/reducers'
import player from "./player/reducers";

const customReducer = (state = {}, action) => {
  return {
    library: library(state.library, action),
    libraryBrowser: libraryBrowser(state.libraryBrowser, action, state.library),
    queue: queue(state.queue, action, state.library),
    player: player(state.player, action)
  }
};

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    customReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
