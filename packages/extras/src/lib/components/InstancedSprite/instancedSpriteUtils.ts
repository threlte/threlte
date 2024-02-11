import { createSpritesheet } from '@threejs-kit/instanced-sprite-mesh'
import { getContext } from 'svelte'
import type { InstancedSpriteUserCtx } from './InstancedSprite.svelte'

export const useInstancedSprite = <T>(): InstancedSpriteUserCtx<T> => {
  return getContext('instanced-sprite-ctx') as InstancedSpriteUserCtx<T>
}

export type SpriteMetaEntry = {
  readonly url: string
  readonly type: 'rowColumn' | 'frameSize'
  readonly w: number
  readonly h: number
  readonly animations: {
    readonly name: string
    readonly frameRange: [number, number]
  }[]
}

type SpriteMetaConfig = readonly Pick<SpriteMetaEntry, 'animations'>[]

export type UseSpriteMetaConfig<T extends SpriteMetaConfig> =
  T[number]['animations'][number]['name']

export const buildSpritesheet = <T extends SpriteMetaEntry[]>(
  meta: SpriteMetaEntry[]
): {
  useInstancedSprite: () => InstancedSpriteUserCtx<UseSpriteMetaConfig<T>>
  sheet: typeof builder.build
} => {
  const builder = createSpritesheet()

  const animationsList: string[] = []

  for (const { url, type, w, h, animations } of meta) {
    for (const animation of animations) {
      animationsList.push(animation.name)
    }

    builder.add(
      url,
      {
        type,
        w,
        h
      },
      animations
    )
  }

  const sheet = builder.build()

  const typedHook = useInstancedSprite<UseSpriteMetaConfig<T>>

  return { sheet, useInstancedSprite: typedHook }
}
