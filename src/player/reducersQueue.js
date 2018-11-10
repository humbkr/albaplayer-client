import {
  QUEUE_ADD_ALBUM,
  QUEUE_ADD_ARTIST,
  QUEUE_ADD_TRACK,
  QUEUE_CLEAR,
  QUEUE_UPDATE,
  QUEUE_REMOVE_TRACK,
  QUEUE_SET_CURRENT,
} from './actionsQueue'
import { immutableSortTracks, immutableRemove } from '../utils'

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

const initialState = {
  tracks: [],
  current: undefined,
}

function queue(state = initialState, action, library) {
  switch (action.type) {
    case QUEUE_ADD_TRACK: {
      const track = library.tracks[action.trackId]
      track.artist = library.artists[track.artistId]
      track.album = library.albums[track.albumId]

      return Object.assign({}, state, {
        tracks: [...state.tracks, track],
        current: state.current,
      })
    }
    case QUEUE_ADD_ALBUM: {
      // Get tracks from album.
      const filteredTracks = Object.values(library.tracks).filter(
        item => action.albumId === item.albumId
      )
      filteredTracks.forEach((track) => {
        // eslint-disable-next-line no-param-reassign
        track.artist = library.artists[track.artistId]
        // eslint-disable-next-line no-param-reassign
        track.album = library.albums[track.albumId]
      })

      return Object.assign({}, state, {
        tracks: [
          ...state.tracks,
          ...immutableSortTracks(filteredTracks, 'number'),
        ],
        current: state.current,
      })
    }
    case QUEUE_ADD_ARTIST: {
      // Get tracks from artist.
      const filteredTracks = Object.values(library.tracks).filter(
        item => action.artistId === item.artistId
      )
      filteredTracks.forEach((track) => {
        // eslint-disable-next-line no-param-reassign
        track.artist = library.artists[track.artistId]
        // eslint-disable-next-line no-param-reassign
        track.albums = library.album[track.albumId]
      })

      return Object.assign({}, state, {
        tracks: [...state.tracks, ...filteredTracks],
        current: state.current,
      })
    }
    case QUEUE_REMOVE_TRACK:
      return queueRemoveTrack(state, action)
    case QUEUE_CLEAR:
      return Object.assign({}, state, {
        tracks: [],
        current: '',
      })
    case QUEUE_UPDATE:
      return Object.assign({}, state, {
        ...state,
        tracks: action.newQueue,
      })
    case QUEUE_SET_CURRENT:
      return Object.assign({}, state, {
        ...state,
        current: action.position,
      })

    default:
      return state
  }
}

export default queue
