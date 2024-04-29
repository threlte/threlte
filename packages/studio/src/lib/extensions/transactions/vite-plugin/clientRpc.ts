import { createRPCClient } from 'vite-dev-rpc'
import type { ClientFunctions, ServerFunctions } from '../rpc'

const getClientRpc = () => {
  if (import.meta.hot) {
    return createRPCClient<ServerFunctions, ClientFunctions>('threlte-studio', import.meta.hot, {})
  }
  return undefined
}

export const clientRpc = getClientRpc()
