import type { SvelteComponent } from 'svelte'

export default class Transform extends SvelteComponent<
  {
    name?: string
  },
  Record<string, any>,
  Record<string, any>
> {}
