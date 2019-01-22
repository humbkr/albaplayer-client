import types from './types'

const playlistSelectPlaylist = (selectedPlaylist) => ({
  type: types.PLAYLIST_SELECT_PLAYLIST,
  selectedPlaylist,
})

const playlistAddPlaylist = (playlist) => ({
  type: types.PLAYLIST_ADD_PLAYLIST,
  playlist,
})

const playlistDeletePlaylist = (playlist) => ({
  type: types.PLAYLIST_DELETE_PLAYLIST,
  playlist,
})

export default {
  playlistSelectPlaylist,
  playlistAddPlaylist,
  playlistDeletePlaylist,
}
