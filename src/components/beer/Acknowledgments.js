import React from 'react'
import styled from 'styled-components'

import {Card} from '../common/Card'
import {P as AP} from '../common/Typography'
import {Link} from '../common/Link'

const P = styled(AP)`
  margin-top: 10px;

  &:last-child {
    margin-bottom: 10px;
  }
`

export const Acknowledgments = ({contributor}) => (
  <Card title="Acknowledgments">
    <P>
      Recipe from{' '}
      <Link href="https://www.brewdog.com/diydog">
        BrewDog's DIY Dog
      </Link>
    </P>
    <P>
      Contributed to{' '}
      <Link href="https://punkapi.com/">
        Punk API
      </Link>{' '}
      by <b>{contributor}</b>
    </P>
  </Card>
)
