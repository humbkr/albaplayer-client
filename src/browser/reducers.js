import {
  LIBRARY_BROWSER_SELECT_ARTIST,
  LIBRARY_BROWSER_SELECT_TRACK,
  LIBRARY_BROWSER_SORT_ARTISTS,
  LIBRARY_BROWSER_SORT_ALBUMS,
  LIBRARY_BROWSER_SORT_TRACKS,
  LIBRARY_BROWSER_SELECT_ALBUM,
  LIBRARY_BROWSER_INIT_ARTISTS,
  LIBRARY_BROWSER_SEARCH_FILTER,
  LIBRARY_BROWSER_SEARCH_UPDATE_INPUT,
} from './actions'

const initialState = {
  artists: [],
  albums: [],
  tracks: [],
  sortArtists: 'name',
  sortAlbums: 'title',
  sortTracks: 'number',
  selectedArtists: '0',
  selectedAlbums: '0',
  selectedTracks: '0',
  currentPositionArtists: 0,
  currentPositionAlbums: 0,
  currentPositionTracks: 0,
  search: {
    term: '',
    // I don't like that but I don't want to rerun the search each time the user selects
    // something after a search.
    filteredArtists: [],
    filteredAlbums: [],
    filteredTracks: [],
  },
}

function selectArtist(state, action, library) {
  let filteredAlbums = []
  let filteredTracks = []

  // If the user has searched for something, the filtering is done only on the results already
  // filtered from the search term. Else we filter on the original library.
  let albumsToFilter
  if (state.search.term === '') {
    albumsToFilter = [...library.albums]
  } else {
    albumsToFilter = [...state.search.filteredAlbums]
  }

  let tracksToFilter
  if (state.search.term === '') {
    tracksToFilter = [...library.tracks]
  } else {
    tracksToFilter = [...state.search.filteredTracks]
  }

  if (action.artistId !== '0') {
    if (action.artistId === '1') {
      // Special case for compilations which are grouped under the "Various artists" artist.
      filteredAlbums = albumsToFilter.filter(
        item => item.artistId === action.artistId
      )
      const albumsIds = filteredAlbums.map(item => item.id)
      filteredTracks = tracksToFilter.filter(item => albumsIds.includes(item.albumId))
    } else {
      // To display all the albums containing tracks of an artist, including
      // the compilations, we can't directly filter albums on artistId, we have
      // to instead display all the albums for which tracks have been found.
      filteredTracks = tracksToFilter.filter(
        item => item.artistId === action.artistId
      )
      const tracksAlbums = filteredTracks.map(item => item.albumId)
      filteredAlbums = albumsToFilter.filter(
        item => action.artistId === '0' || tracksAlbums.includes(item.id)
      )
    }
  } else {
    // Display all albums.
    filteredAlbums = albumsToFilter
  }

  return Object.assign({}, state, {
    ...state,
    selectedAlbums: '0',
    selectedTracks: '0',
    selectedArtists: action.artistId,
    currentPositionArtists: action.index,
    currentPositionAlbums: 0,
    currentPositionTracks: 0,
    albums: filteredAlbums,
    tracks: filteredTracks,
  })
}

function selectAlbum(state, action, library) {
  let filteredTracks = []
  let compilationsIds = []

  let tracksToFilter
  if (state.search.term === '') {
    tracksToFilter = [...library.tracks]
  } else {
    tracksToFilter = [...state.search.filteredTracks]
  }

  if (state.selectedArtists === '1') {
    // We want to display all tracks for all the compilations, keep track (hoho) of the albums
    // being compilations.
    compilationsIds = state.albums.map(item => item.id)
  }

  if (state.selectedArtists !== '0' || action.albumId !== '0') {
    filteredTracks = tracksToFilter.filter((item) => {
      if (state.selectedArtists === '1' && action.albumId === '0') {
        // If "various artists" artist selected and no specific album selected,
        // Display all tracks for all the compilations.
        return compilationsIds.includes(item.albumId)
      } if (state.selectedArtists === '1') {
        // If "various artists" artist selected and specific album selected,
        // Display all tracks for this album.
        return item.albumId === action.albumId
      } if (state.selectedArtists !== '0' && action.albumId === '0') {
        // If no specific album selected, display all the tracks of
        // the selected artist for all albums of this artist.
        return item.artistId === state.selectedArtists
      } if (state.selectedArtists === '0') {
        // If no artist selected, display all the tracks
        // for the selected album.
        return item.albumId === action.albumId
      }

      // Else return the tracks for the selected album and artist.
      return (
        item.albumId === action.albumId
        && item.artistId === state.selectedArtists
      )
    })
  }

  return Object.assign({}, state, {
    ...state,
    selectedTracks: '0',
    selectedAlbums: action.albumId,
    currentPositionAlbums: action.index,
    currentPositionTracks: 0,
    tracks: filteredTracks,
  })
}

/**
 * Search reducer.
 *
 * Filters:
 *   - tracks on title
 *   - albums on title
 *   - artists on name
 * - For the tracks, the album containing a found track and the artist will then be included in
 *   the results.
 * - For the albums, the artist of a found album AND all the tracks for this album will then be
 *   included in the results.
 * - For the artists, all the albums and all the tracks for this artist will then be
 *   included in the results.
 *
 */
function searchFilter(state, action, library) {
  // Artists and albums are updated with search results from respectively albums + tracks and
  // tracks so we can't directly filter the original lists.
  const artistsIds = []
  const albumsIds = []
  // Tracks list can be filtered directly though because we already have all the artists and
  // albums info we need at the moment of browsing the tracks list.
  const filteredTracks = []

  // Get ids of all artists whose name is matching the search term.
  library.artists.forEach((item) => {
    if (item.name.toUpperCase().includes(action.searchTerm.toUpperCase())) {
      artistsIds.push(item.id)
    }
  })

  // Store artists and album ids that are not found with a direct match in separate variables.
  const undirectAlbumsIds = []
  const undirectArtistsIds = []

  library.albums.forEach((item) => {
    // Get ids of all albums whose title is matching the search term.
    if (item.title.toUpperCase().includes(action.searchTerm.toUpperCase())) {
      albumsIds.push(item.id)

      // Add album's artist id to the list of artists.
      if (!artistsIds.includes(item.artistId)) {
        undirectArtistsIds.push(item.artistId)
      }
    }

    // Also get all albums of artists that have previously been found.
    if (artistsIds.includes(item.artistId)) {
      if (!albumsIds.includes(item.id)) {
        undirectAlbumsIds.push(item.id)
      }
    }
  })

  library.tracks.forEach((item) => {
    // Also get all tracks of artists and albums that have previously been found.
    if (artistsIds.includes(item.artistId)) {
      if (!filteredTracks.includes(item)) {
        filteredTracks.push(item)
      }
    }
    if (albumsIds.includes(item.albumId)) {
      if (!filteredTracks.includes(item)) {
        filteredTracks.push(item)
      }
    }

    // Get ids of all tracks whose title is matching the search term.
    if (item.title.toUpperCase().includes(action.searchTerm.toUpperCase())) {
      filteredTracks.push(item)

      // Add track's artist id to the list of artists.
      if (!undirectArtistsIds.includes(item.artistId)) {
        undirectArtistsIds.push(item.artistId)
      }

      // Add track's album id to the list of albums.
      if (!undirectAlbumsIds.includes(item.albumId)) {
        undirectAlbumsIds.push(item.albumId)
      }
    }
  })

  // Add back artists added from album matching.
  undirectArtistsIds.forEach((item) => {
    if (!artistsIds.includes(item)) {
      artistsIds.push(item)
    }
  })

  // Add back albums added from artists matching.
  undirectAlbumsIds.forEach((item) => {
    if (!albumsIds.includes(item)) {
      albumsIds.push(item)
    }
  })

  // Then filter the artists and albums.
  const filteredArtists = library.artists.filter(item => artistsIds.includes(item.id))
  const filteredAlbums = library.albums.filter(item => albumsIds.includes(item.id))

  return Object.assign({}, state, {
    ...state,
    // Reset previously selected stuff.
    selectedArtists: '0',
    selectedAlbums: '0',
    selectedTracks: '0',
    // Set search filtered lists and term.
    search: {
      term: action.searchTerm,
      filteredArtists,
      filteredAlbums,
      filteredTracks,
    },
    // Set display lists.
    artists: filteredArtists,
    albums: filteredAlbums,
    tracks: filteredTracks,
  })
}

function libraryBrowser(state = initialState, action, library) {
  switch (action.type) {
    case LIBRARY_BROWSER_INIT_ARTISTS:
      return Object.assign({}, state, {
        ...state,
        artists:
          state.search.term === ''
            ? library.artists
            : state.search.filteredArtists,
      })

    case LIBRARY_BROWSER_SELECT_ARTIST: {
      return selectArtist(state, action, library)
    }

    case LIBRARY_BROWSER_SELECT_ALBUM:
      return selectAlbum(state, action, library)

    case LIBRARY_BROWSER_SELECT_TRACK:
      return Object.assign({}, state, {
        ...state,
        selectedTracks: action.trackId,
        currentPositionTracks: action.index,
      })

    case LIBRARY_BROWSER_SORT_ARTISTS:
      return Object.assign({}, state, {
        ...state,
        sortArtists: action.sortProperty,
      })

    case LIBRARY_BROWSER_SORT_ALBUMS:
      return Object.assign({}, state, {
        ...state,
        sortAlbums: action.sortProperty,
      })

    case LIBRARY_BROWSER_SORT_TRACKS:
      return Object.assign({}, state, {
        ...state,
        sortTracks: action.sortProperty,
      })

    case LIBRARY_BROWSER_SEARCH_UPDATE_INPUT:
      return Object.assign({}, state, {
        ...state,
        search: {
          ...state.search,
          term: action.searchTerm,
        },
      })

    case LIBRARY_BROWSER_SEARCH_FILTER:
      return searchFilter(state, action, library)

    default:
      return state
  }
}

export default libraryBrowser
