import gql from 'graphql-tag';
import apolloClient from './apollo';

const getLibrary = () => {
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
      }
      tracks {
        id
        title
        number
        duration
        artistId
        albumId
        cover
      }
    }
`;

  return apolloClient.query({ query: libraryInit });
};


const getFullTrackInfo = (trackId) => {
  const fullTrackInfoQuery = gql`
    query fullTrackInfoQuery {
      track(id: ${trackId}) {
        id
        title
        number
        disc
        duration
        src
        cover
        album {
          id
          title
        }
        artist {
          id
          name
        }
      }
    }
`;

  return apolloClient.query({ query: fullTrackInfoQuery });
};

const scanLibrary = () => {
  // TODO not sure we should use a query here, but apollo doesn't allow a mutation without parameter
  const scanLibraryQuery = gql`
    query scanLibraryQuery {
        updateLibrary {
            tracksNumber
        }
    }
`;

  return apolloClient.query({ query: scanLibraryQuery });
};

const emptyLibrary = () => {
  // TODO not sure we should use a query here, but apollo doesn't allow a mutation without parameter
  const emptyLibraryQuery = gql`
      query emptyLibraryQuery {
          eraseLibrary {
              tracksNumber
          }
      }
  `;

  return apolloClient.query({ query: emptyLibraryQuery });
};

const processApiError = (response) => {
  let result = 'Unknown error';
  if (response.graphQLErrors.length > 0 && response.graphQLErrors[0].message) {
    result = response.graphQLErrors[0].message;
  } else if (response.message) {
    result = response.message;
  }

  return result;
};

export {
  getLibrary,
  getFullTrackInfo,
  scanLibrary,
  emptyLibrary,
  processApiError,
};
