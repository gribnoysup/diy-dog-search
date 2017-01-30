import React from 'react'

import OfflineContent from '../components/offline/OfflineContent'
import {getBeerList} from '../util/db'

export default class Offline extends React.Component {
  state = {
    beerList: []
  }

  componentDidMount() {
    getBeerList().then((result) => {
      this.setState({beerList: result})
    })
  }

  render() {
    return <OfflineContent beerList={this.state.beerList}/>
  }
}
