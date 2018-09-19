import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import LibraryBrowserList from './LibraryBrowserList';
import TrackTeaser from './TrackTeaser';
import LibraryBrowserListHeader from './LibraryBrowserListHeader';
import { libraryBrowserSortTracks } from '../actions';
import TrackContextMenu from './TrackContextMenu';
import LibraryBrowserPane from './LibraryBrowserPane';
import { getTracksList } from '../selectors';


const TracksPaneWrapper = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow: hidden;
  width: 34%;
  height: 100%;
`;

const NoTracks = styled.div`
  flex: 1 1 auto;
  display: flex;
  justify-content: center;
  flex-direction: column;
  text-align: center;
  font-style: italic;
  color: ${props => props.theme.textSecondaryColor};
`;

class TracksPaneContainer extends Component {
  // Change event handler for LibraryBrowserListHeader.
  onSortChangeHandler = (event) => {
    // Pass the new selected sort option to the dispatcher.
    this.props.onChange(event.target.value);
  };

  render() {
    const { tracks, orderBy, currentPosition } = this.props;
    const orderByOptions = [
      { value: 'title', label: 'title' },
      { value: 'number', label: 'track number' },
      { value: 'albumId', label: 'album' },
      { value: 'artistId', label: 'artist' },
    ];

    return (
      <TracksPaneWrapper>
        <LibraryBrowserPane>
          <LibraryBrowserListHeader
            title="Tracks"
            orderBy={orderBy}
            orderByOptions={orderByOptions}
            onChange={this.onSortChangeHandler}
          />
          { tracks.length > 1 &&
            <LibraryBrowserList
              items={tracks}
              itemDisplay={TrackTeaser}
              currentPosition={currentPosition}
            />
          }
          { tracks.length === 1 &&
            <NoTracks>Select an artist or album</NoTracks>
          }
          <TrackContextMenu />
        </LibraryBrowserPane>
      </TracksPaneWrapper>
    );
  }
}
TracksPaneContainer.propTypes = {
  tracks: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  orderBy: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  currentPosition: PropTypes.number.isRequired,
};

const mapStateToProps = state => (
  {
    tracks: getTracksList(state),
    orderBy: state.libraryBrowser.sortTracks,
    currentPosition: state.libraryBrowser.currentPositionTracks,
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
