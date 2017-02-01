import React from 'react'
import {connect} from 'react-redux'
import styled from 'styled-components'

import {addBeerToList, setSelectedBeer} from '../store/actions'
import {fetchBeerById} from '../util/fetch'

import Process from '../components/Process'
import {Content} from '../components/layout/Layout'
import {Grid, Unit as AUnit} from '../components/layout/Grid'

import {HeaderBeer} from '../components/beer/Header'
import {Title, Subtitle} from '../components/beer/Title'
import {Description} from '../components/beer/Description'
import {Basics} from '../components/beer/Basics'
import {Method} from '../components/beer/Method'
import {Ingredients} from '../components/beer/Ingredients'
import {Pairings} from '../components/beer/Pairings'
import {Tips} from '../components/beer/Tips'
import {Acknowledgments} from '../components/beer/Acknowledgments'
import {ShareBeer} from '../components/beer/ShareBeer'


const Unit = styled(AUnit)`
  @media screen and (min-width: 48em) {
    &:first-child {
      padding-right: 12px;
    }

    &:last-child {
      padding-left: 12px;
    }
  }
`

const getSelectedBeer = (state) => {
  return state.beerList
    .find((beer) => beer.id === state.selectedBeer)
}

class Beer extends React.Component {

  state = {
    isFetching: false
  }

  fetchBeer(id) {
    const {onBeerFetched} = this.props
    this.setState({isFetching: true})

    fetchBeerById(id)
      .then((newBeer) => onBeerFetched(newBeer))
      .then(() => this.setState({isFetching: false}))
  }

  componentDidMount() {
    const {match, selectedBeer} = this.props

    if (match.params.id === 'random' || !selectedBeer) {
      this.fetchBeer(match.params.id)
    }
  }

  render() {
    const {isFetching} = this.state
    const {selectedBeer, goBack} = this.props

    return (
      <Content>
        <HeaderBeer
          onBackClick={() => goBack()}
          onRndClick={() => this.fetchBeer('random')}
        />

        {(isFetching || !selectedBeer) ? <Process /> : [

          <Title key="title">{selectedBeer.name}</Title>,
          <Subtitle key="subtitle">{selectedBeer.tagline}</Subtitle>,

          <Description key="description" description={selectedBeer.description}/>,

          <Grid key="basics-method">

            <Unit md={1/2}>
              <Basics beer={selectedBeer}/>
            </Unit>

            <Unit md={1/2}>
              <Method method={selectedBeer.method}/>
            </Unit>

          </Grid>,

          <Ingredients key="ingredients" ingredients={selectedBeer.ingredients}/>,

          <Grid key="pairings-tips">

            <Unit md={1/2}>
              <Pairings foodPairing={selectedBeer.food_pairing}/>
            </Unit>

            <Unit md={1/2}>
              <Tips tips={selectedBeer.brewers_tips}/>
            </Unit>

          </Grid>,

          <Acknowledgments key="acknowledgments" contributor={selectedBeer.contributed_by}/>,

          <ShareBeer key="share" name={selectedBeer.name} id={selectedBeer.id}/>
        ]}

      </Content>
    )
  }
}

export default connect(
  (state) => ({
    isOffline: state.isOffline,
    selectedBeer: getSelectedBeer(state)
  }),
  (dispatch) => ({
    onMount: (beerId) => dispatch(setSelectedBeer(beerId)),
    onBeerFetched: (newBeer) => {
      dispatch(addBeerToList(newBeer))
      dispatch(setSelectedBeer(newBeer.id))
    }
  })
)(Beer)
