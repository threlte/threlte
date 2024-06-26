import { getContext, setContext } from 'svelte'

const key = Symbol('threlte-instance-id')

export const createInstanceIdContext = (uuid: string) => {
  setContext(key, uuid)
}

export const useInstanceId = () => {
  return getContext<string>(key) ?? 'default'
}
