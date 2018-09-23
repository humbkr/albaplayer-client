import styled, { createGlobalStyle } from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Sidebar from './common/Sidebar'
import MainPanel from './common/MainPanel'
import { initLibrary } from './actions'
import MaterialIconsEot from './assets/fonts/MaterialIcons-Regular.eot'
import MaterialIconsWoff2 from './assets/fonts/MaterialIcons-Regular.woff2'
import MaterialIconsWoff from './assets/fonts/MaterialIcons-Regular.woff'
import MaterialIconsTtf from './assets/fonts/MaterialIcons-Regular.ttf'
import MaterialIconsSvg from './assets/fonts/MaterialIcons-Regular.svg'

// Global styles used by the styled components.
const GlobalStyle = createGlobalStyle`
  @font-face {
  font-family: 'Material Icons';
  font-style: normal;
  font-weight: 400;
  src: url(${MaterialIconsEot}); /* For IE6-8 */
  src: local('Material Icons'),
       local('MaterialIcons-Regular'),
       url(${MaterialIconsWoff2}) format('woff2'),
       url(${MaterialIconsWoff}) format('woff'),
       url(${MaterialIconsTtf}) format('truetype');
       url(${MaterialIconsSvg}) format('svg');
`

const AlbaAppWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100vh;
`

class AlbaApp extends Component {
  componentDidMount() {
    const dispatch = this.props.dispatch
    dispatch(initLibrary())
  }

  render() {
    return (
      <AlbaAppWrapper>
        <GlobalStyle />
        <Sidebar />
        <MainPanel />
      </AlbaAppWrapper>
    )
  }
}
AlbaApp.propTypes = {
  dispatch: PropTypes.func.isRequired,
}

// Need to use withRouter here or the views in MainPanel won't change.
// https://github.com/ReactTraining/react-router/issues/4671
export default withRouter(connect()(AlbaApp))
