import {
  LIBRARY_BROWSER_SELECT_ARTIST,
  LIBRARY_BROWSER_INIT_START,
  LIBRARY_BROWSER_INIT_SUCCESS, LIBRARY_BROWSER_SELECT_ALBUM,
  LIBRARY_BROWSER_SELECT_TRACK, LIBRARY_BROWSER_SORT_ARTISTS,
  LIBRARY_BROWSER_SORT_ALBUMS, LIBRARY_BROWSER_SORT_TRACKS
} from "./actions";


const initialState = {
  // Data from server.
  original: {
    isFetching: false,
    isInitialized: false,
    artists: [],
    albums: [],
    tracks: []
  },
  // UI state.
  current: {
    artists: [],
    albums: [],
    tracks: [],
    sortArtists: 'name',
    sortAlbums: 'title',
    sortTracks: 'number',
    selectedArtists: '',
    selectedAlbums: '',
    selectedTracks: ''
  }
};

function libraryBrowser(state = initialState, action) {
  switch (action.type) {
    case LIBRARY_BROWSER_INIT_START:
      return Object.assign({}, state, {
        original: {
          ...state.original,
          isFetching: true
        },
        current: state.current
      });
    case LIBRARY_BROWSER_INIT_SUCCESS:
      // Populate original and current lsits data.
      return Object.assign({}, state, {
        original: {
          ...state.original,
          isFetching: false,
          isInitialized: true,
          artists: action.response.artists,
          albums: action.response.albums,
          tracks: action.response.tracks
        },
        current: {
          ...state.current,
          artists: action.response.artists,
          albums: action.response.albums,
          tracks: action.response.tracks
        }
      });
    case LIBRARY_BROWSER_SELECT_ARTIST:
      return Object.assign({}, state, {
        original: state.original,
        current: {
          ...state.current,
          selectedArtists: action.artistId,
          albums: state.original.albums.filter(item => (action.artistId === '0' || item.artistId === action.artistId)),
          tracks: state.original.tracks.filter(item => (action.artistId === '0' || item.artistId === action.artistId))
        }
      });
    case LIBRARY_BROWSER_SELECT_ALBUM:
      return Object.assign({}, state, {
        original: state.original,
        current: {
          ...state.current,
          selectedAlbums: action.albumId,
          tracks: state.original.tracks.filter((item) => {
            if (action.albumId === '0' && state.current.selectedArtists === '0') {
              // Display all the tracks in the library.
              return true
            } else if (action.albumId === '0') {
              // Display all the tracks of the selected artist for all albums of
              // this artist.
              return item.artistId === state.current.selectedArtists
            }

            // Else return the tracks for the selected album only.
            return item.albumId === action.albumId
          })
        }
      });
    case LIBRARY_BROWSER_SELECT_TRACK:
      return Object.assign({}, state, {
        original: state.original,
        current: {
          ...state.current,
          selectedTracks: action.trackId
        }
      });
    case LIBRARY_BROWSER_SORT_ARTISTS:
      return Object.assign({}, state, {
        original: state.original,
        current: {
          ...state.current,
          sortArtists: action.sortProperty
        }
      });
    case LIBRARY_BROWSER_SORT_ALBUMS:
      return Object.assign({}, state, {
        original: state.original,
        current: {
          ...state.current,
          sortAlbums: action.sortProperty
        }
      });
    case LIBRARY_BROWSER_SORT_TRACKS:
      return Object.assign({}, state, {
        original: state.original,
        current: {
          ...state.current,
          sortTracks: action.sortProperty
        }
      });

    default:
      return state;
  }
}

export default libraryBrowser;
