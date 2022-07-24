---
title: Debug
---

<script lang="ts">
import Wrapper from '$examples/rapier/collision-groups/Wrapper.svelte'
</script>

!!!module_summary title=Debug|sourcePath=/components/Debug/Debug.svelte|name=Debug|from=rapier|type=component

Use the Debug component to see live representations of all colliders in a scene.


```svelte
<Canvas>
	<World>
		<Debug />

		<RigidBody>
			<AutoColliders>
				<Mesh {geometry} {material} />
			</AutoColliders>
		</RigidBody>
	</World>
</Canvas>
```

!!!

### Properties

The props are used to initialize a `THREE.LineBasicMaterial`.

```ts
// optional
vertexColors: boolean = true
color: ColorRepresentation | undefined = undefined
linewidth: number | undefined = undefined
linecap: string | undefined = undefined
linejoin: string | undefined = undefined
alphaTest: number | undefined = undefined
alphaToCoverage: boolean | undefined = undefined
blendDst: BlendingDstFactor | undefined = undefined
blendDstAlpha: number | undefined = undefined
blendEquation: BlendingEquation | undefined = undefined
blendEquationAlpha: number | undefined = undefined
blending: Blending | undefined = undefined
blendSrc: BlendingDstFactor | BlendingSrcFactor | undefined = undefined
blendSrcAlpha: number | undefined = undefined
clipIntersection: boolean | undefined = undefined
clippingPlanes: Plane[] | undefined = undefined
clipShadows: boolean | undefined = undefined
colorWrite: boolean | undefined = undefined
defines: any
depthFunc: DepthModes | undefined = undefined
depthTest: boolean | undefined = undefined
depthWrite: boolean | undefined = undefined
name: string | undefined = undefined
opacity: number | undefined = undefined
polygonOffset: boolean | undefined = undefined
polygonOffsetFactor: number | undefined = undefined
polygonOffsetUnits: number | undefined = undefined
precision: 'highp' | 'mediump' | 'lowp' | null | undefined = undefined
premultipliedAlpha: boolean | undefined = undefined
dithering: boolean | undefined = undefined
side: Side | undefined = undefined
shadowSide: Side | undefined = undefined
toneMapped: boolean | undefined = undefined
transparent: boolean | undefined = undefined
visible: boolean | undefined = undefined
format: PixelFormat | undefined = undefined
stencilWrite: boolean | undefined = undefined
stencilFunc: StencilFunc | undefined = undefined
stencilRef: number | undefined = undefined
stencilWriteMask: number | undefined = undefined
stencilFuncMask: number | undefined = undefined
stencilFail: StencilOp | undefined = undefined
stencilZFail: StencilOp | undefined = undefined
stencilZPass: StencilOp | undefined = undefined
userData: any | undefined = undefined
```
