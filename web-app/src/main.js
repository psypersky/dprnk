import React from 'react'
import { renderReact } from 'hypernova-react'
import { Container } from '@cerebral/react'
import Controller from './controller'

import App from './components/App'

const AppWrapper = ({ name, data }) => {

  const controller = new Controller({ state: data })

  return React.createElement(
    Container,
    { controller: controller },
    React.createElement(App, null)
  )
}

export default renderReact('App', AppWrapper)
