import { libraryInitialState } from 'modules/library/redux'
import {
  playlistsInitialState,
  PlaylistsStateType,
} from 'modules/playlist/redux'
import configureMockStore from 'redux-mock-store'
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk'
import playerSlice, {
  playerInitialState,
  getTracksFromPlaylist,
  queueInitialState,
  setItemFromQueue,
} from '../redux'
import { api } from '../../../api'

const mockStore = configureMockStore([thunk])
const makeMockStore = (customState: any = {}) => mockStore({
  player: playerInitialState,
  queue: queueInitialState,
  ...customState,
})

describe('player (redux)', () => {
  describe('reducer', () => {
    it('should handle player initial state', () => {
      // @ts-ignore
      expect(playerSlice.player(undefined, {})).toEqual(playerInitialState)
    })
  })

  describe('setItemFromQueue thunk', () => {
    it('should handle trying to set a track at position 0 of an empty queue', () => {
      const store = makeMockStore()
      api.getFullTrackInfo = jest.fn()

      // @ts-ignore
      expect(store.dispatch(setItemFromQueue(0))).toBeNull()
      expect(api.getFullTrackInfo).not.toHaveBeenCalled()
    })
  })

  describe('getTracksFromPlaylist', () => {
    it('should handle playlists with no tracks', () => {
      const playlistsStateTest: PlaylistsStateType = {
        ...playlistsInitialState,
        playlists: {
          playlist_01: {
            id: 'playlist_01',
            title: 'My playlist',
            date: '2020-04-14',
            items: [],
          },
        },
      }

      const tracks = getTracksFromPlaylist(
        'playlist_01',
        libraryInitialState,
        playlistsStateTest
      )
      expect(tracks).toBeArray()
      expect(tracks).toBeEmpty()
    })
  })
})
