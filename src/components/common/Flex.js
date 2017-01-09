import styled from 'styled-components'

export const FlexContainer = styled.div`
  display: flex;
  flex-direction: ${(props) => props.direction || 'row'};
  align-items: ${(props) => props.align || 'center'};
  justify-content: ${(props) => props.justify || 'flex-start'};
`
