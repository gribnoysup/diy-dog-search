import React from 'react'
import styled from 'styled-components'
import {fontFamilyMonospace} from '../common/Typography'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

Container.displayName = 'Container'

const HeaderDiv = styled.div`
  color: #ffffff;
  background-color: #000000;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 0 20px;
  box-sizing: border-box;
  justify-content: space-between;

  & > *:first-child {
    margin-left: 0;
  }

  & > *:last-child {
    margin-right: 0;
  }

  ${(props) => props.sticky ? `
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
  ` : ''}

  @media screen and (min-width: 48em) {
    justify-content: flex-start;
  }
`

export class Header extends React.Component {
  static propTypes = {
    sticky: React.PropTypes.bool
  }

  fixBody(node) {
    document.body.style.paddingTop = this.getHeight(node) + 'px'
  }

  unfixBody() {
    document.body.style.paddingTop = ''
  }

  getHeight(node) {
    return node ? node.getBoundingClientRect().height : 0
  }

  handleRef(ref) {
    if (this.props.sticky) {
      ref ? this.fixBody(ref) : this.unfixBody()
    }
  }

  render() {
    const {children, sticky} = this.props

    return (
      <HeaderDiv
        sticky={sticky}
        innerRef={(ref) => this.handleRef(ref)}
      >
        {children}
      </HeaderDiv>
    )
  }
}

export const Content = styled.div`
  flex: 1 0 auto;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin: 20px auto;
  width: 100%;
  max-width: 760px;
  box-sizing: border-box;
`

Content.displayName = 'Content'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`

Body.displayName = 'Body'

export const Footer = styled.div`
  width: 100%;
  box-sizing: border-box;
  background-color: #000000;
  color: #ffffff;

  font-family: ${fontFamilyMonospace};
  font-size: 12px;
  font-weight: bold;

  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 20px;
  padding-bottom: 10px;

  & a {
    color: #ffffff;

    &:visited {
      color: #afafaf;
    }
  }

  & p {
    margin-top: 10px;
    margin-bottom: 0;
    text-align: center;
    max-width: 410px;
  }

  @media screen and (min-width: 35.5em) {
    padding-bottom: 20px;

    & p {
      margin-top: 20px;
    }
  }
`

Footer.displayName = 'Footer'
