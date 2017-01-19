import React from 'react'
import styled from 'styled-components'
import detectPassiveEvents from 'detect-passive-events'

import {FlexContainer} from '../../components/common/Flex'
import {H1, Subheading} from '../../components/common/Typography'

import {TRANSITION} from '../../util/const'
import {scrollTop, toFixedFloat} from '../../util/fn'

import debounce from 'lodash/debounce'

const FixedDiv = styled.div`
  width: 760px;
  max-width: 100%;
  margin: 0 auto;
  box-sizing: border-box;
`

function Welcome({getDOMNode}) {
  return (
    <FixedDiv innerRef={getDOMNode}>
      <H1>
        BrewDog's DIY&nbsp;Dog Search<br />
        <Subheading>
          Search through BrewDog's DIY Dog recipes
        </Subheading>
      </H1>
    </FixedDiv>
  )
}

const FlexWithPadding = styled(FlexContainer)`
  min-height: 56px;
  box-sizing: border-box;
`

const AnimatedDiv = styled(FixedDiv)`
  padding: 0 20px;
  margin-top: 0;
  transition: margin ${TRANSITION.SearchBar}s ease,
              width ${TRANSITION.SearchBar}s ease,
              background-color ${TRANSITION.SearchBar}s ease,
              color ${TRANSITION.SearchBar}s ease;

  ${(props) => (props.isActive || props.isFixed) ? `
    width: 100%;
    background-color: #000000;
    color: #ffffff;
  ` : `
    background-color: #ffffff;
    color: #000000;
  `}

  ${(props) => props.isActive ? `
    margin-top: -${toFixedFloat(props.top, 2)}px;
  ` : ''}

  ${(props) => props.isFixed ? `
    margin-top: -${toFixedFloat(props.offsetTop, 2)}px;
    position: fixed;
    z-index: 999;
    left: 0;
    top: 0;
  ` : ''}
`

AnimatedDiv.displayName = 'AnimatedDiv'

export const ACTIVE_TYPES = {
  active: 'active',
  inactive: 'inactive'
}

export class SearchContainer extends React.Component {
  static propTypes = {
    isActive: React.PropTypes.bool,
    onActiveChange: React.PropTypes.func
  }

  static defaultProps = {
    onActiveChange: Function.prototype
  }

  constructor(...args) {
    super(...args)
    this.state = {
      isFixed: false,
      keepFixed: false,
      offsetTop: 0,
      top: 0
    }

    this.onTransitionEnd = debounce(this.handleTransitionEnd.bind(this), 16)
    this.onScroll = this.handleScroll.bind(this)
  }

  getTop() {
    return this.searchBarNode ? this.searchBarNode.getBoundingClientRect().top : 0
  }

  getOffsetTop() {
    return this.searchBarNode ? this.searchBarNode.offsetTop : 0
  }

  getSearchBarHeight() {
    return this.searchBarNode ? this.searchBarNode.getBoundingClientRect().height : 0
  }

  getContainerHeight() {
    return this.containerNode ? this.containerNode.getBoundingClientRect().height : 0
  }

  handleTransitionEnd(event) {
    const {isActive, onActiveChange} = this.props

    if (!isActive) {
      onActiveChange({type: ACTIVE_TYPES.inactive})
    } else {
      // this.update()

      window.scrollTo(0, 0)
      this.containerNode.style.transition = 'none'
      this.containerNode.getBoundingClientRect()

      requestAnimationFrame(() => {
        this.setState({isFixed: true})
        onActiveChange({type: ACTIVE_TYPES.active})
      })
    }
  }

  handleScroll(event) {
    this.setState((prevState, {isActive}) => {
      const {keepFixed, isFixed} = prevState
      const newState = {keepFixed: false}

      if (isActive && isFixed) {
        newState.keepFixed = true
      } else if (keepFixed === true && scrollTop() > 0) {
        newState.keepFixed = true
      }

      if (newState.keepFixed !== keepFixed) return Object.assign({}, prevState, newState)
    })
  }

  componentDidMount() {
    if (detectPassiveEvents.hasSupport === true) {
      window.addEventListener('scroll', this.onScroll, {passive: true})
    } else {
      window.addEventListener('scroll', this.onScroll)
    }
  }

  componentWillReceiveProps(newProps) {
    if (newProps.isActive === false) {
      this.containerNode.style.transition = ''
      this.setState((prevState) =>
        Object.assign({}, prevState, {
          isFixed: false,
          keepFixed: scrollTop() > 0
        })
      )
    }

    if (newProps.isActive !== this.props.isActive) {
      this.update()
    }
  }

  update(additionalState = {}) {
    return this.setState((prevState) =>
      Object.assign({}, prevState, {
        top: this.getTop(),
        offsetTop: this.getOffsetTop()
      }, additionalState)
    )
  }

  componentDidUpdate() {
    const {isFixed, keepFixed} = this.state

    if (isFixed || keepFixed) {
      document.body.style.paddingTop = this.getSearchBarHeight() + 'px'
    } else {
      document.body.style.paddingTop = ''
    }

  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.onScroll)
    document.body.style.paddingTop = ''
  }

  getChildren() {
    const {offsetTop, top, isFixed, keepFixed} = this.state
    const {isActive, children} = this.props

    if (typeof children === 'function') {
      return children({offsetTop, top, fixed: isFixed, keepFixed, active: isActive})
    }

    return React.Children.map(this.props.children, (child) =>
      React.cloneElement(child, {
        fixed: this.state.isFixed,
        keepFixed: this.state.keepFixed,
        active: this.props.isActive
      })
    )
  }

  render() {
    // eslint-disable-next-line
    const {isActive, onActiveChange, ...restProps} = this.props
    const {offsetTop, top, isFixed, keepFixed} = this.state

    return (
      <AnimatedDiv
        top={top}
        offsetTop={offsetTop}
        isActive={isActive}
        isFixed={isFixed || keepFixed}
        onTransitionEnd={this.onTransitionEnd}
        innerRef={(ref) => this.containerNode = ref}
        {...restProps}
      >
        <Welcome />
        <FlexWithPadding innerRef={(ref) => this.searchBarNode = ref}>
          {this.getChildren()}
        </FlexWithPadding>
      </AnimatedDiv>
    )


  }
}
