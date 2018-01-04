import {
  LIBRARY_BROWSER_SELECT_ARTIST,
  LIBRARY_BROWSER_INIT_START,
  LIBRARY_BROWSER_INIT_SUCCESS
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
    selectedArtists: 0,
    selectedAlbums: 0,
    selectedTracks: 0
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
          albums: state.original.albums.map((album) => {
            if (album.artistId === action.artistId) {
              return album
            }
          }),
          tracks: state.original.tracks.map((track) => {
            if (track.artistId === action.artistId) {
              return track
            }
          })
        }
      });

    default:
      return state;
  }
}

export default libraryBrowser;
