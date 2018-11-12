import getBackendUrl from '../backend/config'
import {
  PLAYER_REPEAT_LOOP_ALL,
  PLAYER_REPEAT_LOOP_ONE,
  playerSetProgress,
  playerSetTrack,
  playerTogglePlayPause,
} from './actionsPlayer'
import {
  queueAddAlbum,
  queueAddArtist,
  queueAddTrack,
  queueClear,
  queueSetCurrent,
} from './actionsQueue'
import { getFullTrackInfo } from '../backend/api'

const setTrackFromQueue = trackPosition => (dispatch, getState) => {
  const state = getState()

  if (state.queue.tracks.length < trackPosition) {
    return null
  }

  // Make API call to get the track full info.
  return getFullTrackInfo(state.queue.tracks[trackPosition].id).then(
    (response) => {
      // And dispatch appropriate actions.
      // Copy track to change it.
      const track = { ...response.data.track }
      track.cover = track.cover ? getBackendUrl() + track.cover : ''
      track.src = getBackendUrl() + track.src

      dispatch(playerSetTrack(track))
      dispatch(queueSetCurrent(trackPosition))
    }
  )
}

/*
 * Select the next track to play from the queue, get its info,
 * and dispatch required actions.
 */
const setNextTrack = endOfTrack => (dispatch, getState) => {
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
  } else if (state.player.repeat === PLAYER_REPEAT_LOOP_ONE) {
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
  } else if (state.player.repeat === PLAYER_REPEAT_LOOP_ALL) {
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
  return getFullTrackInfo(nextTrackId).then((response) => {
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
 * Select the previous track to play from the queue, get its info,
 * and dispatch required actions.
 */
const setPreviousTrack = () => (dispatch, getState) => {
  const state = getState()

  let prevTrackId = 0
  let newQueuePosition = 0

  // Get trackId of the previous track in playlist.
  if (state.player.track === null) {
    // Do nothing.
    return null
  }
  if (state.player.repeat === PLAYER_REPEAT_LOOP_ONE) {
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
  } else if (state.player.repeat === PLAYER_REPEAT_LOOP_ALL) {
    // Begining of the queue.
    // Loop back to the last track of the queue.
    newQueuePosition = state.queue.tracks.length - 1
    prevTrackId = state.queue.tracks[state.queue.tracks.length - 1].id
  } else {
    // No further track to play, do nothing.
    return null
  }

  // Make API call to get the track full info.
  return getFullTrackInfo(prevTrackId).then((response) => {
    // And dispatch appropriate actions.
    // Copy track to change it.
    const track = { ...response.data.track }
    track.cover = track.cover ? getBackendUrl() + track.cover : ''
    track.src = getBackendUrl() + track.src

    dispatch(playerSetTrack(track))
    dispatch(queueSetCurrent(newQueuePosition))
  })
}

const playTrack = id => (dispatch) => {
  dispatch(queueClear())
  dispatch(queueAddTrack(id))
  dispatch(setTrackFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

const playAlbum = id => (dispatch) => {
  dispatch(queueClear())
  dispatch(queueAddAlbum(id))
  dispatch(setTrackFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

const playArtist = id => (dispatch) => {
  dispatch(queueClear())
  dispatch(queueAddArtist(id))
  dispatch(setTrackFromQueue(0))
  dispatch(playerTogglePlayPause(true))
}

const addTrack = id => (dispatch, getState) => {
  dispatch(queueAddTrack(id))

  const state = getState()
  if (state.player.track === null) {
    dispatch(setTrackFromQueue(0))
  }
}

const addAlbum = id => (dispatch, getState) => {
  dispatch(queueAddAlbum(id))

  const state = getState()
  if (state.player.track === null) {
    dispatch(setTrackFromQueue(0))
  }
}

const addArtist = id => (dispatch, getState) => {
  dispatch(queueAddArtist(id))

  const state = getState()
  if (state.player.track === null) {
    dispatch(setTrackFromQueue(0))
  }
}

export {
  setTrackFromQueue,
  setNextTrack,
  setPreviousTrack,
  playTrack,
  playAlbum,
  playArtist,
  addTrack,
  addAlbum,
  addArtist,
}
