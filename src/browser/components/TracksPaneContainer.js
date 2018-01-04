import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import LibraryBrowserList from "./LibraryBrowserList"

const TrackTeaserNumber = styled.div`
  display: table-cell;
  width: 40px;
  text-align: center;
  vertical-align: middle;
  font-size: 0.8em;
`;

const TrackTeaserName = styled.h2`
  display: table-cell;
  font-size: 1em;
  font-weight: normal;
  vertical-align: middle;
`;

const TrackTeaserDuration = styled.div`
  display: table-cell;
  width: 40px;
  text-align: center;
  color: ${props => props.theme.textSecondaryColor};
  vertical-align: middle;
`;

const TrackWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100%;
`;

class TrackTeaser extends Component {
  render() {
    const track = this.props.item;

    return (
      <TrackWrapper>
        <TrackTeaserNumber>{track.number}</TrackTeaserNumber>
        <TrackTeaserName>{track.title}</TrackTeaserName>
        <TrackTeaserDuration>{track.duration}</TrackTeaserDuration>
      </TrackWrapper>
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
`;

class TracksPaneContainer extends Component {
  render() {
    const tracks = this.props.tracks;

    return (
      <TracksPane>
        <h2>Tracks</h2>
        <LibraryBrowserList
          items={tracks}
          itemDisplay={TrackTeaser}
        />
      </TracksPane>
    );
  }
}
TracksPaneContainer.propTypes = {
  tracks: PropTypes.array.isRequired
};

export default TracksPaneContainer;
