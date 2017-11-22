import React from 'react'
import HypernovaServer from 'hypernova/server'
import { renderReact } from 'hypernova-react'
import { UniversalController } from 'cerebral'
import { Container } from '@cerebral/react'
import logger from './lib/logger'
import config from '../config'
import App from '../src/components/App'

// Boot hypernova render server
logger.debug('[render.jsx] booting hypernova server')
HypernovaServer({
  devMode: true,

  // TODO: should i require the component on the top of the file or here?
  // TODO: should i bypass the cache to reload changes on the code?
  // TODO: Render errors are swallowed by hypernova
  getComponent(name) {
    try {
      logger.debug(`[render.jsx] hypernova - getComponent - name: ${name}`)

      const AppWrapper = ({ name, data }) => {
        console.log(
          '[render.jsx] rendering AppWrapper with initial state',
          name,
          data
        )

        const controller = UniversalController({ state: data })

        return React.createElement(
          Container,
          { controller: controller },
          React.createElement(App, null)
        )
      }

      // TODO: Render error are swallowed by hypernova
      return renderReact('App', AppWrapper)
    } catch (e) {
      logger.error(
        '[Error - hypernova.js - getComponent()]',
        e.message,
        e.stack
      )
      throw e
    }
  },

  port: config.hypernovaPort,
})
