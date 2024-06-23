import type { GLTF } from 'three/examples/jsm/loaders/GLTFLoader.js'
import type { SceneGraph } from '../lib/buildSceneGraph'

/**
 * Extends THREE.GLTF by materials and nodes properties
 */
export type ThrelteGltf<Graph extends SceneGraph = SceneGraph> = GLTF & Graph
