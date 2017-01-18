import React from 'react'
import styled from 'styled-components'
import {ShareButtons, generateShareIcon} from 'react-share'

import {FlexContainer} from './common/Flex'

const {FacebookShareButton, TwitterShareButton, VKShareButton} = ShareButtons

const FacebookIcon = generateShareIcon('facebook')
const TwitterIcon = generateShareIcon('twitter')
const VKIcon = generateShareIcon('vk')



const icons = {
  facebook: FacebookIcon,
  twitter: TwitterIcon,
  vk: VKIcon
}

Object.keys(icons).forEach((provider) => {
  icons[provider] = styled(icons[provider])`
    cursor: pointer;
    transition: transform .16s ease;

    &:hover {
      transform: scale(1.17);
    }
  `
})

const buttons = {
  facebook: FacebookShareButton,
  twitter: TwitterShareButton,
  vk: VKShareButton
}

const ShareBlockContainer = styled.div`
  padding: 5px;
`

function ShareBlock({network, url, title, description}) {
  const Icon = icons[network]
  const Button = buttons[network]

  return (
    <ShareBlockContainer>
      <Button url={url} title={title} description={description}>
        <Icon size={48} round={true} />
      </Button>
    </ShareBlockContainer>
  )
}

const ShareContainer = styled(FlexContainer)`
  max-width: 280px;
  margin: 0 auto;
  flex: 1;
`

export default function Share({url, title, description}) {
  return (
    <ShareContainer align="center" justify="space-around">
      <ShareBlock network="facebook" url={url} title={title} description={description} />
      <ShareBlock network="twitter" url={url} title={title}/>
      <ShareBlock network="vk" url={url} title={title} description={description} />
    </ShareContainer>
  )
}

Share.propTypes = {
  url: React.PropTypes.string.isRequired,
  title: React.PropTypes.string,
  description: React.PropTypes.string
}
