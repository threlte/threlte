import type { SvelteComponent } from 'svelte'

export default class Transform<Label extends string | undefined> extends SvelteComponent<
  {
    label?: Label
    mode?: 'translate' | 'rotate' | 'scale'
    translationSnap?: number
    rotationSnap?: number
    scaleSnap?: number
    space?: 'world' | 'local'
  } & (Label extends string
    ? {
        key: string
      }
    : {
        key?: string
      }),
  Record<string, unknown>,
  Record<string, unknown>
> {}
