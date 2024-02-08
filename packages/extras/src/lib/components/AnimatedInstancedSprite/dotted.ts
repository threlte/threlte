import AnimatedInstancedSprite from './AnimatedInstancedSprite.svelte'
import SpriteDummyRoot from './SpriteDummyRoot.svelte'
import SpriteAnimation from './SpriteAnimation.svelte'
import SpriteFile from './SpriteFile.svelte'
import SpriteInstance from './SpriteInstance.svelte'
import Spritesheet from './Spritesheet.svelte'

export class InstancedSprite extends SpriteDummyRoot {
  static Sheet = Spritesheet
  static File = SpriteFile
  static Animation = SpriteAnimation
  static Core = AnimatedInstancedSprite
  static Instance = SpriteInstance
}
