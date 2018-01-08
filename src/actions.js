import apolloClient from './graphql/apollo';
import gql from "graphql-tag";

const LIBRARY_INIT_START = 'LIBRARY_INIT_START';
const libraryInitStart = () => {
  return {
    type: LIBRARY_INIT_START
  }
};

const LIBRARY_INIT_SUCCESS = 'LIBRARY_INIT_SUCCESS';
const libraryInitSuccess = (response) => {
  return {
    type: LIBRARY_INIT_SUCCESS,
    response: response.data,
  }
};

const LIBRARY_INIT_FAILURE = 'LIBRARY_INIT_FAILURE';
const libraryInitFailure = (response) => {
  return {
    type: LIBRARY_INIT_FAILURE,
    response
  }
};

const fetchLibrary =  () => {
  // Query used to initialise the browser with all the data from the server.
  const libraryInit = gql`
  query libraryInit {
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
    dispatch(libraryInitStart());

    // Then we make the API call.
    return apolloClient.query({ query: libraryInit })
    .then(
      response => dispatch(libraryInitSuccess(response))
    )
  };
};

const shouldFetchLibrary = (state) => {
  const libraryData = state.library;
  if (!libraryData.isInitialized) {
    return true
  } else if (libraryData.isFetching) {
    return false
  } else {
    return false
  }
};

const getLibrary = () => {
  return function (dispatch, getState) {
    if (shouldFetchLibrary(getState())) {
      return dispatch(fetchLibrary())
    }
  };
};

export {
  LIBRARY_INIT_START,
  LIBRARY_INIT_SUCCESS,
  LIBRARY_INIT_FAILURE,
  getLibrary
};
