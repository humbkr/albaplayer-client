import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { connect } from "react-redux";
import { libraryBrowserSelectTrack } from "../actions";

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
  ${props => props.selected ? 'background-color: ' + props.theme.highlight : ''};
`;

class TrackTeaser extends Component {
  render() {
    const track = this.props.item;
    const onClick = this.props.onClick;
    const selectedTracks = this.props.selectedTracks;
    const selected = (selectedTracks === track.id) ? {selected: true} : {};

    return (
      <TrackWrapper onClick={() => onClick(track.id)} {...selected}>
        <TrackTeaserNumber>{track.number}</TrackTeaserNumber>
        <TrackTeaserName>{track.title}</TrackTeaserName>
        <TrackTeaserDuration>{track.duration}</TrackTeaserDuration>
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
    selectedTracks: state.libraryBrowser.current.selectedTracks
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onClick: trackId => {
      dispatch(libraryBrowserSelectTrack(trackId))
    }
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TrackTeaser)
