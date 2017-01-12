import React from 'react'
import Process from '../Process'

export default class AsyncComponent extends React.Component {
  constructor(...args) {
    super(...args)
    this.state = {component: null}
  }

  componentDidMount() {
    const {getComponent} = this.props
    
    getComponent((error, component) => {
      if (!error && component) {
        this.setState({component})
      }
    })
  }

  render() {
    const {component: Component} = this.state
    // eslint-disable-next-line
    const {getComponent, ...restProps} = this.props
    return Component ? <Component {...restProps} /> : <Process />
  }
}
