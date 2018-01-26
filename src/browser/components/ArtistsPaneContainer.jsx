import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import LibraryBrowserList from './LibraryBrowserList';
import ArtistTeaser from './ArtistTeaser';
import { immutableNestedSort } from '../../utils';
import LibraryBrowserListHeader from './LibraryBrowserListHeader';
import { libraryBrowserSortArtists } from '../actions';
import ArtistContextMenu from './ArtistContextMenu';


const ArtistsPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: hidden;
  width: 33%;
  height: 100%;
`;

class ArtistsPaneContainer extends Component {
  // Change event handler for LibraryBrowserListHeader.
  onSortChangeHandler = (event) => {
    // Pass the new selected sort option to the dispatcher.
    this.props.onChange(event.target.value);
  };

  render() {
    const { artists, orderBy } = this.props;
    const orderByOptions = [
      { value: 'name', label: 'name' },
      { value: 'id', label: 'id' },
    ];

    return (
      <ArtistsPane>
        <LibraryBrowserListHeader
          title={'Artists'}
          orderBy={orderBy}
          orderByOptions={orderByOptions}
          onChange={this.onSortChangeHandler}
        />
        <LibraryBrowserList
          items={artists}
          itemDisplay={ArtistTeaser}
        />
        <ArtistContextMenu/>
      </ArtistsPane>
    );
  }
}
ArtistsPaneContainer.propTypes = {
  artists: PropTypes.array.isRequired,
  orderBy: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    artists: immutableNestedSort(state.libraryBrowser.artists, state.libraryBrowser.sortArtists),
    orderBy: state.libraryBrowser.sortArtists
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onChange: sortProperty => {
      dispatch(libraryBrowserSortArtists(sortProperty))
    }
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ArtistsPaneContainer);
