import React from 'react'
import axios from 'axios'
import styled from 'styled-components'

import {dispatchRouteChange} from '../pages/Router'

import {Body, Header, Footer} from '../components/layout/Layout'
import Process from '../components/Process'

import BeerContent from '../components/BeerContent'

const BackButton = styled.button`
  position: relative;
  width: 42px;
  height: 42px;
  border: 3px solid #ffffff;
  background: inherit;

  &:after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 8px;
    left: 12px;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    transform: rotate(-45deg);
  }
`

export default class BeerDescription extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {
      isFetching: true,
      beer: {}
    }
  }

  getBeerId(path) {
    const result = path.match(/^\/beer\/(\d+)$/)
    if (result && result[1]) return result[1]
    return null
  }

  fetchBeer() {
    const {location} = this.props
    const beerId = this.getBeerId(location.path)

    if (beerId) {
      return axios.get(`https://api.punkapi.com/v2/beers/${beerId}`)
      // return Promise.resolve({
      //   data: [{"id":192,"name":"Punk IPA 2007 - 2010","tagline":"Post Modern Classic. Spiky. Tropical. Hoppy.","first_brewed":"04/2007","description":"Our flagship beer that kick started the craft beer revolution. This is James and Martin's original take on an American IPA, subverted with punchy New Zealand hops. Layered with new world hops to create an all-out riot of grapefruit, pineapple and lychee before a spiky, mouth-puckering bitter finish.","image_url":"https://images.punkapi.com/v2/192.png","abv":6,"ibu":60,"target_fg":1010,"target_og":1056,"ebc":17,"srm":8.5,"ph":4.4,"attenuation_level":82.14,"volume":{"value":20,"unit":"liters"},"boil_volume":{"value":25,"unit":"liters"},"method":{"mash_temp":[{"temp":{"value":65,"unit":"celsius"},"duration":75}],"fermentation":{"temp":{"value":19,"unit":"celsius"}},"twist":null},"ingredients":{"malt":[{"name":"Extra Pale","amount":{"value":5.3,"unit":"kilograms"}}],"hops":[{"name":"Ahtanum","amount":{"value":17.5,"unit":"grams"},"add":"start","attribute":"bitter"},{"name":"Chinook","amount":{"value":15,"unit":"grams"},"add":"start","attribute":"bitter"},{"name":"Crystal","amount":{"value":17.5,"unit":"grams"},"add":"middle","attribute":"flavour"},{"name":"Chinook","amount":{"value":17.5,"unit":"grams"},"add":"middle","attribute":"flavour"},{"name":"Ahtanum","amount":{"value":17.5,"unit":"grams"},"add":"end","attribute":"flavour"},{"name":"Chinook","amount":{"value":27.5,"unit":"grams"},"add":"end","attribute":"flavour"},{"name":"Crystal","amount":{"value":17.5,"unit":"grams"},"add":"end","attribute":"flavour"},{"name":"Motueka","amount":{"value":17.5,"unit":"grams"},"add":"end","attribute":"flavour"}],"yeast":"Wyeast 1056 - American Ale™"},"food_pairing":["Spicy carne asada with a pico de gallo sauce","Shredded chicken tacos with a mango chilli lime salsa","Cheesecake with a passion fruit swirl sauce"],"brewers_tips":"While it may surprise you, this version of Punk IPA isn't dry hopped but still packs a punch! To make the best of the aroma hops make sure they are fully submerged and add them just before knock out for an intense hop hit.","contributed_by":"Sam Mason <samjbmason>"}]
      // })
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
      <Body>
        <Header>
          <BackButton onClick={() => dispatchRouteChange({}, '/')}/>
        </Header>
        {(_ => {
          if (isFetching) {
            return <Process />
          }

          return (<BeerContent {...beer}/>)
        })()}

        <Footer>
          <div>
            All data on this site is taken from <a href="https://www.brewdog.com/diydog">BrewDog's DIY Dog</a>{' '}
            with the help of beautiful <a href="https://punkapi.com">Punk API</a>
          </div>
          <div>
            <a href="https://github.com/gribnoysup">@gribnoysup</a>{' | '}
            <a href="https://github.com/gribnoysup/diy-dog-search">github</a>{' | '}
            License MIT 
          </div>
        </Footer>

      </Body>
    )
  }
}
