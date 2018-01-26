import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LibraryBrowserList from './LibraryBrowserList';
import AlbumTeaser from './AlbumTeaser';
import { immutableNestedSort } from '../../utils';
import LibraryBrowserListHeader from './LibraryBrowserListHeader';
import { libraryBrowserSortAlbums } from '../actions';
import AlbumContextMenu from './AlbumContextMenu';

const AlbumsPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: hidden;
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
    const { albums, orderBy } = this.props;
    const orderByOptions = [
      { value: 'title', label: 'title' },
      { value: 'year', label: 'year' },
      { value: 'artistName', label: 'artist' },
    ];

    return (
      <AlbumsPane>
        <LibraryBrowserListHeader
          title="Albums"
          orderBy={orderBy}
          orderByOptions={orderByOptions}
          onChange={this.onSortChangeHandler}
        />
        <LibraryBrowserList
          items={albums}
          itemDisplay={AlbumTeaser}
        />
        <AlbumContextMenu />
      </AlbumsPane>
    );
  }
}
AlbumsPaneContainer.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.shape({})),
  orderBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    albums: immutableNestedSort(state.libraryBrowser.albums, state.libraryBrowser.sortAlbums),
    orderBy: state.libraryBrowser.sortAlbums,
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
