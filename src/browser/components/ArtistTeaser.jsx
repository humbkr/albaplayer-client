import styled from 'styled-components';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { menuProvider } from 'react-contexify';
import { libraryBrowserSelectArtist } from '../actions';


const ArtistTeaserName = styled.h2`
  display: table-cell;
  vertical-align: middle;
  font-size: 1em;
  font-weight: normal;
`;

const ArtistTeaserWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  ${props => props.selected ? `background-color: ${props.theme.highlight}` : ''};
  padding: 0 15px;
`;

// Needs to be declared as a stateful component so menuProvider can work.
// eslint-disable-next-line react/prefer-stateless-function
class ArtistTeaser extends Component {
  render() {
    const { item, onClick, selectedArtists } = this.props;
    const selected = (selectedArtists === item.id) ? { selected: true } : {};

    return (
      <ArtistTeaserWrapper onClick={() => onClick(item.id)} {...selected}>
        <ArtistTeaserName>{item.name}</ArtistTeaserName>
      </ArtistTeaserWrapper>
    );
  }
}
ArtistTeaser.propTypes = {
  item: PropTypes.objectOf(PropTypes.shape()).isRequired,
  selectedArtists: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    selectedArtists: state.libraryBrowser.selectedArtists,
  }
);
const mapDispatchToProps = dispatch => (
  {
    onClick: (artistId) => {
      dispatch(libraryBrowserSelectArtist(artistId));
    },
  }
);

// Bind the context menu event.
const addContextMenu = menuProvider('artist-context-menu');

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(addContextMenu(ArtistTeaser));
