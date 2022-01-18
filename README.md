# threlte <!-- omit in toc -->

A three.js component library for svelte.

## Index <!-- omit in toc -->

- [What is threlte?](#what-is-threlte)
- [Getting started](#getting-started)
- [Reference](#reference)
  - [Types](#types)
  - [Conventions](#conventions)
    - [Additions](#additions)
      - [lookAt](#lookat)
  - [Canvas](#canvas)
  - [Objects](#objects)
      - [lookAt](#lookat-1)
    - [Mesh](#mesh)
    - [Group](#group)
    - [Object3D](#object3d)
    - [GLTF](#gltf)
  - [Misc](#misc)
    - [Fog](#fog)
    - [FogExp2](#fogexp2)
    - [Text](#text)
    - [Layers](#layers)
  - [Lights](#lights)
    - [AmbientLight](#ambientlight)
    - [DirectionalLight](#directionallight)
    - [HemisphereLight](#hemispherelight)
    - [PointLight](#pointlight)
    - [SpotLight](#spotlight)
  - [Cameras](#cameras)
    - [OrthographicCamera](#orthographiccamera)
    - [PerspectiveCamera](#perspectivecamera)
  - [Controls](#controls)
    - [OrbitControls](#orbitcontrols)
  - [Effects](#effects)
    - [Pass](#pass)
  - [Hooks](#hooks)
    - [useThrelte](#usethrelte)
    - [useThrelteRoot](#usethrelteroot)
    - [useFrame](#useframe)
    - [useTexture](#usetexture)
- [Concepts](#concepts)
  - [Interactivity](#interactivity)
  - [Viewport Awareness](#viewport-awareness)
  - [Reactivity](#reactivity)
- [Credits](#credits)
- [License](#license)

## What is threlte?

`threlte` is a component library for svelte to build and render three.js scenes declaratively and state-driven in Svelte apps.

It's inspired by the sensible defaults of [react-three-fiber](https://github.com/pmndrs/react-three-fiber), the simplicity and effectiveness of Sveltes reactivity model and [svelte-cubed](https://github.com/Rich-Harris/svelte-cubed).

It provides strictly typed components to quickly and easily build three.js scenes with deep reactivity and interactivity out-of-the-box.

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
  pointer?: Vector2
  clock: Clock
  camera?: Camera
  scene: Scene
  renderer?: WebGLRenderer
  render: (requestedBy?: string) => void
}

type ThrelteRootContext = {
  setCamera: (camera: Camera) => void
  addRaycastableObject: (obj: Object3D) => void
  removeRaycastableObject: (obj: Object3D) => void
  addInteractiveObject: (obj: Object3D) => void
  removeInteractiveObject: (obj: Object3D) => void
  addPass: (pass: Pass) => void
  removePass: (pass: Pass) => void
  linear: boolean
  interactiveObjects: Set<Object3D>
  raycastableObjects: Set<Object3D>
  composer?: EffectComposer
  resizeOpts?: UseResizeOptions
}
```

See `useThrelte` and `useThrelteRoot` on how to use these.

---

### Conventions

Threltes components tightly follow the principles of three.js in terms of available properties and their naming. This means that if a THREE.PointLight extends THREE.Light which in turn extends THREE.Object3D, the properties of the component `<PointLight>` will reflect that inheritance tree.

#### Additions

##### lookAt

Three.js makes it easy to orient an object towards another one:

```ts
mesh.lookAt(anotherMesh)
```

Use the property `lookAt` on nearly every Object to reactively orient an Object towards another one:

```svelte
<script>
  let mesh
</script>

<PerspectiveCamera lookAt={mesh} />
<Mesh bind:mesh … />
```

The camera will now follow the Mesh.

---

### Canvas

The `<Canvas>` component is the root of your three.js scene. It's responsible for managing the frame loop as well as providing the three.js `Scene`.

##### Properties <!-- omit in toc -->

```ts
dpr: typeof devicePixelRatio = browser ? window.devicePixelRatio : 1
flat: boolean = false
linear: boolean = false
frameloop: 'always' | 'demand' = 'demand'
debugFrameloop: boolean = false
shadows: boolean = true
shadowMapType: ShadowMapType = PCFSoftShadowMap
resizeOpts: UseResizeOptions | undefined = undefined
```

##### Bindings <!-- omit in toc -->

```ts
ctx: ThrelteContext
rootCtx: ThrelteRootContext
```

---

### Objects

##### lookAt

Three.js makes it easy to orient an object towards another one:

```ts
mesh.lookAt(anotherMesh)
```

Use the property `lookAt` on an Object to reactively orient an Object towards another one:

```svelte
<script>
  let mesh
</script>

<PerspectiveCamera lookAt={mesh} />
<Mesh bind:mesh … />
```

The camera will now follow the Mesh.

#### Mesh

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

#### Group

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

#### Object3D

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
group: THREE.Object3D
```

#### GLTF

##### Properties <!-- omit in toc -->

```ts
url: string
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
```

##### Bindings <!-- omit in toc -->

```ts
gltf: GLTF
scene: THREE.Group
```

---

### Misc

#### Fog

A `<Fog>` adds itself to the scene directly. The placement in the hierarchy is therefore unimportant as long as it's inside the `<Canvas>` component.

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

#### FogExp2

A `<FogExp2>` adds itself to the scene directly. The placement in the hierarchy is therefore unimportant as long as it's inside the `<Canvas>` component.

##### Properties <!-- omit in toc -->

```ts
color: THREE.ColorRepresentation = defaults.fog.color
density = defaults.fog.density
```

##### Bindings <!-- omit in toc -->

```ts
fog: THREE.FogExp2
```

#### Text

The `<Text>` component uses [troika-three-text](https://github.com/protectwise/troika/tree/master/packages/troika-three-text) to render text.

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

#### Layers

[Layers](https://threejs.org/docs/#api/en/core/Layers) are one of many ways to manage the visibility of objects in three.js.  
The `<Layers>` component assigns all child components the layer memberships you pass to it. Any object that is a member of the same layers the camera is on, is visible.

##### Example <!-- omit in toc -->

```svelte
<!-- Remember to also assign a layer to your camera -->
<Layers layers={1}>
  <PerspectiveCamera />
</Layers>

<!-- visible if camera is on any layer -->
<Layers layers={'all'}>
  <Mesh />
</Layers>

<!-- visible if camera is on layer 1 -->
<Layers layers={1}>
  <Mesh />
</Layers>

<!-- invisible -->
<Layers layers={'none'}>
  <Mesh />
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

---

### Lights

#### AmbientLight

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
color: ColorRepresentation = defaults.lights.ambientLight.color
intensity = defaults.lights.ambientLight.intensity
```

##### Bindings <!-- omit in toc -->

```ts
light = new AmbientLight(color, intensity)
```

#### DirectionalLight

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
color: ColorRepresentation = defaults.lights.ambientLight.color
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

#### HemisphereLight

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

#### PointLight

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
color: ColorRepresentation = defaults.lights.ambientLight.color
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

#### SpotLight

##### Properties <!-- omit in toc -->

```ts
position: Position = defaults.lights.spotLight.position
scale: Scale = defaults.scale
rotation: Rotation = defaults.rotation
viewportAware: boolean = false
inViewport = defaults.object3d.inViewport
frustumCulled = defaults.mesh.frustumCulled
renderOrder = defaults.mesh.renderOrder
color: ColorRepresentation = defaults.lights.spotLight.color
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

---

### Cameras

#### OrthographicCamera

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

#### PerspectiveCamera

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

---

### Controls

#### OrbitControls

The component `<OrbitControls>` must be a direct child of a camera component and will mount itself to that camera. As soon as the OrbitControls are mounted, the frame loop will continously run.

##### Example <!-- omit in toc -->

```svelte
<PerspectiveCamera fov={50}>
  <OrbitControls enableDamping />
</PerspectiveCamera>
```

##### Properties <!-- omit in toc -->

| Property | Type | Default |
|---|---|---|
| autoRotate | boolean | false |
| autoRotateSpeed | number | 2 |
| dampingFactor | number | 0.05 |
| enableDamping | boolean | false |
| enabled | boolean | true |
| enablePan | boolean | true |
| enableRotate | boolean | true |
| enableZoom | boolean | true |
| keyPanSpeed | number | 7 |
| keys | {<br>LEFT: string,<br>UP: string,<br>RIGHT: string,<br>BOTTOM: string<br>} | {<br>LEFT: 'ArrowLeft',<br>UP: 'ArrowUp',<br>RIGHT: 'ArrowRight',<br>BOTTOM: 'ArrowDown'<br>} |
| maxAzimuthAngle | number | Infinity |
| maxDistance | number | Infinity |
| maxPolarAngle | number | Math.PI |
| maxZoom | number | Infinity |
| minAzimuthAngle | number | Infinity |
| minDistance | number | 0 |
| minPolarAngle | number | 0 |
| minZoom | number | 0 |
| mouseButtons | {<br>LEFT: THREE.MOUSE,<br>MIDDLE: THREE.MOUSE,<br>RIGHT: THREE.MOUSE<br>} | {<br>LEFT: THREE.MOUSE.ROTATE,<br>MIDDLE: THREE.MOUSE.DOLLY,<br>RIGHT: THREE.MOUSE.PAN<br>} |
| panSpeed | number | 1 |
| rotateSpeed | number | 1 |
| screenSpacePanning | boolean | true |
| touches | {<br>ONE: THREE.TOUCH,<br>TWO: THREE.TOUCH<br>} | {<br>ONE: THREE.TOUCH.ROTATE,<br>TWO: THREE.TOUCH.DOLLY_PAN<br>} |
| zoomSpeed | number | 1 |
| target | Position \| undefined | undefined |

##### Bindings <!-- omit in toc -->

```ts
controls: THREE.OrbitControls
```

---

### Effects

#### Pass

By default, threlte will render using the regular WebGLRenderer. If any Pass is added to the scene, the `EffectComposer` will take over the rendering. A default `RenderPass` is added automatically and rendered before any `<Pass>`.

##### Example <!-- omit in toc -->

```svelte
<script>
  import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
  …
</script>

<Canvas>
  <Pass pass={new GlitchPass()}>
</Canvas>
```

##### Properties <!-- omit in toc -->

```ts
pass: THREE.Pass
```

---

### Hooks

> ⚠️ Hooks can only be used inside the `<Canvas>` component because they rely on context ⚠️

#### useThrelte

This hook lets you consume the state of the `<Canvas>` component which contains the renderer, camera, scene and so on.

```ts
const {
  size: { width: number; height: number }
  pointer?: Vector2
  clock: Clock
  camera?: Camera
  scene: Scene
  renderer?: WebGLRenderer
  render: (requestedBy?: string) => void
} = useThrelte()
```

> This context is also available as the first argument of the callback of the [useFrame hook](#useframe)!

#### useThrelteRoot

This hook lets you consume the root context. Although it can be useful, this is mostly used internally. 

```ts
const {
  setCamera: (camera: Camera) => void
  addRaycastableObject: (obj: Object3D) => void
  removeRaycastableObject: (obj: Object3D) => void
  addInteractiveObject: (obj: Object3D) => void
  removeInteractiveObject: (obj: Object3D) => void
  addPass: (pass: Pass) => void
  removePass: (pass: Pass) => void
  linear: boolean
  interactiveObjects: Set<Object3D>
  raycastableObjects: Set<Object3D>
  composer?: EffectComposer
  resizeOpts?: UseResizeOptions
} = useThrelteRoot()
```

#### useFrame

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

#### useTexture

`useTexture` allows you to easily load textures and automatically convert your textures in the correct color space based on your [settings on the `<Canvas>` component](#canvas).
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

---

## Concepts

Yes, there are already three.js component libraries for svelte, threlte is different in some ways:

- **Sensible defaults**  
  Much like [react-three-fiber](https://github.com/pmndrs/react-three-fiber), threlte will set sensible defaults to three.js `WebGLRenderer`, all colors and textures and more. This makes it easy for you to follow best practices in terms of color reception and accuracy.  
  threlte also makes visibility management a breeze with its `<Layers>` component.
- **Unified frame loop**  
  By default, threlte only renders the scene if there's need for it: If a prop changes that makes rendering the scene necessary, if there are any interactive objects in the scene or if threlte or you use `useFrame` in any of your components.
- **Interactivity**  
  threlte makes it possible to use events on three.js objects like they are regular DOM elements:  
   `<Mesh … interactive on:click={onClick}>`  
   You can even listen to your object leaving or entering the viewport:  
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

Just like [svelte-cubed](https://github.com/Rich-Harris/svelte-cubed) and much unlike [react-three-fiber](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls) it is encouraged to use your component state to drive your three.js scene.
By using props instead of manipulating three.js objects directly, the unified render loop is able to tell that your scene needs rerendering and svelte can make use of component optimizations.

## Credits

- [svelte-cubed](https://github.com/Rich-Harris/svelte-cubed)
- [react-three-fiber](https://github.com/pmndrs/react-three-fiber)
- [drei](https://github.com/pmndrs/drei)

## License

The MIT License (MIT). Please see [License File](LICENSE.md) for more information.
