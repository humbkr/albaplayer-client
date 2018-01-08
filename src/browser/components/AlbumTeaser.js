import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from "react-redux";
import { libraryBrowserSelectAlbum } from "../actions";
import { menuProvider } from "react-contexify";

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
  display: table;
  width: 100%;
  height: 100%;
  padding-left: 15px;
  height: ${props => props.theme.itemHeight};
  ${props => props.selected ? 'background-color: ' + props.theme.highlight : ''};
  
  > div {
    display: table-cell;
    vertical-align: middle;
  }
`;

class AlbumTeaser extends Component {
  render() {
    const album = this.props.item;
    const onClick = this.props.onClick;
    const selectedAlbums = this.props.selectedAlbums;
    const selected = (selectedAlbums === album.id) ? {selected: true} : {};

    return (
      <AlbumTeaserWrapper onClick={() => onClick(album.id)} {...selected}>
        <div>
          <AlbumTeaserTitle>{album.title}</AlbumTeaserTitle>
          <AlbumSubInfo>
            {album.year && <span>{album.year}</span>}
            {album.year && ' - '}
            <AlbumTeaserArtist>{album.artistName ? album.artistName : 'Unknown artist'}</AlbumTeaserArtist>
          </AlbumSubInfo>
        </div>
      </AlbumTeaserWrapper>
    );
  }
}
AlbumTeaser.propTypes = {
  item: PropTypes.object.isRequired,
  selectedAlbums: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    selectedAlbums: state.libraryBrowser.selectedAlbums
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onClick: albumId => {
      dispatch(libraryBrowserSelectAlbum(albumId))
    }
  }
};

// Bind the context menu event.
const addContextMenu = menuProvider('album-context-menu');

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addContextMenu(AlbumTeaser))
