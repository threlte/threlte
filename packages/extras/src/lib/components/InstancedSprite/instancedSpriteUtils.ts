import { createSpritesheet, parseAseprite } from '@threejs-kit/instanced-sprite-mesh'
import { getContext } from 'svelte'
import type { InstancedSpriteUserCtx } from './types.js'
import { NearestFilter, RepeatWrapping, SRGBColorSpace, TextureLoader } from 'three'

// todo move some of the types upstream to @threejs-kit
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
  spritesheet: ReturnType<typeof builder.build>
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

  const spritesheet = builder.build()

  const typedHook = useInstancedSprite<UseSpriteMetaConfig<T>>

  return { spritesheet, useInstancedSprite: typedHook }
}

// todo refactor. Loader reuse, awaits, colorspace stuff
const fromAseprite = (asepriteDataUrl: string, spriteImageUrl: string) => {
  const texture = new TextureLoader().load(spriteImageUrl, (t) => {
    t.matrixAutoUpdate = false
    t.generateMipmaps = false
    t.premultiplyAlpha = false
    t.wrapS = texture.wrapT = RepeatWrapping
    t.magFilter = texture.minFilter = NearestFilter
    t.colorSpace = SRGBColorSpace
    t.needsUpdate = true
  })

  const parse = async () => {
    const res = await fetch(asepriteDataUrl)
    const json = await res.json()
    return { spritesheet: parseAseprite(json), texture }
  }

  return parse()
}

export const buildSpritesheet = { from, fromAseprite }
