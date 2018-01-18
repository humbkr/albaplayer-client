import { getFullTrackInfo } from "../graphql/api";
import { queueSetCurrent } from "../queue/actions";


const PLAYER_SET_DURATION = 'PLAYER_SET_DURATION';
const playerSetDuration = (duration) => {
  return {
    type: PLAYER_SET_DURATION,
    duration: duration
  }
};

const PLAYER_TOGGLE_PLAY = 'PLAYER_TOGGLE_PLAY';
const playerTogglePlay = (forcedValue) => {
  return {
    type: PLAYER_TOGGLE_PLAY,
    forcedValue: forcedValue
  }
};

const PLAYER_SET_PROGRESS = 'PLAYER_SET_PROGRESS';
const playerSetProgress = (currentTime) => {
  return {
    type: PLAYER_SET_PROGRESS,
    duration: currentTime
  }
};

const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME';
const playerSetVolume = (volume) => {
  return {
    type: PLAYER_SET_VOLUME,
    volume: volume
  }
};

const PLAYER_TOGGLE_PLAYING_STATE = 'PLAYER_TOGGLE_PLAYING_STATE';
const playerTogglePlayingState = () => {
  return {
    type: PLAYER_TOGGLE_PLAYING_STATE
  }
};

const PLAYER_SKIP_TO_PREVIOUS = 'PLAYER_SKIP_TO_PREVIOUS';
const playerSkipToPrevious = (track) => {
  return {
    type: PLAYER_SKIP_TO_PREVIOUS,
    track
  }
};

const PLAYER_SKIP_TO_NEXT = 'PLAYER_SKIP_TO_NEXT';
const playerSkipToNext = (track) => {
  return {
    type: PLAYER_SKIP_TO_NEXT,
    track
  }
};


const playerStart = () => {
  return function (dispatch, getState) {
    const state = getState();

    // If player is started, or the queue is empty, do nothing.
    if (state.player.playing || state.queue.tracks.length === 0) {
      return
    }

    // If there is a song currently set in the player,
    // just start playing.
    if (state.player.track) {
      dispatch(playerTogglePlay());
      return
    }

    // If the player is not initialized, play the first song in queue.
    dispatch(playNextSong());
  }
};

// Get info from queue and media server, then set up player and play song.
const playPreviousSong = () => {
  return function (dispatch, getState) {
    const state = getState();

    // Get trackId of the previous track in playlist.
    let previousTrackId = 0;
    let newQueuePosition = 0;
    if (state.queue.tracks.length > 0) {
      if (state.queue.current - 1 < 0) {
        // Go to the last track in the queue.
        previousTrackId = state.queue.tracks[state.queue.tracks.length - 1].id;
        newQueuePosition = state.queue.tracks.length - 1
      } else {
        previousTrackId = state.queue.tracks[state.queue.current - 1].id;
        newQueuePosition = state.queue.current - 1
      }
    }

    // Then we make the API call.
    return getFullTrackInfo(previousTrackId)
    .then(
      response => {
        dispatch(playerSkipToPrevious(response.data.track));
        dispatch(queueSetCurrent(newQueuePosition));
      }
    )
  };
};

// Get info from queue and media server, then set up player and play song.
const playNextSong = () => {
  return function (dispatch, getState) {
    const state = getState();

    // Get trackId of the next track in playlist.
    let nextTrackId = 0;
    let newQueuePosition = 0;
    if (state.queue.current !== undefined) {
      if (state.queue.current + 1 > state.queue.tracks.length) {
        // Go back to the first track in the queue.
        nextTrackId = state.queue.tracks[0].id;
        newQueuePosition = 0;
      } else {
        nextTrackId = state.queue.tracks[state.queue.current + 1].id;
        newQueuePosition = state.queue.current + 1
      }
    } else if (state.queue.tracks.length > 0) {
      // Play the first track in the queue.
      nextTrackId = state.queue.tracks[0].id;
      newQueuePosition = 0;
    } else {
      // There is no track to play.
      return;
    }

    // Then we make the API call.
    return getFullTrackInfo(nextTrackId)
    .then(
      response => {
        dispatch(playerSkipToNext(response.data.track));
        dispatch(queueSetCurrent(newQueuePosition));
      }
    )
  };
};

export {
  PLAYER_SET_DURATION,
  PLAYER_TOGGLE_PLAY,
  PLAYER_SET_PROGRESS,
  PLAYER_SET_VOLUME,
  PLAYER_SKIP_TO_NEXT,
  PLAYER_SKIP_TO_PREVIOUS,
  PLAYER_TOGGLE_PLAYING_STATE,
  playerSetDuration,
  playerTogglePlay,
  playerSetProgress,
  playerSetVolume,
  playerSkipToNext,
  playerSkipToPrevious,
  playerTogglePlayingState,
  // TODO maybe move this elsewhere as this dispatch actions to multiple reducers.
  playerStart,
  playNextSong,
  playPreviousSong,
};
