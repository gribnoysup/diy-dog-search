import React from 'react'

import {FlexContainer} from '../components/common/Flex'
import {P, H1, Mono} from '../components/common/Typography'
import {Content} from '../components/layout/Layout'

// import {Link} from 'react-router-dom'

const NotFound = ({location}) => (
  <Content>
    <FlexContainer align="stretch" direction="column">
      <H1>Uh-oh!</H1>
      <P align="center">
        Page <Mono>{location.pathname}</Mono> not found.
      </P>
      {/* TODO: add links */}
    </FlexContainer>
  </Content>
)

export default NotFound
