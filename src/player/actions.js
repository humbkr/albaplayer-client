import { queueSetCurrent } from "../queue/actions";
import { getFullTrackInfo } from "../backend/api";
import { getBackendUrl } from "../backend/config";

/* Actions updating the store */

const PLAYER_TOGGLE_PLAY_PAUSE = 'PLAYER_TOGGLE_PLAY_PAUSE';
const playerTogglePlayPause = () => {
  return {
    type: PLAYER_TOGGLE_PLAY_PAUSE
  }
};

const PLAYER_TOGGLE_SHUFFLE = 'PLAYER_TOGGLE_SHUFFLE';
const playerToggleShuffle = () => {
  return {
    type: PLAYER_TOGGLE_SHUFFLE
  }
};

const PLAYER_REPEAT_NO_REPEAT = 0;
const PLAYER_REPEAT_LOOP_ALL = 1;
const PLAYER_REPEAT_LOOP_ONE = 2;
const PLAYER_TOGGLE_REPEAT = 'PLAYER_TOGGLE_REPEAT';
const playerToggleRepeat = () => {
  return {
    type: PLAYER_TOGGLE_REPEAT
  }
};

const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME';
const playerSetVolume = (volume) => {
  return {
    type: PLAYER_SET_VOLUME,
    volume: volume
  }
};

const PLAYER_SET_TRACK = 'PLAYER_SET_TRACK';
const playerSetTrack = (track) => {
  return {
    type: PLAYER_SET_TRACK,
    track: track
  }
};

const PLAYER_SET_DURATION = 'PLAYER_SET_DURATION';
const playerSetDuration = (duration) => {
  return {
    type: PLAYER_SET_DURATION,
    duration: duration
  }
};

const PLAYER_SET_PROGRESS = 'PLAYER_SET_PROGRESS';
const playerSetProgress = (currentTime) => {
  return {
    type: PLAYER_SET_PROGRESS,
    currentTime: currentTime
  }
};

/* Actions managing the html5 player */

const playerPlayPause = (audio) => {
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }

  return {
    type: PLAYER_TOGGLE_PLAY_PAUSE
  }
};

/*
 * Select the next track to play from the queue, get its info,
 * and dispatch required actions.
 */
const playNextTrack = () => {
  return function (dispatch, getState) {
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
        return;
      }
    } else if (state.player.repeat === PLAYER_REPEAT_LOOP_ONE) {
      // Play the same track again.
      // TODO: Maybe create an action to reset the current track.
      newQueuePosition = state.queue.current;
      nextTrackId = state.queue.tracks[state.queue.current].id;
    } else {
      // Get the next track to play.
      if (state.player.shuffle) {
        // TODO: shuffle functionality is currently shit.
        const randomIndex = Math.floor(Math.random() * state.queue.tracks.length);
        newQueuePosition = randomIndex;
        nextTrackId = state.queue.tracks[randomIndex].id;
      } else if (state.queue.current + 1 < state.queue.tracks.length) {
        // Get next song in queue.
        newQueuePosition = state.queue.current + 1;
        nextTrackId = state.queue.tracks[state.queue.current + 1].id;
      } else {
        // End of the queue.
        if (state.player.repeat === PLAYER_REPEAT_LOOP_ALL) {
          // Loop back to the first track of the queue.
          newQueuePosition = 0;
          nextTrackId = state.queue.tracks[0].id;
        } else {
          // No further track to play, do nothing.
          return;
        }
      }
    }

    // Make API call to get the track full info.
    return getFullTrackInfo(nextTrackId)
    .then(
      // And dispatch appropriate actions.
      response => {
        // Copy track to change it.
        let track = {...response.data.track};
        track.cover = getBackendUrl() + track.cover;
        track.src = getBackendUrl() + track.src;

        dispatch(playerSetTrack(track));
        dispatch(queueSetCurrent(newQueuePosition));
      }
    )
  };
};

/*
 * Select the previous track to play from the queue, get its info,
 * and dispatch required actions.
 */
const playPreviousTrack = () => {
  return function (dispatch, getState) {
    const state = getState();

    let prevTrackId = 0;
    let newQueuePosition = 0;

    // Get trackId of the previous track in playlist.
    if (state.player.track === null) {
      // Do nothing.
      return;
    } else if (state.player.repeat === PLAYER_REPEAT_LOOP_ONE) {
      // Play the same track again.
      // TODO: Maybe create an action to reset the current track.
      newQueuePosition = state.queue.current;
      prevTrackId = state.queue.tracks[state.queue.current].id;
    } else {
      if (state.player.shuffle) {
        // TODO: shuffle functionality is currently shit.
        const randomIndex = Math.floor(Math.random() * state.queue.tracks.length);
        newQueuePosition = randomIndex;
        prevTrackId = state.queue.tracks[randomIndex].id;
      } else if (state.queue.current - 1 >= 0) {
        // Get previous song in queue.
        newQueuePosition = state.queue.current - 1;
        prevTrackId = state.queue.tracks[state.queue.current - 1].id;
      } else {
        // Begining of the queue.
        if (state.player.repeat === PLAYER_REPEAT_LOOP_ALL) {
          // Loop back to the last track of the queue.
          newQueuePosition = state.queue.tracks.length - 1;
          prevTrackId = state.queue.tracks[state.queue.tracks.length - 1].id;
        } else {
          // No further track to play, do nothing.
          return;
        }
      }
    }

    // Make API call to get the track full info.
    return getFullTrackInfo(prevTrackId)
    .then(
      // And dispatch appropriate actions.
      response => {
        // Copy track to change it.
        let track = {...response.data.track};
        track.cover = getBackendUrl() + track.cover;
        track.src = getBackendUrl() + track.src;

        dispatch(playerSetTrack(track));
        dispatch(queueSetCurrent(newQueuePosition));
      }
    )
  };
};


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
  playerToggleShuffle,
  playerToggleRepeat,
  playerSetVolume,
  playerSetTrack,
  playerSetDuration,
  playerSetProgress,

  playerPlayPause,
  playNextTrack,
  playPreviousTrack
}
