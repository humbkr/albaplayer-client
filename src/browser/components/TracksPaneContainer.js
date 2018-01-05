import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LibraryBrowserList from './LibraryBrowserList'
import TrackTeaser from './TrackTeaser'
import { connect } from "react-redux";
import { immutableNestedSort } from "../utils";
import LibraryBrowserListHeader from "./LibraryBrowserListHeader";
import { libraryBrowserSortTracks } from "../actions";


const TracksPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: scroll;
  overflow-y: hidden;
  width: 34%;
  height: 100%;
  border-left: 3px solid ${props => props.theme.separatorColor};
`;

class TracksPaneContainer extends Component {
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
    const tracks = this.props.tracks;
    const orderBy = this.props.orderBy;
    const orderByOptions = [
      {value: 'title', label: 'title'},
      {value: 'number', label: 'track number'},
      {value: 'albumId', label: 'album'},
      {value: 'artistId', label: 'artist'},
      {value: 'duration', label: 'duration'},
    ];

    return (
      <TracksPane>
        <LibraryBrowserListHeader
          title={'Tracks'}
          orderBy={orderBy}
          orderByOptions={orderByOptions}
          onChange={this.onSortChangeHandler}
        />
        <LibraryBrowserList
          items={tracks}
          itemDisplay={TrackTeaser}
        />
      </TracksPane>
    );
  }
}
TracksPaneContainer.propTypes = {
  tracks: PropTypes.array.isRequired,
  orderBy: PropTypes.string.isRequired
};

const mapStateToProps = state => {
  return {
    tracks: immutableNestedSort(state.libraryBrowser.current.tracks, state.libraryBrowser.current.sortTracks),
    orderBy: state.libraryBrowser.current.sortTracks
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onChange: sortProperty => {
      dispatch(libraryBrowserSortTracks(sortProperty))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TracksPaneContainer);

