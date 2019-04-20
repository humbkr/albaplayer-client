import types from './types'
import constants from './constants'
import {
  immutableSortTracks,
  immutableRemove,
} from '../../../common/utils/utils'

/*
 * Calculates the next / previous position in an list of consecutive integers
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
function setCycleNumPos(currentValue, change, length) {
  let newPos = currentValue + change
  if (newPos >= length) {
    newPos -= length
  }
  if (newPos < 0) {
    newPos += length
  }
  return newPos
}

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

function player(state = initialState, action) {
  switch (action.type) {
    case types.PLAYER_TOGGLE_PLAY_PAUSE:
      if (state.track || action.forcedValue !== undefined) {
        return {
          ...state,
          playing:
            action.forcedValue === undefined
              ? !state.playing
              : action.forcedValue,
        }
      }

      return state
    case types.PLAYER_TOGGLE_SHUFFLE:
      return {
        ...state,
        shuffle: !state.shuffle,
      }
    case types.PLAYER_TOGGLE_REPEAT:
      return {
        ...state,
        repeat: setCycleNumPos(state.repeat, 1, 3),
      }
    case types.PLAYER_SET_VOLUME:
      return {
        ...state,
        volume: action.volume,
      }
    case types.PLAYER_SET_TRACK:
      return {
        ...state,
        track: action.track,
      }
    case types.PLAYER_SET_DURATION:
      return {
        ...state,
        duration: action.duration,
      }
    case types.PLAYER_SET_PROGRESS:
      return {
        ...state,
        progress: action.currentTime,
      }
    default:
      return state
  }
}

const queueRemoveTrack = (state, action) => {
  let nextCurrent = state.current
  if (action.trackIndex <= state.current) {
    nextCurrent -= 1
  }

  return Object.assign({}, state, {
    tracks: immutableRemove(state.tracks, action.trackIndex),
    current: nextCurrent,
  })
}

const queueReducerInitialState = {
  tracks: [],
  current: undefined,
}

function queue(state = queueReducerInitialState, action, library, playlists) {
  switch (action.type) {
    case types.QUEUE_ADD_TRACK: {
      const track = library.tracks[action.trackId]
      track.artist = library.artists[track.artistId]
      track.album = library.albums[track.albumId]

      return {
        ...state,
        tracks: [...state.tracks, track],
      }
    }
    case types.QUEUE_ADD_ALBUM: {
      // Get tracks from album.
      const filteredTracks = Object.values(library.tracks).filter(
        (item) => action.albumId === item.albumId
      )
      filteredTracks.forEach((track) => {
        // eslint-disable-next-line no-param-reassign
        track.artist = library.artists[track.artistId]
        // eslint-disable-next-line no-param-reassign
        track.album = library.albums[track.albumId]
      })

      return {
        ...state,
        tracks: [
          ...state.tracks,
          ...immutableSortTracks(filteredTracks, 'number'),
        ],
      }
    }
    case types.QUEUE_ADD_ARTIST: {
      // Get tracks from artist.
      const filteredTracks = Object.values(library.tracks).filter(
        (item) => action.artistId === item.artistId
      )
      filteredTracks.forEach((track) => {
        // eslint-disable-next-line no-param-reassign
        track.artist = library.artists[track.artistId]
        // eslint-disable-next-line no-param-reassign
        track.album = library.albums[track.albumId]
      })

      return {
        ...state,
        tracks: [...state.tracks, ...filteredTracks],
      }
    }
    case types.QUEUE_ADD_PLAYLIST: {
      // Get tracks from playlist.
      const playlist = playlists.playlists[action.playlistId]

      playlist.tracks.forEach((track) => {
        // eslint-disable-next-line no-param-reassign
        track.artist = library.artists[track.artistId]
        // eslint-disable-next-line no-param-reassign
        track.album = library.albums[track.albumId]
      })

      return {
        ...state,
        tracks: [...state.tracks, ...playlist.tracks],
      }
    }
    case types.QUEUE_REMOVE_TRACK:
      return queueRemoveTrack(state, action)
    case types.QUEUE_CLEAR:
      return {
        tracks: [],
        current: '',
      }
    case types.QUEUE_UPDATE:
      return {
        ...state,
        tracks: action.newQueue,
      }
    case types.QUEUE_SET_CURRENT:
      return {
        ...state,
        current: action.position,
      }

    default:
      return state
  }
}

export default {
  player,
  queue,
}
