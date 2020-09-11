import configureMockStore from 'redux-mock-store'
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk'
import { initialState } from '../../src/modules/settings/redux'

export const makeMockStore = (customState: any = {}) => {
  const mockStore = configureMockStore([thunk])
  const store = mockStore({
    settings: initialState,
    ...customState,
  })

  store.dispatch = jest.fn()

  return store
}
