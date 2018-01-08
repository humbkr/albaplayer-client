import {
  LIBRARY_BROWSER_SELECT_ARTIST,
  LIBRARY_BROWSER_INIT,
  LIBRARY_BROWSER_SELECT_TRACK,
  LIBRARY_BROWSER_SORT_ARTISTS,
  LIBRARY_BROWSER_SORT_ALBUMS,
  LIBRARY_BROWSER_SORT_TRACKS,
  LIBRARY_BROWSER_SELECT_ALBUM
} from "./actions"


const initialState = {
  artists: [],
  albums: [],
  tracks: [],
  sortArtists: 'name',
  sortAlbums: 'title',
  sortTracks: 'number',
  selectedArtists: '',
  selectedAlbums: '',
  selectedTracks: ''
};

function libraryBrowser(state = initialState, action, library) {
  switch (action.type) {
    case LIBRARY_BROWSER_INIT:
      return Object.assign({}, state, {
        ...state,
        artists: library.artists,
        albums: library.albums,
        tracks: library.tracks
      });

    case LIBRARY_BROWSER_SELECT_ARTIST:
      return Object.assign({}, state, {
          ...state,
          selectedArtists: action.artistId,
          albums: library.albums.filter(item => (action.artistId === '0' || item.artistId === action.artistId)),
          tracks: library.tracks.filter(item => (action.artistId === '0' || item.artistId === action.artistId))
      });

    case LIBRARY_BROWSER_SELECT_ALBUM:
      return Object.assign({}, state, {
        ...state,
        selectedAlbums: action.albumId,
        tracks: library.tracks.filter((item) => {
          if (action.albumId === '0' && state.selectedArtists === '0') {
            // Display all the tracks in the library.
            return true
          } else if (action.albumId === '0') {
            // Display all the tracks of the selected artist for all albums of
            // this artist.
            return item.artistId === state.selectedArtists
          }

          // Else return the tracks for the selected album only.
          return item.albumId === action.albumId
        })
      });

    case LIBRARY_BROWSER_SELECT_TRACK:
      return Object.assign({}, state, {
        ...state,
        selectedTracks: action.trackId
      });

    case LIBRARY_BROWSER_SORT_ARTISTS:
      return Object.assign({}, state, {
        ...state,
        sortArtists: action.sortProperty
      });

    case LIBRARY_BROWSER_SORT_ALBUMS:
      return Object.assign({}, state, {
        ...state,
        sortAlbums: action.sortProperty
      });

    case LIBRARY_BROWSER_SORT_TRACKS:
      return Object.assign({}, state, {
        ...state,
        sortTracks: action.sortProperty
      });

    default:
      return state;
  }
}

export default libraryBrowser;
