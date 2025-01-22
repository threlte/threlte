import type { Texture } from 'three'
import type {
  SpriteSheetData,
  SpriteSheetCreationProps,
  SpriteSheetFrame,
  SpriteSheetAnimation
} from './types'

export const defaultAnimationName = 'default'
type SupportedDataTypes = 'Aseprite'
type possibleJSONTypes = Aseprite_SpriteJsonHashData

/**
 * Creates metadata if no JSON file is supplied.
 */
export const createSpriteSheetDataFromProps = (
  propData: SpriteSheetCreationProps,
  texture: Texture
) => {
  const { width, height } = texture.image
  let { rows, columns } = propData
  const { data, totalFrames, animate, endFrame, startFrame } = propData

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
    if (animate && !totalFrames && !columns) {
      console.error('Provide either the totalFrames or columns to animate the sprite')
    }

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

    if (animate) {
      if (columns > 1) {
        if (startFrame != undefined && endFrame != undefined) {
          animations = [
            {
              name: defaultAnimationName,
              from: startFrame,
              to: endFrame,
              direction: 'forward'
            }
          ]
        } else {
          animations = [
            {
              name: defaultAnimationName,
              from: 0,
              to: numFrames - 1,
              direction: 'forward'
            }
          ]
        }
        // there should be enough information to create an animation
      } else {
        console.error(
          'To animate a sprite, please provide either totalFrames or columns greater than 1'
        )
      }
    }
  }
  return {
    texture: {
      width,
      height
    },
    frames,
    animations
  } satisfies SpriteSheetData
}

export const createSpriteSheetDataFromJSON = (
  JSON: possibleJSONTypes,
  format: SupportedDataTypes
) => {
  switch (format) {
    case 'Aseprite':
      return createFromAseprite(JSON)
    default:
      console.error(`The data format ${format} is not supported`)
      return undefined
  }
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

      animations.push({ name, from, to, direction: direction == 'reverse' ? 'reverse' : 'forward' })
    }
  }

  return {
    texture: {
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
