import React, { Component } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

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
  height: ${props => props.theme.itemHeight};
  ${props => props.selected ? 'background-color: ' + props.theme.highlight : ''};
`;

class QueueTrackTeaser extends Component {

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
QueueTrackTeaser.propTypes = {
  item: PropTypes.object.isRequired
};

export default QueueTrackTeaser
