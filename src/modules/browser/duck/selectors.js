import { createSelector } from 'reselect'
import {
  immutableNestedSort,
  immutableSortTracks,
} from '../../../common/utils/utils'

const getArtists = (state) => state.libraryBrowser.artists
const getArtistsSortOrder = (state) => state.libraryBrowser.sortArtists
const getArtistsList = createSelector(
  [getArtists, getArtistsSortOrder],
  (list, sortOrder) => {
    const itemList = immutableNestedSort(list, sortOrder)

    // Add a "All" item at the beginning of the list
    const itemAll = {
      id: '0',
      name: 'All',
      title: 'All',
      artistId: '0',
      albumId: '0',
    }
    itemList.unshift(itemAll)

    return itemList
  }
)

const getAlbums = (state) => state.libraryBrowser.albums
const getAlbumsSortOrder = (state) => state.libraryBrowser.sortAlbums
const getAlbumsList = createSelector(
  [getAlbums, getAlbumsSortOrder],
  (list, sortOrder) => {
    const itemList = immutableNestedSort(list, sortOrder)

    // Add a "All" item at the beginning of the list
    const itemAll = {
      id: '0',
      name: 'All',
      title: 'All',
      artistId: '0',
      albumId: '0',
    }
    itemList.unshift(itemAll)

    return itemList
  }
)

const getTracks = (state) => state.libraryBrowser.tracks
const getTracksSortOrder = (state) => state.libraryBrowser.sortTracks
const getTracksList = createSelector(
  [getTracks, getTracksSortOrder],
  (list, sortOrder) => {
    const itemList = immutableSortTracks(list, sortOrder)

    // Add a "All" item at the beginning of the list
    const itemAll = {
      id: '0',
      name: 'All',
      title: 'All',
      artistId: '0',
      albumId: '0',
    }
    itemList.unshift(itemAll)

    return itemList
  }
)

export default {
  getArtistsList,
  getAlbumsList,
  getTracksList,
}
