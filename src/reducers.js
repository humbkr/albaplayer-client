import {
  LIBRARY_INIT_FAILURE,
  LIBRARY_INIT_START,
  LIBRARY_INIT_SUCCESS,
} from './actions';


const initialState = {
  isFetching: false,
  isUpdating: false,
  error: '',
  isInitialized: false,
  initHasFailed: false,
  artists: [],
  albums: [],
  tracks: [],
};

function library(state = initialState, action) {
  switch (action.type) {
    case LIBRARY_INIT_START:
      return Object.assign({}, state, {
        ...state,
        isFetching: true,
      });

    case LIBRARY_INIT_SUCCESS: {
      // Here we have to make up for the fact that we cannot request albums with artist names
      // from the backend without severe performance penalty. We have to populate the information
      // client-side from the artists list we got from the backend.
      const hydratedAlbums = action.response.albums.map((album) => {
        const artists = action.response.artists.filter(artist => (album.artistId === artist.id));
        let artistName = '';
        if (artists.length > 0) {
          artistName = artists[0].name;
        }

        return { ...album, artistName };
      });

      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        isInitialized: true,
        artists: action.response.artists,
        albums: hydratedAlbums,
        tracks: action.response.tracks,
      });
    }

    case LIBRARY_INIT_FAILURE:
      return Object.assign({}, state, {
        ...state,
        isFetching: false,
        isInitialized: false,
        initHasFailed: true,
      });

    default:
      return state;
  }
}


export default library;
