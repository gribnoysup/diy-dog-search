import React from 'react'
import styled from 'styled-components'

import {Ul, Li} from './common/List'
import {Card} from './common/Card'
import {FlexContainer} from './common/Flex'

import {dispatchRouteChange} from '../components/providers/Router'

const Button = styled.button`
  border: 3px solid;
  background: none;
  text-transform: uppercase;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
  opacity: .3;

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
          <Button onClick={() => dispatchRouteChange({}, '/beer/' + id)}>More</Button>
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
