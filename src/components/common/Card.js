import React from 'react'
import styled from 'styled-components'

export const CardContainer = styled.div`
  margin: 15px 0;
`

export const CardTitle = styled.h3`
  text-transform: uppercase;
  margin: 0;
  margin-bottom: 5px;
`

export const CardContent = styled.div`
  border-top: 3px solid;
  background-color: #f1f1f1;
  padding: 15px;
`

export function Card({title, children}) {
  return (
    <CardContainer>
      {title && <CardTitle>{title}</CardTitle>}
      <CardContent>{children}</CardContent>
    </CardContainer>
  )
}
