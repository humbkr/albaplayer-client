const LIBRARY_BROWSER_INIT = 'LIBRARY_BROWSER_INIT';
const libraryBrowserInit = () => (
  {
    type: LIBRARY_BROWSER_INIT,
  }
);

const LIBRARY_BROWSER_SELECT_ARTIST = 'LIBRARY_BROWSER_SELECT_ARTIST';
const libraryBrowserSelectArtist = artistId => (
  {
    type: LIBRARY_BROWSER_SELECT_ARTIST,
    artistId,
  }
);

const LIBRARY_BROWSER_SELECT_ALBUM = 'LIBRARY_BROWSER_SELECT_ALBUM';
const libraryBrowserSelectAlbum = albumId => (
  {
    type: LIBRARY_BROWSER_SELECT_ALBUM,
    albumId,
  }
);

const LIBRARY_BROWSER_SELECT_TRACK = 'LIBRARY_BROWSER_SELECT_TRACK';
const libraryBrowserSelectTrack = trackId => (
  {
    type: LIBRARY_BROWSER_SELECT_TRACK,
    trackId,
  }
);

const LIBRARY_BROWSER_SORT_ARTISTS = 'LIBRARY_BROWSER_SORT_ARTISTS';
const libraryBrowserSortArtists = sortProperty => (
  {
    type: LIBRARY_BROWSER_SORT_ARTISTS,
    sortProperty,
  }
);

const LIBRARY_BROWSER_SORT_ALBUMS = 'LIBRARY_BROWSER_SORT_ALBUMS';
const libraryBrowserSortAlbums = sortProperty => (
  {
    type: LIBRARY_BROWSER_SORT_ALBUMS,
    sortProperty,
  }
);

const LIBRARY_BROWSER_SORT_TRACKS = 'LIBRARY_BROWSER_SORT_TRACKS';
const libraryBrowserSortTracks = sortProperty => (
  {
    type: LIBRARY_BROWSER_SORT_TRACKS,
    sortProperty,
  }
);

export {
  LIBRARY_BROWSER_SELECT_ARTIST,
  LIBRARY_BROWSER_SELECT_ALBUM,
  LIBRARY_BROWSER_SELECT_TRACK,
  LIBRARY_BROWSER_SORT_ARTISTS,
  LIBRARY_BROWSER_SORT_ALBUMS,
  LIBRARY_BROWSER_SORT_TRACKS,
  LIBRARY_BROWSER_INIT,
  libraryBrowserSelectArtist,
  libraryBrowserSelectAlbum,
  libraryBrowserSelectTrack,
  libraryBrowserSortArtists,
  libraryBrowserSortAlbums,
  libraryBrowserSortTracks,
  libraryBrowserInit,
};
