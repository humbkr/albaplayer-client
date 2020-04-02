import types from './types'

const libraryBrowserInitArtists = () => ({
  type: types.LIBRARY_BROWSER_INIT_ARTISTS,
})

const libraryBrowserSelectArtist = (artistId, index) => ({
  type: types.LIBRARY_BROWSER_SELECT_ARTIST,
  artistId,
  index,
})

const libraryBrowserSelectAlbum = (albumId, index) => ({
  type: types.LIBRARY_BROWSER_SELECT_ALBUM,
  albumId,
  index,
})

const libraryBrowserSelectTrack = (trackId, index) => ({
  type: types.LIBRARY_BROWSER_SELECT_TRACK,
  trackId,
  index,
})

const libraryBrowserSortArtists = (sortProperty) => ({
  type: types.LIBRARY_BROWSER_SORT_ARTISTS,
  sortProperty,
})

const libraryBrowserSortAlbums = (sortProperty) => ({
  type: types.LIBRARY_BROWSER_SORT_ALBUMS,
  sortProperty,
})

const libraryBrowserSortTracks = (sortProperty) => ({
  type: types.LIBRARY_BROWSER_SORT_TRACKS,
  sortProperty,
})

const libraryBrowserSearchUpdateInput = (searchTerm) => ({
  type: types.LIBRARY_BROWSER_SEARCH_UPDATE_INPUT,
  searchTerm,
})

const libraryBrowserSearchFilter = (searchTerm) => ({
  type: types.LIBRARY_BROWSER_SEARCH_FILTER,
  searchTerm,
})

/*
 * Called when loading the browser pane.
 */
const libraryBrowserInit = () => (dispatch, getState) => {
  const state = getState()
  dispatch(libraryBrowserInitArtists())
  dispatch(
    libraryBrowserSelectArtist(
      state.libraryBrowser.selectedArtists,
      state.libraryBrowser.currentPositionArtists
    )
  )
  dispatch(
    libraryBrowserSelectAlbum(
      state.libraryBrowser.selectedAlbums,
      state.libraryBrowser.currentPositionAlbums
    )
  )
  dispatch(
    libraryBrowserSelectTrack(
      state.libraryBrowser.selectedTracks,
      state.libraryBrowser.currentPositionTracks
    )
  )
}

const libraryBrowserSearch = (text) => {
  // Launch the search only if user has typed 3 or more characters.
  if (text.length > 2) {
    return (dispatch) => {
      dispatch(libraryBrowserSearchUpdateInput(text))
      dispatch(libraryBrowserSearchFilter(text))
    }
  }
  if (text.length === 0) {
    // Reinitialise library browser.
    return (dispatch) => {
      dispatch(libraryBrowserSearchUpdateInput(text))
      dispatch(libraryBrowserSelectArtist('0', 0))
      dispatch(libraryBrowserInit())
    }
  }

  // In any case, update the search field.
  return (dispatch) => {
    dispatch(libraryBrowserSearchUpdateInput(text))
  }
}

export default {
  libraryBrowserInitArtists,
  libraryBrowserSelectArtist,
  libraryBrowserSelectAlbum,
  libraryBrowserSelectTrack,
  libraryBrowserSortArtists,
  libraryBrowserSortAlbums,
  libraryBrowserSortTracks,
  libraryBrowserSearch,
  libraryBrowserInit,
}
