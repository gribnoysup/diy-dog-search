import React from 'react'

import {FlexContainer} from '../components/common/Flex'
import {P, H1, Mono} from '../components/common/Typography'
import {NavLink} from '../components/providers/Router'
import {Content} from '../components/layout/Layout'

const NotFound = ({location}) => (
  <Content>
    <FlexContainer align="stretch" direction="column">
      <H1>Uh-oh!</H1>
      <P>
        Page <Mono>{location.path}</Mono> not found.
        Try <NavLink href="/">searching</NavLink> for beer or maybe
        look at some <NavLink href="/beer/random/">random</NavLink> one!
      </P>
    </FlexContainer>
  </Content>
)

export default NotFound
