import React from 'react'
import Share from '../Share'

import {Card} from '../common/Card'

const baseUrl = `${window.location.protocol}//${window.location.host}/beer`

export const ShareBeer = ({name, id}) => (
  <Card title="Share this beer">
    <Share
      url={`${baseUrl}/${id}/`}
      title={'🍻 ' + name}
    />
  </Card>
)
