import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'

import {injectGlobal} from 'styled-components'
import {fontFamilyDefault} from './components/common/Typography'

import App from './App'
import store from './store/store'

// eslint-disable-next-line
injectGlobal`
  html {
    height: 100%;
  }
  body {
    margin: 0;
    padding: 0;
    width: 100%;
    min-width: 320px;
    height: 100%;
    box-sizing: border-box;
    font-family: ${fontFamilyDefault};
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
    width: 100%;
    height: 100%;
  }
`

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
