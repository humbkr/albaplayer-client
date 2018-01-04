import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { createLogger } from 'redux-logger'
import libraryBrowser from './browser/reducers'

// Root reducer.
const rootReducer = combineReducers({
  libraryBrowser
});

const loggerMiddleware = createLogger();

export default function configureStore() {
  return createStore(
    rootReducer,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  )
}
