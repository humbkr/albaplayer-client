import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { api } from 'api'
import Artist from '../../types/Artist'
import Album from '../../types/Album'
import Track from '../../types/Track'
import { AppThunk } from '../../store/types'

export interface LibraryStateType {
  isFetching: boolean
  isUpdating: boolean
  error: string
  isInitialized: boolean
  initHasFailed: boolean
  lastScan: string
  artists: { [id: string]: Artist }
  albums: { [id: string]: Album }
  tracks: { [id: string]: Track }
}

export const libraryInitialState: LibraryStateType = {
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

const librarySlice = createSlice({
  name: 'library',
  initialState: libraryInitialState,
  reducers: {
    initStart(state) {
      state.isFetching = true
    },
    initSuccess(
      state,
      action: PayloadAction<{
        artists: Artist[]
        albums: Album[]
        tracks: Track[]
      }>
    ) {
      const data = action.payload

      // Here we have to make up for the fact that we cannot request albums with artist names
      // from the backend without severe performance penalty. We have to populate the information
      // client-side from the artists list we got from the backend.
      const hydratedAlbums = data.albums.map((album) => {
        const artists = data.artists.filter(
          (artist) => album.artistId === artist.id
        )
        let artistName = ''
        if (artists.length > 0) {
          artistName = artists[0].name
        }

        return { ...album, artistName }
      })

      // Transform the lists into objects.
      const artists: { [id: string]: Artist } = {}
      const albums: { [id: string]: Album } = {}
      const tracks: { [id: string]: Track } = {}
      data.artists.forEach((item) => {
        artists[item.id] = item
      })
      hydratedAlbums.forEach((item) => {
        albums[item.id] = item
      })
      data.tracks.forEach((item) => {
        tracks[item.id] = item
      })

      state.isFetching = false
      state.isInitialized = true
      state.artists = artists
      state.albums = albums
      state.tracks = tracks
    },
    initFailure(state) {
      state.isFetching = false
      state.isInitialized = false
      state.initHasFailed = true
    },
    setLastScan(state, action) {
      state.lastScan = action.payload
    },
  },
})

export const {
  initStart,
  initSuccess,
  initFailure,
  setLastScan,
} = librarySlice.actions
export default librarySlice.reducer

export const initLibrary = (force: boolean = false): AppThunk => (
  dispatch,
  getState
) => {
  if (force || shouldFetchLibrary(dispatch, getState().library)) {
    return dispatch(fetchLibrary())
  }
  return null
}

const fetchLibrary = (): AppThunk => (dispatch) => {
  // First the app state is updated to inform that the API call is starting.
  dispatch(initStart())

  // Then we make the API call.
  return api
    .getLibrary()
    .then((response) => {
      dispatch(initSuccess(response.data))
      if (response.data.variable) {
        dispatch(setLastScan(response.data.variable.value))
      }
    })
    .catch(() => {
      dispatch(initFailure())
    })
}

const shouldFetchLibrary = async (
  dispatch: unknown,
  libraryState: LibraryStateType
) => {
  // We should fetch if library is not initialized.
  if (!libraryState.isInitialized) {
    if (libraryState.tracks && Object.values(libraryState.tracks).length < 1) {
      return true
    }

    // Get last scan date from backend. If backend last scan > local version, we
    // have to fetch, else we can reuse the local data.
    api
      .getVariable('library_last_updated')
      .then((response) => {
        const remoteLastScan = response.data.variable.value
        return remoteLastScan > libraryState.lastScan
      })
      .catch(() => {
        // TODO log failure.
      })
  }

  // If the library is currently fetching, nothing to do.
  if (libraryState.isFetching) {
    return false
  }

  return false
}
