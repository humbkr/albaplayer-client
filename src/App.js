import React, { Component } from 'react';
import { ApolloProvider } from 'react-apollo';
import { injectGlobal, ThemeProvider } from 'styled-components';
import apolloClient from './graphql/apollo';
import { Provider } from 'react-redux';
import configureStore from './store';

import MaterialIconsEot from './assets/fonts/MaterialIcons-Regular.eot';
import MaterialIconsTtf from './assets/fonts/MaterialIcons-Regular.ttf';
import MaterialIconsWoff from './assets/fonts/MaterialIcons-Regular.woff';
import MaterialIconsWoff2 from './assets/fonts/MaterialIcons-Regular.woff2';
import MaterialIconsSvg from './assets/fonts/MaterialIcons-Regular.svg';
import themeDefault from './themes/light';
import LibraryBrowser from "./components/browser/LibraryBrowser";

// Global styles used by the styled components.
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
`;


const store = configureStore();

class App extends Component {
  render() {
    return (
      <ThemeProvider theme={themeDefault}>
        <Provider store={store}>
          <ApolloProvider client={apolloClient}>
            <LibraryBrowser />
          </ApolloProvider>
        </Provider>
      </ThemeProvider>
    );
  }
}

export default App;
