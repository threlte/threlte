import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader'
import type { SceneGraph } from '../lib/buildSceneGraph'

/**
 * Extends THREE.GLTF by materials and nodes properties
 */
export type ThrelteGltf<Graph extends SceneGraph> = GLTF & Graph
