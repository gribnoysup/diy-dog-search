import React from 'react'
import styled from 'styled-components'

import BeerList from '../BeerList'
import {Content} from '../layout/Layout'
import {P, H2, Subheading} from '..//common/Typography'

const ContentWithMargin = styled(Content)`
  margin-bottom: 46px;
`

function OfflineAvaliableText() {
  return (
    <div>
      <H2>
        Looks like you are offline...<br />
        <Subheading>
          But don't worry, we've got you covered!
        </Subheading>
      </H2>
      <P>
        This site supports offline mode with the magic of ServiceWorkers!
        If you browsed any beers on this site lately, some of them are accessible
        for your pleasure even now.
      </P>
      <P>
        So, while your internet is not working, you can check some of these beers,
        that you viewed recently:
      </P>
    </div>
  )
}

function OfflineNothingToShow() {
  return (
    <div>
      <H2>
        Looks like you are offline...<br />
        <Subheading>
          But don't worry, we've got you covered!
        </Subheading>
      </H2>
      <P>
        This site supports offline mode with the magic of ServiceWorkers! If you
        browsed any beers on this site lately, some of them could be accessible
        even offline.
      </P>
      <P>
        Unfortunately it seems that your list of avaliable beers is empty.
      </P>
    </div>
  )
}

export default function OfflineContent({beerList}) {
  return (
    <ContentWithMargin>
      {beerList && beerList.length > 0 ?
        [
          <OfflineAvaliableText key="text"/>,
          <BeerList key="list" beers={beerList}/>
        ] :
        <OfflineNothingToShow />
      }
    </ContentWithMargin>
  )
}
