import types from './types'

const setTheme = (theme) => ({
  type: types.SET_THEME,
  theme,
})

export default {
  setTheme,
}
