import { observer } from 'mobx-react-lite'
import React from 'react'
import { Placeholder } from 'semantic-ui-react'

const Productplaceholder = () => {
  return (
    <Placeholder fluid>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
    <Placeholder.Paragraph>
      <Placeholder.Line />
      <Placeholder.Line />
      <Placeholder.Line />
    </Placeholder.Paragraph>
  </Placeholder>
  )
}

export default observer(Productplaceholder)