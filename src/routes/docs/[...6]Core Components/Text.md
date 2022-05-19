---
title: <Text>
---

# \<Text>

The `<Text>` component uses [troika-three-text](https://github.com/protectwise/troika/tree/master/packages/troika-three-text) to render text.

### Example <!-- omit in toc -->

```svelte
<script>
  import { Text } from 'threlte'
  let value = ''
</script>

<input type="text" bind:value />
<Text text={value} />
```

### Properties <!-- omit in toc -->

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
visible: boolean | undefined = undefined
interactive: boolean = false
ignorePointer: boolean = false

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

### Bindings <!-- omit in toc -->

```ts
inViewport: boolean
textObject: Text
```

### Events <!-- omit in toc -->

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
