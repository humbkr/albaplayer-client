const PLAYER_TOGGLE_PLAY_PAUSE = 'PLAYER_TOGGLE_PLAY_PAUSE'
const playerTogglePlayPause = forcedValue => ({
  type: PLAYER_TOGGLE_PLAY_PAUSE,
  forcedValue,
})

const PLAYER_TOGGLE_SHUFFLE = 'PLAYER_TOGGLE_SHUFFLE'
const playerToggleShuffle = () => ({
  type: PLAYER_TOGGLE_SHUFFLE,
})

const PLAYER_REPEAT_NO_REPEAT = 0
const PLAYER_REPEAT_LOOP_ALL = 1
const PLAYER_REPEAT_LOOP_ONE = 2
const PLAYER_TOGGLE_REPEAT = 'PLAYER_TOGGLE_REPEAT'
const playerToggleRepeat = () => ({
  type: PLAYER_TOGGLE_REPEAT,
})

const PLAYER_SET_VOLUME = 'PLAYER_SET_VOLUME'
const playerSetVolume = volume => ({
  type: PLAYER_SET_VOLUME,
  volume,
})

const PLAYER_SET_TRACK = 'PLAYER_SET_TRACK'
const playerSetTrack = track => ({
  type: PLAYER_SET_TRACK,
  track,
})

const PLAYER_SET_DURATION = 'PLAYER_SET_DURATION'
const playerSetDuration = duration => ({
  type: PLAYER_SET_DURATION,
  duration,
})

const PLAYER_SET_PROGRESS = 'PLAYER_SET_PROGRESS'
const playerSetProgress = currentTime => ({
  type: PLAYER_SET_PROGRESS,
  currentTime,
})

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
}
