import { type Texture, FileLoader } from 'three'
import { asyncWritable, type AsyncWritable, useLoader } from '@threlte/core'
import type {
  SpriteSheetData,
  SpriteSheetCreationProps,
  SpriteSheetFrame,
  SpriteSheetAnimation
} from './types'

export const defaultAnimationName = 'default'
export enum Direction {
  forward = 1,
  reverse = -1
}

type SupportedDataTypes = 'Aseprite'

/**
 * Creates metadata if no JSON file is supplied.
 */
export const createFromProps = (
  propData: SpriteSheetCreationProps,
  textureStore: AsyncWritable<Texture | undefined>
) => {
  return asyncWritable<SpriteSheetData | undefined>(
    new Promise((resolve) => {
      const unsub = textureStore.subscribe((value) => {
        if (!value) return
        unsub()
        resolve(create(propData, value))
      })
    })
  )
}

function create(propData: SpriteSheetCreationProps, texture: Texture) {
  const { width, height } = texture.image
  let { rows, columns } = propData
  const { data, totalFrames, endFrame, startFrame } = propData

  const frames: SpriteSheetFrame[] = []
  let animations: SpriteSheetAnimation[] | undefined

  if (!columns) columns = totalFrames ?? 1
  if (!rows) rows = 1

  if (data != undefined) {
    if (data.frames) {
      frames.push(...data.frames)
    }
    if (data.animations) {
      animations = data.animations
    }
  } else {
    const spriteWidth = width / columns
    const spriteHeight = height / rows

    const numFrames = rows * columns

    for (let i = 0; i < numFrames; i += 1) {
      // Calculate the row and column for the current frame
      const row = Math.floor(i / columns)
      const col = i % columns

      // Calculate the x, y coordinates of the frame within the sprite sheet
      const x = col * spriteWidth
      const y = row * spriteHeight

      frames.push({
        x,
        y,
        width: spriteWidth,
        height: spriteHeight
      })
    }

    // with many columns we can create an animation
    if (columns > 1) {
      if (startFrame != undefined && endFrame != undefined) {
        animations = [
          {
            name: defaultAnimationName,
            from: startFrame,
            to: endFrame
          }
        ]
      } else {
        animations = [
          {
            name: defaultAnimationName,
            from: 0,
            to: numFrames - 1
          }
        ]
      }
    }
  }
  return {
    size: {
      width,
      height
    },
    frames,
    animations
  } satisfies SpriteSheetData
}

export const createFromJSON = (jsonURL: string, format: SupportedDataTypes) => {
  return useLoader(FileLoader).load(jsonURL, {
    transform: (file) => {
      try {
        if (typeof file !== 'string') throw 'expected string file format'
        const data = JSON.parse(file)
        switch (format) {
          case 'Aseprite':
            return createFromAseprite(data as Aseprite_SpriteJsonHashData)
          default:
            console.error(`The data format ${format} is not supported`)
            return undefined
        }
      } catch (err) {
        console.error(err)
        return undefined
      }
    }
  })
}

function createFromAseprite(JSON: Aseprite_SpriteJsonHashData) {
  const { w: width, h: height } = JSON.meta.size

  const frames: SpriteSheetFrame[] = []
  let animations: SpriteSheetAnimation[] | undefined

  for (const key in JSON.frames) {
    const { x, y, w, h } = JSON.frames[key].frame

    const name = key.replace('.aseprite', '')
    const duration = JSON.frames[key].duration

    let output
    if (duration) {
      output = { x, y, width: w, height: h, name, duration }
    } else {
      output = { x, y, width: w, height: h, name }
    }

    frames.push(output)
  }

  if (JSON.meta.frameTags.length > 0) {
    animations = []
    for (let i = 0; i < JSON.meta.frameTags.length; i++) {
      const { direction, from, name, to } = JSON.meta.frameTags[i]

      animations.push({
        name,
        from,
        to,
        direction: direction == 'reverse' ? Direction.reverse : Direction.forward
      })
    }
  }

  return {
    size: {
      width,
      height
    },
    frames,
    animations
  } satisfies SpriteSheetData
}

export type Aseprite_Frame = {
  frame: { x: number; y: number; w: number; h: number }
  spriteSourceSize: { x: number; y: number; w: number; h: number }
  sourceSize: { w: number; h: number }
  duration?: number
}

export type Aseprite_FrameTag = {
  name: string
  from: number
  to: number
  direction: string
}

export type Aseprite_SpriteJsonHashData = {
  frames: Record<string, Aseprite_Frame>
  meta: {
    app: string
    image: string
    version: string
    format: string
    size: { w: number; h: number }
    scale: number
    frameTags: Aseprite_FrameTag[]
  }
}
