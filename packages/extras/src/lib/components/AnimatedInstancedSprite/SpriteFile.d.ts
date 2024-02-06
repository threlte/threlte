import type { createSpritesheet } from '@threejs-kit/instanced-sprite-mesh'
import { SvelteComponent } from 'svelte'

export type SpriteFileProps = {
  textureUrl: string
  options: Parameters<ReturnType<typeof createSpritesheet>['add']>['1']
}

export default class SpriteFile extends SvelteComponent<SpriteFileProps> {}
