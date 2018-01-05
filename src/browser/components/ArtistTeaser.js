import styled from "styled-components";
import React, { Component } from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { libraryBrowserSelectArtist } from "../actions"

const ArtistTeaserName = styled.h2`
  display: table-cell;
  vertical-align: middle;
  padding-left: 15px;
  font-size: 1em;
  font-weight: normal;
`;

const ArtistTeaserWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
  ${props => props.selected ? 'background-color: ' + props.theme.highlight : ''};
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
    selectedArtists: state.libraryBrowser.current.selectedArtists
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onClick: artistId => {
      dispatch(libraryBrowserSelectArtist(artistId))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistTeaser)
