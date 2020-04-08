// eslint-disable-next-line import/no-extraneous-dependencies
import { ThunkAction } from 'redux-thunk'
import { Action } from '@reduxjs/toolkit'

export type RootState = StateType<
  ReturnType<typeof import('./rootReducer').default>
>
export type AppDispatch = typeof import('./store').default.dispatch
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>
