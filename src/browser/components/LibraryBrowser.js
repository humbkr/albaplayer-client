import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import ArtistsPaneContainer from "./ArtistsPaneContainer"
import AlbumsPaneContainer from "./AlbumsPaneContainer"
import TracksPaneContainer from "./TracksPaneContainer"

import { libraryBrowserGetLibrary } from "../actions"

const LibraryBrowserWrapper = styled.div`
  width: 100%;
  height: 100vh;
  
  > div {
    width: 100%;
    height: 100vh;
  }
`;

class LibraryBrowser extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(libraryBrowserGetLibrary());
  }

  render() {
    const { isFetching, isInitialized } = this.props;

    return (
      <LibraryBrowserWrapper>
        { isFetching && <h2>Loading...</h2> }
        { !isFetching && isInitialized &&
          <div>
            <ArtistsPaneContainer/>
            <AlbumsPaneContainer/>
            <TracksPaneContainer/>
          </div>
        }

      </LibraryBrowserWrapper>
    );
  }
}
LibraryBrowser.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state) {
  const { isFetching, isInitialized } = state.libraryBrowser.original;

  return {
    isFetching,
    isInitialized
  }
}

export default connect(mapStateToProps)(LibraryBrowser);
