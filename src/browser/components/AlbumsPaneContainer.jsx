import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LibraryBrowserList from './LibraryBrowserList';
import AlbumTeaser from './AlbumTeaser';
import LibraryBrowserListHeader from './LibraryBrowserListHeader';
import LibraryBrowserPane from './LibraryBrowserPane';
import { libraryBrowserSortAlbums } from '../actions';
import AlbumContextMenu from './AlbumContextMenu';
import { getAlbumsList } from '../selectors';

const AlbumsPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 33%;
  height: 100%;
  border-left: 1px solid ${props => props.theme.separatorColor};
  border-right: 1px solid ${props => props.theme.separatorColor};
`;

class AlbumsPaneContainer extends Component {
  // Change event handler for LibraryBrowserListHeader.
  onSortChangeHandler = (event) => {
    // Pass the new selected sort option to the dispatcher.
    this.props.onChange(event.target.value);
  };

  render() {
    const { albums, orderBy, currentPosition } = this.props;
    const orderByOptions = [
      { value: 'title', label: 'title' },
      { value: 'year', label: 'year' },
      { value: 'artistName', label: 'artist' },
    ];

    return (
      <AlbumsPaneWrapper>
        <LibraryBrowserPane>
          <LibraryBrowserListHeader
            title="Albums"
            orderBy={orderBy}
            orderByOptions={orderByOptions}
            onChange={this.onSortChangeHandler}
          />
          <LibraryBrowserList
            items={albums}
            itemDisplay={AlbumTeaser}
            currentPosition={currentPosition}
          />
          <AlbumContextMenu />
        </LibraryBrowserPane>
      </AlbumsPaneWrapper>
    );
  }
}
AlbumsPaneContainer.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
  orderBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currentPosition: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    albums: getAlbumsList(state),
    orderBy: state.libraryBrowser.sortAlbums,
    currentPosition: state.libraryBrowser.currentPositionAlbums,
  }
);
const mapDispatchToProps = dispatch => (
  {
    onChange: (sortProperty) => {
      dispatch(libraryBrowserSortAlbums(sortProperty));
    },
  }
);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(AlbumsPaneContainer);
