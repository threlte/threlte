import type { Plugin } from '@threlte/core'
import type { Snippet } from 'svelte'

export interface InjectPluginProps {
  name: string
  plugin: Plugin
  children?: Snippet
}
