import React from 'react'

import {Card} from '../common/Card'
import {DataTable} from '../common/Table'
import {IconWithTitle} from '../common/Icon'

import {getFarenheit} from '../../util/fn'

const nbsp = '\xA0'

function getMashRows({mash_temp}) {
  return mash_temp.map(({duration, temp}) => [
    `${temp.value}°C`,
    `${getFarenheit(temp)}°F`,
    `${duration}mins`
  ])
}

function getFermentationRows({fermentation}) {
    return [
      [
        `${fermentation.temp.value}°C`,
        `${getFarenheit(fermentation.temp)}°F`,
        nbsp
      ]
    ]
}

function getTwistRows({twist}) {
  return [[twist]]
}

export const Method = ({method}) => (
  <Card title="Method / Timings">
    <IconWithTitle icon="mash">Mash Temp</IconWithTitle>
    <DataTable rows={getMashRows(method)} cellWidth={['33%', '33%', '33%']} />
    <IconWithTitle icon="fermenter">Fermentation</IconWithTitle>
    <DataTable rows={getFermentationRows(method)} cellWidth={['33%', '33%', '33%']} />
    {method.twist && <IconWithTitle icon="star">Twist</IconWithTitle>}
    {method.twist && <DataTable rows={getTwistRows(method)} />}
  </Card>
)
