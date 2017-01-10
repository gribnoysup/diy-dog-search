import React from 'react'
import {Link} from '../common/Link'

export function dispatchRouteChange(event, href, onClick = () => {}) {
  onClick(event)

  if (event.defaultPrevented) return
  if (event.preventDefault) event.preventDefault()

  const routeChangeEvent = new CustomEvent('routechange')
  routeChangeEvent.href = href

  window.dispatchEvent(routeChangeEvent)
}

export function NavLink({onClick, href, ...props}, {baseUrl}) {
  const realHref = baseUrl ? baseUrl + href : href

  return (
    <Link
      href={realHref}
      onClick={(event) => dispatchRouteChange(event, realHref, onClick)}
      {...props}
    />
  )
}

NavLink.contextTypes = {
  baseUrl: React.PropTypes.string
}

export class Match extends React.Component {
  componentDidMount() {
    const {route} = this.props
    const {registerRoute} = this.context

    registerRoute(route)
  }

  render() {
    const {route, children} = this.props
    const {location} = this.context

    return route.test(location.path) ?
      React.cloneElement(React.Children.only(children), {location}) : null
  }
}

Match.contextTypes = {
  location: React.PropTypes.object,
  registerRoute: React.PropTypes.func
}

export function Miss({children}, {location, isMatchesFound}) {
  return isMatchesFound() ? null :
    React.cloneElement(React.Children.only(children), {location})
}

Miss.contextTypes = {
  location: React.PropTypes.object,
  isMatchesFound: React.PropTypes.func
}

export class Router extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      path: window.location.pathname,
      query: window.location.search,
      registeredRoutes: []
    }

    this.handleRouteChange = this.handleRouteChange.bind(this)
    this.registerRoute = this.registerRoute.bind(this)
    this.isMatchesFound = this.isMatchesFound.bind(this)
  }

  handleRouteChange(event = {}) {
    const {baseUrl} = this.props

    if (event.type === 'routechange') {
      window.history.pushState({}, null, event.href)
    }

    this.setState((prevState) => {
      const {pathname, search} = window.location
      return {
        path: baseUrl ? pathname.replace(new RegExp('^' + baseUrl), '') : pathname,
        query: search
      }
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

  registerRoute(newRegExRoute) {
    this.setState((prevState) => {
      const newRoute = newRegExRoute.toString()
      if (
        prevState.registeredRoutes
          .every((regExRoute) => regExRoute.toString() !== newRoute)
      ) {
        const newRoutes = prevState.registeredRoutes.slice()
        newRoutes.push(newRegExRoute)
        prevState.registeredRoutes = newRoutes
      }

      return prevState
    })
  }

  isMatchesFound() {
    const {registeredRoutes, path} = this.state
    return registeredRoutes.some((route) => {
      return route.test(path)
    })
  }

  getChildContext() {
    return {
      location: {
        path: this.state.path,
        query: this.state.query
      },
      registerRoute: this.registerRoute,
      isMatchesFound: this.isMatchesFound,
      baseUrl: this.props.baseUrl
    }
  }

  static childContextTypes = {
    location: React.PropTypes.object,
    registerRoute: React.PropTypes.func,
    isMatchesFound: React.PropTypes.func,
    baseUrl: React.PropTypes.string
  }

  render() {
    return React.Children.only(this.props.children)
  }
}
