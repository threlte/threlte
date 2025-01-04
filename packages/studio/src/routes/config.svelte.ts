import { StaticState } from '@threlte/studio'

export class SceneConfig extends StaticState {
  grid = $state({ x: 2, y: 5 })
  color = $state('#592020')
  camera = $state({ x: 10, y: 23, z: 10 })
}
