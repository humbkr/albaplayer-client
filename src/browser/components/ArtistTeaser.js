import styled from "styled-components";
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { libraryBrowserSelectArtist } from "../actions"
import { menuProvider } from "react-contexify";

const ArtistTeaserName = styled.h2`
  display: table-cell;
  vertical-align: middle;
  font-size: 1em;
  font-weight: normal;
`;

const ArtistTeaserWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
  height: ${props => props.theme.itemHeight};
  ${props => props.selected ? 'background-color: ' + props.theme.highlight : ''};
  padding: 0 15px;
`;

class ArtistTeaser extends Component {
  render() {
    const artist = this.props.item;
    const onClick = this.props.onClick;
    const selectedArtists = this.props.selectedArtists;
    const selected = (selectedArtists === artist.id) ? {selected: true} : {};

    return (
      <ArtistTeaserWrapper onClick={() => onClick(artist.id)} {...selected}>
        <ArtistTeaserName>{artist.name}</ArtistTeaserName>
      </ArtistTeaserWrapper>
    );
  }
}
ArtistTeaser.propTypes = {
  item: PropTypes.object.isRequired,
  selectedArtists: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    selectedArtists: state.libraryBrowser.selectedArtists
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onClick: artistId => {
      dispatch(libraryBrowserSelectArtist(artistId))
    }
  }
};

// Bind the context menu event.
const addContextMenu = menuProvider('artist-context-menu');

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addContextMenu(ArtistTeaser))
