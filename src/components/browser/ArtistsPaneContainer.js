import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LibraryBrowserList from "./LibraryBrowserList";

class BasicArtistTeaser extends Component {
  render() {
    const artist = this.props.item;

    return (
      <span>{artist.name}</span>
    );
  }
}

const ArtistsPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: scroll;
  overflow-y: hidden;
  width: 33%;
  height: 100%;
  background-color: aqua;
`;

class ArtistsPaneContainer extends Component {
  render() {
    const artists = this.props.artists;

    return (
      <ArtistsPane>
        <h2>Artists</h2>
        <LibraryBrowserList
          items={artists}
          itemDisplay={BasicArtistTeaser}
        />
      </ArtistsPane>
    );
  }
}
ArtistsPaneContainer.propTypes = {
  artists: PropTypes.array.isRequired
};

export default ArtistsPaneContainer;
