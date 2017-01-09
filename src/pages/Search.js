import React from 'react'
import debounce from 'lodash/debounce'
import axios from 'axios'

import {Body, Header, Content, Footer} from '../components/layout/Layout'
import {FlexContainer} from '../components/common/Flex'

import SearchBar from '../components/SearchBar'
import Process from '../components/Process'
import BeerList from '../components/BeerList'

import {Link} from '../components/common/Link'
import {P, H1} from '../components/common/Typography'

import sad from '../assets/sad.svg'

export default class Search extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      beerList: [],
      searchQuery: '',
      isFetching: false,
      isPristine: true
    }

    this.debouncedFetcher = debounce(this.fetchBeer.bind(this), 300)
    this.onSearchChange = this.handleSerachChange.bind(this)

  }

  handleSerachChange(event) {
    const newVal = event.target.value
    this.setState({searchQuery: newVal, isPristine: false})

    if (newVal !== '') {
      this.setState({isFetching: true})
      this.debouncedFetcher(newVal)
    }

  }

  fetchBeer(query = this.state.searchQuery) {
    return axios
      .get(`https://api.punkapi.com/v2/beers?beer_name=${query}`)
      .then((response) => {
        this.setState({beerList: response.data, isFetching: false})
      })
  }

  render() {
    const {
      isPristine,
      searchQuery,
      isFetching,
      beerList
    } = this.state

    return (
      <Body>
        <Header>
          <SearchBar onChange={this.onSearchChange} value={searchQuery} />
        </Header>

        <Content>
          {(_ => {

            if (isPristine === true || searchQuery === '') {
              return (
                <div>
                  <H1>BrewDog's DIY Dog Search</H1>
                  <P>
                    Search through BrewDog's DIY Dog recipes with the help
                    of API made by <Link href="https://punkapi.com">punkapi.com</Link>
                  </P>
                </div>
              )
            }

            if (isFetching === true) {
              return <Process />
            }

            if (beerList.length === 0) {
              return (
                <FlexContainer align="center" justify="center" direction="column" style={{flex: 1, opacity: .5}}>
                  <img src={sad} style={{width: 120, height: 120}}/>
                  <P style={{}}>Nothing found</P>
                </FlexContainer>
              )
            }

            return (
              <BeerList beers={beerList} />
            )

          })()}
        </Content>

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
