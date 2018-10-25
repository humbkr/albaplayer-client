import React from 'react'
import styled from 'styled-components'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LibraryBrowser from '../browser/components/LibraryBrowser'
import NowPlayingPane from '../now_playing/NowPlayingPane'
import LoadingScreen from './LoadingScreen'
import SettingsPane from '../settings/components/SettingsPane'

const MainPanelWrapper = styled.div`
  margin-left: ${props => props.theme.sidebar.width};
  height: 100vh;
`

const MainPanel = (props) => {
  const { isFetching, isInitialized } = props

  return (
    <div>
      {!isInitialized && (
        <MainPanelWrapper>
          <LoadingScreen />
        </MainPanelWrapper>
      )}
      {!isFetching
        && isInitialized && (
          <MainPanelWrapper>
            <Route exact path="/" component={LibraryBrowser} />
            <Route path="/queue" component={NowPlayingPane} />
            <Route path="/library" component={LibraryBrowser} />
            <Route path="/settings" component={SettingsPane} />
          </MainPanelWrapper>
      )}
    </div>
  )
}
MainPanel.propTypes = {
  isFetching: PropTypes.bool.isRequired,
  isInitialized: PropTypes.bool.isRequired,
}

function mapStateToProps(state) {
  const { isFetching, isInitialized } = state.library

  return {
    isFetching,
    isInitialized,
  }
}

// Need to use withRouter here or the views won't change.
export default withRouter(connect(mapStateToProps)(MainPanel))
