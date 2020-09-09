import Track from '../../types/Track'

export interface QueueItem {
  track: Track
}

export enum PlayerPlaybackMode {
  PLAYER_REPEAT_NO_REPEAT,
  PLAYER_REPEAT_LOOP_ALL,
  PLAYER_REPEAT_LOOP_ONE,
}
