import { getContext } from 'svelte'
import type { InstancedSpriteUserCtx } from './InstancedSprite.svelte'
import { createSpritesheet, type SpritesheetFormat } from '@threejs-kit/instanced-sprite-mesh'
import type { Texture } from 'three'

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

export const buildSpritesheet = async <T extends SpriteMetaEntry[]>(
  meta: SpriteMetaEntry[]
): Promise<{
  animations: UseSpriteMetaConfig<T>
  spritesheet: SpritesheetFormat
  texture: Texture
}> => {
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

  const { spritesheet, texture } = await builder.build()
  return { spritesheet, texture, animations: animationsList }
}
