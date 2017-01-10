import React from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import axios from 'axios'

import {FlexContainer} from '../components/common/Flex'

import Process from '../components/Process'
import BeerList from '../components/BeerList'

import {Link} from '../components/common/Link'
import {Content} from '../components/layout/Layout'
import {P, H1, Mono} from '../components/common/Typography'

import sad from '../assets/sad.svg'

const SadFace = styled.div`
  width: 120px;
  height: 120px;
  background-image: url(${sad});
  background-size: 120px 120px;
  background-repeat: no-repeat;
  opacity: .5;
`

function BeerNotFound({query}) {
  return (
    <FlexContainer align="center" justify="center" direction="column" style={{flex: 1, opacity: .8}}>
      <SadFace />
      <P>No matches for <Mono>{query.toUpperCase()}</Mono></P>
    </FlexContainer>
  )
}

const TRANSITION = .4

const SearchInput = styled.input`
  min-height: 42px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  background: inherit;
  font: inherit;
  width: 620px;
  max-width: 100%;
  padding: 5px;
  outline: none;
  font-weight: bolder;
  transition: width .16s ease;
  text-transform: uppercase;
  color: inherit;

  border: 3px solid;
  transition: border-color ${TRANSITION}s ease;

  ${(props) => props.isActive ? `
    border-color: #ffffff;
  ` : `
    border-color: #000000;
  `}

  &::-webkit-input-placeholder {
    text-transform: none;
  }
  &::-moz-placeholder {
    text-transform: none;
  }
  &:-ms-input-placeholder {
    text-transform: none;
  }
  &:-moz-placeholder {
    text-transform: none;
  }
`

const FixedDiv = styled.div`
  width: 520px;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`

function Welcome({getDOMNode}) {
  return (
    <FixedDiv innerRef={getDOMNode}>
      <H1>BrewDog's DIY Dog Search</H1>
      <P>
        Search through BrewDog's DIY Dog recipes with the help
        of API made by <Link href="https://punkapi.com">punkapi.com</Link>
      </P>
    </FixedDiv>
  )
}

const FlexWithPadding = styled(FlexContainer)`
  min-height: 56px;
  box-sizing: border-box;
`

const AnimatedDiv = styled(FixedDiv)`
  width: 620px;
  padding: 0 20px;
  margin-top: 0;
  transition: margin ${TRANSITION}s ease,
              width ${TRANSITION}s ease,
              background-color ${TRANSITION}s ease,
              color ${TRANSITION}s ease;

  background-color: #ffffff;

  ${(props) => props.isActive ? `
    width: 100%;
    background-color: #000000;
    color: #ffffff;
  ` : `
    background-color: #ffffff;
    color: #000000;
  `}
`

class SearchContainer extends React.Component {
  getWelcomeNodeHeight() {
    const {isActive} = this.props

    if (isActive && this.welcomeNode !== null) {
      return -this.welcomeNode.getBoundingClientRect().height
    }

    return null
  }

  render() {
    const {isActive} = this.props

    return (
      <AnimatedDiv style={{marginTop: this.getWelcomeNodeHeight()}} isActive={isActive}>
        <Welcome getDOMNode={(node) => this.welcomeNode = node} />
        <FlexWithPadding>
          {this.props.children}
        </FlexWithPadding>
      </AnimatedDiv>
    )
  }
}

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
      return null
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
      searchQuery,
    } = this.state

    return (searchQuery !== '' || isFocused)
  }

  render() {
    const {searchQuery} = this.state

    return (
      <FlexContainer direction="column" style={{flex: 1}}>
        <SearchContainer isActive={this.getIsSearchActive()}>
          <SearchInput
            placeholder="i.e. PUNK IPA"
            value={searchQuery}
            onChange={this.onSearchChange}
            isActive={this.getIsSearchActive()}
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
