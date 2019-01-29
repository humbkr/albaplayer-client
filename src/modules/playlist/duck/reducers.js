import types from './types'

const initialState = {
  playlists: {},
  currentPlaylist: {
    playlist: null,
    position: 0,
  },
  currentTrack: {
    id: 0,
    position: 0,
  },
}

function playlists(state = initialState, action, library) {
  switch (action.type) {
    case types.PLAYLIST_SELECT_PLAYLIST:
      return {
        ...state,
        currentPlaylist: {
          playlist: action.selectedPlaylist,
          position: action.index,
        },
        currentTrack: {
          id: 0,
          position: 0,
        },
      }

    case types.PLAYLIST_CREATE_PLAYLIST: {
      const newList = { ...state.playlists }
      newList[action.playlist.id] = action.playlist

      return {
        ...state,
        playlists: newList,
        currentPlaylist: {
          playlist: action.playlist,
          position: Object.values(newList).length - 1,
        },
      }
    }

    case types.PLAYLIST_REMOVE_PLAYLIST: {
      const newList = { ...state.playlists }
      delete newList[action.playlist.id]

      let newCurrentPlaylist = { ...state.currentPlaylist }
      if (
        state.currentPlaylist.playlist
        && state.currentPlaylist.playlist.id === action.playlist.id
      ) {
        // We deleted the current playlist, set current to the first  of
        // the list if there is one.
        if (Object.values(newList).length > 0) {
          newCurrentPlaylist = { playlist: { ...newList[0] }, position: 0 }
        } else {
          newCurrentPlaylist = { playlist: null, position: 0 }
        }
      }

      return {
        ...state,
        playlists: newList,
        currentPlaylist: newCurrentPlaylist,
      }
    }

    case types.PLAYLIST_SELECT_TRACK: {
      return {
        ...state,
        currentTrack: {
          id: action.trackId,
          position: action.index,
        },
      }
    }

    case types.PLAYLIST_REMOVE_TRACK: {
      // Remove selected track.
      let newTracklist = state.playlists[action.playlistId].tracks.filter(
        (item) => item.position !== action.trackPosition
      )

      // Reorder all tracks.
      let position = 0
      newTracklist = newTracklist.map((item) => {
        position++
        return { ...item, position }
      })

      const newPlaylists = { ...state.playlists }
      newPlaylists[action.playlistId].tracks = newTracklist

      return {
        ...state,
        playlists: newPlaylists,
        currentPlaylist: {
          ...state.currentPlaylist,
          playlist: { ...newPlaylists[state.currentPlaylist.playlist.id] },
        },
      }
    }

    case types.PLAYLIST_ADD_TRACK: {
      const newPlaylists = { ...state.playlists }

      // Get track info from the library.
      const track = library.tracks[action.trackId]
      // Hydrate track with album and artist info.
      track.artist = library.artists[track.artistId]
      track.album = library.albums[track.albumId]
      // Add position in playlist.
      track.position = newPlaylists[action.playlistId].tracks.length + 1

      // Add track to selected playlist.
      newPlaylists[action.playlistId].tracks.push(track)

      return {
        ...state,
        playlists: newPlaylists,
        currentPlaylist: {
          ...state.currentPlaylist,
          playlist: { ...newPlaylists[state.currentPlaylist.playlist.id] },
        },
      }
    }

    case types.PLAYLIST_ADD_ALBUM: {
      const newPlaylists = { ...state.playlists }

      // Get tracks from album.
      const filteredTracks = Object.values(library.tracks).filter(
        (item) => action.albumId === item.albumId
      )
      let position = newPlaylists[action.playlistId].tracks.length + 1
      filteredTracks.forEach((track) => {
        // Hydrate track with album and artist info.
        // eslint-disable-next-line no-param-reassign
        track.artist = library.artists[track.artistId]
        // eslint-disable-next-line no-param-reassign
        track.album = library.albums[track.albumId]
        // Add position in playlist.
        // eslint-disable-next-line no-param-reassign
        track.position = position
        position++

        // Add track to selected playlist.
        newPlaylists[action.playlistId].tracks.push(track)
      })

      return {
        ...state,
        playlists: newPlaylists,
        currentPlaylist: {
          ...state.currentPlaylist,
          playlist: { ...newPlaylists[state.currentPlaylist.playlist.id] },
        },
      }
    }

    case types.PLAYLIST_ADD_ARTIST: {
      const newPlaylists = { ...state.playlists }

      // Get tracks from artist.
      const filteredTracks = Object.values(library.tracks).filter(
        (item) => action.artistId === item.artistId
      )
      let position = newPlaylists[action.playlistId].tracks.length + 1
      filteredTracks.forEach((track) => {
        // Hydrate track with album and artist info.
        // eslint-disable-next-line no-param-reassign
        track.artist = library.artists[track.artistId]
        // eslint-disable-next-line no-param-reassign
        track.album = library.albums[track.albumId]
        // Add position in playlist.
        // eslint-disable-next-line no-param-reassign
        track.position = position
        position++

        // Add track to selected playlist.
        newPlaylists[action.playlistId].tracks.push(track)
      })

      return {
        ...state,
        playlists: newPlaylists,
        currentPlaylist: {
          ...state.currentPlaylist,
          playlist: { ...newPlaylists[state.currentPlaylist.playlist.id] },
        },
      }
    }

    case types.PLAYLIST_ADD_PLAYLIST: {
      const newPlaylists = { ...state.playlists }

      const newTracks = [...state.playlists[action.playlistToAddId].tracks]
      let position = newPlaylists[action.playlistId].tracks.length + 1

      newTracks.forEach((track) => {
        // Add position in playlist.
        // eslint-disable-next-line no-param-reassign
        track.position = position
        position++

        // Add track to selected playlist.
        newPlaylists[action.playlistId].tracks.push(track)
      })

      return {
        ...state,
        playlists: newPlaylists,
        currentPlaylist: {
          ...state.currentPlaylist,
          playlist: { ...newPlaylists[state.currentPlaylist.playlist.id] },
        },
      }
    }

    case types.PLAYLIST_UPDATE_TRACKS: {
      let position = 0
      const reorderedTracks = action.newTrackList.map((item) => {
        position++
        return { ...item, position }
      })

      const newPlaylists = { ...state.playlists }
      newPlaylists[action.playlistId].tracks = reorderedTracks

      const newPlaylist = { ...state.currentPlaylist.playlist }
      if (action.playlistId === state.currentPlaylist.playlist.id) {
        newPlaylist.tracks = reorderedTracks
      }

      return {
        ...state,
        playlists: newPlaylists,
        currentPlaylist: {
          ...state.currentPlaylist,
          playlist: newPlaylist,
        },
      }
    }

    case types.PLAYLIST_UPDATE_INFO: {
      const newPlaylists = { ...state.playlists }
      newPlaylists[action.playlist.id] = action.playlist

      console.log(action.playlist)

      return {
        ...state,
        playlists: newPlaylists,
        currentPlaylist: {
          ...state.currentPlaylist,
          playlist:
            action.playlist.id === state.currentPlaylist.playlist.id
              ? action.playlist
              : state.currentPlaylist.playlist,
        },
      }
    }

    default:
      return state
  }
}

export default playlists
