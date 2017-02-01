import React from 'react'

import {Card} from '../common/Card'
import {DataTable} from '../common/Table'
import {IconWithContent} from '../common/Icon'

function getFoodRows(pairings) {
  return pairings.map((pairing) => [pairing])
}

export const Pairings = ({foodPairing}) => (
  <Card title="Food Pairing">
    <IconWithContent icon="food">
      <DataTable noPadding rows={getFoodRows(foodPairing)} />
    </IconWithContent>
  </Card>
)
