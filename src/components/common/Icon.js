import React from 'react'
import styled from 'styled-components'

import {FlexContainer} from './Flex'

import mash from '../../assets/mash.svg'
import fermenter from '../../assets/ferm2.svg'
import star from '../../assets/star.svg'
import malt from '../../assets/malt2.svg'
import hops from '../../assets/hops.svg'
import yeast from '../../assets/yeast2.svg'
import food from '../../assets/food2.svg'
import insight from '../../assets/insight.svg'

const ICONS = {mash, fermenter, star, malt, hops, yeast, food, insight}
const SIZE = 42

// TODO: animate invert with keyframes
export const Icon = styled.span`
  position: relative;
  width: ${SIZE}px;
  min-width: ${SIZE}px;
  height: ${SIZE}px;
  background-color: #000000;
  border-radius: 100%;
  filter: invert(0);

  &:after {
    content: '';
    position: absolute;
    width: ${SIZE}px;
    min-width: ${SIZE}px;
    height: ${SIZE}px;

    background-size: ${SIZE - 10}px auto;
    background-position: center;
    background-repeat: no-repeat;
    background-image: url(${(props) => ICONS[props.icon]})

    ${(props) => props.invert ? 'filter: invert(1);' : ''}
  }
`

Icon.displayName = 'Icon'

const SmallTitle = styled.small`
  font-weight: bold;
  text-transform: uppercase;
  padding: 0 10px;
`

SmallTitle.displayName = 'SmallTitle'

const DivWithPadding = styled.div`
  flex: 1;
  padding: 0 10px;
`

DivWithPadding.displayName = 'DivWithPadding'

export function IconWithTitle({icon, children}) {
  return (
    <FlexContainer>
      <Icon icon={icon} invert/>
      {children && <SmallTitle>{children}</SmallTitle>}
    </FlexContainer>
  )
}

export function IconWithContent({icon, children}) {
  return (
    <FlexContainer align="flex-start">
      <Icon icon={icon} invert/>
      {children && <DivWithPadding>{children}</DivWithPadding>}
    </FlexContainer>
  )
}
