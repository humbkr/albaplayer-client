import apolloClient from '../graphql/apollo';
import gql from "graphql-tag";

const LIBRARY_BROWSER_INIT_START = 'LIBRARY_BROWSER_INIT_START';
const libraryBrowserInitStart = () => {
  return {
    type: LIBRARY_BROWSER_INIT_START
  }
};

const LIBRARY_BROWSER_INIT_SUCCESS = 'LIBRARY_BROWSER_INIT_SUCCESS';
const libraryBrowserInitSuccess = (response) => {
  return {
    type: LIBRARY_BROWSER_INIT_SUCCESS,
    response: response.data,
  }
};

const LIBRARY_BROWSER_INIT_FAILURE = 'LIBRARY_BROWSER_INIT_FAILURE';
const libraryBrowserInitFailure = (response) => {
  return {
    type: LIBRARY_BROWSER_INIT_FAILURE,
    response
  }
};

const libraryBrowserFetchLibrary =  () => {
  // Query used to initialise the browser with all the data from the server.
  const libraryBrowserInit = gql`
  query libraryBrowserInit {
    artists {
      id
      name
    }
    albums {
      id
      title
      year
      artistId
      artistName
    }
    tracks {
      id
      title
      number
      duration
			artistId
      albumId
    }
  }
`;

  return function (dispatch) {
    // First the app state is updated to inform that the API call is starting.
    dispatch(libraryBrowserInitStart());

    // Then we make the API call.
    return apolloClient.query({ query: libraryBrowserInit })
    .then(
      response => dispatch(libraryBrowserInitSuccess(response))
    )
  };
};

const libraryBrowserShouldFetchLibrary = (state) => {
  const libraryData = state.libraryBrowser.original;
  if (!libraryData.isInitialized) {
    return true
  } else if (libraryData.isFetching) {
    return false
  } else {
    return false
  }
};

const libraryBrowserGetLibrary = () => {
  return function (dispatch, getState) {
    if (libraryBrowserShouldFetchLibrary(getState())) {
      return dispatch(libraryBrowserFetchLibrary())
    }
  };
};

const LIBRARY_BROWSER_SELECT_ARTIST = 'LIBRARY_BROWSER_SELECT_ARTIST';
const libraryBrowserSelectArtist = (artistId) => {
  return {
    type: LIBRARY_BROWSER_SELECT_ARTIST,
    artistId
  }
};

const LIBRARY_BROWSER_SELECT_ALBUM = 'LIBRARY_BROWSER_SELECT_ALBUM';
const libraryBrowserSelectAlbum = (albumId) => {
  return {
    type: LIBRARY_BROWSER_SELECT_ALBUM,
    albumId
  }
};

const LIBRARY_BROWSER_SELECT_TRACK = 'LIBRARY_BROWSER_SELECT_TRACK';
const libraryBrowserSelectTrack = (trackId) => {
  return {
    type: LIBRARY_BROWSER_SELECT_TRACK,
    trackId
  }
};

const LIBRARY_BROWSER_SORT_ARTISTS = 'LIBRARY_BROWSER_SORT_ARTISTS';
const libraryBrowserSortArtists = (sortProperty) => {
  return {
    type: LIBRARY_BROWSER_SORT_ARTISTS,
    sortProperty
  }
};

const LIBRARY_BROWSER_SORT_ALBUMS = 'LIBRARY_BROWSER_SORT_ALBUMS';
const libraryBrowserSortAlbums = (sortProperty) => {
  return {
    type: LIBRARY_BROWSER_SORT_ALBUMS,
    sortProperty
  }
};

const LIBRARY_BROWSER_SORT_TRACKS = 'LIBRARY_BROWSER_SORT_TRACKS';
const libraryBrowserSortTracks = (sortProperty) => {
  return {
    type: LIBRARY_BROWSER_SORT_TRACKS,
    sortProperty
  }
};

export {
  LIBRARY_BROWSER_SELECT_ARTIST,
  LIBRARY_BROWSER_SELECT_ALBUM,
  LIBRARY_BROWSER_SELECT_TRACK,
  LIBRARY_BROWSER_SORT_ARTISTS,
  LIBRARY_BROWSER_SORT_ALBUMS,
  LIBRARY_BROWSER_SORT_TRACKS,
  LIBRARY_BROWSER_INIT_START,
  LIBRARY_BROWSER_INIT_SUCCESS,
  LIBRARY_BROWSER_INIT_FAILURE,
  libraryBrowserSelectArtist,
  libraryBrowserSelectAlbum,
  libraryBrowserSelectTrack,
  libraryBrowserSortArtists,
  libraryBrowserSortAlbums,
  libraryBrowserSortTracks,
  libraryBrowserInitStart,
  libraryBrowserInitSuccess,
  libraryBrowserInitFailure,
  libraryBrowserGetLibrary
};
