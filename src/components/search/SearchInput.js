import React from 'react'
import styled from 'styled-components'

import {TRANSITION} from '../../util/const'

const SearchInputDiv = styled.div`
  min-height: 42px;
  box-sizing: border-box;
  display: flex;
  width: 720px;
  max-width: 100%;
  align-items: stretch;
  padding: 0;
  margin: 0;
  border: none;
  background: inherit;
  font: inherit;
  ${''/* flex: 1 1 auto;*/}
  outline: none;
  font-weight: bolder;
  transition: width .16s ease;
  text-transform: uppercase;
  color: inherit;

  border: 3px solid;
  transition: border-color ${TRANSITION.SearchBar}s ease;

  border-color: inherit;

  & > input {
    margin: 0;
    padding: 5px;
    width: 100%;
    border: none;
    box-sizing: border-box;
    outline: none;
    background: inherit;
    font: inherit;
    text-transform: uppercase;
    color: inherit;

    &::-webkit-input-placeholder {
      text-transform: none;
    }
    &::-moz-placeholder {
      text-transform: none;
    }
    &:-ms-input-placeholder {
      text-transform: none;
    }
    &:-moz-placeholder {
      text-transform: none;
    }
  }
`

export function SearchInput({innerRef, fixed, keepFixed, active, ...props}) {
  return (
    <SearchInputDiv innerRef={innerRef}>
      <input {...props} />
    </SearchInputDiv>
  )
}
