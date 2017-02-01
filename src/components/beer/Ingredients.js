import React from 'react'

import {Card} from '../common/Card'
import {DataTable} from '../common/Table'
import {IconWithTitle} from '../common/Icon'

import {getLbs} from '../../util/fn'

const nbsp = '\xA0'

function getMaltRows({malt}) {
  return malt.map((malt) => [
    malt.name,
    `${malt.amount.value}kg`,
    `${getLbs(malt.amount)}lb`
  ])
}

function getHopsRows({hops}) {
  const rows = hops.map(({add, amount, attribute, name}) => [
    name, amount.value.toFixed(2), add, attribute
  ])

  rows.unshift([nbsp, '(g)', 'Add', 'Attribute'])

  return rows
}

function getYeastRows({yeast}) {
  return [[yeast]]
}

export const Ingredients = ({ingredients}) => (
  <Card title="Ingredients">
    <IconWithTitle icon="malt">Malt</IconWithTitle>
    <DataTable rows={getMaltRows(ingredients)} alignment={['left', 'center', 'center']} cellWidth={['50%', '25%', '25%']} />
    <IconWithTitle icon="hops">Hops</IconWithTitle>
    <DataTable rows={getHopsRows(ingredients)} alignment={['left', 'right', 'center', 'center']} cellWidth={['25%', '25%', '25%', '25%']}/>
    <IconWithTitle icon="yeast">Yeast</IconWithTitle>
    <DataTable rows={getYeastRows(ingredients)} />
  </Card>
)
