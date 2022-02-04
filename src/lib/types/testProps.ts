import type {
  CameraInstance,
  Object3DInstance,
  Object3DInstanceProperties,
  CameraInstanceProperties,
  LightInstance,
  LightInstanceProperties,
  MeshInstance,
  MeshInstanceProperties,
  OrthographicCamera,
  OrthographicCameraProperties,
  PerspectiveCamera,
  PerspectiveCameraProperties,
  OrbitControls,
  OrbitControlsProperties,
  Pass,
  PassProperties,
  AmbientLight,
  AmbientLightProperties,
  DirectionalLight,
  DirectionalLightProperties,
  HemisphereLight,
  HemisphereLightProperties,
  PointLight,
  PointLightProperties,
  SpotLight,
  SpotLightProperties,
  Fog,
  FogProperties,
  FogExp2,
  FogExp2Properties,
  Layers,
  LayersProperties,
  GLTF,
  GLTFProperties,
  Group,
  GroupProperties,
  Mesh,
  MeshProperties,
  Object3D,
  Object3DProperties,
  Text,
  TextProperties
} from 'threlte'
import type { SvelteComponentDev } from 'svelte/internal'
import type { Equals } from 'tsafe'
import { assert } from 'tsafe'

type PropDefKeys<T extends SvelteComponentDev> = keyof T['$$prop_def']
type PropKeys<T extends Record<string, any>> = keyof T

/**
 * This compares the keys of prop exports of a component
 * to the keys of the properties it should have defined.
 */

// instances
assert<Equals<PropDefKeys<CameraInstance>, PropKeys<CameraInstanceProperties>>>()
assert<Equals<PropDefKeys<Object3DInstance>, PropKeys<Object3DInstanceProperties>>>()
assert<Equals<PropDefKeys<LightInstance>, PropKeys<LightInstanceProperties>>>()
assert<Equals<PropDefKeys<MeshInstance>, PropKeys<MeshInstanceProperties>>>()

// cameras
assert<Equals<PropDefKeys<OrthographicCamera>, PropKeys<OrthographicCameraProperties> | 'camera'>>()
assert<Equals<PropDefKeys<PerspectiveCamera>, PropKeys<PerspectiveCameraProperties> | 'camera'>>()

// controls
assert<Equals<PropDefKeys<OrbitControls>, PropKeys<OrbitControlsProperties> | 'controls'>>()

// effects
assert<Equals<PropDefKeys<Pass>, PropKeys<PassProperties>>>()

// lights
assert<Equals<PropDefKeys<AmbientLight>, PropKeys<AmbientLightProperties> | 'light'>>()
assert<Equals<PropDefKeys<DirectionalLight>, PropKeys<DirectionalLightProperties> | 'light'>>()
assert<Equals<PropDefKeys<HemisphereLight>, PropKeys<HemisphereLightProperties> | 'light'>>()
assert<Equals<PropDefKeys<PointLight>, PropKeys<PointLightProperties> | 'light'>>()
assert<Equals<PropDefKeys<SpotLight>, PropKeys<SpotLightProperties> | 'light'>>()

// misc
assert<Equals<PropDefKeys<Fog>, PropKeys<FogProperties> | 'fog'>>()
assert<Equals<PropDefKeys<FogExp2>, PropKeys<FogExp2Properties> | 'fog'>>()
assert<Equals<PropDefKeys<Layers>, PropKeys<LayersProperties>>>()

// objects
assert<
  Equals<
    PropDefKeys<GLTF>,
    | PropKeys<GLTFProperties>
    | 'gltf'
    | 'scene'
    | 'animations'
    | 'asset'
    | 'cameras'
    | 'scenes'
    | 'userData'
    | 'parser'
  >
>()
assert<Equals<PropDefKeys<Group>, PropKeys<GroupProperties> | 'group'>>()
assert<Equals<PropDefKeys<Mesh>, PropKeys<MeshProperties> | 'mesh'>>()
assert<Equals<PropDefKeys<Object3D>, PropKeys<Object3DProperties> | 'object'>>()

// text
assert<Equals<PropDefKeys<Text>, PropKeys<TextProperties> | 'textObject'>>()
