import styled, { createGlobalStyle } from 'styled-components'
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import Sidebar from './common/components/Sidebar'
import MainPanel from './common/components/MainPanel'
import { operations } from './modules/library/duck'
import MaterialIconsEot from './common/assets/fonts/MaterialIcons-Regular.eot'
import MaterialIconsWoff2 from './common/assets/fonts/MaterialIcons-Regular.woff2'
import MaterialIconsWoff from './common/assets/fonts/MaterialIcons-Regular.woff'
import MaterialIconsTtf from './common/assets/fonts/MaterialIcons-Regular.ttf'
import MaterialIconsSvg from './common/assets/fonts/MaterialIcons-Regular.svg'

class AlbaApp extends Component {
  componentDidMount() {
    this.props.initLibrary()
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
  initLibrary: PropTypes.func.isRequired,
}

const mapDispatchToProps = (dispatch) => ({
  initLibrary: () => {
    dispatch(operations.initLibrary())
  },
})

// Need to use withRouter here or the views in MainPanel won't change.
// https://github.com/ReactTraining/react-router/issues/4671
export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(AlbaApp)
)

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
  }
  
  * {
    box-sizing: border-box;
    padding: 0;
    margin: 0;
  }
  
  *:focus {
    outline: none;
  }
  
  body {
    font-family: sans-serif;
    overflow-x: hidden;
  }
`

const AlbaAppWrapper = styled.div`
  display: table;
  width: 100%;
  height: 100vh;
  color: ${(props) => props.theme.textPrimaryColor};
`
