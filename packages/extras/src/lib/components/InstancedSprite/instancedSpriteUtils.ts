import { createSpritesheet } from '@threejs-kit/instanced-sprite-mesh'
import { getContext } from 'svelte'
import type { InstancedSpriteUserCtx } from './InstancedSprite.svelte'

export const useInstancedSprite = <T>(): InstancedSpriteUserCtx<T> => {
  return getContext('instanced-sprite-ctx') as InstancedSpriteUserCtx<T>
}

export type SpritesheetMetadata = {
  url: string
  type: 'rowColumn' | 'frameSize'
  width: number
  height: number
  animations: {
    name: string
    frameRange: [number, number]
  }[]
}[]

type SpriteMetaConfig = readonly Pick<SpritesheetMetadata[number], 'animations'>[]

export type UseSpriteMetaConfig<T extends SpriteMetaConfig> =
  T[number]['animations'][number]['name']

export const buildSpritesheet = <T extends SpritesheetMetadata>(
  meta: Readonly<SpritesheetMetadata>
): {
  useInstancedSprite: () => InstancedSpriteUserCtx<UseSpriteMetaConfig<T>>
  sheet: ReturnType<typeof builder.build>
} => {
  const builder = createSpritesheet()

  const animationsList: string[] = []

  for (const { url, type, width, height, animations } of meta) {
    for (const animation of animations) {
      animationsList.push(animation.name)
    }

    builder.add(
      url,
      {
        type,
        width,
        height
      },
      animations
    )
  }

  const sheet = builder.build()

  const typedHook = useInstancedSprite<UseSpriteMetaConfig<T>>

  return { sheet, useInstancedSprite: typedHook }
}
