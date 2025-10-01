import { getContext, setContext } from 'svelte'

const key = 'ExampleContext'

export function setCodeExampleContext(args: { currentFilePath: string }) {
  setContext(key, args)
}

export function getCodeExampleContext() {
  return getContext(key) as { currentFilePath: string }
}
