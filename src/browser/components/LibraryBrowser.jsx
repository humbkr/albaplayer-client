import React, { Component } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ArtistsPaneContainer from './ArtistsPaneContainer';
import AlbumsPaneContainer from './AlbumsPaneContainer';
import TracksPaneContainer from './TracksPaneContainer';
import { libraryBrowserInit } from '../actions';


const LibraryBrowserWrapper = styled.div`
  width: 100%;
  height: 100vh;
`;

class LibraryBrowser extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch;
    dispatch(libraryBrowserInit());
  }

  render() {
    return (
      <LibraryBrowserWrapper>
        <ArtistsPaneContainer />
        <AlbumsPaneContainer />
        <TracksPaneContainer />
      </LibraryBrowserWrapper>
    );
  }
}
LibraryBrowser.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect()(LibraryBrowser);
