import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ActionButton from '../../../common/components/ActionButton'
import { operations } from '../duck'
import Loading from '../../../common/components/Loading'
import Message from '../../../common/components/Message'

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
`

const ActionButtons = styled.div`
  > * {
    margin: 3px 3px 3px 0;
  }
`

const ActionWaiting = styled.div`
  color: ${(props) => props.theme.textSecondaryColor};
  font-style: italic;

  > * {
    display: inline-block;
    vertical-align: top;
    height: 30px;
    line-height: 30px;
    margin-right: 5px;
  }
`

class Settings extends Component {
  componentDidMount() {
    this.props.initSettings()
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
      librarySettings,
    } = this.props

    return (
      <SettingsScreenWrapper>
        <h1>Settings</h1>
        <h2>Library</h2>
        <p>
          There are currently {artistsNumber} artists, {albumsNumber} albums and{' '}
          {tracksNumber} tracks in the library.
        </p>
        {!libraryIsUpdating && (
          <ActionButtons>
            <ActionButton
              raised
              disabled={librarySettings.disableLibrarySettings}
              onClick={scanLibrary}
            >
              Update library
            </ActionButton>
            <ActionButton
              disabled={librarySettings.disableLibrarySettings}
              onClick={() => {
                if (
                  window.confirm('Are you sure you wish to empty the library?')
                ) {
                  emptyLibrary()
                }
              }}
            >
              Empty library
            </ActionButton>
          </ActionButtons>
        )}
        {libraryIsUpdating && (
          <ActionWaiting>
            <Loading />
            <p>Library is updating. This could take several minutes.</p>
          </ActionWaiting>
        )}
        {libraryError && (
          <div>
            <Message type="error">{libraryError}</Message>
          </div>
        )}
      </SettingsScreenWrapper>
    )
  }
}
Settings.propTypes = {
  artistsNumber: PropTypes.number.isRequired,
  albumsNumber: PropTypes.number.isRequired,
  tracksNumber: PropTypes.number.isRequired,
  scanLibrary: PropTypes.func.isRequired,
  emptyLibrary: PropTypes.func.isRequired,
  initSettings: PropTypes.func.isRequired,
  libraryIsUpdating: PropTypes.bool.isRequired,
  libraryError: PropTypes.string.isRequired,
  librarySettings: PropTypes.shape().isRequired,
}

const mapStateToProps = (state) => ({
  artistsNumber: Object.keys(state.library.artists).length,
  albumsNumber: Object.keys(state.library.albums).length,
  tracksNumber: Object.keys(state.library.tracks).length,
  libraryIsUpdating: state.settings.library.isUpdating,
  libraryError: state.settings.library.error,
  librarySettings: state.settings.library.config,
})
const mapDispatchToProps = (dispatch) => ({
  initSettings: () => {
    dispatch(operations.initSettings())
  },
  scanLibrary: () => {
    dispatch(operations.updateLibrary())
  },
  emptyLibrary: () => {
    dispatch(operations.eraseLibrary())
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)
