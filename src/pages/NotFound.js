import React from 'react'
import CenteredText from '../components/CenteredText'
import {Link} from './Router'

const NotFound = () => (
  <CenteredText>
    <p>Not found</p>
    <p>
      <Link href='/'>← Go back</Link>
    </p>
  </CenteredText>
)

export default NotFound
