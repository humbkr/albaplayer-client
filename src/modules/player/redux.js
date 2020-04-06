import { createSlice } from '@reduxjs/toolkit'
import { api } from 'api'
import getBackendUrl from 'api/config'
import { immutableRemove, immutableSortTracks } from 'common/utils/utils'
import constants from './constants'

const initialState = {
  // Controls and audio state.
  playing: false,
  repeat: constants.PLAYER_REPEAT_NO_REPEAT,
  shuffle: false,
  volume: 1,
  volumeMuted: 1,
  duration: 0,
  progress: 0,
  // Track currently loaded in audio.
  track: null,
}

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    playerTogglePlayPause(state, action) {
      if (state.track || action.payload !== undefined) {
        state.playing = action.payload === undefined ? !state.playing : action.payload
      }
    },
    playerToggleShuffle(state) {
      state.shuffle = !state.shuffle
    },
    playerToggleRepeat(state) {
      state.repeat = setCycleNumPos(state.repeat, 1, 3)
    },
    playerSetVolume(state, action) {
      state.volume = action.payload
    },
    playerSetTrack(state, action) {
      state.track = action.payload
    },
    playerSetDuration(state, action) {
      state.duration = action.payload
    },
    playerSetProgress(state, action) {
      state.progress = action.payload
    },
  },
})

const queueInitialState = {
  tracks: [],
  current: undefined,
}

const queueSlice = createSlice({
  name: 'queue',
  initialState: queueInitialState,
  reducers: {
    queueAddTracks(state, action) {
      state.tracks.push(...action.payload)
    },
    queueRemoveTrack(state, action) {
      const trackIndex = action.payload

      let nextCurrent = state.current
      if (trackIndex <= state.current) {
        nextCurrent -= 1
      }

      state.tracks = immutableRemove(state.tracks, trackIndex)
      state.current = nextCurrent
    },
    queueClear() {
      return queueInitialState
    },
    queueReplace(state, action) {
      state.tracks = action.payload
    },
    queueSetCurrent(state, action) {
      state.current = action.payload
    },
  },
})

export const {
  playerTogglePlayPause,
  playerToggleShuffle,
  playerToggleRepeat,
  playerSetVolume,
  playerSetTrack,
  playerSetDuration,
  playerSetProgress,
} = playerSlice.actions
export const {
  queueAddTracks,
  queueRemoveTrack,
  queueClear,
  queueReplace,
  queueSetCurrent,
} = queueSlice.actions
export default { player: playerSlice.reducer, queue: queueSlice.reducer }

export const setTrackFromQueue = (trackPosition) => (dispatch, getState) => {
  const state = getState()

  if (state.queue.tracks.length < trackPosition) {
    return null
  }

  // Make API call to get the track full info.
  return api
    .getFullTrackInfo(state.queue.tracks[trackPosition].id)
    .then((response) => {
      // And dispatch appropriate actions.
      // Copy track to change it.
      const track = { ...response.data.track }
      track.cover = track.cover ? getBackendUrl() + track.cover : ''
      track.src = getBackendUrl() + track.src

      dispatch(playerSetTrack(track))
      dispatch(queueSetCurrent(trackPosition))
    })
}

export const playTrack = (id) => (dispatch, getState) => {
  const { library } = getState()

  const track = { ...library.tracks[id] }
  track.artist = library.artists[track.artistId]
  track.album = library.albums[track.albumId]

  dispatch(queueClear())
  dispatch(queueAddTracks([track]))
  dispatch(setTrackFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

export const playAlbum = (id) => (dispatch, getState) => {
  const { library } = getState()

  dispatch(queueClear())
  dispatch(
    queueAddTracks(
      immutableSortTracks(getTracksFromAlbum(id, library), 'number')
    )
  )
  dispatch(setTrackFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

export const playArtist = (id) => (dispatch, getState) => {
  const { library } = getState()

  dispatch(queueClear())
  dispatch(queueAddTracks(getTracksFromArtist(id, library)))
  dispatch(setTrackFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

export const playPlaylist = (id) => (dispatch, getState) => {
  const { library, playlist } = getState()

  dispatch(queueClear())
  dispatch(queueAddTracks(getTracksFromPlaylist(id, library, playlist)))
  dispatch(setTrackFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

export const addTrack = (id) => (dispatch, getState) => {
  const { library, player } = getState()

  const track = { ...library.tracks[id] }
  track.artist = library.artists[track.artistId]
  track.album = library.albums[track.albumId]

  dispatch(queueAddTracks([track]))

  if (player.track === null) {
    dispatch(setTrackFromQueue(0))
  }
}

export const addAlbum = (id) => (dispatch, getState) => {
  const { library, player } = getState()

  dispatch(queueAddTracks(getTracksFromAlbum(id, library)))

  if (player.track === null) {
    dispatch(setTrackFromQueue(0))
  }
}

export const addArtist = (id) => (dispatch, getState) => {
  const { library, player } = getState()

  dispatch(queueAddTracks(getTracksFromArtist(id, library)))

  if (player.track === null) {
    dispatch(setTrackFromQueue(0))
  }
}

export const addPlaylist = (id) => (dispatch, getState) => {
  const { library, playlist } = getState()

  dispatch(queueAddTracks(getTracksFromPlaylist(id, library, playlist)))

  const state = getState()
  if (state.player.track === null) {
    dispatch(setTrackFromQueue(0))
  }
}

/*
 * Selects the next track to play from the queue, get its info,
 * and dispatch required actions.
 */
export const setNextTrack = (endOfTrack) => (dispatch, getState) => {
  const state = getState()

  let nextTrackId = 0
  let newQueuePosition = 0

  if (state.player.track === null) {
    // First play after launch.
    if (state.queue.tracks.length > 0) {
      // Get first track of the queue.
      newQueuePosition = 0
      nextTrackId = state.queue.tracks[0].id
    } else {
      // No track to play, do nothing.
      return null
    }
  } else if (state.player.repeat === constants.PLAYER_REPEAT_LOOP_ONE) {
    // Play the same track again.
    // TODO: Maybe create an action to reset the current track.
    newQueuePosition = state.queue.current
    nextTrackId = state.queue.tracks[state.queue.current].id
  } else if (state.player.shuffle) {
    // Get the next track to play.
    // TODO: shuffle functionality is currently shit.
    const randomIndex = Math.floor(Math.random() * state.queue.tracks.length)
    newQueuePosition = randomIndex
    nextTrackId = state.queue.tracks[randomIndex].id
  } else if (state.queue.current + 1 < state.queue.tracks.length) {
    // Get next song in queue.
    newQueuePosition = state.queue.current + 1
    nextTrackId = state.queue.tracks[state.queue.current + 1].id
  } else if (state.player.repeat === constants.PLAYER_REPEAT_LOOP_ALL) {
    // End of the queue.
    // Loop back to the first track of the queue.
    newQueuePosition = 0
    nextTrackId = state.queue.tracks[0].id
  } else {
    // No further track to play.
    if (endOfTrack) {
      // If the last track of the queue finished playing reset the player
      dispatch(playerSetProgress(0))
      dispatch(playerTogglePlayPause(false))
    }
    // Else setNextTrack call is the result of a user action so do nothing.
    return null
  }

  // Make API call to get the track full info.
  return api.getFullTrackInfo(nextTrackId).then((response) => {
    // And dispatch appropriate actions.
    // Copy track to change it.
    const track = { ...response.data.track }
    track.cover = track.cover ? getBackendUrl() + track.cover : ''
    track.src = getBackendUrl() + track.src

    dispatch(playerSetTrack(track))
    dispatch(queueSetCurrent(newQueuePosition))
  })
}

/*
 * Selects the previous track to play from the queue, get its info,
 * and dispatch required actions.
 */
export const setPreviousTrack = () => (dispatch, getState) => {
  const state = getState()

  let prevTrackId = 0
  let newQueuePosition = 0

  // Get trackId of the previous track in playlist.
  if (state.player.track === null) {
    // Do nothing.
    return null
  }
  if (state.player.repeat === constants.PLAYER_REPEAT_LOOP_ONE) {
    // Play the same track again.
    // TODO: Maybe create an action to reset the current track.
    newQueuePosition = state.queue.current
    prevTrackId = state.queue.tracks[state.queue.current].id
  } else if (state.player.shuffle) {
    // TODO: shuffle functionality is currently shit.
    const randomIndex = Math.floor(Math.random() * state.queue.tracks.length)
    newQueuePosition = randomIndex
    prevTrackId = state.queue.tracks[randomIndex].id
  } else if (state.queue.current - 1 >= 0) {
    // Get previous song in queue.
    newQueuePosition = state.queue.current - 1
    prevTrackId = state.queue.tracks[state.queue.current - 1].id
  } else if (state.player.repeat === constants.PLAYER_REPEAT_LOOP_ALL) {
    // Begining of the queue.
    // Loop back to the last track of the queue.
    newQueuePosition = state.queue.tracks.length - 1
    prevTrackId = state.queue.tracks[state.queue.tracks.length - 1].id
  } else {
    // No further track to play, do nothing.
    return null
  }

  // Make API call to get the track full info.
  return api.getFullTrackInfo(prevTrackId).then((response) => {
    // And dispatch appropriate actions.
    // Copy track to change it.
    const track = { ...response.data.track }
    track.cover = track.cover ? getBackendUrl() + track.cover : ''
    track.src = getBackendUrl() + track.src

    dispatch(playerSetTrack(track))
    dispatch(queueSetCurrent(newQueuePosition))
  })
}

/*
 * Computes the next / previous position in an list of consecutive integers
 * when looping.
 *
 * @param currentPosition integer
 *   The current value in the list.
 * @param change integer
 *   The number of positions you want to switch from. Negative value to go
 *   backward.
 * @param length integer
 *   The length of the list of integers.
 *
 */
const setCycleNumPos = (currentValue, change, length) => {
  let newPos = currentValue + change
  if (newPos >= length) {
    newPos -= length
  }
  if (newPos < 0) {
    newPos += length
  }
  return newPos
}

const getTracksFromAlbum = (id, library) => {
  const filteredTracks = Object.values(library.tracks).filter(
    (item) => id === item.albumId
  )

  return filteredTracks.map((track) => ({
    ...track,
    artist: library.artists[track.artistId],
    album: library.albums[track.albumId],
  }))
}

// TODO tracks should be ordered per album then track number.
const getTracksFromArtist = (id, library) => {
  const filteredTracks = Object.values(library.tracks).filter(
    (item) => id === item.artistId
  )

  return filteredTracks.map((track) => ({
    ...track,
    artist: library.artists[track.artistId],
    album: library.albums[track.albumId],
  }))
}

const getTracksFromPlaylist = (id, library, playlists) => {
  const playlist = { ...playlists.playlists[id] }
  return playlist.tracks.map((track) => ({
    ...track,
    artist: library.artists[track.artistId],
    album: library.albums[track.albumId],
  }))
}
