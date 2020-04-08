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
import rootReducer from './rootReducer'

const persistanceReducer = persistReducer(
  {
    key: 'root',
    storage,
    whitelist: ['playlist'],
  },
  rootReducer
)

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

export default store
export { persistor }
