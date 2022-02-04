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
- [Conventions](#conventions)
- [Reference](#reference)
  - [Types](#types)
    - [Property Types](#property-types)
    - [Context Types](#context-types)
  - [Components](#components)
    - [:clipboard: \<Canvas>](#clipboard-canvas)
    - [:globe_with_meridians: Objects](#globe_with_meridians-objects)
      - [:globe_with_meridians: \<Mesh>](#globe_with_meridians-mesh)
      - [:globe_with_meridians: \<Group>](#globe_with_meridians-group)
      - [:globe_with_meridians: \<Object3D>](#globe_with_meridians-object3d)
      - [:globe_with_meridians: \<GLTF>](#globe_with_meridians-gltf)
    - [:recycle: Object Instances](#recycle-object-instances)
      - [:recycle: \<Object3DInstance>](#recycle-object3dinstance)
      - [:recycle: \<MeshInstance>](#recycle-meshinstance)
      - [:recycle: \<CameraInstance>](#recycle-camerainstance)
      - [:recycle: \<LightInstance>](#recycle-lightinstance)
    - [:high_brightness: Lights](#high_brightness-lights)
      - [:high_brightness: \<AmbientLight>](#high_brightness-ambientlight)
      - [:high_brightness: \<DirectionalLight>](#high_brightness-directionallight)
      - [:high_brightness: \<HemisphereLight>](#high_brightness-hemispherelight)
      - [:high_brightness: \<PointLight>](#high_brightness-pointlight)
      - [:high_brightness: \<SpotLight>](#high_brightness-spotlight)
    - [:movie_camera: Cameras](#movie_camera-cameras)
      - [:movie_camera: \<OrthographicCamera>](#movie_camera-orthographiccamera)
      - [:movie_camera: \<PerspectiveCamera>](#movie_camera-perspectivecamera)
    - [:repeat: Controls](#repeat-controls)
      - [:repeat: \<OrbitControls>](#repeat-orbitcontrols)
    - [:lipstick: Post Processing](#lipstick-post-processing)
      - [:lipstick: \<Pass>](#lipstick-pass)
    - [Misc](#misc)
      - [:thought_balloon: \<Fog>](#thought_balloon-fog)
      - [:thought_balloon: \<FogExp2>](#thought_balloon-fogexp2)
      - [:abc: \<Text>](#abc-text)
      - [:black_square_button: \<Layers>](#black_square_button-layers)
      - [:link: \<ContextBridge>](#link-contextbridge)
  - [:leftwards_arrow_with_hook: Hooks](#leftwards_arrow_with_hook-hooks)
    - [:leftwards_arrow_with_hook: useThrelte](#leftwards_arrow_with_hook-usethrelte)
    - [:leftwards_arrow_with_hook: useThrelteRoot](#leftwards_arrow_with_hook-usethrelteroot)
    - [:leftwards_arrow_with_hook: useFrame](#leftwards_arrow_with_hook-useframe)
    - [:leftwards_arrow_with_hook: useLoader](#leftwards_arrow_with_hook-useloader)
    - [:leftwards_arrow_with_hook: useTexture](#leftwards_arrow_with_hook-usetexture)
- [Credits](#credits)
- [Thank you](#thank-you)
- [License](#license)

## What is threlte?

Threlte is a component library for svelte to build and render three.js scenes declaratively and state-driven in Svelte apps.

It's inspired by the sensible defaults of [react-three-fiber](https://github.com/pmndrs/react-three-fiber), the simplicity and effectiveness of Sveltes reactivity model and [Svelte Cubed](https://github.com/Rich-Harris/svelte-cubed).

It provides strictly typed components to quickly and easily build three.js scenes with deep reactivity and interactivity out-of-the-box.

It also aims to provide the building blocks to quickly extend threlte when it's needed.

> :warning: threlte is still in development and you should expect breaking changes. Check the release notes before updating. If you want to be in the safe side, install threlte with `npm i threlte three --save-exact` to lock the version.

## Getting started

Install threlte and three.js:

```bash
npm install threlte three
```

For TypeScript users, install three.js types:

```bash
npm install -D @types/three
```
<br />

If you are using threlte with SvelteKit, you need to adapt your `svelte.config.js` to prevent three.js from being externalized for SSR by [vites externalization step](https://vitejs.dev/guide/ssr.html#ssr-externals):

```js
const config = {
  // …
  kit: {
    // …
    vite: {
      ssr: {
        noExternal: ['three']
      }
    }
  }
}

export default config
```

> :zap: [See this issue](https://github.com/grischaerbe/threlte/issues/8#issuecomment-1024085864) for tips on how to reduce bundle size when working with vite and three.js.

Build your first scene:

[Open in a Svelte REPL](https://svelte.dev/repl/14f38c03710945b797d0c421f55e4373?version=3.46.2)

```svelte
<script>
  import {
    CircleBufferGeometry,
    MeshStandardMaterial,
    BoxBufferGeometry,
    DoubleSide
  } from "three";
  import {
    Canvas,
    DirectionalLight,
    HemisphereLight,
    Mesh,
    OrbitControls,
    PerspectiveCamera
  } from "threlte";
</script>

<div>
  <Canvas>
    <PerspectiveCamera position={{ x: 10, y: 10, z: 10 }}>
      <OrbitControls autoRotate />
    </PerspectiveCamera>

    <DirectionalLight shadow color={'white'} position={{ x: -15, y: 45, z: 20 }} />
    <HemisphereLight skyColor={'white'} groundColor={'#ac844c'} intensity={0.4} />

    <Mesh
      castShadow
      geometry={new BoxBufferGeometry(1, 1, 1)}
      material={new MeshStandardMaterial({ color: '#ff3e00' })}
    />

    <Mesh
      receiveShadow
      position={{ y: -0.5 }}
      rotation={{ x: -90 * (Math.PI / 180) }}
      geometry={new CircleBufferGeometry(3, 72)}
      material={new MeshStandardMaterial({ side: DoubleSide, color: 'white' })}
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
<br />

It should look something like this:

![getting-started-screenshot](https://raw.githubusercontent.com/grischaerbe/threlte/main/static/new-getting-started-screenshot.png)

Congratulations :tada:  
Orbit around the cube and have fun using threlte.

Have a look at the slightly more elaborate example including interactivity in a [Svelte REPL](https://svelte.dev/repl/bcb9474112ca440cb3c1f67e74250bcf?version=3.46.2).

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
    `const { renderer, invalidate } = useThrelte()`
- **Easily extendable**  
  Build objects that didn't yet make it to threlte yourself by plugging together _functional components_.
- **Tree-shakeble**  
  react-three-fiber is great at making it possible to use three.js classes as JSX components. This means that there is no hard dependency on a certain three.js version and everything that is possible in three.js is covered with react-three-fiber as well. There is however a downside: react-three-fiber looks up three.js classes at runtime. This means that even if your react-three-fiber app only uses a fraction of three.js, you will need to ship three.js in its entirety.  
  threlte does not look up three.js classes at runtime and as such is limited in features compared to three.js itself. It tries however to cover most use cases of three.js and provides _functional components_ to make extending threlte as easy as possible. As such, your bundler is able to tree-shake threlte and limit what parts of three.js get shipped.
- **Does not get in your way**  
  Everything is accessible. Objects are instantiated without any default values, so that threlte will not get in your way of setting up or altering objects manually while also relying on the defaults set by three.js.

### Interactivity

[Open the interactivity example in a Svelte REPL](https://svelte.dev/repl/c2b74dcf88ec4b4681b664e202c54274?version=3.46.2)

Listen to events of a `<Mesh>` and a `<MeshInstance>` as if it would be a regular DOM element:

```jsx
<Mesh … interactive on:click={onClick} />
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
  import { Mesh, ThreltePointerEvent } from 'threlte'

  const onClick = (e: CustomEvent<ThreltePointerEvent>) => {
    const distanceToMesh = e.detail.distance
  }
</script>

<Mesh … interactive on:click={onClick}>
```

All events but `pointerleave` and `pointerenter` also include the underlying `PointerEvent` or `MouseEvent`:

```svelte
<script>
  import { Mesh, ThreltePointerEvent } from 'threlte'

  const onPointerMove = (e) => {
    console.log(e.detail.event.clientX, e.detail.event.clientY)
  }
</script>

<Mesh … interactive on:pointermove={onPointerMove}>
```

> :warning: **You must add `interactive` to your component to be able to listen to pointer events**

Be aware that this will make the frameloop render on every frame.

### Viewport Awareness

[Open the viewport awareness example in a Svelte REPL](https://svelte.dev/repl/549eb76e8f994a34b9dd1c0b65540c79?version=3.46.2)

Additionally, most Objects (Lights, Cameras, Meshes, …) can be made *viewport aware*. Use it to lazily load textures, models and more.

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

> :warning: **You must add `viewportAware` to your component to make it viewport aware**

### Reactivity

[Open the reactivity example in a Svelte REPL](https://svelte.dev/repl/117298a99a5546e18b08b43c3a121274?version=3.46.2)

Just like [Svelte Cubed](https://github.com/Rich-Harris/svelte-cubed) and much unlike [react-three-fiber](https://docs.pmnd.rs/react-three-fiber/advanced/pitfalls) it is encouraged to use your component state to drive your three.js scene.
By using props instead of manipulating three.js objects directly, the unified render loop is able to tell that your scene needs rerendering and svelte can make use of component optimizations.


## Conventions

Threlte components follow the principles of three.js whereever possible and useful in terms of available properties and events and their respective naming.

Most component properties are `undefined` by default. Therefore, new three.js objects are instantiated without any optional default values. This way, three.js will provide the defaults and threltes reactivity will *not* kick in, allowing you to take complete control over objects.

On top of that, threlte adds some functionality to make objects even more reactive.

#### lookAt <!-- omit in toc -->

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

## Reference

### Types

TypeScript users should install @types/three in order to get type support for three.js.

```bash
npm install -D @types/three
```

#### Property Types

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

#### Context Types

The `<Canvas>` component provides two very useful contexts: `ThrelteContext` and `ThrelteRootContext`

```ts
type ThrelteContext = {
  size: Readable<Size>
  pointer: Writable<Vector2>
  pointerOverCanvas: Writable<boolean>
  clock: Clock
  camera: Writable<Camera>
  scene: Scene
  renderer?: WebGLRenderer
  composer?: EffectComposer
  invalidate: (debugFrameloopMessage?: string) => void
}

type ThrelteRootContext = {
  setCamera: (camera: Camera) => void
  linear: Writable<boolean>
  flat: Writable<boolean>
  dpr: Writable<number>
  addPass: (pass: Pass) => void
  removePass: (pass: Pass) => void
  addRaycastableObject: (obj: Object3D) => void
  removeRaycastableObject: (obj: Object3D) => void
  addInteractiveObject: (obj: Object3D) => void
  removeInteractiveObject: (obj: Object3D) => void
  interactiveObjects: Set<Object3D>
  raycastableObjects: Set<Object3D>
  raycaster: Raycaster
  lastIntersection: Intersection<Object3D<Event>> | null
}
```

See [`useThrelte`](#leftwards_arrow_with_hook-usethrelte) and [`useThrelteRoot`]((#leftwards_arrow_with_hook-usethrelteroot)) on how to use these.

### Components

Type information for threlte component properties, bindings and events are detailed below in the following form:

```ts
// optional
name: type = default

// required
name: type
```

#### :clipboard: \<Canvas>

The `<Canvas>` component is the root of your three.js scene.

By default, the `<canvas>` element and the renderer will resize to fit the parent element whenever the window resizes. Provide the property `size` to set a fixed `<canvas>` size.

`<Canvas>` also provides a default camera, located at `{ z: 5 }`.

###### Properties <!-- omit in toc -->

```ts
// optional
dpr: number = browser ? window.devicePixelRatio : 1
flat: boolean = false
linear: boolean = false
frameloop: 'always' | 'demand' = 'demand'
debugFrameloop: boolean = false
shadows: boolean = true
shadowMapType: THREE.ShadowMapType = THREE.PCFSoftShadowMap
size: { width: number, height: number } | undefined = undefined
rendererParameters: THREE.WebGLRendererParameters | undefined = undefined
```

###### Bindings <!-- omit in toc -->


```ts
ctx: ThrelteContext
rootCtx: ThrelteRootContext
```

> See [Context Types](#context-types) for details

#### :globe_with_meridians: Objects

##### :globe_with_meridians: \<Mesh>

###### Example <!-- omit in toc -->

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

###### Properties <!-- omit in toc -->

```ts
// required
geometry: THREE.BufferGeometry
material: THREE.Material | THREE.Material[]

// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
interactive: boolean = false
ignorePointerEvents: boolean = false
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
mesh: THREE.Mesh
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
click: CustomEvent<ThreltePointerEvent>
contextmenu: CustomEvent<ThreltePointerEvent>
pointerup: CustomEvent<ThreltePointerEvent>
pointerdown: CustomEvent<ThreltePointerEvent>
pointerenter: CustomEvent<ThreltePointerEvent>
pointerleave: CustomEvent<ThreltePointerEvent>
pointermove: CustomEvent<ThreltePointerEvent>
```

##### :globe_with_meridians: \<Group>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { Group, GLTF } from 'threlte'
</script>

<Group position={{ x: 5 }}>
  <GLTF url={"/models/modelA.glb"} />
  <GLTF url={"/models/modelB.glb"} />
</Group>
```

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
group: THREE.Group
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

##### :globe_with_meridians: \<Object3D>

###### Example <!-- omit in toc -->

You might want to use this component to pass as a reference to other components:

```svelte
<script>
  import { Object3D, PerspectiveCamera } from 'threlte'

  let target
</script>

<PerspectiveCamera lookAt={target} />
<Object3D bind:object={target} />
```

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
object: THREE.Object3D
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

##### :globe_with_meridians: \<GLTF>

To use DRACO compression, provide a path to the DRACO decoder.  
To use KTX2 compressed textures, provide a path to the KTX2 transcoder.

You are able to change the property `url` to load new 3D content. New content will be swapped as soon as loading is finished.

###### Example <!-- omit in toc -->

```svelte
<script>
  import { GLTF } from 'threlte'
</script>

<GLTF 
  castShadow 
  receiveShadow 
  url={'/models/flower.glb'} 
  position={{ y: 1 }} 
  scale={3}
/>
```

###### Properties <!-- omit in toc -->

```ts
// required
url: string

// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
dracoDecoderPath: string | undefined = undefined
ktxTranscoderPath: string | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
gltf: GLTF | undefined
scene: THREE.Group | undefined
animations: AnimationClip[] | undefined
asset: 
  | {
      copyright?: string | undefined;
      generator?: string | undefined;
      version?: string | undefined;
      minVersion?: string | undefined;
      extensions?: any;
      extras?: any;
    }
  | undefined
cameras: Camera[] | undefined
scenes: Group[] | undefined
userData: any
parser: GLTFParser | undefined
```

###### Events <!-- omit in toc -->

```ts
load: GLTF                 // The content finished loading
unload: undefined          // New content finished loading and the old content is unloaded and disposed
error: string              // An error occured while loading and parsing
viewportenter: undefined
viewportleave: undefined
```

#### :recycle: Object Instances

While object components like `<Mesh>` create a new object for you (in the case of `<Mesh>` it's a `THREE.Mesh`), an object instance component takes an existing object instance (`THREE.Mesh`, `THREE.Object3D`, `THREE.Light` or `THREE.Camera`) as a property and applies reactivity to it. It's used internally but can also be used to introduce reactivity to objects that need to be instanced manually, imported models or objects that did not yet make it into threlte.

Object instance components intentionally have no default values on properties even if they can be `undefined`. That way, your IDE will tell you what properties need to be implemented to properly set them up.

###### Example <!-- omit in toc -->

```svelte
<script>
  import { Object3D } from 'three'
  import { Object3DInstance, useFrame } from 'threlte'

  const object = new Object3D()
  let position = { x: 1, y: 1, z: 1 }

  useFrame(() => {
    position.x += 0.1
  })
</script>

<Object3DInstance {object} {position} />
```

##### :recycle: \<Object3DInstance>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { Object3D } from 'three'
  import { Object3DInstance } from 'threlte'

  const object = new Object3D()
</script>

<Object3DInstance {object} position={{ y: 1 }} />
```

###### Properties <!-- omit in toc -->

```ts
// required
object: THREE.Object3D
viewportAware: boolean

// optional
position: Position | undefined
scale: Scale | undefined
rotation: Rotation | undefined
lookAt: LookAt | undefined
castShadow: boolean | undefined
receiveShadow: boolean | undefined
frustumCulled: boolean | undefined
renderOrder: number | undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

##### :recycle: \<MeshInstance>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { Mesh, MeshStandardMaterial, BoxBufferGeometry } from 'three'
  import { MeshInstance } from 'threlte'

  const material = new MeshStandardMaterial({
    wireframe: true,
    color: 'black'
  })
  const geometry = new BoxBufferGeometry(1, 1, 1)
  const mesh = new Mesh(geometry, material)
</script>

<MeshInstance {mesh} rotation={{ x: 90 * (Math.PI / 180) }} />
```

###### Properties <!-- omit in toc -->

```ts
// required
mesh: THREE.Mesh
interactive: boolean
ignorePointerEvents: boolean
viewportAware: boolean

// optional
position: Position | undefined
scale: Scale | undefined
rotation: Rotation | undefined
lookAt: LookAt | undefined
castShadow: boolean | undefined
receiveShadow: boolean | undefined
frustumCulled: boolean | undefined
renderOrder: number | undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
click: CustomEvent<ThreltePointerEvent>
contextmenu: CustomEvent<ThreltePointerEvent>
pointerup: CustomEvent<ThreltePointerEvent>
pointerdown: CustomEvent<ThreltePointerEvent>
pointerenter: CustomEvent<ThreltePointerEvent>
pointerleave: CustomEvent<ThreltePointerEvent>
pointermove: CustomEvent<ThreltePointerEvent>
```

##### :recycle: \<CameraInstance>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { PerspectiveCamera } from 'three'
  import { CameraInstance } from 'threlte'
  
  const camera = new PerspectiveCamera(45, 1, 1, 1000)
</script>

<CameraInstance useCamera={false} {camera} />
```

###### Properties <!-- omit in toc -->

```ts
// required
camera: THREE.Camera
viewportAware: boolean
useCamera: boolean

// optional
position: Position | undefined
scale: Scale | undefined
rotation: Rotation | undefined
lookAt: LookAt | undefined
castShadow: boolean | undefined
receiveShadow: boolean | undefined
frustumCulled: boolean | undefined
renderOrder: number | undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

##### :recycle: \<LightInstance>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { RectAreaLight } from 'three'
  import { RectAreaLightUniformsLib } from 'three/examples/jsm/lights/RectAreaLightUniformsLib'
  import { LightInstance } from 'threlte'

  RectAreaLightUniformsLib.init()

  export let intensity

  const light = new RectAreaLight(0xffffff, intensity,  10, 10)
</script>

<LightInstance {light} {intensity} position={{ x: 5, y: 5 }} />
```

###### Properties <!-- omit in toc -->

```ts
// required
light: THREE.Light
viewportAware: boolean

// optional
position: Position | undefined
scale: Scale | undefined
rotation: Rotation | undefined
lookAt: LookAt | undefined
castShadow: boolean | undefined
receiveShadow: boolean | undefined
frustumCulled: boolean | undefined
renderOrder: number | undefined
color: THREE.ColorRepresentation | undefined
intensity: number | undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

#### :high_brightness: Lights

##### :high_brightness: \<AmbientLight>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { AmbientLight } from 'threlte'
</script>

<AmbientLight color={0xd7681c} intensity={0.3} />
```

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
color: THREE.ColorRepresentation | undefined = undefined
intensity: number | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
light: THREE.AmbientLight
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

##### :high_brightness: \<DirectionalLight>

The `<DirectionalLight>` component accepts a property `target` which acts like the property `lookAt`: Provide either a `Position` (`{ x: 5, z: 3 }`) or another Object3D instance. In the latter case the `DirectionalLight` will track the provided object. This is especially useful if you want to move the area that the shadow is applied to.

See the three.js [DirectionalLight documentation](https://threejs.org/docs/index.html?q=direct#api/en/lights/DirectionalLight) for details.

###### Example <!-- omit in toc -->

```svelte
<script>
  import { DirectionalLight } from 'threlte'
</script>

<DirectionalLight 
  shadow 
  intensity={0.6}
  position={{ x: 3, y: 10, z: 3 }}
  target={{ x: 1 }}
/>
```

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
viewportAware: boolean = false
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
color: THREE.ColorRepresentation | undefined = undefined
intensity: number | undefined = undefined
target: Position | THREE.Object3D | undefined = undefined
shadow:
  | boolean
  | {
      mapSize?: [number, number] | undefined
      camera?:
        | {
            left?: number | undefined
            right?: number | undefined
            top?: number | undefined
            bottom?: number | undefined
            near?: number | undefined
            far?: number | undefined
          }
        | undefined
      bias?: number | undefined
      radius?: number | undefined
    }
  | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
light: THREE.DirectionalLight
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

##### :high_brightness: \<HemisphereLight>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { HemisphereLight } from 'threlte'
</script>

<HemisphereLight 
  skyColor={0xFB9796}
  groundColor={0xC1B8A5}
/>
```

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
receiveShadow: boolean | undefined = undefined
castShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
intensity: number | undefined = undefined
skyColor: THREE.ColorRepresentation | undefined = undefined
groundColor: THREE.ColorRepresentation | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
light: THREE.HemisphereLight
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

##### :high_brightness: \<PointLight>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { PointLight } from 'threlte'
</script>

<PointLight position={{ x: 3, y: 3 }} />
```

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
color: THREE.ColorRepresentation | undefined = undefined
intensity: number | undefined = undefined
distance: number | undefined = undefined
decay: number | undefined = undefined
power: number | undefined = undefined
shadow:
  | boolean
  | {
      mapSize?: [number, number]
      camera?: { near?: number; far?: number }
      bias?: number
      radius?: number
    }
  | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
light: THREE.PointLight
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

##### :high_brightness: \<SpotLight>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { SpotLight, Mesh } from 'threlte'
  let mesh
</script>

<Mesh … bind:mesh />
<SpotLight position={{ x: 3, y: 3 }} target={mesh} />
```

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
color: THREE.ColorRepresentation | undefined = undefined
intensity: number | undefined = undefined
angle: number | undefined = undefined
decay: number | undefined = undefined
distance: number | undefined = undefined
penumbra: number | undefined = undefined
power: number | undefined = undefined
target: LookAt | undefined = undefined
shadow:
  | boolean
  | {
      mapSize?: [number, number]
      camera?: { near?: number; far?: number }
      bias?: number
      radius?: number
    }
  | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
light: THREE.SpotLight
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

#### :movie_camera: Cameras

##### :movie_camera: \<OrthographicCamera>

###### Example <!-- omit in toc -->

```svelte
<script>
  import { OrthographicCamera } from 'threlte'
</script>

<OrthographicCamera 
  position={{ x: 3, y: 3, z: 3 }} 
  lookAt={{ x: 0, y: 0, z: 0 }}
/>
```

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
useCamera: boolean = true
near: number = undefined
far: number = undefined
zoom: number = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
camera: THREE.OrthographicCamera
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

##### :movie_camera: \<PerspectiveCamera>

###### Example <!-- omit in toc -->

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

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
useCamera: boolean = true
near: number = undefined
far: number = undefined
fov: number = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
camera: THREE.PerspectiveCamera
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
```

#### :repeat: Controls

##### :repeat: \<OrbitControls>

The component `<OrbitControls>` must be a direct child of a camera component and will mount itself to that camera.  
If the properties `autoRotate` or `enableDamping` are set to true, the frame loop will run continously.

###### Example <!-- omit in toc -->

```svelte
<script>
  import { PerspectiveCamera, OrbitControls } from 'threlte'
</script>

<PerspectiveCamera fov={50}>
  <OrbitControls enableDamping />
</PerspectiveCamera>
```

###### Properties <!-- omit in toc -->

```ts
// optional
autoRotate: boolean | undefined = undefined
autoRotateSpeed: number | undefined = undefined
dampingFactor: number | undefined = undefined
enableDamping: boolean | undefined = undefined
enabled: boolean | undefined = undefined
enablePan: boolean | undefined = undefined
enableRotate: boolean | undefined = undefined
enableZoom: boolean | undefined = undefined
keyPanSpeed: number | undefined = undefined
keys:
  | {
      LEFT: string
      UP: string
      RIGHT: string
      BOTTOM: string
    }
  | undefined = undefined
maxAzimuthAngle: number | undefined = undefined
maxDistance: number | undefined = undefined
maxPolarAngle: number | undefined = undefined
maxZoom: number | undefined = undefined
minAzimuthAngle: number | undefined = undefined
minDistance: number | undefined = undefined
minPolarAngle: number | undefined = undefined
minZoom: number | undefined = undefined
mouseButtons:
  | {
        LEFT: MOUSE
        MIDDLE: MOUSE
        RIGHT: MOUSE
    }
  | undefined = undefined
panSpeed: number | undefined = undefined
rotateSpeed: number | undefined = undefined
screenSpacePanning: boolean | undefined = undefined
touches: 
  | {
        ONE: TOUCH
        TWO: TOUCH
    }
  | undefined = undefined
zoomSpeed: number | undefined = undefined
target: Position | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
controls: THREE.OrbitControls
```

###### Events <!-- omit in toc -->

```ts
change: undefined
start: undefined
end: undefined
```

#### :lipstick: Post Processing

##### :lipstick: \<Pass>

By default, threlte will render using the regular WebGLRenderer. If any Pass is added to the scene, the `EffectComposer` will take over the rendering. A default `RenderPass` is added automatically and rendered before any `<Pass>`.

###### Example <!-- omit in toc -->

```svelte
<script>
  import { Pass } from 'threlte'
  import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass'
</scrip>

<Pass pass={new GlitchPass()}>
```

###### Properties <!-- omit in toc -->

```ts
// required
pass: THREE.Pass
```

#### Misc

##### :thought_balloon: \<Fog>

A `<Fog>` adds itself to the scene directly. The placement in the hierarchy is therefore unimportant as long as it's inside the `<Canvas>` component.

###### Example <!-- omit in toc -->

```svelte
<script>
  import { Fog } from 'threlte'
</script>

<Fog color={"#dddddd"} />
```

###### Properties <!-- omit in toc -->

```ts
// optional
color: THREE.ColorRepresentation = 0xffffff
near: number | undefined = undefined
far: number | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
fog: THREE.Fog
```

##### :thought_balloon: \<FogExp2>

A `<FogExp2>` adds itself to the scene directly. The placement in the hierarchy is therefore unimportant as long as it's inside the `<Canvas>` component.


###### Example <!-- omit in toc -->

```svelte
<script>
  import { FogExp2 } from 'threlte'
</script>

<FogExp2 color={"#dddddd"} density={0.3} />
```

###### Properties <!-- omit in toc -->

```ts
// optional
color: THREE.ColorRepresentation = 0xffffff
density: number | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
fog: THREE.FogExp2
```

##### :abc: \<Text>

The `<Text>` component uses [troika-three-text](https://github.com/protectwise/troika/tree/master/packages/troika-three-text) to render text.

###### Example <!-- omit in toc -->

```svelte
<script>
  import { Text } from 'threlte'
  let value = ''
</script>

<input type="text" bind:value />
<Text text={value} />
```

###### Properties <!-- omit in toc -->

```ts
// optional
position: Position | undefined = undefined
scale: Scale | undefined = undefined
rotation: Rotation | undefined = undefined
lookAt: LookAt | undefined = undefined
viewportAware: boolean = false
castShadow: boolean | undefined = undefined
receiveShadow: boolean | undefined = undefined
frustumCulled: boolean | undefined = undefined
renderOrder: number | undefined = undefined
interactive: boolean = false
ignorePointerEvents: boolean = false

text: string | undefined = undefined
anchorX: number | 'left' | 'center' | 'right' | string | undefined = undefined
anchorY: number | 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom' | string | undefined = undefined
curveRadius: number | undefined = undefined
font: null | string | undefined = undefined
fontSize: number | undefined = undefined
letterSpacing: number | undefined = undefined
lineHeight: number | string | undefined = undefined
maxWidth: number | undefined = undefined
overflowWrap: 'normal' | 'break-word' | 'normal' | undefined = undefined
textAlign: 'left' | 'right' | 'center' | 'justify' | undefined = undefined
textIndent: number | undefined = undefined
whiteSpace: 'normal' | 'nowrap' | 'pre-wrap' | undefined = undefined
material: THREE.Material | THREE.Material[] | null | undefined = undefined
color: string | number | THREE.Color | null | undefined = undefined
depthOffset: number | undefined = undefined
clipRect: [number, number, number, number] | null | undefined = undefined
glyphGeometryDetail: number | undefined = undefined
sdfGlyphSize: number | null | undefined = undefined
outlineWidth: number | string | undefined = undefined
outlineColor: THREE.ColorRepresentation | undefined = undefined
outlineOpacity: number | undefined = undefined
outlineBlur: number | string | undefined = undefined
outlineOffsetX: number | string | undefined = undefined
outlineOffsetY: number | string | undefined = undefined
strokeWidth: number | string | undefined = undefined
strokeColor: THREE.ColorRepresentation | THREE.Color | undefined = undefined
strokeOpacity: number | undefined = undefined
fillOpacity: number | undefined = undefined
```

###### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
text: Text
```

###### Events <!-- omit in toc -->

```ts
viewportenter: undefined
viewportleave: undefined
click: CustomEvent<ThreltePointerEvent>
contextmenu: CustomEvent<ThreltePointerEvent>
pointerup: CustomEvent<ThreltePointerEvent>
pointerdown: CustomEvent<ThreltePointerEvent>
pointerenter: CustomEvent<ThreltePointerEvent>
pointerleave: CustomEvent<ThreltePointerEvent>
pointermove: CustomEvent<ThreltePointerEvent>
```

##### :black_square_button: \<Layers>

[Layers](https://threejs.org/docs/#api/en/core/Layers) are one of many ways to manage the visibility of objects in three.js.  
The `<Layers>` component assigns all child components the layer memberships you pass to it. Any object that is a member of the same layers the camera is on, is visible.

###### Example <!-- omit in toc -->

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

###### Properties <!-- omit in toc -->

```ts
// required
layers: ThrelteLayers
```

Property `layers` can be:
- any integer from 0 to 31
- an array of any integer from 0 to 31
- `'all'`
- `'none'`

> TypeScript users will benefit from strong types, JavaScript users should be aware that there is no runtime validation happening.

##### :link: \<ContextBridge>

This component is used to consume the context and rootContext provided by the `<Canvas>` component outside of it.

###### Example <!-- omit in toc -->

```svelte
<script>
  import { Canvas, ContextBridge } from 'threlte'

  let ctx
  $: console.log(ctx)
</script>

<Canvas>
  <ContextBridge bind:ctx />
</Canvas>
```

###### Bindings <!-- omit in toc -->

```ts
ctx: ThrelteContext
rootCtx: ThrelteRootContext
```

### :leftwards_arrow_with_hook: Hooks

> ⚠️ Hooks can only be used inside the `<Canvas>` component because they rely on context ⚠️

#### :leftwards_arrow_with_hook: useThrelte

This hook lets you consume the state of the `<Canvas>` component which contains the renderer, camera, scene and so on.  
It is recommended to set the camera via the property `setCamera` of the [root context]((#leftwards_arrow_with_hook-usethrelteroot)).

```ts
const {
  size,                   // Readable<Size>
  pointer,                // Writable<Vector2>
  pointerOverCanvas,      // Writable<boolean>
  clock,                  // Clock
  camera,                 // Writable<Camera>
  scene,                  // Scene
  renderer,               // WebGLRenderer
  composer,               // EffectComposer
  invalidate,             // (debugFrameloopMessage?: string) => void
} = useThrelte()
```

If your [frame loop is set to `'demand'`](#clipboard-canvas) and you are manually editing objects or materials, be sure to invalidate the current frame to request a rerender:

```ts
const { invalidate } = useThrelte()

invalidate()

// Optionally provide a debugFrameloopMessage to debug the frame loop
invalidate('changed material color')
```

> This context is also available as the first argument of the callback of the [useFrame hook](#useframe)!

#### :leftwards_arrow_with_hook: useThrelteRoot

This hook lets you consume the root context. Although it can be useful, this is mostly used internally.  
The properties `linear`, `flat` and `dpr` are reactive and can also be set.

```ts
const {
  setCamera,                   // (camera: Camera) => void
  linear,                      // Writable<boolean>
  flat,                        // Writable<boolean>
  dpr,                         // Writable<number>
  addPass,                     // (pass: Pass) => void
  removePass,                  // (pass: Pass) => void
  addRaycastableObject,        // (obj: Object3D) => void
  removeRaycastableObject,     // (obj: Object3D) => void
  addInteractiveObject,        // (obj: Object3D) => void
  removeInteractiveObject,     // (obj: Object3D) => void
  interactiveObjects,          // Set<Object3D>
  raycastableObjects,          // Set<Object3D>
  raycaster,                   // Raycaster
  lastIntersection,            // Intersection<Object3D<Event>> | null
} = useThrelteRoot()
```

#### :leftwards_arrow_with_hook: useFrame

This hook allows you to execute code on every frame.  
You receive the state (the same as `useThrelte`) and a clock delta in seconds.  
Your callback function will be invoked just before a frame is rendered. When the component unmounts it is unsubscribed automatically from the frame loop.

You may pass additional options to this hook. The property `order` is useful if you need to order the sequence of `useFrame` callbacks across the component tree. To debug your frameloop, provide a `debugFrameloopMessage` and add `debugFrameloop` to your `<Canvas>` component.

```ts
type ThrelteUseFrameOptions = {
  autostart?: boolean
  order?: number
  debugFrameloopMessage?: string
}
```

`useFrame` returns an object containing functions `start` and `stop` to control the execution of the callback and a store `started` to subscribe to its state.

##### Example <!-- omit in toc -->

```ts
const { start, stop, started } = useFrame(() => {
  console.log('rendering…')
}, {
  autostart: false
})

const toggleUseFrame = () => {
  if ($started) {
    stop()
  } else {
    start()
  }
}
```

#### :leftwards_arrow_with_hook: useLoader

`useLoader` memoizes Loaders to reuse them at any time. Pass in the Loaders class and a function to instantiate the loader.

##### Example <!-- omit in toc -->

```ts
import { useLoader } from 'threlte'
import { OBJLoader } from 'three/examples/jsm/loaders/OBJLoader'

const loader = useLoader(OBJLoader, () => new OBJLoader())
loader.load('models/model.obj', (obj) => {
  console.log(object)
})
```

#### :leftwards_arrow_with_hook: useTexture

`useTexture` allows you to easily load textures and automatically convert your textures to the correct color space based on your [settings on the `<Canvas>` component](#canvas).
This hook can be called outside of the `<Canvas>` component, but with limitations: To make sure that textures are converted to the correct color space, `useTexture` needs to consume the `<Canvas>` context. If there's no context, it will fall back to keeping your textures untouched.  
`useTexture` also exposes the native `THREE.TextureLoader` events `onLoad`, `onProgress` and `onError`:

```ts
const texture = useTexture('tex.jpg', {
  onError: (error) => {
    console.warn(`An error occured loading the texture: ${error.message}`)
  }
})
```

##### Examples <!-- omit in toc -->

```ts
const tex = useTexture('tex.jpg')
// THREE.Texture

const [texA, texB] = useTexture(['texA.jpg', 'texB.jpg'])
// THREE.Texture[]

const textures = useTexture({ bumpMap: 'bump.jpg', map: 'map.jpg' })
// { bumpMap: THREE.Texture, map: THREE.Texture }
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
