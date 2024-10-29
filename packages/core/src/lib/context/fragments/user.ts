import { setContext } from 'svelte'
import type { ThrelteUserContext } from '../../hooks/useThrelteUserContext'
import { currentWritable } from '../../utilities'

export const createUserContext = () => {
  const userCtx: ThrelteUserContext = currentWritable({})

  setContext<ThrelteUserContext>('threlte-user-context', userCtx)
}
