import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
  min-height: 42px;
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  border: none;
  background: inherit;
  font: inherit;
  color: #a9a9a9;
  max-width: 100%;
  padding: 5px;
  border: 3px solid #a9a9a9;
  outline: none;
  font-weight: bolder;
  transition: width .16s ease;
  text-transform: uppercase;
  ${(props) => props.value !== '' ? 'width: 320px;' : 'width: 100px;'}

  &::selection {
    color: #000000;
    background: #ffffff;
  }

  &::-moz-selection {
    color: #000000;
    background: #ffffff;
  }

  &:focus {
    border-color: #ffffff;
    color: #ffffff;
    width: 320px;
  }
`

const SearchBar = ({onChange, value}) => (
  <Input
    placeholder="Search"
    type="text"
    onChange={onChange}
    value={value}
  />
)

export default SearchBar
