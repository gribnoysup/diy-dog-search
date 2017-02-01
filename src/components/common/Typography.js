import styled from 'styled-components'

export const fontFamilyMonospace = `Menlo, Monaco, "Lucida Console", "Liberation Mono", "DejaVu Sans Mono", "Bitstream Vera Sans Mono", "Courier New", monospace, serif`
export const fontFamilyDefault = `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen, Ubuntu, Cantarell, "Open Sans", "Helvetica Neue", sans-serif`

export const Subheading = styled.small`
  font-weight: normal;
  line-height: 1;
`

export const H1 = styled.h1`
  text-align: ${(props) => props.align || 'center'};
  margin: 0;
  margin-top: 56px;

  &:first-child {
    margin-top: calc(56px / 2);
  }

  &:last-child {
    margin-bottom: 56px;
  }
`

H1.displayName = 'H1'

export const H2 = styled.h2`
  margin: 0;
  margin-top: 46px;
  text-align: ${(props) => props.align || 'left'};

  &:first-child {
    margin-top: calc(46px / 2);
  }

  &:last-child {
    margin-bottom: 46px;
  }
`

H2.displayName = 'H2'

export const H3 = styled.h3`
  margin: 0;
  margin-top: 36px;
  text-align: ${(props) => props.align || 'left'};

  &:first-child {
    margin-top: calc(36px / 2);
  }

  &:last-child {
    margin-bottom: 36px;
  }
`

H3.displayName = 'H3'

export const P = styled.p`
  margin: 0;
  margin-top: 36px;
  text-align: ${(props) => props.align || 'left'};

  &:first-child {
    margin-top: calc(36px / 2);
  }

  &:last-child {
    margin-bottom: 36px;
  }
`

P.displayName = 'P'

export const Mono = styled.span`
  padding: 0 3px;
  display: inline-block;
  border-radius: 3px;
  font-family: ${fontFamilyMonospace};
  background-color: #eaeaea;
`

Mono.displayName = 'Mono'

export const Quote = styled.div`
  margin-top: 36px;
  font-style: italic;
  font-size: 1.2em;
  padding-left: 25px;
  color: rgba(0, 0, 0, .6);
  box-sizing: border-box;
  width: 100%;
  border-left: 3px solid rgba(0, 0, 0, .3);

  &:first-child {
    margin-top: calc(36px / 2);
  }

  &:last-child {
    margin-bottom: 36px;
  }
`

export const QuoteLink = styled.a`
  font-style: italic;
  font-size: 0.8em;
  color: rgba(0, 0, 0, .6);

  &:visited {
    color: rgba(0, 0, 0, .5)
  }
`
