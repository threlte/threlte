import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import { Mesh, Sprite } from 'three'


export type Frame = {
  frame: { x: number, y: number, w: number, h: number },
  spriteSourceSize: { x: number, y: number, w: number, h: number },
  sourceSize: { w: number, h: number },
  duration: number
}

export type FrameTag = {
  name: string
  from: number
  to: number
  direction: string
}

export type SpriteJsonHashData = {
  frames: Record<string, Frame>
  meta: {
    app: string,
    image: string,
    version: string,
    format: string,
    size: { w: number, h: number },
    scale: number
    frameTags: FrameTag[]
  }
}

export type AnimatedSpriteProps = Props<Mesh | Sprite> & {
  /** The current playing animation */
  animation?: string

  /** The URL of the texture image */
  image: string

  /** The start frame of the animation */
  startFrame?: number

  /** The end frame of the animation */
  endFrame?: number

  /** The desired frames per second of the animaiton */
  fps?: number

  /** The URL of the texture JSON (if using JSON-Hash) */
  textureData?: string

  /** Whether or not the animation should loop */
  loop?: boolean

  /** The number of frames of the animation (required if using plain spritesheet without JSON) */
  numberOfFrames?: number

  /** The animation names of the spritesheet */
  animationNames?: string[]

  /** Control when the animation runs */
  playing?: boolean

  /** Whether or not the Sprite should flip sides on the x-axis */
  flipX?: boolean

  /** Sets the alpha value to be used when running an alpha test. https://threejs.org/docs/#api/en/materials/Material.alphaTest */
  alphaTest?: number

  /** Displays the texture on a SpriteGeometry always facing the camera, if set to false, it renders on a PlaneGeometry */
  asSprite?: boolean
  
  transparent?: boolean
}


export type AnimatedSpriteEvents = Events<Mesh | Sprite> & {
  /** Fires when an animation starts */
  start: void
  /** Fires when an animation ends */
  end: void
  /** Fires when an animation loop completes */
  loop: void
}


export type AnimatedSpriteSlots = Slots<Mesh | Sprite>

export default class AnimatedSprite extends SvelteComponent<
  AnimatedSpriteProps,
  AnimatedSpriteEvents,
  AnimatedSpriteSlots
> {}
