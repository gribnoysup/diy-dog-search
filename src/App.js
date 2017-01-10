import React from 'react'

import {Router, Match, Miss} from './components/providers/Router'
import {HeaderWithBackButton} from './components/HeaderWithBackButton'

import Shell from './pages/Shell'
import Beer from './pages/Beer'
import Search from './pages/Search'
import NotFound from './pages/NotFound'

function BeerRoute({children}) {
  return <Match route={/^\/beer\/(\d+|random)\/?$/}>{children}</Match>
}

function SearchRoute({children}) {
  return <Match route={/^\/$/}>{children}</Match>
}

const App = () => {
  return (
    <Router baseUrl={process.env.REACT_APP_BASE_URL}>
      <Shell>
        <SearchRoute>
          <Search />
        </SearchRoute>

        <BeerRoute>
          <HeaderWithBackButton />
        </BeerRoute>

        <Miss>
          <HeaderWithBackButton />
        </Miss>

        <BeerRoute>
          <Beer />
        </BeerRoute>

        <Miss>
          <NotFound />
        </Miss>

      </Shell>
    </Router>
  )
}

export default App
