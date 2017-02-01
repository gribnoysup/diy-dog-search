import {keyframes as kf} from 'styled-components'

const fadeIn = kf`
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
`

export const keyframes = {
  fadeIn
}
