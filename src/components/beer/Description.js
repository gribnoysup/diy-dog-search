import React from 'react'
import {Card} from '../common/Card'

export const Description = ({description}) => (
  <Card title="This beer is">
    {description}
  </Card>
)
