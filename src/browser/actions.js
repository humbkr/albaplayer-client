const LIBRARY_BROWSER_INIT_ARTISTS = 'LIBRARY_BROWSER_INIT_ARTISTS';
const libraryBrowserInitArtists = () => (
  {
    type: LIBRARY_BROWSER_INIT_ARTISTS,
  }
);

const LIBRARY_BROWSER_SELECT_ARTIST = 'LIBRARY_BROWSER_SELECT_ARTIST';
const libraryBrowserSelectArtist = artistId => (
  {
    type: LIBRARY_BROWSER_SELECT_ARTIST,
    artistId,
  }
);

const LIBRARY_BROWSER_SELECT_ALBUM = 'LIBRARY_BROWSER_SELECT_ALBUM';
const libraryBrowserSelectAlbum = albumId => (
  {
    type: LIBRARY_BROWSER_SELECT_ALBUM,
    albumId,
  }
);

const LIBRARY_BROWSER_SELECT_TRACK = 'LIBRARY_BROWSER_SELECT_TRACK';
const libraryBrowserSelectTrack = trackId => (
  {
    type: LIBRARY_BROWSER_SELECT_TRACK,
    trackId,
  }
);

const LIBRARY_BROWSER_SORT_ARTISTS = 'LIBRARY_BROWSER_SORT_ARTISTS';
const libraryBrowserSortArtists = sortProperty => (
  {
    type: LIBRARY_BROWSER_SORT_ARTISTS,
    sortProperty,
  }
);

const LIBRARY_BROWSER_SORT_ALBUMS = 'LIBRARY_BROWSER_SORT_ALBUMS';
const libraryBrowserSortAlbums = sortProperty => (
  {
    type: LIBRARY_BROWSER_SORT_ALBUMS,
    sortProperty,
  }
);

const LIBRARY_BROWSER_SORT_TRACKS = 'LIBRARY_BROWSER_SORT_TRACKS';
const libraryBrowserSortTracks = sortProperty => (
  {
    type: LIBRARY_BROWSER_SORT_TRACKS,
    sortProperty,
  }
);

const LIBRARY_BROWSER_SEARCH_UPDATE_INPUT = 'LIBRARY_BROWSER_SEARCH_UPDATE_INPUT';
const libraryBrowserSearchUpdateInput = searchTerm => (
  {
    type: LIBRARY_BROWSER_SEARCH_UPDATE_INPUT,
    searchTerm,
  }
);

const LIBRARY_BROWSER_SEARCH_FILTER = 'LIBRARY_BROWSER_SEARCH_FILTER';
const libraryBrowserSearchFilter = searchTerm => (
  {
    type: LIBRARY_BROWSER_SEARCH_FILTER,
    searchTerm,
  }
);

/*
 * Called when loading the browser pane.
 */
const libraryBrowserInit = () => (
  (dispatch, getState) => {
    const state = getState();
    dispatch(libraryBrowserInitArtists());
    dispatch(libraryBrowserSelectArtist(state.libraryBrowser.selectedArtists));
    dispatch(libraryBrowserSelectAlbum(state.libraryBrowser.selectedAlbums));
    dispatch(libraryBrowserSelectTrack(state.libraryBrowser.selectedTracks));
  }
);

const libraryBrowserSearch = (text) => {
  // Launch the search only if user has typed 3 or more characters.
  if (text.length > 2) {
    return (dispatch) => {
      dispatch(libraryBrowserSearchUpdateInput(text));
      dispatch(libraryBrowserSearchFilter(text));
    };
  } else if (text.length === 0) {
    // Reinitialise library browser.
    return (dispatch) => {
      dispatch(libraryBrowserSearchUpdateInput(text));
      dispatch(libraryBrowserInit());
    };
  }

  // In any case, update the search field.
  return (dispatch) => {
    dispatch(libraryBrowserSearchUpdateInput(text));
  };
};

export {
  LIBRARY_BROWSER_INIT_ARTISTS,
  LIBRARY_BROWSER_SELECT_ARTIST,
  LIBRARY_BROWSER_SELECT_ALBUM,
  LIBRARY_BROWSER_SELECT_TRACK,
  LIBRARY_BROWSER_SORT_ARTISTS,
  LIBRARY_BROWSER_SORT_ALBUMS,
  LIBRARY_BROWSER_SORT_TRACKS,
  LIBRARY_BROWSER_SEARCH_FILTER,
  LIBRARY_BROWSER_SEARCH_UPDATE_INPUT,
  libraryBrowserInitArtists,
  libraryBrowserSelectArtist,
  libraryBrowserSelectAlbum,
  libraryBrowserSelectTrack,
  libraryBrowserSortArtists,
  libraryBrowserSortAlbums,
  libraryBrowserSortTracks,
  libraryBrowserSearch,
  libraryBrowserInit,
};
