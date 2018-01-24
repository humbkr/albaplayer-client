import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from "react-redux";
import { libraryBrowserSelectTrack } from "../actions";
import { menuProvider } from 'react-contexify';
import { formatDuration } from "../../utils";

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
  font-size: 0.8em;
`;

const TrackWrapper = styled.div`
  display: table;
  width: 100%;
  height: ${props => props.theme.itemHeight};
  ${props => props.selected ? 'background-color: ' + props.theme.highlight : ''};
  padding: 0 15px;
`;

class TrackTeaser extends Component {

  render() {
    const track = this.props.item;
    const selectedTracks = this.props.selectedTracks;
    const selected = (selectedTracks === track.id) ? {selected: true} : {};

    const onClick = this.props.onClick;

    return (
      <TrackWrapper onClick={() => onClick(track.id)} {...selected}>
        <TrackTeaserNumber>{track.number}</TrackTeaserNumber>
        <TrackTeaserName>{track.title}</TrackTeaserName>
        <TrackTeaserDuration>{formatDuration(track.duration)}</TrackTeaserDuration>
      </TrackWrapper>
    );
  }
}
TrackTeaser.propTypes = {
  item: PropTypes.object.isRequired,
  selectedTracks: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => {
  return {
    selectedTracks: state.libraryBrowser.selectedTracks
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onClick: trackId => {
      dispatch(libraryBrowserSelectTrack(trackId))
    }
  }
};

// Bind the context menu event.
const addContextMenu = menuProvider('track-context-menu');

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(addContextMenu(TrackTeaser))
