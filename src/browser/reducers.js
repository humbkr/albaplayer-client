import {
  LIBRARY_BROWSER_SELECT_ARTIST,
  LIBRARY_BROWSER_SELECT_TRACK,
  LIBRARY_BROWSER_SORT_ARTISTS,
  LIBRARY_BROWSER_SORT_ALBUMS,
  LIBRARY_BROWSER_SORT_TRACKS,
  LIBRARY_BROWSER_SELECT_ALBUM,
  LIBRARY_BROWSER_INIT_ARTISTS, LIBRARY_BROWSER_SEARCH,
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
  search: {
    term: '',
    // I don't like that but I don't want to rerun the search each time the user selects
    // something after a search.
    filteredArtists: [],
    filteredAlbums: [],
    filteredTracks: [],
  },
};

function libraryBrowser(state = initialState, action, library) {
  switch (action.type) {
    case LIBRARY_BROWSER_INIT_ARTISTS:
      return Object.assign({}, state, {
        ...state,
        artists: (state.search.term === '') ? library.artists : state.search.filteredArtists,
      });

    case LIBRARY_BROWSER_SELECT_ARTIST: {
      let filteredAlbums = [];
      let filteredTracks = [];

      // If the user has searched for something, the filtering is done only on the results already
      // filtered from the search term. Else we filter on the original library.
      let albumsToFilter;
      if (state.search.term === '') {
        albumsToFilter = [...library.albums];
      } else {
        albumsToFilter = [...state.search.filteredAlbums];
      }

      let tracksToFilter;
      if (state.search.term === '') {
        tracksToFilter = [...library.tracks];
      } else {
        tracksToFilter = [...state.search.filteredTracks];
      }

      if (action.artistId !== '0') {
        if (action.artistId === '1') {
          // Special case for compilations which are grouped under the "Various artists" artist.
          filteredAlbums = albumsToFilter.filter(item => (item.artistId === action.artistId));
          const albumsIds = filteredAlbums.map(item => (item.id));
          filteredTracks = tracksToFilter.filter(item => (albumsIds.includes(item.albumId)));
        } else {
          // To display all the albums containing tracks of an artist, including
          // the compilations, we can't directly filter albums on artistId, we have
          // to instead display all the albums for which tracks have been found.
          filteredTracks = tracksToFilter.filter(item => (item.artistId === action.artistId));
          const tracksAlbums = filteredTracks.map(item => (item.albumId));
          filteredAlbums = albumsToFilter.filter(item => (action.artistId === '0' || tracksAlbums.includes(item.id)));
        }
      } else {
        // Display all albums.
        filteredAlbums = albumsToFilter;
      }

      return Object.assign({}, state, {
        ...state,
        selectedAlbums: '0',
        selectedTracks: '0',
        selectedArtists: action.artistId,
        albums: filteredAlbums,
        tracks: filteredTracks,
      });
    }

    case LIBRARY_BROWSER_SELECT_ALBUM: {
      let filteredTracks = [];
      let compilationsIds = [];

      let tracksToFilter;
      if (state.search.term === '') {
        tracksToFilter = [...library.tracks];
      } else {
        tracksToFilter = [...state.search.filteredTracks];
      }

      if (state.selectedArtists === '1') {
        // We want to display all tracks for all the compilations, keep track (hoho) of the albums
        // being compilations.
        compilationsIds = state.albums.map(item => (item.id));
      }

      if (state.selectedArtists !== '0' || action.albumId !== '0') {
        filteredTracks = tracksToFilter.filter((item) => {
          if (state.selectedArtists === '1' && action.albumId === '0') {
            // If "various artists" artist selected and no specific album selected,
            // Display all tracks for all the compilations.
            return (compilationsIds.includes(item.albumId));
          } else if (state.selectedArtists === '1') {
            // If "various artists" artist selected and specific album selected,
            // Display all tracks for this album.
            return (item.albumId === action.albumId);
          } else if (state.selectedArtists !== '0' && action.albumId === '0') {
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
    }

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

    case LIBRARY_BROWSER_SEARCH: {
      // TODO search should not be done when search term is empty.
      const albumsIds = [];
      const artistsIds = [];

      // Filter tracks on title.
      const filteredTracks = library.tracks.filter(item => (
        item.title.toUpperCase().includes(action.searchTerm.toUpperCase())
      ));
      // Extract all albums and artists id of filtered tracks.
      filteredTracks.forEach((element) => {
        albumsIds.push(element.albumId);
        artistsIds.push(element.artistId);
      });

      // Filter albums on title or album id is in albumsIds list.
      const filteredAlbums = library.albums.filter(item => (
        item.title.toUpperCase().includes(action.searchTerm.toUpperCase()) ||
        albumsIds.includes(item.id)
      ));
      // Extract all artists id of filtered albums.
      filteredAlbums.forEach((element) => {
        if (!albumsIds.includes(element.artistId)) {
          artistsIds.push(element.artistId);
        }
      });

      // Filter artists on name or artist id is in artistsIds list.
      const filteredArtists = library.artists.filter(item => (
        item.name.toUpperCase().includes(action.searchTerm.toUpperCase()) ||
        artistsIds.includes(item.id)
      ));

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
      });
    }

    default:
      return state;
  }
}

export default libraryBrowser;
