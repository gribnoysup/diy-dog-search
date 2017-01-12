import React from 'react'
import styled from 'styled-components'
import debounce from 'lodash/debounce'
import axios from 'axios'

import {FlexContainer} from '../components/common/Flex'

import Process from '../components/Process'
import BeerList from '../components/BeerList'

import {Link} from '../components/common/Link'
import {Content} from '../components/layout/Layout'
import {P, H1, H2, Quote, QuoteLink, Mono} from '../components/common/Typography'

import Share from '../components/Share'

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
      <H1>BrewDog's DIY&nbsp;Dog Search</H1>
      <P>
        Search through BrewDog's DIY Dog recipes with the help
        of <Link href="https://punkapi.com">punkapi.com</Link>
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
  constructor(...args) {
    super(...args)
    this.state = {margin: null}
  }

  getMargin(isActive) {
    if (isActive && this.searchBarNode !== null) {
      // return -this.searchBarNode.offsetTop
      return -this.searchBarNode.getBoundingClientRect().top
    }

    return null
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isActive !== this.props.isActive) {
      // if (newProps.isActive) window.scrollTo(0, 0)
      // TODO: more advanced animation needed
      this.setState({margin: this.getMargin(newProps.isActive)})
    }
  }

  render() {
    const {isActive} = this.props
    const {margin} = this.state

    return (
      <AnimatedDiv style={{marginTop: margin}} isActive={isActive}>
        <Welcome />
        <FlexWithPadding innerRef={(node) => this.searchBarNode = node}>
          {this.props.children}
        </FlexWithPadding>
      </AnimatedDiv>
    )


  }
}

const Iframe = styled.iframe`
  position:  absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`

const AspectDiv = styled.div`
  position: relative;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  margin-top: 38px;

  &:before{
    content: "";
    display: block;
    padding-top: ${(props) => props.aspect * 100}%;
  }
`

function GeneralInfo() {
  return (
    <div>
      <H2>What is DIY&nbsp;Dog</H2>
      <P>
        DIY Dog is&nbsp;a&nbsp;full collection of&nbsp;BrewDog recipes released by&nbsp;BrewDog team in&nbsp;2016.
        It&nbsp;is&nbsp;a&nbsp;great gift to&nbsp;everyone who want to&nbsp;try themself in&nbsp;home-brewing
        or&nbsp;replicate their favourite recipe from BrewDog collection. Here is&nbsp;a&nbsp;presentation
        video from BrewDog site:
      </P>
      <AspectDiv aspect={9/16}>
        <Iframe src="https://player.vimeo.com/video/156532291" frameBorder="0" allowFullScreen />
      </AspectDiv>
      <P>
        <QuoteLink href="https://www.brewdog.com/diydog">
          Video from BrewDog website
        </QuoteLink>
      </P>
      <P>
        To quote one of the founders of BrewDog, James Watt:
      </P>
      <Quote>
        <P>
          With DIY Dog we&nbsp;wanted to&nbsp;do&nbsp;something that has never
          been done before as&nbsp;well as&nbsp;paying tribute to&nbsp;our home-brewing
          roots. We&nbsp;wanted to&nbsp;take all of&nbsp;our recipes, every single
          last one, and give them all away for free, to&nbsp;the amazing global
          home-brewing community.
        </P>
        <P>
          We&nbsp;have always loved the sharing of&nbsp;knowledge, expertise and
          passion in&nbsp;the craft beer community and we&nbsp;wanted to&nbsp;take
          that spirit of&nbsp;collaboration to&nbsp;the next level.
        </P>
      </Quote>
      <P>
        <QuoteLink href="https://www.brewdog.com/lowdown/blog/diy-dog">
          Quote from BrewDog Blog post &laquo;DIY Dog Giving Back&raquo;
        </QuoteLink>
      </P>
      <P>
        And totally check out the <Link href="https://www.brewdog.com/diydog">DIY Dog pdf
        on BrewDog website</Link> if you are interested! It contains full instructions
        on how to start home-brewing
      </P>
      <H2>Disclaimer</H2>
      <P>
        I&nbsp;am (creator of&nbsp;this website) connected to&nbsp;the BrewDog
        Brewery only by&nbsp;the love to&nbsp;their beer and in&nbsp;no&nbsp;other way.
      </P>
      <P>
        The data in the <Link href="https://punkapi.com">punkapi.com</Link> (and
          therefore provided on&nbsp;this site) is&nbsp;taken directly from
          BrewDog&rsquo;s DIY Dog and is&nbsp;free to&nbsp;use, replicate
          verbatim and share, but cannot be&nbsp;used for commercial purposes.
      </P>
      <H2 align="center" style={{marginBottom: 20}}>Share this site</H2>
      <Share url={window.location.origin} />
    </div>
  )
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
