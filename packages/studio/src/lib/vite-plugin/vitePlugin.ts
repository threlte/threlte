import type { Plugin } from 'vite'
import { createRPCServer } from 'vite-dev-rpc'
import * as hmr from './hmr/index.js'
import * as openInEditor from './open-in-editor/index.js'
import * as staticState from './static-state/index.js'
import * as transactions from './transactions/index.js'
import * as logger from './utils/logger.js'
import type * as rpc from '../rpc/rpc.js'

type Options = {
  apply?: 'serve' | 'build'
}

export const plugin: (options?: Options) => Plugin = (options) => {
  return {
    name: 'Threlte Studio',
    enforce: 'pre',
    apply: options?.apply,
    async transform(code, id) {
      // do not transform node_modules
      if (id.includes('node_modules')) return

      // transform static state
      try {
        code = await staticState.transformStaticState(code, id)
      } catch (err) {
        logger.logError({
          moduleId: id,
          error: err,
          context: logger.Context.ErrorTransformingStaticState
        })
        return
      }

      // transform component
      try {
        code = await transactions.transformComponent(code, id)
      } catch (err) {
        logger.logError({
          moduleId: id,
          context: logger.Context.ErrorCompilingComponent,
          error: err
        })
        return
      }

      return { code }
    },
    handleHotUpdate({ file }) {
      return hmr.scheduleModuleHmrAvailability(file)
    },
    config() {
      return {
        define: {
          __THRELTE_STUDIO_PLUGIN_ENABLED__: 'true'
        }
      }
    },
    configureServer(server) {
      createRPCServer<rpc.ClientFunctions, rpc.ServerFunctions>('threlte-studio', server.ws, {
        mutateStaticState(id, module, className, propertyName, value) {
          return staticState.mutateStaticState(id, module, className, propertyName, value)
        },
        async syncTransactions(t) {
          return await transactions.syncTransactions(t)
        },
        async getColumnAndRow(moduleId, componentIndex) {
          return await openInEditor.getColumnAndRow(moduleId, componentIndex)
        }
      })
    }
  }
}
