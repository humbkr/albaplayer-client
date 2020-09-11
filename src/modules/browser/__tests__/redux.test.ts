import { libraryInitialState, LibraryStateType } from 'modules/library/redux'
import Album from 'types/Album'
import Track from 'types/Track'
import Artist from 'types/Artist'
import configureMockStore from 'redux-mock-store'
// eslint-disable-next-line import/no-extraneous-dependencies
import thunk from 'redux-thunk'
import { immutableNestedSort } from 'common/utils/utils'
import browserSlice, {
  browserInitialState,
  BrowserStateType,
  libraryBrowserSelectArtist,
  libraryBrowserSelectAlbum,
  libraryBrowserSearchUpdateInput,
  libraryBrowserSearchFilter,
  libraryBrowserInitArtists,
  libraryBrowserSelectTrack,
  libraryBrowserSortArtists,
  libraryBrowserSortAlbums,
  libraryBrowserSortTracks,
  initArtists,
  selectArtist,
  selectAlbum,
  searchFilter,
  getArtistsList,
  getAlbumsList,
  getTracksList,
  libraryBrowserInit,
  search,
} from '../redux'

const mockStore = configureMockStore([thunk])
const makeMockStore = (customState: any = {}) => mockStore({
  library: mockLibraryState,
  libraryBrowser: browserInitialState,
  ...customState,
})

const mockLibraryState: LibraryStateType = {
  ...libraryInitialState,
  isInitialized: true,
  artists: {
    1: {
      id: '1',
      name: 'Various artists',
    },
    2: {
      id: '2',
      name: 'Zote the mighty',
    },
    3: {
      id: '3',
      name: 'Cornifer',
    },
  },
  albums: {
    1: {
      id: '1',
      title: 'Album 1',
      year: '1986',
      artistId: '2',
    },
    2: {
      id: '2',
      title: 'Album 2',
      year: '2002',
      artistId: '3',
    },
    3: {
      id: '3',
      title: 'Album 3',
      year: '1992',
      artistId: '2',
    },
    4: {
      id: '4',
      title: 'Compilation',
      year: '2018',
      artistId: '1',
    },
  },
  tracks: {
    1: {
      id: '1',
      title: 'Track 1',
      number: 1,
      disc: '',
      duration: 123,
      cover: '',
      albumId: '1',
      artistId: '2',
    },
    2: {
      id: '2',
      title: 'I draw a map',
      number: 2,
      disc: '',
      duration: 124,
      cover: '',
      albumId: '2',
      artistId: '3',
    },
    3: {
      id: '3',
      title: 'Track 3',
      number: 2,
      disc: '',
      duration: 124,
      cover: '',
      albumId: '1',
      artistId: '2',
    },
    4: {
      id: '4',
      title: 'Track 4',
      number: 1,
      disc: '',
      duration: 124,
      cover: '',
      albumId: '3',
      artistId: '2',
    },
    5: {
      id: '5',
      title: 'Track 5',
      number: 1,
      disc: '',
      duration: 164,
      cover: '',
      albumId: '4',
      artistId: '34',
    },
  },
}

describe('library browser (redux)', () => {
  describe('reducer', () => {
    it('should handle initial state', () => {
      // @ts-ignore
      expect(browserSlice(undefined, {})).toEqual(browserInitialState)
    })

    it('should handle libraryBrowserInitArtists action', () => {
      const testState: BrowserStateType = {
        ...browserInitialState,
      }

      expect(
        browserSlice(testState, {
          type: libraryBrowserInitArtists.type,
          payload: Object.values(mockLibraryState.artists),
        })
      ).toEqual({
        ...testState,
        artists: Object.values(mockLibraryState.artists),
      })
    })

    it('should handle libraryBrowserSelectArtist action', () => {
      const testState: BrowserStateType = {
        ...browserInitialState,
        artists: Object.values(mockLibraryState.artists),
        albums: Object.values(mockLibraryState.albums).map((item) => ({
          ...item,
          artist: item.artistId
            ? mockLibraryState.artists[item.artistId]
            : undefined,
        })),
        tracks: Object.values(mockLibraryState.tracks).map((item) => ({
          ...item,
          artist: item.artistId
            ? mockLibraryState.artists[item.artistId]
            : undefined,
          album: item.albumId
            ? mockLibraryState.albums[item.albumId]
            : undefined,
        })),
        selectedArtists: '1',
        currentPositionArtists: 1,
        selectedAlbums: '1',
        currentPositionAlbums: 1,
        selectedTracks: '1',
        currentPositionTracks: 1,
      }

      const filteredAlbums: Album[] = Object.values(testState.albums).filter(
        (item) => item.artistId === '2'
      )
      const filteredTracks: Track[] = Object.values(testState.tracks).filter(
        (item) => item.artistId === '2'
      )

      expect(
        browserSlice(testState, {
          type: libraryBrowserSelectArtist.type,
          payload: {
            artistId: '2',
            index: 2,
            filteredAlbums,
            filteredTracks,
          },
        })
      ).toEqual({
        ...testState,
        albums: filteredAlbums,
        tracks: filteredTracks,
        selectedArtists: '2',
        currentPositionArtists: 2,
        selectedAlbums: '0',
        currentPositionAlbums: 0,
        selectedTracks: '0',
        currentPositionTracks: 0,
      })
    })

    it('should handle libraryBrowserSelectAlbum action', () => {
      const testState: BrowserStateType = {
        ...browserInitialState,
        artists: Object.values(mockLibraryState.artists),
        albums: Object.values(mockLibraryState.albums).map((item) => ({
          ...item,
          artist: item.artistId
            ? mockLibraryState.artists[item.artistId]
            : undefined,
        })),
        tracks: Object.values(mockLibraryState.tracks).map((item) => ({
          ...item,
          artist: item.artistId
            ? mockLibraryState.artists[item.artistId]
            : undefined,
          album: item.albumId
            ? mockLibraryState.albums[item.albumId]
            : undefined,
        })),
        selectedAlbums: '1',
        currentPositionAlbums: 1,
        selectedTracks: '1',
        currentPositionTracks: 1,
      }

      const filteredTracks: Track[] = Object.values(
        mockLibraryState.tracks
      ).filter((item) => item.artistId === '2')

      expect(
        browserSlice(testState, {
          type: libraryBrowserSelectAlbum.type,
          payload: {
            albumId: '2',
            index: 2,
            filteredTracks,
          },
        })
      ).toEqual({
        ...testState,
        tracks: filteredTracks,
        selectedAlbums: '2',
        currentPositionAlbums: 2,
        selectedTracks: '0',
        currentPositionTracks: 0,
      })
    })

    it('should handle libraryBrowserSelectTrack action', () => {
      const testState: BrowserStateType = {
        ...browserInitialState,
        artists: Object.values(mockLibraryState.artists),
        albums: Object.values(mockLibraryState.albums).map((item) => ({
          ...item,
          artist: item.artistId
            ? mockLibraryState.artists[item.artistId]
            : undefined,
        })),
        tracks: Object.values(mockLibraryState.tracks).map((item) => ({
          ...item,
          artist: item.artistId
            ? mockLibraryState.artists[item.artistId]
            : undefined,
          album: item.albumId
            ? mockLibraryState.albums[item.albumId]
            : undefined,
        })),
        selectedAlbums: '1',
        currentPositionAlbums: 1,
        selectedTracks: '1',
        currentPositionTracks: 1,
      }

      expect(
        browserSlice(testState, {
          type: libraryBrowserSelectTrack.type,
          payload: {
            trackId: '2',
            index: 2,
          },
        })
      ).toEqual({
        ...testState,
        selectedTracks: '2',
        currentPositionTracks: 2,
      })
    })

    it('should handle libraryBrowserSortArtists action', () => {
      const testState: BrowserStateType = {
        ...browserInitialState,
      }

      expect(
        browserSlice(testState, {
          type: libraryBrowserSortArtists.type,
          payload: 'id',
        })
      ).toEqual({
        ...testState,
        sortArtists: 'id',
      })
    })

    it('should handle libraryBrowserSortAlbums action', () => {
      const testState: BrowserStateType = {
        ...browserInitialState,
      }

      expect(
        browserSlice(testState, {
          type: libraryBrowserSortAlbums.type,
          payload: 'date',
        })
      ).toEqual({
        ...testState,
        sortAlbums: 'date',
      })
    })

    it('should handle libraryBrowserSortTracks action', () => {
      const testState: BrowserStateType = {
        ...browserInitialState,
      }

      expect(
        browserSlice(testState, {
          type: libraryBrowserSortTracks.type,
          payload: 'number',
        })
      ).toEqual({
        ...testState,
        sortTracks: 'number',
      })
    })

    it('should handle libraryBrowserSearchUpdateInput action', () => {
      const testState: BrowserStateType = {
        ...browserInitialState,
      }

      expect(
        browserSlice(testState, {
          type: libraryBrowserSearchUpdateInput.type,
          payload: 'corni',
        })
      ).toEqual({
        ...testState,
        search: {
          ...testState.search,
          term: 'corni',
        },
      })
    })

    it('should handle libraryBrowserSearchFilter action', () => {
      const testState: BrowserStateType = {
        ...browserInitialState,
        artists: Object.values(mockLibraryState.artists),
        albums: Object.values(mockLibraryState.albums).map((item) => ({
          ...item,
          artist: item.artistId
            ? mockLibraryState.artists[item.artistId]
            : undefined,
        })),
        tracks: Object.values(mockLibraryState.tracks).map((item) => ({
          ...item,
          artist: item.artistId
            ? mockLibraryState.artists[item.artistId]
            : undefined,
          album: item.albumId
            ? mockLibraryState.albums[item.albumId]
            : undefined,
        })),
        selectedArtists: '1',
        currentPositionArtists: 1,
        selectedAlbums: '1',
        currentPositionAlbums: 1,
        selectedTracks: '1',
        currentPositionTracks: 1,
      }

      const filteredArtists: Artist[] = Object.values(testState.artists).filter(
        (item) => item.id === '2'
      )
      const filteredAlbums: Album[] = Object.values(testState.albums).filter(
        (item) => item.artistId === '2'
      )
      const filteredTracks: Track[] = Object.values(testState.tracks).filter(
        (item) => item.albumId === '2'
      )

      expect(
        browserSlice(testState, {
          type: libraryBrowserSearchFilter.type,
          payload: {
            searchTerm: 'i draw a map',
            filteredArtists,
            filteredAlbums,
            filteredTracks,
          },
        })
      ).toEqual({
        ...testState,
        selectedArtists: '0',
        currentPositionArtists: 0,
        selectedAlbums: '0',
        currentPositionAlbums: 0,
        selectedTracks: '0',
        currentPositionTracks: 0,
        artists: filteredArtists,
        albums: filteredAlbums,
        tracks: filteredTracks,
        search: {
          ...testState.search,
          term: 'i draw a map',
          filteredArtists,
          filteredAlbums,
          filteredTracks,
        },
      })
    })
  })

  describe('libraryBrowserInit thunk', () => {
    it('should dispatch correct actions', () => {
      const store = makeMockStore()

      const expected = [
        {
          payload: Object.values(mockLibraryState.artists),
          type: 'libraryBrowser/libraryBrowserInitArtists',
        },
        {
          payload: {
            artistId: '0',
            filteredAlbums: Object.values(mockLibraryState.albums),
            filteredTracks: [],
            index: 0,
          },
          type: 'libraryBrowser/libraryBrowserSelectArtist',
        },
        {
          payload: {
            albumId: '0',
            filteredTracks: [],
            index: 0,
          },
          type: 'libraryBrowser/libraryBrowserSelectAlbum',
        },
        {
          payload: {
            index: 0,
            trackId: '0',
          },
          type: 'libraryBrowser/libraryBrowserSelectTrack',
        },
      ]

      store.dispatch(
        // @ts-ignore
        libraryBrowserInit()
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })
  })

  describe('search thunk', () => {
    it('should dispatch correct actions when searching for 2 characters or more', () => {
      const store = makeMockStore()

      const expected = [
        {
          payload: 'corni',
          type: 'libraryBrowser/libraryBrowserSearchUpdateInput',
        },
        {
          payload: {
            filteredAlbums: [
              {
                artistId: '3',
                id: '2',
                title: 'Album 2',
                year: '2002',
              },
            ],
            filteredArtists: [
              {
                id: '3',
                name: 'Cornifer',
              },
            ],
            filteredTracks: [
              {
                albumId: '2',
                artistId: '3',
                cover: '',
                disc: '',
                duration: 124,
                id: '2',
                number: 2,
                title: 'I draw a map',
              },
            ],
            searchTerm: 'corni',
          },
          type: 'libraryBrowser/libraryBrowserSearchFilter',
        },
      ]

      store.dispatch(
        // @ts-ignore
        search('corni')
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when searching for empty string', () => {
      const store = makeMockStore()

      const expected = [
        {
          payload: '',
          type: 'libraryBrowser/libraryBrowserSearchUpdateInput',
        },
        {
          payload: {
            artistId: '0',
            filteredAlbums: Object.values(mockLibraryState.albums),
            filteredTracks: [],
            index: 0,
          },
          type: 'libraryBrowser/libraryBrowserSelectArtist',
        },
        {
          payload: Object.values(mockLibraryState.artists),
          type: 'libraryBrowser/libraryBrowserInitArtists',
        },
        {
          payload: {
            artistId: '0',
            filteredAlbums: Object.values(mockLibraryState.albums),
            filteredTracks: [],
            index: 0,
          },
          type: 'libraryBrowser/libraryBrowserSelectArtist',
        },
        {
          payload: {
            albumId: '0',
            filteredTracks: [],
            index: 0,
          },
          type: 'libraryBrowser/libraryBrowserSelectAlbum',
        },
        {
          payload: {
            index: 0,
            trackId: '0',
          },
          type: 'libraryBrowser/libraryBrowserSelectTrack',
        },
      ]

      store.dispatch(
        // @ts-ignore
        search('')
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when searching for less than 2 characters', () => {
      const store = makeMockStore()

      const expected = [
        {
          payload: 'c',
          type: 'libraryBrowser/libraryBrowserSearchUpdateInput',
        },
      ]

      store.dispatch(
        // @ts-ignore
        search('c')
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })
  })

  describe('initArtists thunk', () => {
    it('should dispatch correct actions when not in search mode', () => {
      const store = makeMockStore()

      const expected = [
        libraryBrowserInitArtists(Object.values(mockLibraryState.artists)),
      ]

      store.dispatch(
        // @ts-ignore
        initArtists()
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when in search mode', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          search: {
            ...browserInitialState.search,
            term: 'Corn',
            filteredArtists: [mockLibraryState.artists['1']],
          },
        },
      })

      const expected = [
        libraryBrowserInitArtists([mockLibraryState.artists['1']]),
      ]

      store.dispatch(
        // @ts-ignore
        initArtists()
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })
  })

  describe('selectArtist thunk', () => {
    it('should dispatch correct actions when not in search mode', () => {
      const store = makeMockStore()

      const expected = [
        libraryBrowserSelectArtist({
          artistId: '2',
          index: 2,
          filteredAlbums: Object.values<Album>(mockLibraryState.albums).filter(
            (item) => item.artistId === '2'
          ),
          filteredTracks: Object.values<Track>(mockLibraryState.tracks).filter(
            (item) => item.artistId === '2'
          ),
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectArtist({ artistId: '2', index: 2 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when in search mode', () => {
      // Mock a search.
      const filteredArtists = [mockLibraryState.artists['2']]
      const filteredAlbums = Object.values<Album>(
        mockLibraryState.albums
      ).filter((item) => item.artistId === '3')
      const filteredTracks = Object.values<Track>(
        mockLibraryState.tracks
      ).filter((item) => item.title.toUpperCase().includes('I draw a map'.toUpperCase()))

      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          search: {
            ...browserInitialState.search,
            term: 'I draw a map',
            filteredArtists,
            filteredAlbums,
            filteredTracks,
          },
          artists: filteredArtists,
          albums: filteredAlbums,
          tracks: filteredTracks,
        },
      })

      const expected = [
        libraryBrowserSelectArtist({
          artistId: '3',
          index: 3,
          filteredAlbums,
          filteredTracks,
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectArtist({ artistId: '3', index: 3 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when All is selected', () => {
      const store = makeMockStore()

      const expected = [
        libraryBrowserSelectArtist({
          artistId: '0',
          index: 0,
          filteredAlbums: Object.values<Album>(mockLibraryState.albums),
          filteredTracks: [],
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectArtist({ artistId: '0', index: 0 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when All is selected and user has searched', () => {
      // Mock a search.
      const filteredArtists = [mockLibraryState.artists['2']]
      const filteredAlbums = Object.values<Album>(
        mockLibraryState.albums
      ).filter((item) => item.artistId === '3')
      const filteredTracks = Object.values<Track>(
        mockLibraryState.tracks
      ).filter((item) => item.title.toUpperCase().includes('I draw a map'.toUpperCase()))

      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          search: {
            ...browserInitialState.search,
            term: 'I draw a map',
            filteredArtists,
            filteredAlbums,
            filteredTracks,
          },
          artists: filteredArtists,
          albums: filteredAlbums,
          tracks: filteredTracks,
        },
      })

      const expected = [
        libraryBrowserSelectArtist({
          artistId: '0',
          index: 0,
          filteredAlbums,
          filteredTracks,
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectArtist({ artistId: '0', index: 0 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when Various artists is selected', () => {
      const store = makeMockStore()

      const expected = [
        libraryBrowserSelectArtist({
          artistId: '1',
          index: 1,
          filteredAlbums: Object.values<Album>(mockLibraryState.albums).filter(
            (item) => item.artistId === '1'
          ),
          filteredTracks: Object.values<Track>(mockLibraryState.tracks).filter(
            (item) => item.artistId === '34'
          ),
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectArtist({ artistId: '1', index: 1 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })
  })

  describe('selectAlbum thunk', () => {
    it('should dispatch correct actions when not in search mode', () => {
      const store = makeMockStore()

      const expected = [
        libraryBrowserSelectAlbum({
          albumId: '2',
          index: 2,
          filteredTracks: Object.values<Track>(mockLibraryState.tracks).filter(
            (item) => item.albumId === '2'
          ),
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectAlbum({ albumId: '2', index: 2 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when in search mode', () => {
      // Mock a search.
      const filteredArtists = [mockLibraryState.artists['2']]
      const filteredAlbums = Object.values<Album>(
        mockLibraryState.albums
      ).filter((item) => item.artistId === '3')
      const filteredTracks = Object.values<Track>(
        mockLibraryState.tracks
      ).filter((item) => item.title.toUpperCase().includes('I draw a map'.toUpperCase()))

      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          search: {
            ...browserInitialState.search,
            term: 'I draw a map',
            filteredArtists,
            filteredAlbums,
            filteredTracks,
          },
          artists: filteredArtists,
          albums: filteredAlbums,
          tracks: filteredTracks,
        },
      })

      const expected = [
        libraryBrowserSelectAlbum({
          albumId: '2',
          index: 2,
          filteredTracks,
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectAlbum({ albumId: '2', index: 2 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when no artist selected and All is selected', () => {
      const store = makeMockStore()

      const expected = [
        libraryBrowserSelectAlbum({
          albumId: '0',
          index: 0,
          filteredTracks: [],
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectAlbum({ albumId: '0', index: 0 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when no artist selected, All is selected, and user has searched', () => {
      // Mock a search.
      const filteredArtists = [mockLibraryState.artists['2']]
      const filteredAlbums = Object.values<Album>(
        mockLibraryState.albums
      ).filter((item) => item.artistId === '3')
      const filteredTracks = Object.values<Track>(
        mockLibraryState.tracks
      ).filter((item) => item.title.toUpperCase().includes('I draw a map'.toUpperCase()))

      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          search: {
            ...browserInitialState.search,
            term: 'I draw a map',
            filteredArtists,
            filteredAlbums,
            filteredTracks,
          },
          artists: filteredArtists,
          albums: filteredAlbums,
          tracks: filteredTracks,
        },
      })

      const expected = [
        libraryBrowserSelectAlbum({
          albumId: '0',
          index: 0,
          filteredTracks,
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectAlbum({ albumId: '0', index: 0 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when an artist is selected and All albums selected', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          selectedArtists: '2',
          albums: Object.values<Album>(mockLibraryState.albums).filter(
            (item) => item.artistId === '2'
          ),
        },
      })

      const expected = [
        libraryBrowserSelectAlbum({
          albumId: '0',
          index: 0,
          filteredTracks: Object.values<Track>(mockLibraryState.tracks).filter(
            (item) => item.artistId === '2'
          ),
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectAlbum({ albumId: '0', index: 0 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when an artist is selected and an album is selected', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          selectedArtists: '2',
          albums: Object.values<Album>(mockLibraryState.albums).filter(
            (item) => item.artistId === '2'
          ),
        },
      })

      const expected = [
        libraryBrowserSelectAlbum({
          albumId: '3',
          index: 3,
          filteredTracks: Object.values<Track>(mockLibraryState.tracks).filter(
            (item) => item.artistId === '2' && item.albumId === '3'
          ),
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectAlbum({ albumId: '3', index: 3 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when Various artists is selected', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          selectedArtists: '1',
          albums: Object.values<Album>(mockLibraryState.albums).filter(
            (item) => item.artistId === '1'
          ),
        },
      })

      const expected = [
        libraryBrowserSelectAlbum({
          albumId: '4',
          index: 3,
          filteredTracks: Object.values<Track>(mockLibraryState.tracks).filter(
            (item) => item.albumId === '4'
          ),
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectAlbum({ albumId: '4', index: 3 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when Various artists is selected and All albums is selected', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          selectedArtists: '1',
          albums: Object.values<Album>(mockLibraryState.albums).filter(
            (item) => item.artistId === '1'
          ),
        },
      })

      const expected = [
        libraryBrowserSelectAlbum({
          albumId: '0',
          index: 0,
          filteredTracks: Object.values<Track>(mockLibraryState.tracks).filter(
            (item) => item.artistId === '34'
          ),
        }),
      ]

      store.dispatch(
        // @ts-ignore
        selectAlbum({ albumId: '0', index: 0 })
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })
  })

  describe('searchFilter thunk', () => {
    it('should dispatch correct actions when search matches a track', () => {
      const store = makeMockStore()

      const filteredTracks = Object.values<Track>(
        mockLibraryState.tracks
      ).filter((item) => item.title.includes('I draw a map'))
      const filteredTracksAlbumIds = filteredTracks.map((item) => item.albumId)
      const filteredTracksArtistIds = filteredTracks.map(
        (item) => item.artistId
      )

      const filteredAlbums = Object.values<Album>(
        mockLibraryState.albums
      ).filter((item) => filteredTracksAlbumIds.includes(item.id))

      const filteredArtists = Object.values<Artist>(
        mockLibraryState.artists
      ).filter((item) => filteredTracksArtistIds.includes(item.id))

      const expected = [
        libraryBrowserSearchFilter({
          searchTerm: 'I draw a map',
          filteredArtists,
          filteredAlbums,
          filteredTracks,
        }),
      ]

      store.dispatch(
        // @ts-ignore
        searchFilter('I draw a map')
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when search matches an album', () => {
      const store = makeMockStore()
      const testSearchTerm = 'Album 2'

      const filteredAlbums = Object.values<Album>(
        mockLibraryState.albums
      ).filter((item) => item.title.includes(testSearchTerm))
      const filteredAlbumIds = filteredAlbums.map((item) => item.id)
      const filteredAlbumsArtistIds = filteredAlbums.map(
        (item) => item.artistId
      )

      const filteredArtists = Object.values<Artist>(
        mockLibraryState.artists
      ).filter((item) => filteredAlbumsArtistIds.includes(item.id))

      const filteredTracks = Object.values<Track>(
        mockLibraryState.tracks
      ).filter(
        (item) => item.albumId && filteredAlbumIds.includes(item.albumId)
      )

      const expected = [
        libraryBrowserSearchFilter({
          searchTerm: testSearchTerm,
          filteredArtists,
          filteredAlbums,
          filteredTracks,
        }),
      ]

      store.dispatch(
        // @ts-ignore
        searchFilter(testSearchTerm)
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when search matches an artist', () => {
      const store = makeMockStore()
      const testSearchTerm = 'Cornifer'

      const filteredArtists = Object.values<Artist>(
        mockLibraryState.artists
      ).filter((item) => item.name.includes(testSearchTerm))
      const filteredArtistIds = filteredArtists.map((item) => item.id)

      const filteredAlbums = Object.values<Album>(
        mockLibraryState.albums
      ).filter(
        (item) => item.artistId && filteredArtistIds.includes(item.artistId)
      )

      const filteredTracks = Object.values<Track>(
        mockLibraryState.tracks
      ).filter(
        (item) => item.artistId && filteredArtistIds.includes(item.artistId)
      )

      const expected = [
        libraryBrowserSearchFilter({
          searchTerm: testSearchTerm,
          filteredArtists,
          filteredAlbums,
          filteredTracks,
        }),
      ]

      store.dispatch(
        // @ts-ignore
        searchFilter(testSearchTerm)
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })

    it('should dispatch correct actions when searching for the special compilation artist', () => {
      const store = makeMockStore()
      const testSearchTerm = 'Various'

      const filteredArtists = Object.values<Artist>(
        mockLibraryState.artists
      ).filter((item) => item.name.includes(testSearchTerm))
      const filteredArtistIds = filteredArtists.map((item) => item.id)

      const filteredAlbums = Object.values<Album>(
        mockLibraryState.albums
      ).filter(
        (item) => item.artistId && filteredArtistIds.includes(item.artistId)
      )

      const filteredTracks = Object.values<Track>(
        mockLibraryState.tracks
      ).filter(
        (item) => item.albumId
          && filteredAlbums.map((album) => album.id).includes(item.albumId)
      )

      const expected = [
        libraryBrowserSearchFilter({
          searchTerm: testSearchTerm,
          filteredArtists,
          filteredAlbums,
          filteredTracks,
        }),
      ]

      store.dispatch(
        // @ts-ignore
        searchFilter(testSearchTerm)
      )
      const actual = store.getActions()
      expect(actual).toEqual(expected)
    })
  })

  describe('getArtistsList selector', () => {
    it('should return artists ordered by name', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          artists: Object.values(mockLibraryState.artists),
          sortArtists: 'name',
        },
      })

      const expected = immutableNestedSort(
        Object.values(mockLibraryState.artists),
        'name'
      )

      const sorted = getArtistsList(store.getState())
      // First item must be 'All' placeholder.
      expect(sorted[0]).toEqual({
        id: '0',
        name: 'All',
        title: 'All',
        artistId: '0',
        albumId: '0',
      })
      // Following items must be sorted.
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i]).toEqual(expected[i - 1])
      }
    })

    it('should return artists ordered by id', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          artists: Object.values(mockLibraryState.artists),
          sortArtists: 'id',
        },
      })

      const expected = immutableNestedSort(
        Object.values(mockLibraryState.artists),
        'id'
      )

      const sorted = getArtistsList(store.getState())
      // First item must be 'All' placeholder.
      expect(sorted[0]).toEqual({
        id: '0',
        name: 'All',
        title: 'All',
        artistId: '0',
        albumId: '0',
      })
      // Following items must be sorted.
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i]).toEqual(expected[i - 1])
      }
    })
  })

  describe('getAlbumsList selector', () => {
    it('should return albums ordered by title', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          albums: Object.values(mockLibraryState.albums),
          sortAlbums: 'title',
        },
      })

      const expected = immutableNestedSort(
        Object.values(mockLibraryState.albums),
        'title'
      )

      const sorted = getAlbumsList(store.getState())
      // First item must be 'All' placeholder.
      expect(sorted[0]).toEqual({
        id: '0',
        name: 'All',
        title: 'All',
        artistId: '0',
        albumId: '0',
      })
      // Following items must be sorted.
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i]).toEqual(expected[i - 1])
      }
    })

    it('should return albums ordered by year', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          albums: Object.values(mockLibraryState.albums),
          sortAlbums: 'year',
        },
      })

      const expected = immutableNestedSort(
        Object.values(mockLibraryState.albums),
        'year'
      )

      const sorted = getAlbumsList(store.getState())
      // First item must be 'All' placeholder.
      expect(sorted[0]).toEqual({
        id: '0',
        name: 'All',
        title: 'All',
        artistId: '0',
        albumId: '0',
      })
      // Following items must be sorted.
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i]).toEqual(expected[i - 1])
      }
    })
  })

  describe('getTracksList selector', () => {
    it('should return tracks ordered by title', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          tracks: Object.values(mockLibraryState.tracks),
          sortTracks: 'title',
        },
      })

      const expected = immutableNestedSort(
        Object.values(mockLibraryState.tracks),
        'title'
      )

      const sorted = getTracksList(store.getState())
      // First item must be 'All' placeholder.
      expect(sorted[0]).toEqual({
        id: '0',
        name: 'All',
        title: 'All',
        artistId: '0',
        albumId: '0',
      })
      // Following items must be sorted.
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i]).toEqual(expected[i - 1])
      }
    })

    it('should return tracks ordered by id', () => {
      const store = makeMockStore({
        libraryBrowser: {
          ...browserInitialState,
          tracks: Object.values(mockLibraryState.tracks),
          sortTracks: 'id',
        },
      })

      const expected = immutableNestedSort(
        Object.values(mockLibraryState.tracks),
        'id'
      )

      const sorted = getTracksList(store.getState())
      // First item must be 'All' placeholder.
      expect(sorted[0]).toEqual({
        id: '0',
        name: 'All',
        title: 'All',
        artistId: '0',
        albumId: '0',
      })
      // Following items must be sorted.
      for (let i = 1; i < sorted.length; i++) {
        expect(sorted[i]).toEqual(expected[i - 1])
      }
    })
  })
})
