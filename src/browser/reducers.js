import {
  LIBRARY_BROWSER_SELECT_ARTIST,
  LIBRARY_BROWSER_SELECT_TRACK,
  LIBRARY_BROWSER_SORT_ARTISTS,
  LIBRARY_BROWSER_SORT_ALBUMS,
  LIBRARY_BROWSER_SORT_TRACKS,
  LIBRARY_BROWSER_SELECT_ALBUM, LIBRARY_BROWSER_INIT_ARTISTS,
} from './actions';


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
};

function libraryBrowser(state = initialState, action, library) {
  switch (action.type) {
    case LIBRARY_BROWSER_INIT_ARTISTS:
      return Object.assign({}, state, {
        ...state,
        artists: library.artists,
      });
    case LIBRARY_BROWSER_SELECT_ARTIST: {
      // To display all the albums containing tracks of an artist, including
      // the compilations, we can't directly filter albums on artistId, we have
      // to instead display all the albums for which tracks have been found.
      let filteredTracks = [];
      let tracksAlbums = [];
      if (action.artistId !== '0') {
        filteredTracks = library.tracks.filter(item => (item.artistId === action.artistId));
        tracksAlbums = filteredTracks.map(item => (item.albumId));
      }

      return Object.assign({}, state, {
        ...state,
        selectedAlbums: '0',
        selectedTracks: '0',
        selectedArtists: action.artistId,
        albums: library.albums.filter(item => (action.artistId === '0' || tracksAlbums.includes(item.id))),
        tracks: filteredTracks,
      });
    }
    case LIBRARY_BROWSER_SELECT_ALBUM:
      let filteredTracks = [];
      if (state.selectedArtists !== '0' || action.albumId !== '0') {
        filteredTracks = library.tracks.filter((item) => {
          if (state.selectedArtists !== '0' && action.albumId === '0') {
            // If no specific album selected, display all the tracks of
            // the selected artist for all albums of this artist.
            return item.artistId === state.selectedArtists;
          } else if (state.selectedArtists === '0') {
            // If no artist selected, display all the tracks
            // for the selected album.
            return (item.albumId === action.albumId);
          }

          // Else return the tracks for the selected album and artist.
          return (item.albumId === action.albumId && item.artistId === state.selectedArtists);
        });
      }

      return Object.assign({}, state, {
        ...state,
        selectedTracks: '0',
        selectedAlbums: action.albumId,
        tracks: filteredTracks,
      });

    case LIBRARY_BROWSER_SELECT_TRACK:
      return Object.assign({}, state, {
        ...state,
        selectedTracks: action.trackId,
      });

    case LIBRARY_BROWSER_SORT_ARTISTS:
      return Object.assign({}, state, {
        ...state,
        sortArtists: action.sortProperty,
      });

    case LIBRARY_BROWSER_SORT_ALBUMS:
      return Object.assign({}, state, {
        ...state,
        sortAlbums: action.sortProperty,
      });

    case LIBRARY_BROWSER_SORT_TRACKS:
      return Object.assign({}, state, {
        ...state,
        sortTracks: action.sortProperty,
      });

    default:
      return state;
  }
}

export default libraryBrowser;
