import styled from 'styled-components'

export const fontFamilyMonospace = `Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif`
export const fontFamilyDefault = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`

export const H1 = styled.h1`
  text-align: center;
  margin: 0;
  padding: 20px 0;
`

export const H3 = styled.h3`
  margin: 0;
  padding: 10px 0;
`

export const P = styled.p`
  margin: 0;
  padding: 5px 0;
`
export const Mono = styled.span`
  display: inline-block;
  padding: 0 4px;
  border-radius: 3px;
  font-family: ${fontFamilyMonospace};
  background-color: #eaeaea;
`
