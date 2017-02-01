import React from 'react'

import {Card} from '../common/Card'
import {IconWithContent} from '../common/Icon'

export const Tips = ({tips}) => (
  <Card title="Brewer's Tip">
    <IconWithContent icon="insight">
      {tips}
    </IconWithContent>
  </Card>
)
