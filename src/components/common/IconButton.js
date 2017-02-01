import React from 'react'
import styled from 'styled-components'

import {TRANSITION, SIZE} from '../../util/const'
import {toFixedFloat} from '../../util/fn'

import dice from '../../assets/dice3.svg'
import back from '../../assets/back3.svg'

const ICONS = {dice, back}

const width = SIZE.ButtonWidth
const innerWidth = width - 6

const Button = styled.button`
  position: relative;
  padding: 0;
  background: inherit;
  border: none;
  cursor: pointer;

  height: ${width}px;
  width: ${width}px;

  color: currentColor;
  border: 3px solid currentColor;

  text-transform: uppercase;
  text-decoration: none;
  font: inherit;
  font-weight: bold;

  padding-left: ${innerWidth}px;

  transition: width ${TRANSITION.Button}s ease;
  overflow: hidden;
  margin: 0 8px;

  &:after {
    content: '';
    position: absolute;
    top: 0;
    left: 0;

    width: ${innerWidth}px;
    height: ${innerWidth}px;

    background-image: url(${(props) => ICONS[props.icon]});
    background-size: ${(props) => props.iconSize}px ${(props) => props.iconSize}px;
    background-position: center center;
    background-repeat: no-repeat;

    ${(props) => props.invert ?
      'filter: invert(1);' : ''
    }
  }

  & span {
    display: inline-block;
    padding: 0 6px;
    white-space: nowrap;
    pointer-events: none;
    opacity: 0;
    transition: opacity ${TRANSITION.Button}s ease;
  }

  &:hover {
    width: ${(props) => toFixedFloat(props.contentWidth + width)}px;

    & span {
      opacity: 1;
    }
  }
`

export class IconButton extends React.Component {
  static propTypes = {
    icon: React.PropTypes.oneOf(['back', 'dice']).isRequired,
    iconSize: React.PropTypes.number,
    invert: React.PropTypes.bool,
    onClick: React.PropTypes.func
  }

  static defaultProps = {
    iconSize: innerWidth,
    invert: false,
    onClick: Function.prototype
  }

  constructor(...args) {
    super(...args)
    this.state = {contentWidth: 0}
    this.getContentWidth = this.getContentWidth.bind(this)
  }

  getContentWidth(ref) {
    this.setState({
      contentWidth: ref ? ref.getBoundingClientRect().width : 0
    })
  }

  render() {
    const {children, label, icon, iconSize, invert, onClick} = this.props
    const {contentWidth} = this.state

    return (
      <Button
        icon={icon}
        iconSize={iconSize}
        invert={invert}
        contentWidth={contentWidth}
        onClick={onClick}
      >
        {(children || label) &&
          <span ref={this.getContentWidth}>
            {children || label}
          </span>
        }
      </Button>
    )
  }
}
