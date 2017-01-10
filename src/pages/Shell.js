import React from 'react'
import {Body, Footer} from '../components/layout/Layout'

export default function Shell({children}) {
  return (
    <Body>
      {children}

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
