import { persistReducer } from 'redux-persist'
import storage from 'redux-persist/es/storage'
import types from './types'

const initialState = {
  isFetching: false,
  isUpdating: false,
  error: '',
  isInitialized: false,
  initHasFailed: false,
  lastScan: '',
  artists: {},
  albums: {},
  tracks: {},
}

function library(state = initialState, action) {
  switch (action.type) {
    case types.LIBRARY_INIT_START:
      return {
        ...state,
        isFetching: true,
      }

    case types.LIBRARY_INIT_SUCCESS: {
      // Here we have to make up for the fact that we cannot request albums with artist names
      // from the backend without severe performance penalty. We have to populate the information
      // client-side from the artists list we got from the backend.
      const hydratedAlbums = action.response.albums.map((album) => {
        const artists = action.response.artists.filter(
          (artist) => album.artistId === artist.id
        )
        let artistName = ''
        if (artists.length > 0) {
          artistName = artists[0].name
        }

        return { ...album, artistName }
      })

      // Transform the lists into objects.
      const artists = {}
      action.response.artists.forEach((item) => {
        artists[item.id] = item
      })

      const albums = {}
      hydratedAlbums.forEach((item) => {
        albums[item.id] = item
      })

      const tracks = {}
      action.response.tracks.forEach((item) => {
        tracks[item.id] = item
      })

      return {
        ...state,
        isFetching: false,
        isInitialized: true,
        artists,
        albums,
        tracks,
      }
    }

    case types.LIBRARY_INIT_FAILURE:
      return {
        ...state,
        isFetching: false,
        isInitialized: false,
        initHasFailed: true,
      }

    case types.LIBRARY_SET_LAST_SCAN:
      return {
        ...state,
        lastScan: action.lastScanDate,
      }

    default:
      return state
  }
}

const libraryPersistConfig = {
  key: 'library',
  storage,
  whitelist: ['lastScan', 'artists', 'albums', 'tracks'],
}

export default persistReducer(libraryPersistConfig, library)
