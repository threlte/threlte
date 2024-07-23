import type { Snippet, SvelteComponent } from 'svelte'

export type TransformProps<T extends string | undefined> = {
  label?: T
  mode?: 'translate' | 'rotate' | 'scale'
  translationSnap?: number
  rotationSnap?: number
  scaleSnap?: number
  space?: 'world' | 'local'

  children?: Snippet
} & (T extends string
  ? {
      key: string
    }
  : {
      key?: string
    })

export default class Transform<Label extends string | undefined> extends SvelteComponent<
  TransformProps<Label>
> {}
