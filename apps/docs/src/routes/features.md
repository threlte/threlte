---
title: Features
---

# Features

Yes, there are already three.js component libraries for svelte, however threlte is different in some ways:

## Sensible defaults

Much like [react-three-fiber](https://github.com/pmndrs/react-three-fiber), threlte will set sensible defaults to three.js `WebGLRenderer`, all colors and textures and more. This makes it easy for you to follow best practices in terms of color reception and accuracy.
threlte also makes visibility management a breeze with its `<Layers>` component.

## Unified frame loop

By default, threlte only renders the scene if there's need for it: If a prop changes that makes rendering the scene necessary, if there are any interactive objects in the scene or if threlte or you use `useFrame` in any of your components.

## Interactivity

threlte makes it possible to use events on three.js objects as if they were regular DOM elements:
`<Mesh … interactive on:click={onClick}>`
You can also listen to your object leaving or entering the viewport:
`<Mesh … viewportAware on:viewportenter={onViewportEnter}>`

## TypeScript

All threlte components are written in TypeScript, so type support is a first-class citizen.

## Text rendering

Render text using the fantastic [troika-three-text](https://github.com/protectwise/troika/tree/master/packages/troika-three-text) library with:
`<Text text="Hello World" />`

## Automatic Disposal

Svelte is aware of component lifecycles, hence Threlte will attempt to free resources for you by calling `dispose`, if present, on all unmounted objects and recursively on all properties that are not being used anywhere else in your scene. Learn more about Threltes automatic disposal [here](/concepts/disposal).

## Access All Areas

- Bind to three.js object instances
  `<Mesh … bind:mesh>`
- Access the renderer
  `const { renderer, invalidate } = useThrelte()`

## Easily extendable

Build objects that didn't yet make it to threlte yourself by plugging together _functional components_ <small>(as in they do one thing and do it well)</small>.

## Tree-shakeble

react-three-fiber is great at making it possible to use three.js classes as JSX components. This means that there is no hard dependency on a certain three.js version and everything that is possible in three.js is covered with react-three-fiber as well. There is however a downside: react-three-fiber looks up three.js classes at runtime. This means that even if your react-three-fiber app only uses a fraction of three.js, you will need to ship three.js in its entirety.
threlte does not look up three.js classes at runtime and as such is limited in features compared to three.js itself. It tries however to cover most use cases of three.js and provides _functional components_ to make extending threlte as easy as possible. As such, your bundler is able to tree-shake threlte and ([somewhat](https://github.com/mrdoob/three.js/issues/17482)) limit what parts of three.js get shipped. To further reduce the bundle size, see [this comment](https://github.com/grischaerbe/threlte/issues/8#issuecomment-1024085864).

## Does not get in your way

Everything is accessible. Objects are instantiated without any default values, so that threlte will not get in your way of setting up or altering objects manually while also relying on the defaults set by three.js.
