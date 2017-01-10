import React from 'react'
import styled from 'styled-components'

import {Header} from './layout/Layout'
import {dispatchRouteChange} from './providers/Router'

const TRANSITION = .2

const BackButton = styled.button`
  cursor: pointer;
  position: relative;
  width: 42px;
  height: 42px;
  border: 3px solid #ffffff;
  background: inherit;

  color: #ffffff;
  text-transform: uppercase;
  padding-left: 30px;
  padding-right: 5px;
  overflow: hidden;

  font: inherit;
  font-weight: 500;
  text-align: left;

  transition: width ${TRANSITION}s ease;

  &:after {
    content: '';
    position: absolute;
    width: 16px;
    height: 16px;
    top: 8px;
    left: 12px;
    border-top: 3px solid #ffffff;
    border-left: 3px solid #ffffff;
    transform: rotate(-45deg);
  }

  &:focus,
  &:hover,
  &:active {
    width: 90px;
  }

  &:focus span,
  &:hover span,
  &:active span {
    opacity: 1;
  }

  & span {
    pointer-events: none;
    opacity: 0;
    transition: opacity ${TRANSITION}s ease;
  }
`

export function HeaderWithBackButton() {
  return (
    <Header>
      <BackButton onClick={() => dispatchRouteChange({}, '/')}>
        <span>Back</span>
      </BackButton>
    </Header>
  )
}
