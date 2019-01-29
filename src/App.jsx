import React from 'react'
import { ApolloProvider } from 'react-apollo'
import { Provider as ReduxProvider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { ThemeProvider } from 'styled-components'
import apolloClient from './api/apollo'
import { store, persistor } from './store'
import themeDefault from './themes/default'
import AlbaApp from './AlbaApp'

const App = () => (
  <ThemeProvider theme={themeDefault}>
    <ReduxProvider store={store}>
      <PersistGate persistor={persistor}>
        <ApolloProvider client={apolloClient}>
          <Router>
            <AlbaApp />
          </Router>
        </ApolloProvider>
      </PersistGate>
    </ReduxProvider>
  </ThemeProvider>
)

export default App
