import { queueSetCurrent } from '../queue/actions';
import { getFullTrackInfo } from '../backend/api';
import getBackendUrl from '../backend/config';

/* Actions updating the store */

const PLAYER_TOGGLE_PLAY_PAUSE = 'PLAYER_TOGGLE_PLAY_PAUSE';
const playerTogglePlayPause = forcedValue => (
  {
    type: PLAYER_TOGGLE_PLAY_PAUSE,
    forcedValue,
  }
);

const PLAYER_TOGGLE_SHUFFLE = 'PLAYER_TOGGLE_SHUFFLE';
const playerToggleShuffle = () => (
  {
    type: PLAYER_TOGGLE_SHUFFLE,
  }
);

const PLAYER_REPEAT_NO_REPEAT = 0;
const PLAYER_REPEAT_LOOP_ALL = 1;
const PLAYER_REPEAT_LOOP_ONE = 2;
const PLAYER_TOGGLE_REPEAT = 'PLAYER_TOGGLE_REPEAT';
const playerToggleRepeat = () => (
  {
    type: PLAYER_TOGGLE_REPEAT,
  }
);

const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME';
const playerSetVolume = volume => (
  {
    type: PLAYER_SET_VOLUME,
    volume,
  }
);

const PLAYER_SET_TRACK = 'PLAYER_SET_TRACK';
const playerSetTrack = track => (
  {
    type: PLAYER_SET_TRACK,
    track,
  }
);

const PLAYER_SET_DURATION = 'PLAYER_SET_DURATION';
const playerSetDuration = duration => (
  {
    type: PLAYER_SET_DURATION,
    duration,
  }
);

const PLAYER_SET_PROGRESS = 'PLAYER_SET_PROGRESS';
const playerSetProgress = currentTime => (
  {
    type: PLAYER_SET_PROGRESS,
    currentTime,
  }
);

const setTrackFromQueue = trackPosition => (
  (dispatch, getState) => {
    const state = getState();

    if (state.queue.tracks.length < trackPosition) {
      return null;
    }

    // Make API call to get the track full info.
    return getFullTrackInfo(state.queue.tracks[trackPosition].id)
      .then((response) => {
        // And dispatch appropriate actions.
        // Copy track to change it.
        const track = { ...response.data.track };
        track.cover = (track.cover) ? getBackendUrl() + track.cover : '';
        track.src = getBackendUrl() + track.src;

        dispatch(playerSetTrack(track));
        dispatch(queueSetCurrent(trackPosition));
      });
  }
);

/*
 * Select the next track to play from the queue, get its info,
 * and dispatch required actions.
 */
const setNextTrack = () => (
  (dispatch, getState) => {
    const state = getState();

    let nextTrackId = 0;
    let newQueuePosition = 0;

    if (state.player.track === null) {
      // First play after launch.
      if (state.queue.tracks.length > 0) {
        // Get first track of the queue.
        newQueuePosition = 0;
        nextTrackId = state.queue.tracks[0].id;
      } else {
        // No track to play, do nothing.
        return null;
      }
    } else if (state.player.repeat === PLAYER_REPEAT_LOOP_ONE) {
      // Play the same track again.
      // TODO: Maybe create an action to reset the current track.
      newQueuePosition = state.queue.current;
      nextTrackId = state.queue.tracks[state.queue.current].id;
    } else if (state.player.shuffle) {
      // Get the next track to play.
      // TODO: shuffle functionality is currently shit.
      const randomIndex = Math.floor(Math.random() * state.queue.tracks.length);
      newQueuePosition = randomIndex;
      nextTrackId = state.queue.tracks[randomIndex].id;
    } else if (state.queue.current + 1 < state.queue.tracks.length) {
      // Get next song in queue.
      newQueuePosition = state.queue.current + 1;
      nextTrackId = state.queue.tracks[state.queue.current + 1].id;
    } else if (state.player.repeat === PLAYER_REPEAT_LOOP_ALL) {
      // End of the queue.
      // Loop back to the first track of the queue.
      newQueuePosition = 0;
      nextTrackId = state.queue.tracks[0].id;
    } else {
      // No further track to play, do nothing.
      return null;
    }

    // Make API call to get the track full info.
    return getFullTrackInfo(nextTrackId)
      .then((response) => {
        // And dispatch appropriate actions.
        // Copy track to change it.
        const track = { ...response.data.track };
        track.cover = (track.cover) ? getBackendUrl() + track.cover : '';
        track.src = getBackendUrl() + track.src;

        dispatch(playerSetTrack(track));
        dispatch(queueSetCurrent(newQueuePosition));
      });
  }
);

/*
 * Select the previous track to play from the queue, get its info,
 * and dispatch required actions.
 */
const setPreviousTrack = () => (
  (dispatch, getState) => {
    const state = getState();

    let prevTrackId = 0;
    let newQueuePosition = 0;

    // Get trackId of the previous track in playlist.
    if (state.player.track === null) {
      // Do nothing.
      return null;
    } else if (state.player.repeat === PLAYER_REPEAT_LOOP_ONE) {
      // Play the same track again.
      // TODO: Maybe create an action to reset the current track.
      newQueuePosition = state.queue.current;
      prevTrackId = state.queue.tracks[state.queue.current].id;
    } else if (state.player.shuffle) {
      // TODO: shuffle functionality is currently shit.
      const randomIndex = Math.floor(Math.random() * state.queue.tracks.length);
      newQueuePosition = randomIndex;
      prevTrackId = state.queue.tracks[randomIndex].id;
    } else if (state.queue.current - 1 >= 0) {
      // Get previous song in queue.
      newQueuePosition = state.queue.current - 1;
      prevTrackId = state.queue.tracks[state.queue.current - 1].id;
    } else if (state.player.repeat === PLAYER_REPEAT_LOOP_ALL) {
      // Begining of the queue.
      // Loop back to the last track of the queue.
      newQueuePosition = state.queue.tracks.length - 1;
      prevTrackId = state.queue.tracks[state.queue.tracks.length - 1].id;
    } else {
      // No further track to play, do nothing.
      return null;
    }

    // Make API call to get the track full info.
    return getFullTrackInfo(prevTrackId)
      .then((response) => {
        // And dispatch appropriate actions.
        // Copy track to change it.
        const track = { ...response.data.track };
        track.cover = (track.cover) ? getBackendUrl() + track.cover : '';
        track.src = getBackendUrl() + track.src;

        dispatch(playerSetTrack(track));
        dispatch(queueSetCurrent(newQueuePosition));
      });
  }
);


export {
  PLAYER_TOGGLE_PLAY_PAUSE,
  PLAYER_TOGGLE_SHUFFLE,
  PLAYER_REPEAT_NO_REPEAT,
  PLAYER_REPEAT_LOOP_ALL,
  PLAYER_REPEAT_LOOP_ONE,
  PLAYER_TOGGLE_REPEAT,
  PLAYER_SET_VOLUME,
  PLAYER_SET_TRACK,
  PLAYER_SET_DURATION,
  PLAYER_SET_PROGRESS,
  playerTogglePlayPause,
  playerToggleShuffle,
  playerToggleRepeat,
  playerSetVolume,
  playerSetTrack,
  playerSetDuration,
  playerSetProgress,

  setTrackFromQueue,
  setNextTrack,
  setPreviousTrack,
};
