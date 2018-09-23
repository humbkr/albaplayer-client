import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { ThemeProvider } from 'styled-components'
import apolloClient from './backend/apollo'
import configureStore from './store'
import themeDefault from './themes/default'
import AlbaApp from './AlbaApp'

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
