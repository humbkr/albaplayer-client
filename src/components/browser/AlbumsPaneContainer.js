import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LibraryBrowserList from "./LibraryBrowserList";

class BasicAlbumTeaser extends Component {
  render() {
    const album = this.props.item;

    return (
      <span>{album.title}</span>
    );
  }
}

const AlbumsPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: scroll;
  overflow-y: hidden;
  width: 33%;
  height: 100%;
  background-color: aquamarine;
`;

class AlbumsPaneContainer extends Component {
  render() {
    const albums = this.props.albums;

    return (
      <AlbumsPane>
        <h2>Albums</h2>
        <LibraryBrowserList
          items={albums}
          itemDisplay={BasicAlbumTeaser}
        />
      </AlbumsPane>
    );
  }
}
AlbumsPaneContainer.propTypes = {
  albums: PropTypes.array.isRequired
};

export default AlbumsPaneContainer;
