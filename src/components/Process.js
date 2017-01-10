import React from 'react'
import logo from '../assets/spinner.svg'

import {Content} from '../components/layout/Layout'
import styled, {keyframes} from 'styled-components'

const bounce = keyframes`
  0% {
    transform: rotate(0deg);
  }
  20% {
    transform: rotate(45deg);
  }
  40% {
    transform: rotate(-45deg);
  }
  100% {
    transform: rotate(360deg);
  }
`

const CenteredContent = styled(Content)`
  justify-content: center;
  align-items: center;
`

const Logo = styled.img`
  width: 120px;
  opacity: .5;
  animation: ${bounce} 2.5s ease-in-out infinite;
`

const Process = () => (
  <CenteredContent>
    <Logo src={logo} alt="Hand holding a beer mug full of beer"/>
  </CenteredContent>
)

export default Process
