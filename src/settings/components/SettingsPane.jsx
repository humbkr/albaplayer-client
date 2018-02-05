import React, { Component } from 'react';
import styled from 'styled-components';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import ActionButton from '../../common/ActionButton';
import { eraseLibrary, settingsInit, updateLibrary } from '../actions';
import Loading from '../../common/Loading';
import Message from '../../common/Message';


const SettingsScreenWrapper = styled.div`
  padding: 40px 30px;
  
  > h1 {
    margin-bottom: 30px;
  }
  
  > h2 {
    margin-bottom: 15px;
  }
  
  > p {
    margin-bottom: 10px;
  }
`;

const ActionButtons = styled.div`
  > * {
    margin: 3px 3px 3px 0;
  }
`;

const ActionWaiting = styled.div`
  color: ${props => props.theme.textSecondaryColor};
  font-style: italic;
  
  > * {
    display: inline-block;
    vertical-align: top;
    height: 30px;
    line-height: 30px;
    margin-right: 5px;
  }
`;

class SettingsPane extends Component {
  componentDidMount() {
    this.props.initSettings();
  }

  render() {
    const {
      artistsNumber,
      albumsNumber,
      tracksNumber,
      libraryIsUpdating,
      libraryError,
      scanLibrary,
      emptyLibrary,
    } = this.props;

    // Note: artistNumber - 1 because of the placeholder "Various artists".
    return (
      <SettingsScreenWrapper>
        <h1>Settings</h1>
        <h2>Library</h2>
        <p>
          There are currently {artistsNumber - 1} artists, {albumsNumber} albums
          and {tracksNumber} tracks in the library.
        </p>
        {!libraryIsUpdating &&
        <ActionButtons>
          <ActionButton raised onClick={scanLibrary}>Update library</ActionButton>
          <ActionButton onClick={() => {
            if (window.confirm('Are you sure you wish empty the library?')) emptyLibrary();
          }}>Empty library</ActionButton>
        </ActionButtons>
        }
        {libraryIsUpdating &&
        <ActionWaiting>
          <Loading />
          <p>Library is updating. This could take several minutes.</p>
        </ActionWaiting>
        }
        {libraryError &&
        <div>
          <Message type="error">{libraryError}</Message>
        </div>
        }
      </SettingsScreenWrapper>
    );
  }
}
SettingsPane.propTypes = {
  artistsNumber: PropTypes.number.isRequired,
  albumsNumber: PropTypes.number.isRequired,
  tracksNumber: PropTypes.number.isRequired,
  scanLibrary: PropTypes.func.isRequired,
  emptyLibrary: PropTypes.func.isRequired,
  initSettings: PropTypes.func.isRequired,
  libraryIsUpdating: PropTypes.bool.isRequired,
  libraryError: PropTypes.string.isRequired,
};

const mapStateToProps = state => (
  {
    artistsNumber: state.library.artists.length,
    albumsNumber: state.library.albums.length,
    tracksNumber: state.library.tracks.length,
    libraryIsUpdating: state.settings.library.isUpdating,
    libraryError: state.settings.library.error,
  }
);
const mapDispatchToProps = dispatch => (
  {
    initSettings: () => {
      dispatch(settingsInit());
    },
    scanLibrary: () => {
      dispatch(updateLibrary());
    },
    emptyLibrary: () => {
      dispatch(eraseLibrary());
    },
  }
);


export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(SettingsPane);
