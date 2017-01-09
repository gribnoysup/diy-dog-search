import React from 'react'
import logo from '../assets/spinner.svg'

import {Content} from '../components/layout/Layout'
import styled, {keyframes} from 'styled-components'

const rotate360 = keyframes`
  from {
    transform: perspective(1000px) rotateY(0deg);
  }
  to {
    transform: perspective(1000px) rotateY(360deg);
  }
`

const bounce = keyframes`
  0% {
    transform: rotate(0deg);
  }
  33% {
    transform: rotate(-45deg);
  }
  66% {
    transform: rotate(45deg);
  }
  100% {
    transform: rotate(0deg);
  }
`

const CenteredContent = styled(Content)`
  justify-content: center;
  align-items: center;
`

const Logo = styled.img`
  max-width: 120px;
  opacity: .5;
  animation: ${bounce} 1.7s ease-in-out infinite;
`

const Process = () => (
  <CenteredContent>
    <Logo src={logo}/>
  </CenteredContent>
)

export default Process
