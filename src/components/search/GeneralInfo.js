import React from 'react'
import styled from 'styled-components'

import {P, H2, Quote, QuoteLink} from '../../components/common/Typography'
import {Link} from '../../components/common/Link'
import Share from '../../components/Share'

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
  margin: 0 auto;
  margin-top: 38px;

  &:before {
    content: "";
    display: block;
    padding-top: ${(props) => props.aspect * 100}%;
  }
`

export function GeneralInfo() {
  return (
    <div>
      <H2>What is DIY&nbsp;Dog</H2>
      <P>
        DIY Dog is&nbsp;a&nbsp;full collection of&nbsp;BrewDog recipes released
        by&nbsp;BrewDog team in&nbsp;2016. It&nbsp;is&nbsp;a&nbsp;real gift
        to&nbsp;everyone who want to&nbsp;try themself in&nbsp;home-brewing
        or&nbsp;mature brewers who want to&nbsp;replicate their favourite recipe from
        BrewDog collection. Here is&nbsp;a&nbsp;presentation video from BrewDog site:
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
        And if&nbsp;you are interested, check out the <Link href="https://www.brewdog.com/diydog">
        DIY Dog pdf on&nbsp;BrewDog website</Link>! It&nbsp;contains full instructions
        on&nbsp;how to&nbsp;start home-brewing
      </P>
      <H2>Disclaimer</H2>
      <P>
        I&nbsp;(creator of&nbsp;this website) am connected to&nbsp;the BrewDog
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
