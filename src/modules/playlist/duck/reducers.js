import types from './types'

// Const initialState = {
//   list: [],
//   selected: 0,
// }

const initialState = {
  list: [
    {
      id: 1,
      title: 'My awesome playlist',
      date: '2018-12-03',
      tracks: [
        {
          position: 1,
          id: 34,
          title: 'Track number one',
          artist: {
            name: 'Artist a',
          },
          album: {
            title: 'Album title for artist a',
            date: '1996',
          },
        },
        {
          position: 2,
          id: 211,
          title: 'Track number two',
          artist: {
            name: 'Artist b',
          },
          album: {
            title: 'Album title for artist b',
            date: '2001',
          },
        },
      ],
    },
    {
      id: 2,
      title: 'SuperCluster',
      date: '2018-07-18',
      tracks: [],
    },
    {
      id: 3,
      title: 'This is a very very long playlist name for testing purposes',
      date: '2018-09-30',
      tracks: [],
    },
    {
      id: 4,
      title: 'Rad stuff',
      date: '2019-01-20',
      tracks: [],
    },
  ],
  selected: null,
}

function playlists(state = initialState, action) {
  switch (action.type) {
    case types.PLAYLIST_SELECT_PLAYLIST:
      console.log(action.selectedPlaylist)
      return {
        ...state,
        selected: action.selectedPlaylist,
      }
    case types.PLAYLIST_ADD_PLAYLIST:
      return {
        ...state,
        list: [...state.list, action.playlist],
      }
    case types.PLAYLIST_REMOVE_PLAYLIST:
      return {
        ...state,
        list: state.list.filter((item) => item.id !== action.playlist.id),
        selected: state.selected !== action.playlist.id ? state.selected : 0,
      }
    default:
      return state
  }
}

export default playlists
