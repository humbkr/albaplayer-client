import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LibraryBrowserList from './LibraryBrowserList'
import AlbumTeaser from './AlbumTeaser'
import { connect } from "react-redux";
import { immutableNestedSort } from "../utils";
import LibraryBrowserListHeader from "./LibraryBrowserListHeader";
import { libraryBrowserSortAlbums } from "../actions";

const AlbumsPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: scroll;
  overflow-y: hidden;
  width: 33%;
  height: 100%;
  border-left: 3px solid ${props => props.theme.separatorColor};
`;

class AlbumsPaneContainer extends Component {
  constructor(props) {
    super(props);

    this.onSortChangeHandler = this.onSortChangeHandler.bind(this)
  }

  // Change event handler for LibraryBrowserListHeader.
  onSortChangeHandler(event) {
    // Pass the new selected sort option to the dispatcher.
    this.props.onChange(event.target.value)
  }

  render() {
    const albums = this.props.albums;
    const orderBy = this.props.orderBy;
    const orderByOptions = [
      {value: 'title', label: 'title'},
      {value: 'year', label: 'year'},
      {value: 'artistName', label: 'artist'},
    ];

    return (
      <AlbumsPane>
        <LibraryBrowserListHeader
          title={'Albums'}
          orderBy={orderBy}
          orderByOptions={orderByOptions}
          onChange={this.onSortChangeHandler}
        />
        <LibraryBrowserList
          items={albums}
          itemDisplay={AlbumTeaser}
        />
      </AlbumsPane>
    );
  }
}
AlbumsPaneContainer.propTypes = {
  albums: PropTypes.array.isRequired,
  orderBy: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    albums: immutableNestedSort(state.libraryBrowser.current.albums, state.libraryBrowser.current.sortAlbums),
    orderBy: state.libraryBrowser.current.sortAlbums
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onChange: sortProperty => {
      dispatch(libraryBrowserSortAlbums(sortProperty))
    }
  }
};


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AlbumsPaneContainer);

