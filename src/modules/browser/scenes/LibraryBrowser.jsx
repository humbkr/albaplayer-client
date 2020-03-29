import React, { useRef, useEffect } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import ArtistsPaneContainer from '../components/ArtistsPaneContainer'
import AlbumsPaneContainer from '../components/AlbumsPaneContainer'
import TracksPaneContainer from '../components/TracksPaneContainer'
import LibraryBrowserSearchBar from '../components/LibraryBrowserSearchBar'
import { actions } from '../duck'

/**
 * Library browser screen.
 *
 * Handles the switch between artists / albums / tracks pane using
 * left and right arrows.
 */
function LibraryBrowser() {
  // Used to focus the search input at mount.
  const searchBar = useRef(null)
  // These refs are forwarded to the underlying react-virtualized
  // List components of each pane.
  const artistsPane = useRef(null)
  const albumsPane = useRef(null)
  const tracksPane = useRef(null)

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(actions.libraryBrowserInit())

    // Give focus to the search bar.
    searchBar.current.focus()
  }, [dispatch])

  const handleSwitchPaneArtists = (e) => {
    if (e.keyCode === 39) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(albumsPane.current).focus()
    }
  }

  const handleSwitchPaneAlbums = (e) => {
    if (e.keyCode === 37) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(artistsPane.current).focus()
    } else if (
      e.keyCode === 39
      // eslint-disable-next-line react/no-find-dom-node
      && ReactDOM.findDOMNode(tracksPane.current)
    ) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(tracksPane.current).focus()
    }
  }

  const handleSwitchPaneTracks = (e) => {
    if (e.keyCode === 37) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(albumsPane.current).focus()
    }
  }

  return (
    <LibraryBrowserWrapper>
      <LibraryBrowserSearchBar ref={searchBar} />
      <LibraryBrowserListsWrapper>
        <ArtistsPaneContainer
          switchPaneHandler={handleSwitchPaneArtists}
          ref={artistsPane}
        />
        <AlbumsPaneContainer
          switchPaneHandler={handleSwitchPaneAlbums}
          ref={albumsPane}
        />
        <TracksPaneContainer
          switchPaneHandler={handleSwitchPaneTracks}
          ref={tracksPane}
        />
      </LibraryBrowserListsWrapper>
    </LibraryBrowserWrapper>
  )
}

export default LibraryBrowser

const LibraryBrowserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`
const LibraryBrowserListsWrapper = styled.div`
  flex: 1;
`
