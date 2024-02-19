import { createSpritesheet, parseAseprite } from '@threejs-kit/instanced-sprite-mesh'
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

const from = <T extends SpritesheetMetadata>(
  meta: Readonly<SpritesheetMetadata>
): {
  useInstancedSprite: () => InstancedSpriteUserCtx<UseSpriteMetaConfig<T>>
  result: ReturnType<typeof builder.build>
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

  const result = builder.build()

  const typedHook = useInstancedSprite<UseSpriteMetaConfig<T>>

  return { result, useInstancedSprite: typedHook }
}

const fromAseprite = (asepriteDataUrl: string) => {
  const parse = async () => {
    const res = await fetch(asepriteDataUrl)
    const json = await res.json()
    return { spritesheet: parseAseprite(json) }
  }

  return {
    result: parse()
  }
}

export const buildSpritesheet = { from, fromAseprite }
