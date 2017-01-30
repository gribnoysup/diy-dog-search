import React from 'react'

import {Router, Match, Miss, dispatchRouteChange} from './components/providers/Router'
import {Header} from './components/layout/Layout'

import {IconButton} from './components/common/IconButton'

import Shell from './pages/Shell'
import NotFound from './pages/NotFound'
import AsyncComponent from './components/providers/AsyncComponent'

function BeerRoute({children}) {
  return <Match route={/^\/beer\/(\d+|random)\/?$/}>{children}</Match>
}

function SearchRoute({children}) {
  return <Match route={/^\/$/}>{children}</Match>
}

function OfflineRoute({children}) {
  return <Match route={/^\/offline$/}>{children}</Match>
}

function HeaderWithBackButton({location}) {
  // TODO: need to be fixed for proper offline support
  const route = location.prevState.path || '/'

  return (
    <Header sticky>
      <IconButton
        invert
        icon="back"
        onClick={() => dispatchRouteChange({}, route)}
      >
        Back
      </IconButton>
      <IconButton
        invert
        icon="dice"
        onClick={() => dispatchRouteChange({}, '/beer/random/')}
      >
        Random
      </IconButton>
    </Header>
  )
}

const App = () => {
  return (
    <Router baseUrl={process.env.REACT_APP_BASE_URL}>
      <Shell>

        <BeerRoute>
          <HeaderWithBackButton />
        </BeerRoute>

        <Miss>
          <HeaderWithBackButton />
        </Miss>

        <SearchRoute>
          <AsyncComponent
            getComponent={(callback) => {
              require.ensure([], (require) => {
                callback(null, require('./pages/Search').default)
              }, 'search')
            }}
          />
        </SearchRoute>

        <BeerRoute>
          <AsyncComponent
            getComponent={(callback) => {
              require.ensure([], (require) => {
                callback(null, require('./pages/Beer').default)
              }, 'beer')
            }}
          />
        </BeerRoute>

        <OfflineRoute>
          <AsyncComponent
            getComponent={(callback) => {
              require.ensure([], (require) => {
                callback(null, require('./pages/Offline').default)
              }, 'beer')
            }}
          />
        </OfflineRoute>

        <Miss>
          <NotFound />
        </Miss>

      </Shell>
    </Router>
  )
}

export default App
