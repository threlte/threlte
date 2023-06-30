import type { SvelteComponent } from 'svelte'

export default class Transform extends SvelteComponent<
  {
    name?: string
    mode?: 'translate' | 'rotate' | 'scale'
  },
  Record<string, any>,
  Record<string, any>
> {}
