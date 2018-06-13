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
  (list, sortOrder) => immutableNestedSort(list, sortOrder),
);

const getAlbums = state => state.libraryBrowser.albums;
const getAlbumsSortOrder = state => state.libraryBrowser.sortAlbums;
const getAlbumsList = createSelector(
  [getAlbums, getAlbumsSortOrder],
  (list, sortOrder) => immutableNestedSort(list, sortOrder),
);

const getTracks = state => state.libraryBrowser.tracks;
const getTracksSortOrder = state => state.libraryBrowser.sortTracks;
const getTracksList = createSelector(
  [getTracks, getTracksSortOrder],
  (list, sortOrder) => immutableSortTracks(list, sortOrder),
);

export {
  getArtistsList,
  getAlbumsList,
  getTracksList,
};
