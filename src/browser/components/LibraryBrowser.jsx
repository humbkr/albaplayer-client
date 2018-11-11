import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import ArtistsPaneContainer from './ArtistsPaneContainer'
import AlbumsPaneContainer from './AlbumsPaneContainer'
import TracksPaneContainer from './TracksPaneContainer'
import LibraryBrowserSearchBar from './LibraryBrowserSearchBar'
import { libraryBrowserInit } from '../actions'

const LibraryBrowserWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
`

const LibraryBrowserListsWrapper = styled.div`
  flex: 1;
`

/**
 * Library browser screen.
 *
 * Handles the switch between artists / albums / tracks pane using
 * left and right arrows.
 */
class LibraryBrowser extends Component {
  constructor(props) {
    super(props)

    // Used to focus the search input at mount.
    this.searchBar = React.createRef()
    // These refs are forwarded to the underlying react-virtualized
    // List components of each pane.
    this.artistsPane = React.createRef()
    this.albumsPane = React.createRef()
    this.tracksPane = React.createRef()
  }

  componentDidMount() {
    const dispatch = this.props.dispatch
    dispatch(libraryBrowserInit())

    // Give focus to the search bar.
    // eslint-disable-next-line react/no-find-dom-node
    ReactDOM.findDOMNode(this.searchBar.current).focus()
  }

  handleSwitchPaneArtists = (e) => {
    if (e.keyCode === 39) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(this.albumsPane.current).focus()
    }
  }

  handleSwitchPaneAlbums = (e) => {
    if (e.keyCode === 37) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(this.artistsPane.current).focus()
    } else if (
      e.keyCode === 39
      // eslint-disable-next-line react/no-find-dom-node
      && ReactDOM.findDOMNode(this.tracksPane.current)
    ) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(this.tracksPane.current).focus()
    }
  }

  handleSwitchPaneTracks = (e) => {
    if (e.keyCode === 37) {
      // eslint-disable-next-line react/no-find-dom-node
      ReactDOM.findDOMNode(this.albumsPane.current).focus()
    }
  }

  render() {
    return (
      <LibraryBrowserWrapper>
        <LibraryBrowserSearchBar ref={this.searchBar} />
        <LibraryBrowserListsWrapper>
          <ArtistsPaneContainer
            switchPaneHandler={this.handleSwitchPaneArtists}
            ref={this.artistsPane}
          />
          <AlbumsPaneContainer
            switchPaneHandler={this.handleSwitchPaneAlbums}
            ref={this.albumsPane}
          />
          <TracksPaneContainer
            switchPaneHandler={this.handleSwitchPaneTracks}
            ref={this.tracksPane}
          />
        </LibraryBrowserListsWrapper>
      </LibraryBrowserWrapper>
    )
  }
}
LibraryBrowser.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(LibraryBrowser)
