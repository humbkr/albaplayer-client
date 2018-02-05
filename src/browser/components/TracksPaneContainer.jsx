import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LibraryBrowserList from './LibraryBrowserList';
import TrackTeaser from './TrackTeaser';
import { immutableNestedSort } from '../../utils';
import LibraryBrowserListHeader from './LibraryBrowserListHeader';
import { libraryBrowserSortTracks } from '../actions';
import TrackContextMenu from './TrackContextMenu';


const TracksPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: hidden;
  width: 34%;
  height: 100%;
`;

const NoTracksWrapper = styled.div`
  height: 100%;
  width: 100%;
  display: table;
  
  > div {
    display: table-cell;
    text-align: center;
    vertical-align: middle;
    
    > p {
      font-style: italic;
      color: ${props => props.theme.textSecondaryColor};
      // So the text appears verticaly centered.
      margin-bottom: 75px;
    }
  }
`;

const NoTracks = props => (
  <NoTracksWrapper>
    <div><p>{props.children}</p></div>
  </NoTracksWrapper>
);
NoTracks.propTypes = {
  children: PropTypes.element.isRequired,
};

class TracksPaneContainer extends Component {
  // Change event handler for LibraryBrowserListHeader.
  onSortChangeHandler = (event) => {
    // Pass the new selected sort option to the dispatcher.
    this.props.onChange(event.target.value);
  };

  render() {
    const { tracks, orderBy } = this.props;
    const orderByOptions = [
      { value: 'title', label: 'title' },
      { value: 'number', label: 'track number' },
      { value: 'albumId', label: 'album' },
      { value: 'artistId', label: 'artist' },
      { value: 'duration', label: 'duration' },
    ];

    return (
      <TracksPane>
        <LibraryBrowserListHeader
          title="Tracks"
          orderBy={orderBy}
          orderByOptions={orderByOptions}
          onChange={this.onSortChangeHandler}
        />
        { tracks.length > 0 &&
          <LibraryBrowserList
            items={tracks}
            itemDisplay={TrackTeaser}
          />
        }
        { tracks.length === 0 &&
          <NoTracks>Select an artist or album</NoTracks>
        }
        <TrackContextMenu />
      </TracksPane>
    );
  }
}
TracksPaneContainer.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  orderBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    tracks: immutableNestedSort(state.libraryBrowser.tracks, state.libraryBrowser.sortTracks),
    orderBy: state.libraryBrowser.sortTracks,
  }
);
const mapDispatchToProps = dispatch => (
  {
    onChange: (sortProperty) => {
      dispatch(libraryBrowserSortTracks(sortProperty));
    },
  }
);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(TracksPaneContainer);
