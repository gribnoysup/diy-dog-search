import styled from 'styled-components'

import {TRANSITION} from '../../util/const'

export const SearchInput = styled.input`
  min-height: 42px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  background: inherit;
  font: inherit;
  width: 620px;
  max-width: 100%;
  padding: 5px;
  outline: none;
  font-weight: bolder;
  transition: width .16s ease;
  text-transform: uppercase;
  color: inherit;

  border: 3px solid;
  transition: border-color ${TRANSITION.SearchBar}s ease;

  border-color: inherit;

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
`
