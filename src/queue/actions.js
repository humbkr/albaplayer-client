import {
  playerTogglePlayPause,
  setTrackFromQueue,
} from '../player/actions';

const QUEUE_ADD_TRACK = 'QUEUE_ADD_TRACK';
const queueAddTrack = trackId => (
  {
    type: QUEUE_ADD_TRACK,
    trackId,
  }
);

const QUEUE_ADD_ALBUM = 'QUEUE_ADD_ALBUM';
const queueAddAlbum = albumId => (
  {
    type: QUEUE_ADD_ALBUM,
    albumId,
  }
);

const QUEUE_ADD_ARTIST = 'QUEUE_ADD_ARTIST';
const queueAddArtist = artistId => (
  {
    type: QUEUE_ADD_ARTIST,
    artistId,
  }
);

const QUEUE_REMOVE_TRACK = 'QUEUE_REMOVE_TRACK';
const queueRemoveTrack = trackIndex => (
  {
    type: QUEUE_REMOVE_TRACK,
    trackIndex,
  }
);

const QUEUE_CLEAR = 'QUEUE_CLEAR';
const queueClear = () => (
  {
    type: QUEUE_CLEAR,
  }
);

const QUEUE_SET_CURRENT = 'QUEUE_SET_CURRENT';
const queueSetCurrent = position => (
  {
    type: QUEUE_SET_CURRENT,
    position,
  }
);


const playTrack = id => (
  (dispatch) => {
    dispatch(queueClear());
    dispatch(queueAddTrack(id));
    dispatch(setTrackFromQueue(0));
    dispatch(playerTogglePlayPause(true));
  }
);

const playAlbum = id => (
  (dispatch) => {
    dispatch(queueClear());
    dispatch(queueAddAlbum(id));
    dispatch(setTrackFromQueue(0));
    dispatch(playerTogglePlayPause(true));
  }
);

const playArtist = id => (
  (dispatch) => {
    dispatch(queueClear());
    dispatch(queueAddArtist(id));
    dispatch(setTrackFromQueue(0));
    dispatch(playerTogglePlayPause(true));
  }
);

const addTrack = id => (
  (dispatch, getState) => {
    dispatch(queueAddTrack(id));

    const state = getState();
    if (state.player.track === null) {
      dispatch(setTrackFromQueue(0));
    }
  }
);

const addAlbum = id => (
  (dispatch, getState) => {
    dispatch(queueAddAlbum(id));

    const state = getState();
    if (state.player.track === null) {
      dispatch(setTrackFromQueue(0));
    }
  }
);

const addArtist = id => (
  (dispatch, getState) => {
    dispatch(queueAddArtist(id));

    const state = getState();
    if (state.player.track === null) {
      dispatch(setTrackFromQueue(0));
    }
  }
);


export {
  QUEUE_ADD_TRACK,
  QUEUE_ADD_ALBUM,
  QUEUE_ADD_ARTIST,
  QUEUE_REMOVE_TRACK,
  QUEUE_CLEAR,
  QUEUE_SET_CURRENT,
  queueAddTrack,
  queueAddAlbum,
  queueAddArtist,
  queueRemoveTrack,
  queueClear,
  queueSetCurrent,

  playTrack,
  playAlbum,
  playArtist,
  addTrack,
  addAlbum,
  addArtist,
};
