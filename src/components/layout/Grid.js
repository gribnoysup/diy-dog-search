import styled from 'styled-components'

export const Grid = styled.div`
  letter-spacing: -.31em;
  display: flex;
  flex-flow: row wrap;
  align-content: flex-start;
`

Grid.displayName = 'Grid'

export const Unit = styled.div`
  letter-spacing: normal;
  word-spacing: normal;
  vertical-align: top;
  text-rendering: auto;
  display: inline-block;
  zoom: 1;

  width: ${(props) => props.unit * 100}%;

  @media screen and (min-width: 35.5em) {
    {${(props) => props.sm ? `width: ${props.sm * 100}%;` : ''}}
  }

  @media screen and (min-width: 48em) {
    {${(props) => props.md ? `width: ${props.md * 100}%;` : ''}}
  }

  @media screen and (min-width: 64em) {
    {${(props) => props.lg ? `width: ${props.lg * 100}%;` : ''}}
  }

  @media screen and (min-width: 80em)	{
    {${(props) => props.xl ? `width: ${props.xl * 100}%;` : ''}}
  }
`

Unit.displayName = 'Unit'
Unit.defaultProps = { unit: 1 }
