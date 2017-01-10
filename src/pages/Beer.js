import React from 'react'
import axios from 'axios'

import Process from '../components/Process'
import BeerContent from '../components/BeerContent'
import {Content} from '../components/layout/Layout'

export default class BeerDescription extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      isFetching: true,
      beer: {}
    }
  }

  getBeerId(path) {
    const result = path.match(/^\/beer\/(\d+|random)\/?$/)
    if (result && result[1]) return result[1]
    return null
  }

  fetchBeer() {
    const {location} = this.props
    const beerId = this.getBeerId(location.path)

    if (beerId) {
      return axios.get(`https://api.punkapi.com/v2/beers/${beerId}`)
    } else {
      return Promise.reject()
    }

  }

  componentDidMount() {
    this.fetchBeer().then((response) => {
      if (Array.isArray(response.data)) {
        this.setState({beer: response.data[0], isFetching: false})
      }
    })
  }

  render() {
    const {beer, isFetching} = this.state
    return (
      <Content>
        {isFetching ? <Process /> : <BeerContent {...beer} />}
      </Content>
    )
  }
}
