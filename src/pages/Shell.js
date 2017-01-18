import React from 'react'
import styled from 'styled-components'
import {Body, Footer} from '../components/layout/Layout'

const Mobile = styled.div`
  display: block;

  @media screen and (min-width: 35.5em) {
    display: none;
  }
`

Mobile.displayName = 'Mobile'

const Desktop = styled.div`
  display: none;

  @media screen and (min-width: 35.5em) {
    display: block;
  }
`

Desktop.displayName = 'Desktop'

export default function Shell({children}) {
  return (
    <Body>
      {children}

      <Footer>
        <p>
          All data on&nbsp;this site is&nbsp;taken from{' '}
          <a href="https://www.brewdog.com/diydog">BrewDog&rsquo;s DIY Dog</a>{' '}
          with the help of&nbsp;beautiful <a href="https://punkapi.com">Punk&nbsp;API</a>
        </p>
        <Desktop>
          <p>
            Made with 🍺 by <a href="https://github.com/gribnoysup">@gribnoysup</a>{' | '}
            Code on <a href="https://github.com/gribnoysup/diy-dog-search">github</a>
          </p>
        </Desktop>
        <Mobile>
          <p>
            Made w/ 🍺 by <a href="https://github.com/gribnoysup">@gribnoysup</a>{' | '}
            <a href="https://github.com/gribnoysup/diy-dog-search">github</a>
          </p>
        </Mobile>
      </Footer>

    </Body>
  )
}
