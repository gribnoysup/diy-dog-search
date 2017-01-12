import styled from 'styled-components'
import {fontFamilyMonospace} from '../common/Typography'

export const Container = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
`

Container.displayName = 'Container'

export const Header = styled.div`
  background-color: #000000;
  display: flex;
  align-items: center;
  width: 100%;
  min-height: 56px;
  padding: 0 20px;
  box-sizing: border-box;
`

Header.displayName = 'Header'

export const Content = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: 0 20px;
  margin: 20px auto;
  width: 100%;
  max-width: 760px;
  box-sizing: border-box;
`

Content.displayName = 'Content'

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100%;
`

Body.displayName = 'Body'

export const Footer = styled.div`
  width: 100%;
  box-sizing: border-box;
  ${''/* background-color: #00afdb;*/}
  ${''/* background-color: #3A3637;*/}
  background-color: #000000;
  color: #ffffff;

  font-family: ${fontFamilyMonospace};
  font-size: 12px;
  font-weight: bold;

  padding: 20px 10px;
  display: flex;
  flex-direction: column;
  align-items: center;

  & a {
    color: #ffffff;
    &:visited {
      ${''/* color: #adefff;*/}
      color: #afafaf;
    }
  }

  & div {
    padding: 10px 0;
    text-align: center;
    max-width: 420px;
  }
`

Footer.displayName = 'Footer'
