![Threlte Logo](https://raw.githubusercontent.com/grischaerbe/threlte/main/static/logo/threlte_logo_github.png)

A three.js component library for svelte.

![npm-license](https://img.shields.io/npm/l/threlte?style=flat-square)
![npm-version](https://img.shields.io/npm/v/threlte?style=flat-square)


## Index <!-- omit in toc -->

- [What is threlte?](#what-is-threlte)
- [Getting started](#getting-started)
- [Concepts](#concepts)
  - [Interactivity](#interactivity)
  - [Viewport Awareness](#viewport-awareness)
  - [Reactivity](#reactivity)
- [Reference](#reference)
  - [Types](#types)
  - [Conventions](#conventions)
  - [:clipboard: Canvas](#clipboard-canvas)
  - [:globe_with_meridians: Objects](#globe_with_meridians-objects)
    - [:globe_with_meridians: Mesh](#globe_with_meridians-mesh)
    - [:globe_with_meridians: Group](#globe_with_meridians-group)
    - [:globe_with_meridians: Object3D](#globe_with_meridians-object3d)
    - [:globe_with_meridians: GLTF](#globe_with_meridians-gltf)
  - [:speech_balloon: Misc](#speech_balloon-misc)
    - [:speech_balloon: Fog](#speech_balloon-fog)
    - [:speech_balloon: FogExp2](#speech_balloon-fogexp2)
    - [:speech_balloon: Text](#speech_balloon-text)
    - [:speech_balloon: Layers](#speech_balloon-layers)
  - [:high_brightness: Lights](#high_brightness-lights)
    - [:high_brightness: AmbientLight](#high_brightness-ambientlight)
    - [:high_brightness: DirectionalLight](#high_brightness-directionallight)
    - [:high_brightness: HemisphereLight](#high_brightness-hemispherelight)
    - [:high_brightness: PointLight](#high_brightness-pointlight)
    - [:high_brightness: SpotLight](#high_brightness-spotlight)
  - [:movie_camera: Cameras](#movie_camera-cameras)
    - [:movie_camera: OrthographicCamera](#movie_camera-orthographiccamera)
    - [:movie_camera: PerspectiveCamera](#movie_camera-perspectivecamera)
  - [:repeat: Controls](#repeat-controls)
    - [:repeat: OrbitControls](#repeat-orbitcontrols)
  - [:lipstick: Post Processing](#lipstick-post-processing)
    - [:lipstick: Pass](#lipstick-pass)
  - [:leftwards_arrow_with_hook: Hooks](#leftwards_arrow_with_hook-hooks)
    - [:leftwards_arrow_with_hook: useThrelte](#leftwards_arrow_with_hook-usethrelte)
    - [:leftwards_arrow_with_hook: useThrelteRoot](#leftwards_arrow_with_hook-usethrelteroot)
    - [:leftwards_arrow_with_hook: useFrame](#leftwards_arrow_with_hook-useframe)
    - [:leftwards_arrow_with_hook: useTexture](#leftwards_arrow_with_hook-usetexture)
- [Credits](#credits)
- [Thank you](#thank-you)
- [License](#license)

## What is threlte?

Threlte is a component library for svelte to build and render three.js scenes declaratively and state-driven in Svelte apps.

It's inspired by the sensible defaults of [react-three-fiber](https://github.com/pmndrs/react-three-fiber), the simplicity and effectiveness of Sveltes reactivity model and [Svelte Cubed](https://github.com/Rich-Harris/svelte-cubed).

It provides strictly typed components to quickly and easily build three.js scenes with deep reactivity and interactivity out-of-the-box.

It also aims to provide the building blocks to quickly extend threlte when it's needed.

## Getting started

Install threlte and three.js:

```bash
npm install threlte three
```

For TypeScript users, install three.js types:

```bash
npm install -D @types/three
```

Build your first scene:

[Open in CodeSandbox](https://codesandbox.io/s/threlte-getting-started-vjlk4?file=/App.svelte)

```svelte
<script>
  import { CircleBufferGeometry, MeshStandardMaterial, SphereBufferGeometry } from 'three'
  import {
    Canvas,
    DirectionalLight,
    HemisphereLight,
    Mesh,
    OrbitControls,
    PerspectiveCamera
  } from 'threlte'
</script>

<div>
  <Canvas>
    <PerspectiveCamera position={{ x: 10, y: 10, z: 10 }}>
      <OrbitControls enableDamping />
    </PerspectiveCamera>

    <DirectionalLight shadow color={'#EDBD9C'} position={{ x: -15, y: 45, z: 20 }} />

    <HemisphereLight skyColor={0x4c8eac} groundColor={0xac844c} intensity={0.6} />

    <Mesh
      castShadow
      geometry={new SphereBufferGeometry(1, 40, 40)}
      material={new MeshStandardMaterial({ color: '#dddddd' })}
    />

    <Mesh
      receiveShadow
      position={{ y: -1.5 }}
      rotation={{ x: -90 * (Math.PI / 180) }}
      geometry={new CircleBufferGeometry(3, 72)}
      material={new MeshStandardMaterial({ color: 'white' })}
    />
  </Canvas>
</div>

<style>
  div {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
</style>
```

## Concepts

Yes, there are already three.js component libraries for svelte, threlte is different in some ways:

- **Sensible defaults**  
  Much like [react-three-fiber](https://github.com/pmndrs/react-three-fiber), threlte will set sensible defaults to three.js `WebGLRenderer`, all colors and textures and more. This makes it easy for you to follow best practices in terms of color reception and accuracy.  
  threlte also makes visibility management a breeze with its `<Layers>` component.
- **Unified frame loop**  
  By default, threlte only renders the scene if there's need for it: If a prop changes that makes rendering the scene necessary, if there are any interactive objects in the scene or if threlte or you use `useFrame` in any of your components.
- **Interactivity**  
  threlte makes it possible to use events on three.js objects as if they were regular DOM elements:  
   `<Mesh … interactive on:click={onClick}>`  
   You can also listen to your object leaving or entering the viewport:  
   `<Mesh … viewportAware on:viewportenter={onViewportEnter}>`
- **TypeScript**  
  All threlte components are written in TypeScript, so type support is a first-class citizen.
- **EffectComposer support**  
  Add a Pass with  
   `<Pass pass={new GlitchPass()} />` and threlte will take care of setting up the default `RenderPass` and render to the `EffectComposer` instead of the `WebGLRenderer`.
- **Text rendering**  
  Render text using the fantastic [troika-three-text](https://github.com/protectwise/troika/tree/master/packages/troika-three-text) library with:
  `<Text text="Hello World" />`
- **Access All Areas**
  - Bind to three.js object instances  
    `<Mesh … bind:mesh>`
  - Access the renderer  
    `const { renderer, render } = useThrelte()`
- **Easily extendable**  
  Build objects that didn't yet make it to threlte yourself by plugging together _functional components_.
- **Tree-shakeble**  
  react-three-fiber is great at making it possible to use three.js classes as JSX components. This means that there is no hard dependency on a certain three.js version and everything that is possible in three.js is covered with react-three-fiber as well. There is however a downside: react-three-fiber looks up three.js classes at runtime. This means that even if your react-three-fiber app only uses a fraction of three.js, you will need to ship three.js in its entirety.  
  threlte does not look up three.js classes at runtime and as such is limited in features compared to three.js itself. It tries however to cover most use cases of three.js and provides _functional components_ to make extending threlte as easy as possible. As such, your bundler is able to tree-shake threlte and limit what parts of three.js get shipped.

### Interactivity

[Open the interactivity example in CodeSandbox](https://codesandbox.io/s/threlte-interactivity-example-t9hej?file=/App.svelte)

Listen to events of a `<Mesh>` and a `<MeshInstance>` as if it would be a regular DOM element:

```jsx
<Mesh … interactive on:click={onClick}>
```

These events are supported:

- `click`
- `contextmenu`
- `pointerup`
- `pointerdown`
- `pointerenter`
- `pointerleave`
- `pointermove`

All events include the raycast Intersection object:

```svelte
<script lang="ts">
  import { Mesh, ThrelteEvent } from 'threlte'

  const onClick = (e: CustomEvent<ThrelteEvent>) => {
    const distanceToMesh = e.detail.distance
  }
</script>

<Mesh … interactive on:click={onClick}>
```

You must add `interactive` to your Mesh to indicate adding the Mesh to the central event raycaster.  
Be aware that this will make the frameloop render on every frame.

### Viewport Awareness

[Open the viewport awareness example in CodeSandbox](https://codesandbox.io/s/threlte-viewport-awareness-example-i7hwy?file=/App.svelte)

Additionally, most Objects (Lights, Cameras, Meshes, …) can be made viewport aware. That means you can listen to events or bind a variable to check whether an object is in the viewport or not:

```svelte
<script lang="ts">
  import { PointLight } from 'threlte'
  import type { Object3D } from 'three'

  let inViewport

  const onViewportEnter = (e: CustomEvent<Object3D>) => {
    console.log('PointLight entered the viewport.')
  }
  const onViewportLeave = (e: CustomEvent<Object3D>) => {
    console.log('PointLight left the viewport.')
  }
</script>

<PointLight
  viewportAware
  bind:inViewport
  on:viewportenter={onViewportEnter}
  on:viewportleave={onViewportLeave}
/>
```

These events are supported:

- `viewportenter`
- `viewportleave`

Bind `inViewport` if you wish to not use events.

To make an Object viewport aware, you must add `viewportAware` to your Object.

### Reactivity

[Open the reactivity example in CodeSandbox](https://codesandbox.io/s/threlte-reactivity-example-vttvo?file=/App.svelte)

Just like [Svelte Cubed](https://github.com/Rich-Harris/svelte-cubed) and much unlike [react-three-fiber](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls) it is encouraged to use your component state to drive your three.js scene.
By using props instead of manipulating three.js objects directly, the unified render loop is able to tell that your scene needs rerendering and svelte can make use of component optimizations.

## Reference

### Types

To make working with component props easier, threlte includes special types for position, scale, rotation and lookAt:

```ts
type Position = THREE.Vector3 | { x?: number, y?: number, z?: number }

const positionA = new Vector3()
const positionB = { x: 1, z: 1 }


type Scale = THREE.Vector3 | number | { x?: number, y?: number, z?: number }

const scaleA = new Vector3()
const scaleB = 2
const scaleC = { x: 1.5, z: 1 }


type Rotation = THREE.Euler | { x?: number, y?: number, z?: number, order?: THREE.Euler['order'] }

const rotationA = new Euler()
const rotationB = { x: 1.5, z: 1 }


type LookAt = THREE.Vector3 | { x?: number, y?: number, z?: number } | THREE.Object3D

const lookAtA = new Vector3()
const lookAtB = { x: 2, y: 3 }
const lookAtC = someMesh
```

The `<Canvas>` component provides two very useful contexts: `ThrelteContext` and `ThrelteRootContext`

```ts
type ThrelteContext = {
  size: { width: number; height: number }
  pointer?: THREE.Vector2
  clock: THREE.Clock
  camera?: THREE.Camera
  scene: THREE.Scene
  renderer?: THREE.WebGLRenderer
  render: (requestedBy?: string) => void
}

type ThrelteRootContext = {
  setCamera: (camera: THREE.Camera) => void
  addRaycastableObject: (obj: THREE.Object3D) => void
  removeRaycastableObject: (obj: THREE.Object3D) => void
  addInteractiveObject: (obj: THREE.Object3D) => void
  removeInteractiveObject: (obj: THREE.Object3D) => void
  addPass: (pass: THREE.Pass) => void
  removePass: (pass: THREE.Pass) => void
  linear: boolean
  interactiveObjects: Set<THREE.Object3D>
  raycastableObjects: Set<THREE.Object3D>
  composer?: EffectComposer
  resizeOpts?: UseResizeOptions
}
```

See `useThrelte` and `useThrelteRoot` on how to use these.

```ts
type UseResizeOptions = {
  axis?: 'horizontal' | 'vertical' | 'both'
  runOnInit?: boolean
  debounce?: number
}
```

### Conventions

Threlte components follow the principles of three.js whereever possible and useful in terms of available properties and their respective naming.

#### Additions <!-- omit in toc -->

On top of that, threlte adds some functionality to make objects truly reactive.

##### lookAt <!-- omit in toc -->

Use the property `lookAt` on an Object to

- reactively orient an Object3D towards another Object3D
```svelte
<script>
  let mesh
</script>

<PerspectiveCamera lookAt={mesh} />
<Mesh bind:mesh … />
```
- to reactively orient an Object towards a Position
```svelte
<PerspectiveCamera lookAt={{ x: 5, y: 3 }} />
```

### :clipboard: Canvas

The `<Canvas>` component is the root of your three.js scene.

By default, the `<canvas>` element and the renderer will resize to fit the parent element whenever the window resizes.

##### Properties <!-- omit in toc -->

```ts
dpr: typeof devicePixelRatio = browser ? window.devicePixelRatio : 1
flat: boolean = false
linear: boolean = false
frameloop: 'always' | 'on-demand' = 'on-demand'
debugFrameloop: boolean = false
shadows: boolean = true
shadowMapType: THREE.ShadowMapType = THREE.PCFSoftShadowMap
resizeOpts: UseResizeOptions | undefined = undefined
```

##### Bindings <!-- omit in toc -->

```ts
ctx: ThrelteContext
rootCtx: ThrelteRootContext
```

### :globe_with_meridians: Objects

#### :globe_with_meridians: Mesh

##### Example <!-- omit in toc -->

```svelte
<script>
  import { Mesh } from 'threlte'
  import { BoxBufferGeometry, MeshBasicMaterial } from 'three'
</script>

<Mesh 
  position={{ y: 1 }}
  geometry={new BoxBufferGeometry(1, 2, 1)} 
  material={new MeshBasicMaterial({ wireframe: true })}
/>
```

##### Properties <!-- omit in toc -->

```ts
geometry: THREE.BufferGeometry
material: THREE.Material | THREE.Material[] = defaults.mesh.material()

position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
castShadow: boolean = defaults.mesh.castShadow
receiveShadow: boolean = defaults.mesh.receiveShadow
frustumCulled: boolean = defaults.mesh.frustumCulled
renderOrder: number = defaults.mesh.renderOrder
interactive: boolean = false
ignorePointerEvents: boolean = false
lookAt: LookAtProp | undefined = undefined
```

##### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
mesh: THREE.Mesh
```

#### :globe_with_meridians: Group

##### Example <!-- omit in toc -->

```svelte
<script>
  import { Group, GLTF } from 'threlte'
</script>

<Group position={{ x: 5 }}>
  <GLTF url={"/models/modelA.glb"} />
  <GLTF url={"/models/modelB.glb"} />
</Group>
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
lookAt: LookAt | undefined = undefined
```

##### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
group: THREE.Group
```

#### :globe_with_meridians: Object3D

##### Example <!-- omit in toc -->

You might want to use this component to pass as a reference to other components:

```svelte
<script>
  import { Object3D, PerspectiveCamera } from 'threlte'

  let target
</script>

<PerspectiveCamera lookAt={target} />
<Object3D bind:object={target} />
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
lookAt: LookAt | undefined = undefined
```

##### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
object: THREE.Object3D
```

#### :globe_with_meridians: GLTF

To use DRACO compression, provide a path to the DRACO decoder.  
To use KTX2 compressed textures, provide a path to the KTX2 transcoder.

##### Example <!-- omit in toc -->

```svelte
<GLTF 
  castShadow 
  receiveShadow 
  url={'/models/flower.glb'} 
  position={{ y: 1 }} 
  scale={3}
/>
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport: boolean = defaults.object3d.inViewport
castShadow: boolean = defaults.mesh.castShadow
receiveShadow: boolean = defaults.mesh.receiveShadow
frustumCulled: boolean = defaults.mesh.frustumCulled
renderOrder: number = defaults.mesh.renderOrder
lookAt: LookAt | undefined = undefined

url: string
dracoDecoderPath: string | undefined = undefined
ktxTranscoderPath: string | undefined = undefined
```

##### Bindings <!-- omit in toc -->

```ts
gltf: GLTF
scene: THREE.Group
```

### :speech_balloon: Misc

#### :speech_balloon: Fog

A `<Fog>` adds itself to the scene directly. The placement in the hierarchy is therefore unimportant as long as it's inside the `<Canvas>` component.

##### Example <!-- omit in toc -->

```svelte
<script>
  import { Fog } from 'threlte'
</script>

<Fog color={"#dddddd"} />
```

##### Properties <!-- omit in toc -->

```ts
color: THREE.ColorRepresentation = defaults.fog.color
near = defaults.fog.near
far = defaults.fog.far
```

##### Bindings <!-- omit in toc -->

```ts
fog: THREE.Fog
```

#### :speech_balloon: FogExp2

A `<FogExp2>` adds itself to the scene directly. The placement in the hierarchy is therefore unimportant as long as it's inside the `<Canvas>` component.


##### Example <!-- omit in toc -->

```svelte
<script>
  import { FogExp2 } from 'threlte'
</script>

<FogExp2 color={"#dddddd"} density={0.3} />
```

##### Properties <!-- omit in toc -->

```ts
color: THREE.ColorRepresentation = defaults.fog.color
density = defaults.fog.density
```

##### Bindings <!-- omit in toc -->

```ts
fog: THREE.FogExp2
```

#### :speech_balloon: Text

The `<Text>` component uses [troika-three-text](https://github.com/protectwise/troika/tree/master/packages/troika-three-text) to render text.

##### Example <!-- omit in toc -->

```svelte
<script>
  import { Text } from 'threlte'
  let value = ''
</script>

<input type="text" bind:value />
<Text text={value} />
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
castShadow = defaults.mesh.castShadow
receiveShadow = defaults.mesh.receiveShadow
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
interactive: boolean = false
ignorePointerEvents: boolean = false
lookAt: LookAt | undefined = undefined

text: TextType['text'] = ''
anchorX: TextType['anchorX'] = 0
anchorY: TextType['anchorY'] = 0
curveRadius: TextType['curveRadius'] = 0
font: TextType['font'] = null
fontSize: TextType['fontSize'] = 0.1
letterSpacing: TextType['letterSpacing'] = 0
lineHeight: TextType['lineHeight'] = 'normal'
maxWidth: TextType['maxWidth'] = Infinity
overflowWrap: TextType['overflowWrap'] = 'normal'
textAlign: TextType['textAlign'] = 'left'
textIndent: TextType['textIndent'] = 0
whiteSpace: TextType['whiteSpace'] = 'normal'
material: TextType['material'] | null = null
color: TextType['color'] | null = null
depthOffset: TextType['depthOffset'] = 0
clipRect: TextType['clipRect'] | null = null
glyphGeometryDetail: TextType['glyphGeometryDetail'] = 0
sdfGlyphSize: TextType['sdfGlyphSize'] = 64
outlineWidth: TextType['outlineWidth'] = 0
outlineColor: TextType['outlineColor'] = 'black'
outlineOpacity: TextType['outlineOpacity'] = 1
outlineBlur: TextType['outlineBlur'] = 0
outlineOffsetX: TextType['outlineOffsetX'] = 0
outlineOffsetY: TextType['outlineOffsetY'] = 0
strokeWidth: TextType['strokeWidth'] = 0
strokeColor: TextType['strokeColor'] = 0x808080
strokeOpacity: TextType['strokeOpacity'] = 1
fillOpacity: TextType['fillOpacity'] = 1
```

##### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
text: Text
```

#### :speech_balloon: Layers

[Layers](https://threejs.org/docs/#api/en/core/Layers) are one of many ways to manage the visibility of objects in three.js.  
The `<Layers>` component assigns all child components the layer memberships you pass to it. Any object that is a member of the same layers the camera is on, is visible.

##### Example <!-- omit in toc -->

```svelte
<script>
  import { Layers, PerspectiveCamera, Mesh } from 'threlte'
</script>

<!-- Remember to also assign a layer to your camera -->
<Layers layers={1}>
  <PerspectiveCamera />
</Layers>

<!-- visible if camera is on any layer -->
<Layers layers={'all'}>
  <Mesh … />
</Layers>

<!-- visible if camera is on layer 1 -->
<Layers layers={1}>
  <Mesh … />
</Layers>

<!-- visible if camera is on layer 0 or 1 -->
<Layers layers={[0, 1]}>
  <Mesh … />
</Layers>

<!-- invisible -->
<Layers layers={'none'}>
  <Mesh … />
</Layers>
```

##### Properties <!-- omit in toc -->

```ts
layers: ThrelteLayers = 0
```

Property `layers` can be:
- any integer from 0 to 31
- an array of any integer from 0 to 31
- `'all'`
- `'none'`

> TypeScript users will benefit from strong types, JavaScript users should be aware that there is no runtime validation happening.

### :high_brightness: Lights

#### :high_brightness: AmbientLight

##### Example <!-- omit in toc -->

```svelte
<script>
  import { AmbientLight } from 'threlte'
</script>

<AmbientLight color={0xd7681c} intensity={0.3} />
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
color: THREE.ColorRepresentation = defaults.lights.ambientLight.color
intensity = defaults.lights.ambientLight.intensity
```

##### Bindings <!-- omit in toc -->

```ts
light = new AmbientLight(color, intensity)
```

#### :high_brightness: DirectionalLight

##### Example <!-- omit in toc -->

```svelte
<script>
  import { DirectionalLight } from 'threlte'
</script>

<DirectionalLight 
  shadow 
  intensity={0.6}
  position={{ x: 3, y: 10, z: 3 }}
/>
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
color: THREE.ColorRepresentation = defaults.lights.ambientLight.color
intensity = defaults.lights.ambientLight.intensity
shadow:
  | boolean
  | {
      mapSize?: [number, number]
      camera?: {
        left?: number
        right?: number
        top?: number
        bottom?: number
        near?: number
        far?: number
      }
      bias?: number
      radius?: number
    } = false
```

##### Bindings <!-- omit in toc -->

```ts
light = new DirectionalLight(color, intensity)
```

#### :high_brightness: HemisphereLight

##### Example <!-- omit in toc -->

```svelte
<script>
  import { HemisphereLight } from 'threlte'
</script>

<HemisphereLight 
  skyColor={0xFB9796}
  groundColor={0xC1B8A5}
/>
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.lights.hemisphereLight.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
intensity = defaults.lights.hemisphereLight.intensity
skyColor: THREE.ColorRepresentation = defaults.lights.hemisphereLight.skyColor
groundColor: THREE.ColorRepresentation = defaults.lights.hemisphereLight.groundColor
```

##### Bindings <!-- omit in toc -->

```ts
light: THREE.HemisphereLight
```

#### :high_brightness: PointLight

##### Example <!-- omit in toc -->

```svelte
<script>
  import { PointLight } from 'threlte'
</script>

<PointLight position={{ x: 3, y: 3 }} />
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
color: THREE.ColorRepresentation = defaults.lights.ambientLight.color
intensity = defaults.lights.ambientLight.intensity
distance = defaults.lights.pointLight.distance
decay = defaults.lights.pointLight.decay
power: number | undefined = undefined
shadow:
  | boolean
  | {
      mapSize?: [number, number]
      camera?: { near?: number; far?: number }
      bias?: number
      radius?: number
    } = false
```

##### Bindings <!-- omit in toc -->

```ts
light: THREE.PointLight
```

#### :high_brightness: SpotLight

##### Example <!-- omit in toc -->

```svelte
<script>
  import { SpotLight, Mesh } from 'threlte'
  let mesh
</script>

<Mesh … bind:mesh />
<SpotLight position={{ x: 3, y: 3 }} target={mesh} />
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.lights.spotLight.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
color: THREE.ColorRepresentation = defaults.lights.spotLight.color
intensity = defaults.lights.spotLight.intensity
angle: number = defaults.lights.spotLight.angle
decay: number = defaults.lights.spotLight.decay
distance: number = defaults.lights.spotLight.distance
penumbra: number = defaults.lights.spotLight.penumbra
power: number | undefined = undefined
target: LookAt = defaults.lookAt
shadow:
  | boolean
  | {
      mapSize?: [number, number]
      camera?: { near?: number; far?: number }
      bias?: number
      radius?: number
    } = false
```

##### Bindings <!-- omit in toc -->

```ts
light: THREE.SpotLight
```

### :movie_camera: Cameras

#### :movie_camera: OrthographicCamera

##### Example <!-- omit in toc -->

```svelte
<script>
  import { OrthographicCamera } from 'threlte'
</script>

<OrthographicCamera 
  position={{ x: 3, y: 3, z: 3 }} 
  lookAt={{ x: 0, y: 0, z: 0 }}
/>
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
useCamera = true
near = defaults.camera.near
far = defaults.camera.far
zoom = defaults.camera.zoom
```

##### Bindings <!-- omit in toc -->

```ts
camera: THREE.OrthographicCamera
```

#### :movie_camera: PerspectiveCamera

##### Example <!-- omit in toc -->

```svelte
<script>
  import { PerspectiveCamera } from 'threlte'
</script>

<PerspectiveCamera
  fov={60}
  position={{ x: 3, y: 3, z: 3 }} 
  lookAt={{ x: 0, y: 0, z: 0 }}
/>
```

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
useCamera = true
near = defaults.camera.near
far = defaults.camera.far
fov = defaults.camera.fov
```

##### Bindings <!-- omit in toc -->

```ts
camera: THREE.PerspectiveCamera
```

### :repeat: Controls

#### :repeat: OrbitControls

The component `<OrbitControls>` must be a direct child of a camera component and will mount itself to that camera. As soon as the OrbitControls are mounted, the frame loop will continously run.

##### Example <!-- omit in toc -->

```svelte
<script>
  import { PerspectiveCamera, OrbitControls } from 'threlte'
</script>

<PerspectiveCamera fov={50}>
  <OrbitControls enableDamping />
</PerspectiveCamera>
```

##### Properties <!-- omit in toc -->

```ts
autoRotate: boolean = false
autoRotateSpeed: number = 2
dampingFactor: number = 0.05
enableDamping: boolean = false
enabled: boolean = true
enablePan: boolean = true
enableRotate: boolean = true
enableZoom: boolean = true
keyPanSpeed: number = 7
keys: { LEFT: string, UP: string, RIGHT: string, BOTTOM: string } = { LEFT: 'ArrowLeft', UP: 'ArrowUp', RIGHT: 'ArrowRight', BOTTOM: 'ArrowDown' }
maxAzimuthAngle: number = Infinity
maxDistance: number = Infinity
maxPolarAngle: number = Math.PI
maxZoom: number = Infinity
minAzimuthAngle: number = Infinity
minDistance: number = 0
minPolarAngle: number = 0
minZoom: number = 0
mouseButtons: { LEFT: THREE.MOUSE, MIDDLE: THREE.MOUSE, RIGHT: THREE.MOUSE } = { LEFT: MOUSE.ROTATE, MIDDLE: MOUSE.DOLLY, RIGHT: MOUSE.PAN }
panSpeed: number = 1
rotateSpeed: number = 1
screenSpacePanning: boolean = true
touches: { ONE: THREE.TOUCH, TWO: THREE.TOUCH } = { ONE: TOUCH.ROTATE, TWO: TOUCH.DOLLY_PAN }
zoomSpeed: number = 1
target: Position | undefined = undefined
```

##### Bindings <!-- omit in toc -->

```ts
controls: THREE.OrbitControls
```

### :lipstick: Post Processing

#### :lipstick: Pass

By default, threlte will render using the regular WebGLRenderer. If any Pass is added to the scene, the `EffectComposer` will take over the rendering. A default `RenderPass` is added automatically and rendered before any `<Pass>`.

##### Example <!-- omit in toc -->

```svelte
<script>
  import { Pass } from 'threlte'
  import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
</scrip>

<Pass pass={new GlitchPass()}>
```

##### Properties <!-- omit in toc -->

```ts
pass: THREE.Pass
```

### :leftwards_arrow_with_hook: Hooks

> ⚠️ Hooks can only be used inside the `<Canvas>` component because they rely on context ⚠️

#### :leftwards_arrow_with_hook: useThrelte

This hook lets you consume the state of the `<Canvas>` component which contains the renderer, camera, scene and so on.

```ts
const {
  size: { width: number; height: number }
  pointer?: THREE.Vector2
  clock: THREE.Clock
  camera?: THREE.Camera
  scene: THREE.Scene
  renderer?: THREE.WebGLRenderer
  render: (requestedBy?: string) => void
} = useThrelte()
```

> This context is also available as the first argument of the callback of the [useFrame hook](#useframe)!

#### :leftwards_arrow_with_hook: useThrelteRoot

This hook lets you consume the root context. Although it can be useful, this is mostly used internally. 

```ts
const {
  setCamera: (camera: THREE.Camera) => void
  addRaycastableObject: (obj: THREE.Object3D) => void
  removeRaycastableObject: (obj: THREE.Object3D) => void
  addInteractiveObject: (obj: THREE.Object3D) => void
  removeInteractiveObject: (obj: THREE.Object3D) => void
  addPass: (pass: THREE.Pass) => void
  removePass: (pass: THREE.Pass) => void
  linear: boolean
  interactiveObjects: Set<THREE.Object3D>
  raycastableObjects: Set<THREE.Object3D>
  composer?: THREE.EffectComposer
  resizeOpts?: UseResizeOptions
} = useThrelteRoot()
```

#### :leftwards_arrow_with_hook: useFrame

This hook allows you to execute code on every frame.  
You receive the state (the same as `useThrelte`) and a clock delta in seconds. Your callback function will be invoked just before a frame is rendered. When the component unmounts it is unsubscribed automatically from the frame loop. You may pass additional options to this hook. Also, `useFrame` returns an object containing functions `start` and `stop` to control the execution of the callback and a store `started` to subscribe to its state.

##### Example <!-- omit in toc -->

```ts
const { start, stop, started } = useFrame(() => {
  console.log('rendering…')
})

const toggleUseFrame = () => {
  if ($started) {
    stop()
  } else {
    start()
  }
}
```

#### :leftwards_arrow_with_hook: useTexture

`useTexture` allows you to easily load textures and automatically convert your textures to the correct color space based on your [settings on the `<Canvas>` component](#canvas).
This hook can be called outside of the `<Canvas>` component, but with limitations: To make sure that textures are converted to the correct color space, `useTexture` needs to consume the `<Canvas>` context. If there's no context, it will fall back to keeping your textures untouched.

##### Examples <!-- omit in toc -->

```ts
const tex = useTexture('tex.jpg') // -> THREE.Texture

const [texA, texB] = useTexture(['texA.jpg', 'texB.jpg']) // -> THREE.Texture[]
```

You can also use objects:

```ts
const textures = useTexture({
  metalnessMap: 'metalness.jpg',
  map: 'color.jpg',
})
const material = new MeshStandardMaterial({ ...textures })
```

## Credits

- [Svelte](https://github.com/sveltejs/svelte)
- [SvelteKit](https://github.com/sveltejs/kit)
- [Svelte Cubed](https://github.com/Rich-Harris/svelte-cubed)
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber)
- [drei](https://github.com/pmndrs/drei)

## Thank you

- [Rich Harris](https://github.com/Rich-Harris) for the incredible work on Svelte, SvelteKit and Svelte Cubed
- [@larissamantel](https://www.instagram.com/larissamantel_illu/) for the logo

---

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
