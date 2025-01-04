import type { Plugin } from 'vite'
import { createRPCServer } from 'vite-dev-rpc'
import * as hmr from './hmr'
import * as openInEditor from './open-in-editor'
import * as staticState from './static-state'
import * as transactions from './transactions'
import * as logger from './utils/logger'
import type * as rpc from '../rpc/rpc'

export const plugin: () => Plugin = () => {
  return {
    name: 'Threlte Studio',
    enforce: 'pre',
    apply: 'serve',
    transform(code, id) {
      // do not transform node_modules
      if (id.includes('node_modules')) return

      // transform static state
      try {
        code = staticState.transformStaticState(code, id)
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
        code = transactions.transformComponent(code, id)
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
        mutateStaticState(id, className, propertyName, value) {
          return staticState.mutateStaticState(id, className, propertyName, value)
        },
        syncTransactions(t) {
          return transactions.syncTransactions(t)
        },
        getColumnAndRow(moduleId, componentIndex, signature) {
          return openInEditor.getColumnAndRow(moduleId, componentIndex, signature)
        }
      })
    }
  }
}
