import React from 'react'

import Shell from './pages/Shell'
import AsyncComponent from './components/providers/AsyncComponent'

import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'

const AsyncSearch = (props) => (
  <AsyncComponent
    {...props}
    getComponent={(callback) => {
      require.ensure([], (require) => {
        callback(null, require('./pages/Search').default)
      }, 'search')
    }}
  />
)

const AsyncBeer = (props) => (
  <AsyncComponent
    {...props}
    getComponent={(callback) => {
      require.ensure([], (require) => {
        callback(null, require('./pages/Beer').default)
      }, 'beer')
    }}
  />
)

const AsyncOffline = (props) => (
  <AsyncComponent
    {...props}
    getComponent={(callback) => {
      require.ensure([], (require) => {
        callback(null, require('./pages/Offline').default)
      }, 'offline')
    }}
  />
)

const AsyncNotFound = (props) => (
  <AsyncComponent
    {...props}
    getComponent={(callback) => {
      require.ensure([], (require) => {
        callback(null, require('./pages/NotFound').default)
      }, 'not-found')
    }}
  />
)

const App = () => {
  return (
    <Router>
      <Shell>

        <Switch>
          <Route path="/" exact component={AsyncSearch}/>
          <Route path="/offline" component={AsyncOffline}/>
          <Route path="/beer/:id" component={AsyncBeer}/>
          {/* No match */}
          <Route component={AsyncNotFound}/>
        </Switch>

      </Shell>
    </Router>
  )
}

export default App
