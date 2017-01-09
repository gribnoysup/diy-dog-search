import React from 'react'
import styled from 'styled-components'

function getStylesArray({alignment, cellWidth}) {
  const styles = []

  if (Array.isArray(alignment)) {
    alignment.forEach((rule, idx) => {
      if (typeof styles[idx] === 'undefined') {
        styles[idx] = ''
      }

      styles[idx] += `text-align: ${rule};`
    })
  }

  if (Array.isArray(cellWidth)) {
    cellWidth.forEach((rule, idx) => {
      if (typeof styles[idx] === 'undefined') {
        styles[idx] = ''
      }

      styles[idx] += `width: ${rule};`
    })
  }

  return styles
}

export const Table = styled.table`
  width: 100%;
  margin-bottom: 15px;
  border-collapse: collapse;
  ${(props) => getStylesArray(props)
    .map((style, idx) => !style ? '' : `
      & tr td:nth-child(${idx + 1}) {
        ${style}
      }
  `)}

  ${(props) => !props.noPadding ? '' : `
    & tr:first-child td {
      padding-top: 0;
    }
  `}
`

export const TBody = styled.tbody``
export const TR = styled.tr``
export const TD = styled.td`
  padding: 7px 5px;
  border-bottom: 1px solid #a4a6a8;
`

export const ScrollableContainer = styled.div`
  width: 100%;
  overflow-x: auto;
`

export function DataTable({rows, ...props}) {
  return (
    <ScrollableContainer>
      <Table {...props}>
        <TBody>
          {rows.map((cells, idx) => {
            return (
              <TR key={idx}>
                {cells.map((cell, idx) => {
                  return (
                    <TD key={idx}>{cell}</TD>
                  )
                })}
              </TR>
            )
          })}
        </TBody>
      </Table>
    </ScrollableContainer>
  )
}
