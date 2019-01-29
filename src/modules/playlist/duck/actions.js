import types from './types'

const playlistSelectPlaylist = (selectedPlaylist, index) => ({
  type: types.PLAYLIST_SELECT_PLAYLIST,
  selectedPlaylist,
  index,
})

const playlistCreatePlaylist = (playlist) => ({
  type: types.PLAYLIST_CREATE_PLAYLIST,
  playlist,
})

const playlistDeletePlaylist = (playlist) => ({
  type: types.PLAYLIST_REMOVE_PLAYLIST,
  playlist,
})

const playlistSelectTrack = (trackId, index) => ({
  type: types.PLAYLIST_SELECT_TRACK,
  trackId,
  index,
})

const playlistRemoveTrack = (playlistId, trackPosition) => ({
  type: types.PLAYLIST_REMOVE_TRACK,
  playlistId,
  trackPosition,
})

const playlistAddTrack = (playlistId, trackId) => ({
  type: types.PLAYLIST_ADD_TRACK,
  playlistId,
  trackId,
})

const playlistAddAlbum = (playlistId, albumId) => ({
  type: types.PLAYLIST_ADD_ALBUM,
  playlistId,
  albumId,
})

const playlistAddArtist = (playlistId, artistId) => ({
  type: types.PLAYLIST_ADD_ARTIST,
  playlistId,
  artistId,
})

const playlistAddPlaylist = (playlistId, playlistToAddId) => ({
  type: types.PLAYLIST_ADD_PLAYLIST,
  playlistId,
  playlistToAddId,
})

const playlistUpdateTracks = (playlistId, newTrackList) => ({
  type: types.PLAYLIST_UPDATE_TRACKS,
  playlistId,
  newTrackList,
})

const playlistUpdateInfo = (playlist) => ({
  type: types.PLAYLIST_UPDATE_INFO,
  playlist,
})

export default {
  playlistSelectPlaylist,
  playlistCreatePlaylist,
  playlistDeletePlaylist,
  playlistSelectTrack,
  playlistRemoveTrack,
  playlistAddTrack,
  playlistAddAlbum,
  playlistAddArtist,
  playlistAddPlaylist,
  playlistUpdateTracks,
  playlistUpdateInfo,
}
