import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LibraryBrowserList from "./LibraryBrowserList"

const AlbumTeaserTitle = styled.h2`
  font-size: 1em;
  font-weight: normal;
  max-height: 18px;
  overflow: hidden;
`;

const AlbumSubInfo = styled.div`
  color: ${props => props.theme.textSecondaryColor};
  font-size: 0.8em;
  margin-top: 5px;
`;

const AlbumTeaserArtist = styled.span`
  font-style: italic;
`;

const AlbumTeaserWrapper = styled.div`
  padding-left: 15px;
  height: 36px;
`;

class AlbumTeaser extends Component {
  render() {
    const album = this.props.item;

    return (
      <AlbumTeaserWrapper>
        <AlbumTeaserTitle>{album.title}</AlbumTeaserTitle>
        <AlbumSubInfo>
          {album.year && <span>{album.year}</span>}
          {album.year && ' - '}
          <AlbumTeaserArtist>{album.artistName ? album.artistName : 'Unknown artist'}</AlbumTeaserArtist>
        </AlbumSubInfo>
      </AlbumTeaserWrapper>
    );
  }
}
AlbumTeaser.propTypes = {
  item: PropTypes.object.isRequired,
};

const AlbumsPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: scroll;
  overflow-y: hidden;
  width: 33%;
  height: 100%;
`;

class AlbumsPaneContainer extends Component {
  render() {
    const albums = this.props.albums;

    return (
      <AlbumsPane>
        <h2>Albums</h2>
        <LibraryBrowserList
          items={albums}
          itemDisplay={AlbumTeaser}
        />
      </AlbumsPane>
    );
  }
}
AlbumsPaneContainer.propTypes = {
  albums: PropTypes.array.isRequired
};

export default AlbumsPaneContainer;
