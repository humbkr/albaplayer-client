import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from 'api'
import getBackendUrl from 'api/config'
import { immutableRemove, immutableSortTracks } from 'common/utils/utils'
import Track from 'types/Track'
import { AppThunk } from 'store/types'
import QueueItem from './types/QueueItem'
import constants from './constants'
import { LibraryStateType } from '../library/redux'
import { PlaylistsStateType } from '../playlist/redux'

enum PlayerPlaybackMode {
  PLAYER_REPEAT_NO_REPEAT = constants.PLAYER_REPEAT_NO_REPEAT,
  PLAYER_REPEAT_LOOP_ALL = constants.PLAYER_REPEAT_LOOP_ALL,
  PLAYER_REPEAT_LOOP_ONE = constants.PLAYER_REPEAT_LOOP_ONE,
}

interface playerStateType {
  // Controls and audio state.
  playing: boolean
  repeat: PlayerPlaybackMode
  shuffle: boolean
  volume: number
  volumeMuted: number
  duration: number
  progress: number
  // Track currently loaded in audio.
  track?: Track
}

interface queueStateType {
  items: QueueItem[]
  current?: number
}

export const playerInitialState: playerStateType = {
  playing: false,
  repeat: PlayerPlaybackMode.PLAYER_REPEAT_NO_REPEAT,
  shuffle: false,
  volume: 1,
  volumeMuted: 1,
  duration: 0,
  progress: 0,
  track: undefined,
}

const playerSlice = createSlice({
  name: 'player',
  initialState: playerInitialState,
  reducers: {
    playerTogglePlayPause(state, action: PayloadAction<boolean>) {
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
    playerSetVolume(state, action: PayloadAction<number>) {
      state.volume = action.payload
    },
    playerSetTrack(state, action: PayloadAction<Track>) {
      state.track = action.payload
    },
    playerSetDuration(state, action: PayloadAction<number>) {
      state.duration = action.payload
    },
    playerSetProgress(state, action: PayloadAction<number>) {
      state.progress = action.payload
    },
  },
})

export const queueInitialState: queueStateType = {
  items: [],
  current: undefined,
}

const queueSlice = createSlice({
  name: 'queue',
  initialState: queueInitialState,
  reducers: {
    queueAddTracks(state, action: PayloadAction<Track[]>) {
      const queueItems = action.payload.map((track) => ({ track }))
      // @ts-ignore
      state.items.push(...queueItems)
    },
    queueRemoveTrack(state, action: PayloadAction<number>) {
      const itemIndex = action.payload

      let nextCurrent = state.current
      if (nextCurrent && itemIndex <= nextCurrent) {
        nextCurrent -= 1
      }

      state.items = immutableRemove(state.items, itemIndex)
      state.current = nextCurrent
    },
    queueClear() {
      return queueInitialState
    },
    queueReplace(state, action: PayloadAction<QueueItem[]>) {
      state.items = action.payload
    },
    queueSetCurrent(state, action: PayloadAction<number>) {
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

export const setItemFromQueue = (itemPosition: number): AppThunk => (
  dispatch,
  getState
) => {
  const state = getState()

  if (
    state.queue.items.length === 0
    || state.queue.items.length < itemPosition
  ) {
    return null
  }

  // Make API call to get the track full info.
  return api
    .getFullTrackInfo(state.queue.items[itemPosition].track.id)
    .then((response) => {
      // And dispatch appropriate actions.
      // Copy track to change it.
      const track = { ...response.data.track }
      track.cover = track.cover ? getBackendUrl() + track.cover : ''
      track.src = getBackendUrl() + track.src

      dispatch(playerSetTrack(track))
      dispatch(queueSetCurrent(itemPosition))
    })
}

export const playTrack = (id: string): AppThunk => (dispatch, getState) => {
  const { library } = getState()

  const track = { ...library.tracks[id] }
  track.artist = library.artists[track.artistId]
  track.album = library.albums[track.albumId]

  dispatch(queueClear())
  dispatch(queueAddTracks([track]))
  dispatch(setItemFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

export const playAlbum = (id: string): AppThunk => (dispatch, getState) => {
  const { library } = getState()

  dispatch(queueClear())
  dispatch(
    queueAddTracks(
      immutableSortTracks(getTracksFromAlbum(id, library), 'number')
    )
  )
  dispatch(setItemFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

export const playArtist = (id: string): AppThunk => (dispatch, getState) => {
  const { library } = getState()

  dispatch(queueClear())
  dispatch(queueAddTracks(getTracksFromArtist(id, library)))
  dispatch(setItemFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

export const playPlaylist = (id: string): AppThunk => (dispatch, getState) => {
  const { library, playlist } = getState()

  dispatch(queueClear())
  dispatch(queueAddTracks(getTracksFromPlaylist(id, library, playlist)))
  dispatch(setItemFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

export const addTrack = (id: string): AppThunk => (dispatch, getState) => {
  const { library, player } = getState()

  const track = { ...library.tracks[id] }
  track.artist = library.artists[track.artistId]
  track.album = library.albums[track.albumId]

  dispatch(queueAddTracks([track]))

  if (!player.track) {
    dispatch(setItemFromQueue(0))
  }
}

export const addAlbum = (id: string): AppThunk => (dispatch, getState) => {
  const { library, player } = getState()

  dispatch(queueAddTracks(getTracksFromAlbum(id, library)))

  if (!player.track) {
    dispatch(setItemFromQueue(0))
  }
}

export const addArtist = (id: string): AppThunk => (dispatch, getState) => {
  const { library, player } = getState()

  dispatch(queueAddTracks(getTracksFromArtist(id, library)))

  if (!player.track) {
    dispatch(setItemFromQueue(0))
  }
}

export const addPlaylist = (id: string): AppThunk => (dispatch, getState) => {
  const { library, playlist, player } = getState()

  dispatch(queueAddTracks(getTracksFromPlaylist(id, library, playlist)))

  if (!player.track) {
    dispatch(setItemFromQueue(0))
  }
}

/*
 * Selects the next track to play from the queue, get its info,
 * and dispatch required actions.
 */
export const setNextTrack = (endOfTrack: boolean): AppThunk => (
  dispatch,
  getState
) => {
  const state = getState()

  let nextTrackId = '0'
  let newQueuePosition = 0

  if (state.player.track === null) {
    // First play after launch.
    if (state.queue.items.length > 0) {
      // Get first track of the queue.
      newQueuePosition = 0
      nextTrackId = state.queue.items[newQueuePosition].track.id
    } else {
      // No track to play, do nothing.
      return null
    }
  } else if (
    state.player.repeat === PlayerPlaybackMode.PLAYER_REPEAT_LOOP_ONE
  ) {
    // Play the same track again.
    // TODO: Maybe create an action to reset the current track.
    newQueuePosition = state.queue.current
    nextTrackId = state.queue.items[newQueuePosition].track.id
  } else if (state.player.shuffle) {
    // Get the next track to play.
    // TODO: shuffle functionality is currently shit.
    newQueuePosition = Math.floor(Math.random() * state.queue.items.length)
    nextTrackId = state.queue.items[newQueuePosition].track.id
  } else if (state.queue.current + 1 < state.queue.items.length) {
    // Get next song in queue.
    newQueuePosition = state.queue.current + 1
    nextTrackId = state.queue.items[newQueuePosition].track.id
  } else if (
    state.player.repeat === PlayerPlaybackMode.PLAYER_REPEAT_LOOP_ALL
  ) {
    // End of the queue.
    // Loop back to the first track of the queue.
    newQueuePosition = 0
    nextTrackId = state.queue.items[newQueuePosition].track.id
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
export const setPreviousTrack = (): AppThunk => (dispatch, getState) => {
  const state = getState()

  let prevTrackId = '0'
  let newQueuePosition = 0

  // Get trackId of the previous track in playlist.
  if (state.player.track === null) {
    // Do nothing.
    return null
  }
  if (state.player.repeat === PlayerPlaybackMode.PLAYER_REPEAT_LOOP_ONE) {
    // Play the same track again.
    // TODO: Maybe create an action to reset the current track.
    newQueuePosition = state.queue.current
    prevTrackId = state.queue.items[newQueuePosition].track.id
  } else if (state.player.shuffle) {
    // TODO: shuffle functionality is currently shit.
    newQueuePosition = Math.floor(Math.random() * state.queue.items.length)
    prevTrackId = state.queue.items[newQueuePosition].track.id
  } else if (state.queue.current - 1 >= 0) {
    // Get previous song in queue.
    newQueuePosition = state.queue.current - 1
    prevTrackId = state.queue.items[newQueuePosition].track.id
  } else if (
    state.player.repeat === PlayerPlaybackMode.PLAYER_REPEAT_LOOP_ALL
  ) {
    // Beginning of the queue.
    // Loop back to the last track of the queue.
    newQueuePosition = state.queue.items.length - 1
    prevTrackId = state.queue.items[newQueuePosition].track.id
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
export const setCycleNumPos = (
  currentValue: number,
  change: number,
  length: number
) => {
  let newPos = currentValue + change
  if (newPos >= length) {
    newPos -= length
  }
  if (newPos < 0) {
    newPos += length
  }
  return newPos
}

export const getTracksFromAlbum = (
  id: string,
  library: LibraryStateType
): Track[] => {
  const filteredTracks = Object.values(library.tracks).filter(
    (item) => id === item.albumId
  )

  return filteredTracks.map((track) => ({
    ...track,
    artist: track.artistId ? library.artists[track.artistId] : undefined,
    album: track.albumId ? library.albums[track.albumId] : undefined,
  }))
}

// TODO tracks should be ordered per album then track number.
export const getTracksFromArtist = (
  id: string,
  library: LibraryStateType
): Track[] => {
  const filteredTracks = Object.values(library.tracks).filter(
    (item) => id === item.artistId
  )

  return filteredTracks.map((track) => ({
    ...track,
    artist: track.artistId ? library.artists[track.artistId] : undefined,
    album: track.albumId ? library.albums[track.albumId] : undefined,
  }))
}

export const getTracksFromPlaylist = (
  id: string,
  library: LibraryStateType,
  playlists: PlaylistsStateType
): Track[] => {
  const playlist = { ...playlists.playlists[id] }

  return playlist.items.map((item) => ({
    ...item.track,
    artist: item.track.artistId
      ? library.artists[item.track.artistId]
      : undefined,
    album: item.track.albumId ? library.albums[item.track.albumId] : undefined,
  }))
}
