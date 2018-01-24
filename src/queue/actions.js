import {
  playerTogglePlayPause,
  setTrackFromQueue
} from "../player/actions";

const QUEUE_ADD_TRACK = 'QUEUE_ADD_TRACK';
const queueAddTrack = (trackId) => {
  return {
    type: QUEUE_ADD_TRACK,
    trackId
  }
};

const QUEUE_ADD_ALBUM = 'QUEUE_ADD_ALBUM';
const queueAddAlbum = (albumId) => {
  return {
    type: QUEUE_ADD_ALBUM,
    albumId
  }
};

const QUEUE_ADD_ARTIST = 'QUEUE_ADD_ARTIST';
const queueAddArtist = (artistId) => {
  return {
    type: QUEUE_ADD_ARTIST,
    artistId
  }
};

const QUEUE_REMOVE_TRACK = 'QUEUE_REMOVE_TRACK';
const queueRemoveTrack = (trackIndex) => {
  return {
    type: QUEUE_REMOVE_TRACK,
    trackIndex
  }
};

const QUEUE_CLEAR = 'QUEUE_CLEAR';
const queueClear = () => {
  return {
    type: QUEUE_CLEAR
  }
};

const QUEUE_SET_CURRENT = 'QUEUE_SET_CURRENT';
const queueSetCurrent = (position) => {
  return {
    type: QUEUE_SET_CURRENT,
    position: position
  }
};

const playTrack = (id) => {
  return function(dispatch) {
    dispatch(queueClear());
    dispatch(queueAddTrack(id));
    dispatch(setTrackFromQueue(0));
    dispatch(playerTogglePlayPause(true));
  }
};

const playAlbum = (id) => {
  return function(dispatch) {
    dispatch(queueClear());
    dispatch(queueAddAlbum(id));
    dispatch(setTrackFromQueue(0));
    dispatch(playerTogglePlayPause(true));
  }
};

const playArtist = (id) => {
  return function(dispatch) {
    dispatch(queueClear());
    dispatch(queueAddArtist(id));
    dispatch(setTrackFromQueue(0));
    dispatch(playerTogglePlayPause(true));
  }
};

const addTrack = (id) => {
  return function(dispatch, getState) {
    dispatch(queueAddTrack(id));

    const state = getState();
    if (state.player.track === null) {
      dispatch(setTrackFromQueue(0));
    }
  }
};

const addAlbum = (id) => {
  return function(dispatch, getState) {
    dispatch(queueAddAlbum(id));

    const state = getState();
    if (state.player.track === null) {
      dispatch(setTrackFromQueue(0));
    }
  }
};

const addArtist = (id) => {
  return function(dispatch, getState) {
    dispatch(queueAddArtist(id));

    const state = getState();
    if (state.player.track === null) {
      dispatch(setTrackFromQueue(0));
    }
  }
};


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
}
