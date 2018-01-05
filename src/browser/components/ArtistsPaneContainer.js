import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'
import LibraryBrowserList from "./LibraryBrowserList"
import ArtistTeaser from "./ArtistTeaser"
import { immutableNestedSort } from "../utils";
import LibraryBrowserListHeader from "./LibraryBrowserListHeader";
import { libraryBrowserSortArtists } from "../actions";


const ArtistsPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: scroll;
  overflow-y: hidden;
  width: 33%;
  height: 100%;
`;

class ArtistsPaneContainer extends Component {
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
    const artists = this.props.artists;
    const orderBy = this.props.orderBy;
    const orderByOptions = [
      {value: 'name', label: 'name'},
      {value: 'id', label: 'id'},
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
    artists: immutableNestedSort(state.libraryBrowser.current.artists, state.libraryBrowser.current.sortArtists),
    orderBy: state.libraryBrowser.current.sortArtists
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
