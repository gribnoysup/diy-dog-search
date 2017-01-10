import React from 'react'
import styled from 'styled-components'

import {Ul, Li} from './common/List'
import {Card} from './common/Card'
import {FlexContainer} from './common/Flex'

import {dispatchRouteChange, NavLink} from '../components/providers/Router'

const BeerButton = styled(NavLink)`
  border: 3px solid;
  background: none;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  opacity: .3;
  text-decoration: none;
  padding: 3px 5px;

  &:hover,
  &:focus {
    opacity: 1;
  }
`

const Div = ({children, ...props}) => React.createElement('div', props, children)

const BeerCard = ({name, tagline, id}) => (
  <Li>
    <Card title={name}>
      <FlexContainer justify="space-between">
        <Div>
          {tagline}
        </Div>
        <Div>
          <BeerButton href={'/beer/' + id}>More</BeerButton>
        </Div>
      </FlexContainer>
    </Card>
  </Li>
)

export default function BeerList({beers}) {
  return (
      <Ul>
        {beers.map((beer) => (
          <BeerCard key={beer.id} {...beer} />
        ))}
      </Ul>
  )
}
