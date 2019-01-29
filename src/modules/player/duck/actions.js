import types from './types'

const playerTogglePlayPause = (forcedValue) => ({
  type: types.PLAYER_TOGGLE_PLAY_PAUSE,
  forcedValue,
})

const playerToggleShuffle = () => ({
  type: types.PLAYER_TOGGLE_SHUFFLE,
})

const playerToggleRepeat = () => ({
  type: types.PLAYER_TOGGLE_REPEAT,
})

const playerSetVolume = (volume) => ({
  type: types.PLAYER_SET_VOLUME,
  volume,
})

const playerSetTrack = (track) => ({
  type: types.PLAYER_SET_TRACK,
  track,
})

const playerSetDuration = (duration) => ({
  type: types.PLAYER_SET_DURATION,
  duration,
})

const playerSetProgress = (currentTime) => ({
  type: types.PLAYER_SET_PROGRESS,
  currentTime,
})

const queueAddTrack = (trackId) => ({
  type: types.QUEUE_ADD_TRACK,
  trackId,
})

const queueAddAlbum = (albumId) => ({
  type: types.QUEUE_ADD_ALBUM,
  albumId,
})

const queueAddArtist = (artistId) => ({
  type: types.QUEUE_ADD_ARTIST,
  artistId,
})

const queueAddPlaylist = (playlistId) => ({
  type: types.QUEUE_ADD_PLAYLIST,
  playlistId,
})

const queueRemoveTrack = (trackIndex) => ({
  type: types.QUEUE_REMOVE_TRACK,
  trackIndex,
})

const queueClear = () => ({
  type: types.QUEUE_CLEAR,
})

const queueUpdate = (newQueue) => ({
  type: types.QUEUE_UPDATE,
  newQueue,
})

const queueSetCurrent = (position) => ({
  type: types.QUEUE_SET_CURRENT,
  position,
})

export default {
  playerTogglePlayPause,
  playerToggleShuffle,
  playerToggleRepeat,
  playerSetVolume,
  playerSetTrack,
  playerSetDuration,
  playerSetProgress,
  queueAddTrack,
  queueAddAlbum,
  queueAddArtist,
  queueAddPlaylist,
  queueRemoveTrack,
  queueClear,
  queueUpdate,
  queueSetCurrent,
}
