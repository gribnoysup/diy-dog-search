import React from 'react'
import ReactDOM from 'react-dom'
import {injectGlobal} from 'styled-components'
import App from './App'

// eslint-disable-next-line
injectGlobal`
  html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    min-height: 100%;
    font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Open Sans","Helvetica Neue",sans-serif;
    letter-spacing: 0;
    font-weight: 400;
    font-style: normal;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    -moz-font-feature-settings: "liga" on;
    color: rgba(0, 0, 0, .8);
    font-size: 18px;
    line-height: 1.4;
  }
  #root {
    position: absolute;
    width: 100%;
    height: 100%;
  }
`

ReactDOM.render(
  <App />,
  document.getElementById('root')
)
