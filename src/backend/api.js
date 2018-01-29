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
        artistName
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

export {
  getLibrary,
  getFullTrackInfo,
};
