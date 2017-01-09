import React from 'react'
import styled from 'styled-components'
import {Content} from './layout/Layout'

const Container = styled(Content)`
  justify-content: center;
  align-items: center;
`

const TextBox = styled.div`
  text-align: center;
  font-size: 24px;
`

export default function Welcome({children}) {
  return (
    <Container>
      <TextBox>{children}</TextBox>
    </Container>
  )
}
