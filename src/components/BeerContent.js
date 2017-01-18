import React from 'react'
import styled from 'styled-components'

import {Content} from './layout/Layout'
import {Card} from './common/Card'
import {P as AP} from './common/Typography'
import {DataTable} from './common/Table'
import {FlexContainer} from './common/Flex'
import {Icon} from './common/Icon'
import {Link} from './common/Link'
import Share from './Share'

import {Grid, Unit as AUnit} from './layout/Grid'

const nbsp = '\xA0'

const Unit = styled(AUnit)`
  @media screen and (min-width: 48em) {
    &:first-child {
      padding-right: 12px;
    }

    &:last-child {
      padding-left: 12px;
    }
  }
`

const Title = styled.h2`
  text-transform: uppercase;
  margin: 15px 0;
`

const Subtitle = styled.div`
  padding: 10px 0;
  text-transform: uppercase;
  font-weight: bold;
  border-top: 6px solid;
  border-bottom: 6px solid;
`

const SmallTitle = styled.small`
  font-weight: bold;
  text-transform: uppercase;
  padding: 0 10px;
`

const DivWithPadding = styled.div`
  flex: 1;
  padding: 0 10px;
`

const P = styled(AP)`
  margin-top: 10px;

  &:last-child {
    margin-bottom: 10px;
  }
`

function IconWithTitle({icon, children}) {
  return (
    <FlexContainer>
      <Icon icon={icon} invert/>
      {children && <SmallTitle>{children}</SmallTitle>}
    </FlexContainer>
  )
}

function IconWithContent({icon, children}) {
  return (
    <FlexContainer align="flex-start">
      <Icon icon={icon} invert/>
      {children && <DivWithPadding>{children}</DivWithPadding>}
    </FlexContainer>
  )
}

function getGallons({unit, value}) {
  switch (unit) {
    case 'liters':
      return (value * 0.264172).toFixed(2)
    case 'gallons':
    default:
      return (value).toFixed(2)
  }
}

function getLbs({unit, value}) {
  switch (unit) {
    case 'kilograms':
      return (value * 2.20462).toFixed(2)
    case 'lbs':
    default:
      return (value).toFixed(2)
  }
}

function getFarenheit({unit, value}) {
  switch (unit) {
    case 'celsius':
      return (value * 1.8 + 32).toFixed(2)
    case 'farenheit':
    default:
      return (value).toFixed(2)
  }
}

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

function getFoodRows(pairings) {
  return pairings.map((pairing) => [pairing])
}

export default function BeerContent(props) {
  const {
    name,
    tagline,
    description,
    method,
    ingredients,
    food_pairing,
    brewers_tips,
    contributed_by
  } = props

  return (
    <Content>
      <Title>{name}</Title>
      <Subtitle>{tagline}</Subtitle>

      <Card title="This beer is">
        {description}
      </Card>

      <Grid>

        <Unit md={1/2}>
          <Card title="Basics">
            <DataTable rows={getBasicsRows(props)} alignment={['left', 'right', 'right']} />
          </Card>
        </Unit>

        <Unit md={1/2}>
          <Card title="Method / Timings">
            <IconWithTitle icon="mash">Mash Temp</IconWithTitle>
            <DataTable rows={getMashRows(method)} cellWidth={['33%', '33%', '33%']} />
            <IconWithTitle icon="fermenter">Fermentation</IconWithTitle>
            <DataTable rows={getFermentationRows(method)} cellWidth={['33%', '33%', '33%']} />
            {method.twist && <IconWithTitle icon="star">Twist</IconWithTitle>}
            {method.twist && <DataTable rows={getTwistRows(method)} />}
          </Card>
        </Unit>

      </Grid>

      <Card title="Ingredients">
        <IconWithTitle icon="malt">Malt</IconWithTitle>
        <DataTable rows={getMaltRows(ingredients)} alignment={['left', 'center', 'center']} cellWidth={['50%', '25%', '25%']} />
        <IconWithTitle icon="hops">Hops</IconWithTitle>
        <DataTable rows={getHopsRows(ingredients)} alignment={['left', 'right', 'center', 'center']} cellWidth={['25%', '25%', '25%', '25%']}/>
        <IconWithTitle icon="yeast">Yeast</IconWithTitle>
        <DataTable rows={getYeastRows(ingredients)} />
      </Card>

      <Grid>

        <Unit md={1/2}>
          <Card title="Food Pairing">
            <IconWithContent icon="food">
              <DataTable noPadding rows={getFoodRows(food_pairing)} />
            </IconWithContent>
          </Card>
        </Unit>

        <Unit md={1/2}>
          <Card title="Brewer's Tip">
            <IconWithContent icon="insight">{brewers_tips}</IconWithContent>
          </Card>
        </Unit>

      </Grid>

      <Card title="Acknowledgments">
        <P>
          Recipe from <Link href="https://www.brewdog.com/diydog">BrewDog's DIY Dog</Link>
        </P>
        <P>
          Contributed to <Link href="https://punkapi.com/">Punk API</Link> by <b>{contributed_by}</b>
        </P>
      </Card>

      <Card title="Share this beer">
        <Share
          url={window.location.href}
          title={name}
          // description={`OMG!`}
        />
      </Card>

    </Content>
  )
}
