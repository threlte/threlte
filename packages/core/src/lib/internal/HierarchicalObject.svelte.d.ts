import type { Snippet, Component } from 'svelte'
import type { Object3D } from 'three'

export type HierarchicalObjectProperties = {
  object?: Object3D
  onChildMount?: (child: Object3D) => void
  onChildDestroy?: (child: Object3D) => void
  children: Snippet
}

declare const HierarchicalObject: Component<HierarchicalObjectProperties>
export default HierarchicalObject
