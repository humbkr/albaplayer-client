import { createSelector } from 'reselect';
import { immutableSortTracks } from '../utils';

const immutableNestedSort = (items, prop) => {
  const property = prop.split('.');
  // Get depth.
  const len = property.length;

  let result = 0;

  return [...items].sort((propA, propB) => {
    // propA and propB are objects so we need to find the property value to compare.
    // For that we look for an object property given the depth of prop that we were passed.
    let a = propA;
    let b = propB;
    let i = 0;
    while (i < len) {
      a = a[property[i]];
      b = b[property[i]];
      i++;
    }

    // Sort if value type is string.
    if (typeof a === 'string' || a instanceof String) {
      if (a.toLowerCase() > b.toLowerCase()) {
        result = 1;
      } else if (b.toLowerCase() > a.toLowerCase()) {
        result = -1;
      }

      return result;
    }

    // Sort if value type is number.
    if (a > b) {
      result = 1;
    } else if ((b > a)) {
      result = -1;
    }

    return result;
  });
};

const getArtists = state => state.libraryBrowser.artists;
const getArtistsSortOrder = state => state.libraryBrowser.sortArtists;
const getArtistsList = createSelector(
  [getArtists, getArtistsSortOrder],
  (list, sortOrder) => {
    const itemList = immutableNestedSort(list, sortOrder);

    // Add a "All" item at the beginning of the list
    const itemAll = {
      id: '0',
      name: 'All',
      title: 'All',
      artistId: '0',
      albumId: '0',
    };
    itemList.unshift(itemAll);

    return itemList;
  },
);

const getAlbums = state => state.libraryBrowser.albums;
const getAlbumsSortOrder = state => state.libraryBrowser.sortAlbums;
const getAlbumsList = createSelector(
  [getAlbums, getAlbumsSortOrder],
  (list, sortOrder) => {
    const itemList = immutableNestedSort(list, sortOrder);

    // Add a "All" item at the beginning of the list
    const itemAll = {
      id: '0',
      name: 'All',
      title: 'All',
      artistId: '0',
      albumId: '0',
    };
    itemList.unshift(itemAll);

    return itemList;
  },
);

const getTracks = state => state.libraryBrowser.tracks;
const getTracksSortOrder = state => state.libraryBrowser.sortTracks;
const getTracksList = createSelector(
  [getTracks, getTracksSortOrder],
  (list, sortOrder) => {
    const itemList = immutableSortTracks(list, sortOrder);

    // Add a "All" item at the beginning of the list
    const itemAll = {
      id: '0',
      name: 'All',
      title: 'All',
      artistId: '0',
      albumId: '0',
    };
    itemList.unshift(itemAll);

    return itemList;
  },
);

export {
  getArtistsList,
  getAlbumsList,
  getTracksList,
};
