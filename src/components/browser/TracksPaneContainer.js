import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import LibraryBrowserList from "./LibraryBrowserList";

class BasicTrackTeaser extends Component {
  render() {
    const track = this.props.item;

    return (
      <span>{track.title}</span>
    );
  }
}

const TracksPane = styled.div`
  display: inline-block;
  vertical-align: top;
  overflow-y: scroll;
  overflow-y: hidden;
  width: 34%;
  height: 100%;
  background-color: cadetblue;
`;

class TracksPaneContainer extends Component {
  render() {
    const tracks = this.props.tracks;

    return (
      <TracksPane>
        <h2>Tracks</h2>
        <LibraryBrowserList
          items={tracks}
          itemDisplay={BasicTrackTeaser}
        />
      </TracksPane>
    );
  }
}
TracksPaneContainer.propTypes = {
  tracks: PropTypes.array.isRequired
};

export default TracksPaneContainer;
