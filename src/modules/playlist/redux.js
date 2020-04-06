import { createSelector, createSlice } from '@reduxjs/toolkit'
import { immutableNestedSort } from 'common/utils/utils'

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

const playlistSlice = createSlice({
  name: 'playlist',
  initialState,
  reducers: {
    playlistSelectPlaylist(state, action) {
      state.currentPlaylist = {
        playlist: action.payload.selectedPlaylist,
        position: action.payload.playlistIndex,
      }
      state.currentTrack = {
        id: 0,
        position: 0,
      }
    },
    playlistCreatePlaylist(state, action) {
      const newList = { ...state.playlists }
      newList[action.payload.id] = action.payload

      state.playlists = newList
      state.currentPlaylist = {
        playlist: action.payload,
        position: Object.values(newList).length - 1,
      }
    },
    playlistDeletePlaylist(state, action) {
      const newList = { ...state.playlists }
      delete newList[action.payload.id]

      let newCurrentPlaylist = { ...state.currentPlaylist }
      if (
        state.currentPlaylist.playlist
        && state.currentPlaylist.playlist.id === action.payload.id
      ) {
        // We deleted the current playlist, set current to the first  of
        // the list if there is one.
        if (Object.values(newList).length > 0) {
          newCurrentPlaylist = { playlist: { ...newList[0] }, position: 0 }
        } else {
          newCurrentPlaylist = { playlist: null, position: 0 }
        }
      }

      state.playlists = newList
      state.currentPlaylist = newCurrentPlaylist
    },
    playlistSelectTrack(state, action) {
      state.currentTrack = {
        id: action.payload.trackId,
        position: action.payload.trackIndex,
      }
    },
    playlistRemoveTrack(state, action) {
      // Remove selected track.
      let newTracklist = state.playlists[
        action.payload.playlistId
      ].tracks.filter((item) => item.position !== action.payload.trackIndex)

      // Reorder all tracks.
      let position = 0
      newTracklist = newTracklist.map((item) => {
        position++
        return { ...item, position }
      })

      const newPlaylists = { ...state.playlists }
      newPlaylists[action.payload.playlistId].tracks = newTracklist

      state.playlists = newPlaylists
      state.currentPlaylist = {
        ...state.currentPlaylist,
        playlist: { ...newPlaylists[state.currentPlaylist.playlist.id] },
      }
    },
    playlistAddTracks(state, action) {
      const { playlistId, tracks } = action.payload
      const newPlaylists = { ...state.playlists }

      // Add position in playlist to tracks.
      let position = newPlaylists[playlistId].tracks.length
      const augmentedTracks = tracks.map((track) => {
        position++
        return {
          ...track,
          position,
        }
      })

      // Add tracks to selected playlist.
      newPlaylists[playlistId].tracks.push(...augmentedTracks)

      state.playlists = newPlaylists

      // Update current playlist if this is the one we are working on.
      if (state.currentPlaylist.playlist?.id === playlistId) {
        state.currentPlaylist = {
          ...state.currentPlaylist,
          playlist: { ...newPlaylists[state.currentPlaylist.playlist.id] },
        }
      }
    },
    playlistUpdateTracks(state, action) {
      let position = 0
      const reorderedTracks = action.payload.newTrackList.map((item) => {
        position++
        return { ...item, position }
      })

      const newPlaylists = { ...state.playlists }
      newPlaylists[action.payload.playlistId].tracks = reorderedTracks

      const newPlaylist = { ...state.currentPlaylist.playlist }
      if (action.payload.playlistId === state.currentPlaylist.playlist.id) {
        newPlaylist.tracks = reorderedTracks
      }

      state.playlists = newPlaylists
      state.currentPlaylist = {
        ...state.currentPlaylist,
        playlist: newPlaylist,
      }
    },
    playlistUpdateInfo(state, action) {
      const newPlaylists = { ...state.playlists }
      newPlaylists[action.payload.id] = action.payload

      state.playlists = newPlaylists
      state.currentPlaylist = {
        ...state.currentPlaylist,
        playlist:
          action.payload.id === state.currentPlaylist.playlist.id
            ? action.payload
            : state.currentPlaylist.playlist,
      }
    },
  },
})

export const {
  playlistSelectPlaylist,
  playlistCreatePlaylist,
  playlistDeletePlaylist,
  playlistSelectTrack,
  playlistRemoveTrack,
  playlistAddTracks,
  playlistAddPlaylist,
  playlistUpdateTracks,
  playlistUpdateInfo,
} = playlistSlice.actions
export default playlistSlice.reducer

export const addTrack = (playlistId, trackId) => (dispatch, getState) => {
  const { library } = getState()

  // Get track info from the library.
  const track = { ...library.tracks[trackId] }
  // Hydrate track with album and artist info.
  track.artist = library.artists[track.artistId]
  track.album = library.albums[track.albumId]

  dispatch(playlistAddTracks({ playlistId, tracks: [track] }))
}

export const addAlbum = (playlistId, albumId) => (dispatch, getState) => {
  const { library } = getState()

  // Get tracks from album.
  const filteredTracks = Object.values(library.tracks).filter(
    (item) => albumId === item.albumId
  )

  // Hydrate tracks with album and artist info.
  const augmentedTracks = filteredTracks.map((track) => ({
    ...track,
    artist: library.artists[track.artistId],
    album: library.albums[track.albumId],
  }))

  dispatch(playlistAddTracks({ playlistId, tracks: augmentedTracks }))
}

export const addArtist = (playlistId, artistId) => (dispatch, getState) => {
  const { library } = getState()

  // Get tracks from artist.
  const filteredTracks = Object.values(library.tracks).filter(
    (item) => artistId === item.artistId
  )

  // Hydrate tracks with album and artist info.
  const augmentedTracks = filteredTracks.map((track) => ({
    ...track,
    artist: library.artists[track.artistId],
    album: library.albums[track.albumId],
  }))

  dispatch(playlistAddTracks({ playlistId, tracks: augmentedTracks }))
}
export const addPlaylist = ({ playlistId, playlistToAddId }) => (
  dispatch,
  getState
) => {
  const { playlist } = getState()
  dispatch(
    playlistAddTracks({
      playlistId,
      tracks: playlist.playlists[playlistToAddId].tracks,
    })
  )
}

export const playlistsSelector = createSelector(
  [(state) => state.playlist.playlists],
  (list) => immutableNestedSort(Object.values(list), 'title')
)
