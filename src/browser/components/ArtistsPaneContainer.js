import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LibraryBrowserList from "./LibraryBrowserList"

const ArtistTeaserName = styled.h2`
  padding-left: 15px;
  font-size: 1em;
  font-weight: normal;
`;

class ArtistTeaser extends Component {
  render() {
    const artist = this.props.item;

    return (
      <ArtistTeaserName>{artist.name}</ArtistTeaserName>
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
`;

class ArtistsPaneContainer extends Component {
  render() {
    const artists = this.props.artists;

    return (
      <ArtistsPane>
        <h2>Artists</h2>
        <LibraryBrowserList
          items={artists}
          itemDisplay={ArtistTeaser}
        />
      </ArtistsPane>
    );
  }
}
ArtistsPaneContainer.propTypes = {
  artists: PropTypes.array.isRequired
};

export default ArtistsPaneContainer;
