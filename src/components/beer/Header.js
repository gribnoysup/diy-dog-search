import React from 'react'

import {Header} from '../layout/Layout'
import {IconButton} from '../common/IconButton'

export const HeaderBeer = ({onBackClick, onRndClick}) => (
  <Header sticky>
    <IconButton
      invert
      icon="back"
      label="Back"
      onClick={onBackClick}
    />
    <IconButton
      invert
      icon="dice"
      label="Random"
      onClick={onRndClick}
    />
  </Header>
)
