import React from 'react'
import styled from 'styled-components'
import {keyframes} from '../../util/css'

export const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin: 15px 0;
  flex: 1;

  animation: ${keyframes.fadeIn} .16s ease-in;
`

CardContainer.displayName = 'CardContainer'

export const CardTitle = styled.h3`
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 5px;
`

CardTitle.displayName = 'CardTitle'

export const CardContent = styled.div`
  border-top: 3px solid;
  background-color: #f1f1f1;
  padding: 15px;
  flex: 1;
`

CardContent.displayName = 'CardContent'

export function Card({title, children}) {
  return (
    <CardContainer>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  )
}
