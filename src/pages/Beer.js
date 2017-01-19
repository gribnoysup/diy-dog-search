import React from 'react'
import axios from 'axios'

import Process from '../components/Process'
import BeerContent from '../components/BeerContent'

export default class Beer extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      isFetching: true,
      beer: {}
    }

    this.currentBeerId = null
  }

  getBeerId(path) {
    const result = path.match(/^\/beer\/(\d+|random)\/?$/)
    if (result && result[1]) return result[1]
    return null
  }

  fetchBeer(location = this.props.location) {
    const beerId = this.getBeerId(location.path)
    this.currentBeerId = beerId

    this.setState({isFetching: true})

    if (beerId) {
      return axios.get(`https://api.punkapi.com/v2/beers/${beerId}`)
    } else {
      return Promise.reject()
    }

  }

  setBeer(response) {
    if (Array.isArray(response.data)) {
      this.setState({beer: response.data[0], isFetching: false})
    }
  }

  componentWillReceiveProps(newProps) {
    const newBeerId = this.getBeerId(newProps.location.path)

    if (newBeerId !== this.currentBeerId || newBeerId === 'random') {
      this.fetchBeer(newProps.location).then((response) => this.setBeer(response))
    }
  }

  componentDidMount() {
    this.fetchBeer().then((response) => this.setBeer(response))
  }

  render() {
    const {beer, isFetching} = this.state
    return isFetching ? <Process /> : <BeerContent {...beer} />
  }
}
