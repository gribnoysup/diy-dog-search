import React from 'react'
import {connect} from 'react-redux'

import OfflineContent from '../components/offline/OfflineContent'

import {getBeerList} from '../util/db'
import {setSelectedBeer} from '../store/actions'

class Offline extends React.Component {
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
    const {onBeerClick, push} = this.props

    onBeerClick(id)
    push(`/beer/${id}/`)
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

export default connect(
  (state) => ({}),
  (dispatch) => ({
    onBeerClick: (id) => dispatch(setSelectedBeer(id))
  })
)(Offline)
