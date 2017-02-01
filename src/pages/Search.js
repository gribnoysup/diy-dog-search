import React from 'react'
import {connect} from 'react-redux'

import debounce from 'lodash/debounce'

import {setSearchQuery, clearSearchQuery, setBeerList, setSelectedBeer} from '../store/actions'
import {searchBeerByName} from '../util/fetch'

import {FlexContainer} from '../components/common/Flex'

import {IconButton} from '../components/common/IconButton'

import Process from '../components/Process'
import BeerList from '../components/BeerList'

import {Content} from '../components/layout/Layout'

import {BeerNotFound} from '../components/search/BeerNotFound'
import {SearchInput} from '../components/search/SearchInput'
import {SearchContainer} from '../components/search/SearchContainer'
import {GeneralInfo} from '../components/search/GeneralInfo'

class Search extends React.Component {
  constructor(...args) {
    super(...args)

    this.state = {
      isFetching: false,
      isPristine: true,
      isFocused: false
    }

    this.debouncedFetcher = debounce(this.fetchBeer.bind(this), 300)
    this.onSearchChange = this.handleSerachChange.bind(this)
    this.onInputFocus = this.handleInputFocus.bind(this)
    this.onBeerClick = this.handleBeerClick.bind(this)

  }

  handleSerachChange(event) {
    const {isPristine} = this.state
    const {onQueryChange} = this.props
    const newVal = event.target.value

    if (isPristine) {
      this.setState({isPristine: false})
    }

    onQueryChange(newVal)
  }

  componentDidUpdate(newProps) {
    if (newProps.searchQuery !== this.props.searchQuery) {
      this.setState({isFetching: true})
      this.fetchBeer()
    }
  }

  handleInputFocus(event) {
    this.setState({isFocused: event.type === 'focus'})
  }

  handleBeerClick(id) {
    const {onBeerClick, push} = this.props

    onBeerClick(id)
    push(`/beer/${id}/`)
  }

  fetchBeer() {
    const {searchQuery, onBeerListFetch} = this.props

    if (searchQuery === '') return Promise.resolve()

    return searchBeerByName(searchQuery)
      .then((result) => onBeerListFetch(result))
      .then(() => {
        this.setState({isFetching: false})
      })
  }

  getContent() {
    const {isPristine, isFetching} = this.state
    const {searchQuery, beerList} = this.props

    if (isPristine === true || searchQuery === '') {
      return <GeneralInfo />
    }

    if (isFetching === true) {
      return <Process />
    }

    if (beerList.length === 0) {
      return <BeerNotFound query={searchQuery}/>
    }

    return <BeerList beers={beerList} onBeerClick={this.onBeerClick}/>
  }

  getIsSearchActive() {
    const {isFocused} = this.state
    const {searchQuery} = this.props

    return (searchQuery !== '' || isFocused)
  }

  componentWillUnmount() {
    this.props.clearQuery()
  }

  render() {
    const {searchQuery, push} = this.props

    return (
      <FlexContainer direction="column" style={{flex: '1 0 auto'}}>
        <SearchContainer isActive={this.getIsSearchActive()}>
          {({active, fixed, keepFixed}) => [
            <SearchInput
              key="search-input"

              placeholder="Beer Name (i.e. Punk IPA)"
              value={searchQuery}
              onChange={this.onSearchChange}

              onFocus={this.onInputFocus}
              onBlur={this.onInputFocus}
            />,
            <IconButton
              key="random-button"
              invert={active || fixed || keepFixed}
              icon="dice"
              onClick={() => push('/beer/random/')}
            />
          ]}
        </SearchContainer>
        <Content>
          {this.getContent()}
        </Content>
      </FlexContainer>
    )
  }
}

export default connect(
  (state) => ({
    searchQuery: state.searchQuery,
    beerList: state.beerList
  }),
  (dispatch) => ({
    onQueryChange: (query) =>  dispatch(setSearchQuery(query)),
    clearQuery: () =>  dispatch(clearSearchQuery()),
    onBeerListFetch: (list) => dispatch(setBeerList(list)),
    onBeerClick: (id) => dispatch(setSelectedBeer(id))
  })
)(Search)
