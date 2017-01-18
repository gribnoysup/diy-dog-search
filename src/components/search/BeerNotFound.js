import React from 'react'
import styled from 'styled-components'
import sad from '../../assets/sad.svg'

import {FlexContainer} from '../../components/common/Flex'
import {P, Mono} from '../../components/common/Typography'

const SadFace = styled.div`
  width: 120px;
  height: 120px;
  background-image: url(${sad});
  background-size: 120px 120px;
  background-repeat: no-repeat;
  opacity: .5;
`

export function BeerNotFound({query}) {
  return (
    <FlexContainer align="center" justify="center" direction="column" style={{flex: 1, opacity: .8}}>
      <SadFace />
      <P>No matches for <Mono>{query.toUpperCase()}</Mono></P>
    </FlexContainer>
  )
}
