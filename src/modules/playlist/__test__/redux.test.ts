import playlistsSlice, {
  initialState,
  playlistSelectPlaylist,
  playlistCreatePlaylist,
  playlistDeletePlaylist,
} from '../redux'

describe('playlists (redux)', () => {
  describe('reducer', () => {
    it('should handle initial state', () => {
      // @ts-ignore
      expect(playlistsSlice(undefined, {})).toEqual(initialState)
    })

    it('should handle playlistSelectPlaylist action', () => {
      const testState = {
        ...initialState,
        playlists: {
          temp_001: {
            id: 'temp_001',
            title: 'My playlist',
            date: '2020-04-12',
            items: [],
          },
        },
      }

      expect(
        playlistsSlice(testState, {
          type: playlistSelectPlaylist.type,
          payload: {
            selectedPlaylist: testState.playlists.temp_001,
            playlistIndex: 0,
          },
        })
      ).toEqual({
        ...testState,
        currentPlaylist: {
          playlist: testState.playlists.temp_001,
          position: 0,
        },
      })
    })

    it('should handle playlistCreatePlaylist action', () => {
      const newPlaylist = {
        id: 'temp_1234',
        title: 'My playlist',
        date: '2020-04-12',
        items: [],
      }

      expect(
        playlistsSlice(initialState, {
          type: playlistCreatePlaylist.type,
          payload: newPlaylist,
        })
      ).toEqual({
        ...initialState,
        playlists: {
          temp_1234: newPlaylist,
        },
        currentPlaylist: {
          playlist: newPlaylist,
          position: 0,
        },
      })
    })

    it('should handle playlistDeletePlaylist action', () => {
      const playlist1 = {
        id: 'temp_001',
        title: 'My playlist',
        date: '2020-04-12',
        items: [],
      }

      const playlist2 = {
        id: 'temp_002',
        title: 'My second playlist',
        date: '2020-04-12',
        items: [],
      }

      const testState = {
        ...initialState,
        playlists: {
          temp_001: playlist1,
          temp_002: playlist2,
        },
        currentPlaylist: {
          playlist: playlist1,
          position: 0,
        },
      }

      // Delete first (current) playlist.
      expect(
        playlistsSlice(testState, {
          type: playlistDeletePlaylist.type,
          payload: playlist1,
        })
      ).toEqual({
        ...initialState,
        playlists: {
          temp_002: playlist2,
        },
        currentPlaylist: {
          playlist: playlist2,
          position: 0,
        },
      })

      // Delete the only playlist left in the list.
      const testState2 = {
        ...initialState,
        playlists: {
          temp_002: playlist2,
        },
        currentPlaylist: {
          playlist: playlist2,
          position: 0,
        },
      }

      expect(
        playlistsSlice(testState2, {
          type: playlistDeletePlaylist.type,
          payload: playlist2,
        })
      ).toEqual({
        ...initialState,
        playlists: {},
        currentPlaylist: {
          playlist: null,
          position: 0,
        },
      })
    })
  })
})
