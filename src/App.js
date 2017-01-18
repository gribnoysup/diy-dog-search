import React from 'react'

import {Router, Match, Miss} from './components/providers/Router'
import {BackButton} from './components/common/BackButton'
import {Header} from './components/layout/Layout'

import Shell from './pages/Shell'
import NotFound from './pages/NotFound'
import AsyncComponent from './components/providers/AsyncComponent'

function BeerRoute({children}) {
  return <Match route={/^\/beer\/(\d+|random)\/?$/}>{children}</Match>
}

function SearchRoute({children}) {
  return <Match route={/^\/$/}>{children}</Match>
}

function HeaderWithBackButton() {
  return (
    <Header sticky>
      <BackButton href="/">
        <span>Back</span>
      </BackButton>
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

        <Miss>
          <NotFound />
        </Miss>

      </Shell>
    </Router>
  )
}

export default App
