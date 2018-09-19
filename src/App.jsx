import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { injectGlobal, ThemeProvider } from 'styled-components'
import apolloClient from './backend/apollo'
import configureStore from './store'

import MaterialIconsEot from './assets/fonts/MaterialIcons-Regular.eot'
import MaterialIconsTtf from './assets/fonts/MaterialIcons-Regular.ttf'
import MaterialIconsWoff from './assets/fonts/MaterialIcons-Regular.woff'
import MaterialIconsWoff2 from './assets/fonts/MaterialIcons-Regular.woff2'
import MaterialIconsSvg from './assets/fonts/MaterialIcons-Regular.svg'
import themeDefault from './themes/default'
import AlbaApp from './AlbaApp'

// Global styles used by the styled components.
// eslint-disable-next-line no-unused-expressions
injectGlobal`
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
`

const store = configureStore()

const App = () => (
  <ThemeProvider theme={themeDefault}>
    <ReduxProvider store={store}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <AlbaApp />
        </Router>
      </ApolloProvider>
    </ReduxProvider>
  </ThemeProvider>
)

export default App
