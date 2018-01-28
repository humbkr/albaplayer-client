import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { connect } from 'react-redux';
import { menuProvider } from 'react-contexify';
import { libraryBrowserSelectTrack } from '../actions';
import { formatDuration } from '../../utils';

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
  ${props => props.selected ? `background-color: ${props.theme.highlight}` : ''};
  padding: 0 15px;
`;

// Needs to be declared as a stateful component so menuProvider can work.
// eslint-disable-next-line react/prefer-stateless-function
class TrackTeaser extends Component {
  render() {
    const { item, selectedTracks, onClick } = this.props;
    const selected = (selectedTracks === item.id) ? { selected: true } : {};

    return (
      <TrackWrapper onClick={() => onClick(item.id)} {...selected}>
        <TrackTeaserNumber>{item.number}</TrackTeaserNumber>
        <TrackTeaserName>{item.title}</TrackTeaserName>
        <TrackTeaserDuration>{formatDuration(item.duration)}</TrackTeaserDuration>
      </TrackWrapper>
    );
  }
}
TrackTeaser.propTypes = {
  item: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    duration: PropTypes.number,
    number: PropTypes.number,
  }).isRequired,
  selectedTracks: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

const mapStateToProps = state => (
  {
    selectedTracks: state.libraryBrowser.selectedTracks,
  }
);
const mapDispatchToProps = dispatch => (
  {
    onClick: (trackId) => {
      dispatch(libraryBrowserSelectTrack(trackId));
    },
  }
);

// Bind the context menu event.
const addContextMenu = menuProvider('track-context-menu');

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(addContextMenu(TrackTeaser));
