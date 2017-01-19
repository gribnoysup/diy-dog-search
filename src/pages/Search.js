import React from 'react'
import debounce from 'lodash/debounce'
import axios from 'axios'

import {FlexContainer} from '../components/common/Flex'

import Process from '../components/Process'
import BeerList from '../components/BeerList'

import {Content} from '../components/layout/Layout'

import {BeerNotFound} from '../components/search/BeerNotFound'
import {SearchInput} from '../components/search/SearchInput'
import {SearchContainer} from '../components/search/SearchContainer'
import {GeneralInfo} from '../components/search/GeneralInfo'

export default class Search extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      beerList: [],
      searchQuery: '',
      isFetching: false,
      isPristine: true,
      isFocused: false
    }

    this.debouncedFetcher = debounce(this.fetchBeer.bind(this), 300)
    this.onSearchChange = this.handleSerachChange.bind(this)
    this.onInputFocus = this.handleInputFocus.bind(this)

  }

  handleSerachChange(event) {
    const newVal = event.target.value
    this.setState({searchQuery: newVal, isPristine: false})

    if (newVal !== '') {
      this.setState({isFetching: true})
      this.debouncedFetcher(newVal)
    }

  }

  handleInputFocus(event) {
    this.setState({isFocused: event.type === 'focus'})
  }

  fetchBeer(query = this.state.searchQuery) {
    return axios
      .get(`https://api.punkapi.com/v2/beers?beer_name=${query}`)
      .then((response) => {
        this.setState({beerList: response.data, isFetching: false})
      })
  }

  getContent() {
    const {
      isPristine,
      searchQuery,
      isFetching,
      beerList
    } = this.state

    if (isPristine === true || searchQuery === '') {
      return <GeneralInfo />
    }

    if (isFetching === true) {
      return <Process />
    }

    if (beerList.length === 0) {
      return <BeerNotFound query={searchQuery}/>
    }

    return <BeerList beers={beerList} />
  }

  getIsSearchActive() {
    const {
      isFocused,
      searchQuery
    } = this.state

    return (searchQuery !== '' || isFocused)
  }

  render() {
    const {searchQuery} = this.state

    return (
      <FlexContainer direction="column" style={{flex: '1 0 auto'}}>
        <SearchContainer isActive={this.getIsSearchActive()}>
          <SearchInput
            placeholder="Beer Name (i.e. Punk IPA)"
            value={searchQuery}
            onChange={this.onSearchChange}

            onFocus={this.onInputFocus}
            onBlur={this.onInputFocus}
          />
        </SearchContainer>
        <Content>
          {this.getContent()}
        </Content>
      </FlexContainer>
    )
  }
}
