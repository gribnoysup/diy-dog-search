import React from 'react'

import {Card} from '../common/Card'
import {DataTable} from '../common/Table'

import {getGallons} from '../../util/fn'

const nbsp = '\xA0'

function getBasicsRows({
  volume,
  boil_volume,
  abv,
  target_fg,
  target_og,
  ebc,
  srm,
  ph,
  attenuation_level
}) {
  return [
    [<b>Volume</b>, `${volume.value}L`, `${getGallons(volume)}gal`],
    [<b>Boil Volume</b>, `${boil_volume.value}L`, `${getGallons(boil_volume)}gal`],
    [<b>ABV</b>, nbsp, `${abv}%`],
    [<b>Target FG</b>, nbsp, `${target_fg}`],
    [<b>Target OG</b>, nbsp, `${target_og}`],
    [<b>EBC</b>, nbsp, `${ebc}`],
    [<b>SRM</b>, nbsp, `${srm}`],
    [<b>PH</b>, nbsp, `${ph}`],
    [<b>Attenuation Level</b>, nbsp, `${attenuation_level}%`],
  ]
}

export const Basics = ({beer}) => (
  <Card title="Basics">
    <DataTable rows={getBasicsRows(beer)} alignment={['left', 'right', 'right']} />
  </Card>
)
