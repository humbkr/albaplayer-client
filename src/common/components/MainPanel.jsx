import React from 'react'
import styled from 'styled-components'
import { Route, withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import LibraryBrowser from '../../modules/browser/scenes/LibraryBrowser'
import NowPlaying from '../../modules/now_playing/scenes/NowPlaying'
import LoadingScreen from './LoadingScreen'
import Settings from '../../modules/settings/scenes/Settings'
import Playlists from '../../modules/playlist/scenes/Playlists'

const MainPanelWrapper = styled.div`
  margin-left: ${(props) => props.theme.sidebar.width};
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
            <Route path="/library" component={LibraryBrowser} />
            <Route path="/queue" component={NowPlaying} />
            <Route path="/playlists" component={Playlists} />
            <Route path="/settings" component={Settings} />
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
