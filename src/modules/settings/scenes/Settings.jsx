import React, { Component } from 'react'
import styled from 'styled-components'
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import ActionButton from '../../../common/components/ActionButton'
import { operations, actions } from '../duck'
import Loading from '../../../common/components/Loading'
import Message from '../../../common/components/Message'
import info from '../../../../package.json'
import SelectList from '../components/SelectList'
import themes from '../../../themes'

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
      theme,
      onThemeChange,
    } = this.props

    const themeOptions = Object.entries(themes).map((item) => ({
      value: item[0],
      label: item[1].name,
    }))

    return (
      <SettingsScreenWrapper>
        <h1>Settings</h1>
        <Paragraph>
          <h2>Library</h2>
          <p>
            There are currently {artistsNumber} artists, {albumsNumber} albums
            and {tracksNumber} tracks in the library.
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
                    window.confirm(
                      'Are you sure you wish to empty the library?'
                    )
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
        </Paragraph>
        <Paragraph>
          <h2>Theme</h2>
          <SelectList
            options={themeOptions}
            value={theme}
            onChangeHandler={(event) => onThemeChange(event.target.value)}
          />
        </Paragraph>
        <VersionNumber>version {info.version}</VersionNumber>
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
  theme: PropTypes.string.isRequired,
  onThemeChange: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  artistsNumber: Object.keys(state.library.artists).length,
  albumsNumber: Object.keys(state.library.albums).length,
  tracksNumber: Object.keys(state.library.tracks).length,
  libraryIsUpdating: state.settings.library.isUpdating,
  libraryError: state.settings.library.error,
  librarySettings: state.settings.library.config,
  theme: state.settings.theme,
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
  onThemeChange: (theme) => {
    dispatch(actions.setTheme(theme))
  },
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Settings)

const SettingsScreenWrapper = styled.div`
  padding: 40px 30px;

  > h1 {
    margin-bottom: 30px;
  }
`

const Paragraph = styled.div`
  margin-top: 30px;

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

const VersionNumber = styled.div`
  color: ${(props) => props.theme.textSecondaryColor};
  font-style: italic;
  font-size: 0.8em;
  margin-top: 30px;
`
