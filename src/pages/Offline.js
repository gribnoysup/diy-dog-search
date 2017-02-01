import React from 'react'

import OfflineContent from '../components/offline/OfflineContent'
import {getBeerList} from '../util/db'

export default class Offline extends React.Component {
  constructor(...args) {
    super(...args)
    this.onBeerClick = this.handleBeerClick.bind(this)
  }

  state = {
    beerList: []
  }

  componentDidMount() {
    getBeerList().then((result) => {
      this.setState({beerList: result})
    })
  }

  handleBeerClick(id) {
    this.props.push(`/beer/${id}/`)
  }

  render() {
    return (
      <OfflineContent
        beerList={this.state.beerList}
        onBeerClick={this.onBeerClick}
      />
    )
  }
}
