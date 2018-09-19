import React, { Component } from 'react'
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

class LibraryBrowser extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch
    dispatch(libraryBrowserInit())
  }

  render() {
    return (
      <LibraryBrowserWrapper>
        <LibraryBrowserSearchBar />
        <LibraryBrowserListsWrapper>
          <ArtistsPaneContainer />
          <AlbumsPaneContainer />
          <TracksPaneContainer />
        </LibraryBrowserListsWrapper>
      </LibraryBrowserWrapper>
    )
  }
}
LibraryBrowser.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

export default connect()(LibraryBrowser)
