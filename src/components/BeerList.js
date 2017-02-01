import React from 'react'
import styled from 'styled-components'

import {Ul, Li} from './common/List'
import {Card} from './common/Card'
import {FlexContainer} from './common/Flex'

// import {NavLink} from '../components/providers/Router'

const BeerButton = styled.button`
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

const BeerCard = ({name, tagline, id, onBtnClick}) => (
  <Li>
    <Card title={name}>
      <FlexContainer justify="space-between">
        <div>
          {tagline}
        </div>
        <div>
          <BeerButton onClick={onBtnClick}>More</BeerButton>
        </div>
      </FlexContainer>
    </Card>
  </Li>
)

export default function BeerList({beers, onBeerClick}) {
  return (
      <Ul>
        {beers.map((beer) => (
          <BeerCard key={beer.id} {...beer} onBtnClick={() => onBeerClick(beer.id)}/>
        ))}
      </Ul>
  )
}
