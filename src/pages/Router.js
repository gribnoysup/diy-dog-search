import React from 'react'

import Beer from './Beer'
import Search from './Search'
import NotFound from './NotFound'

const ROUTES = {
  Search: {
    regex: /^\/$/,
    component: Search
  },
  Beer: {
    regex: /^\/beer\/\d+$/,
    component: Beer
  }
}

export function dispatchRouteChange(event, href, onClick = () => {}) {
  onClick(event)
  
  if (event.defaultPrevented) return
  if (event.preventDefault) event.preventDefault()

  const routeChangeEvent = new CustomEvent('routechange')
  routeChangeEvent.href = href

  window.dispatchEvent(routeChangeEvent)
}

export function Link({onClick, href, ...props}) {
  return (
    <a
      href={href}
      onClick={(event) => dispatchRouteChange(event, href, onClick)}
      {...props}
    />
  )
}

export class Router extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      path: window.location.pathname,
      query: window.location.search,
      component: null
    }

    this.handleRouteChange = this.handleRouteChange.bind(this)
  }

  handleRouteChange(event = {}) {
    if (event.type === 'routechange') {
      window.history.pushState({}, null, event.href)
    }

    this.setState((prevState) => {
      const {pathname: path, search: query} = window.location
      let component = NotFound

      Object.keys(ROUTES).forEach((key) => {
        if (ROUTES[key].regex.test(path)) {
          component = ROUTES[key].component
        }
      })

      return { path, query, component }
    })
  }

  componentDidMount() {
    window.addEventListener('routechange', this.handleRouteChange)
    window.addEventListener('popstate', this.handleRouteChange)

    this.handleRouteChange()
  }

  componentWillUnmount() {
    window.removeEventListener('routechange', this.handleRouteChange)
    window.removeEventListener('popstate', this.handleRouteChange)
  }

  render() {
    const {component: Component, path, query} = this.state

    return Component && <Component location={{path, query}} />
  }
}
