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

const QUEUE_PLAY_TRACK = 'QUEUE_PLAY_TRACK';
const queuePlayTrack = (trackId) => {
  return {
    type: QUEUE_PLAY_TRACK,
    trackId
  }
};

const QUEUE_PLAY_ALBUM = 'QUEUE_PLAY_ALBUM';
const queuePlayAlbum = (albumId) => {
  return {
    type: QUEUE_PLAY_ALBUM,
    albumId
  }
};

const QUEUE_PLAY_ARTIST = 'QUEUE_PLAY_ARTIST';
const queuePlayArtist = (artistId) => {
  return {
    type: QUEUE_PLAY_ARTIST,
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

export {
  QUEUE_ADD_TRACK,
  QUEUE_ADD_ALBUM,
  QUEUE_ADD_ARTIST,
  QUEUE_PLAY_TRACK,
  QUEUE_PLAY_ALBUM,
  QUEUE_PLAY_ARTIST,
  QUEUE_REMOVE_TRACK,
  QUEUE_CLEAR,
  QUEUE_SET_CURRENT,
  queueAddTrack,
  queueAddAlbum,
  queueAddArtist,
  queuePlayTrack,
  queuePlayAlbum,
  queuePlayArtist,
  queueRemoveTrack,
  queueClear,
  queueSetCurrent,
}
