import { createSelector } from 'reselect'
import { immutableNestedSort } from '../../../common/utils/utils'

const getPlaylists = createSelector(
  [(state) => state.playlist.playlists],
  (list) => immutableNestedSort(Object.values(list), 'title')
)

export default {
  getPlaylists,
}
