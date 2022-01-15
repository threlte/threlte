<script lang="ts">
	import { createEventDispatcher, onDestroy } from 'svelte'
	import type { PositionProp, RotationProp, ScaleProp, Text as TextType } from '../lib/types'
	import { useThrelte } from '../lib/useThrelte'
	import Primitive from '../objects/Primitive.svelte'
	import { Text } from 'troika-three-text'
	import { defaults } from '../lib/defaults'

	// troika-three-text options
	export let text: TextType['text'] = ''
	export let anchorX: TextType['anchorX'] = 0
	export let anchorY: TextType['anchorY'] = 0
	export let curveRadius: TextType['curveRadius'] = 0
	export let font: TextType['font'] = null
	export let fontSize: TextType['fontSize'] = 0.1
	export let letterSpacing: TextType['letterSpacing'] = 0
	export let lineHeight: TextType['lineHeight'] = 'normal'
	export let maxWidth: TextType['maxWidth'] = Infinity
	export let overflowWrap: TextType['overflowWrap'] = 'normal'
	export let textAlign: TextType['textAlign'] = 'left'
	export let textIndent: TextType['textIndent'] = 0
	export let whiteSpace: TextType['whiteSpace'] = 'normal'
	export let material: TextType['material'] | null = null
	export let color: TextType['color'] | null = null
	export let depthOffset: TextType['depthOffset'] = 0
	export let clipRect: TextType['clipRect'] | null = null
	export let glyphGeometryDetail: TextType['glyphGeometryDetail'] = 0
	export let sdfGlyphSize: TextType['sdfGlyphSize'] = 64
	export let outlineWidth: TextType['outlineWidth'] = 0
	export let outlineColor: TextType['outlineColor'] = 'black'
	export let outlineOpacity: TextType['outlineOpacity'] = 1
	export let outlineBlur: TextType['outlineBlur'] = 0
	export let outlineOffsetX: TextType['outlineOffsetX'] = 0
	export let outlineOffsetY: TextType['outlineOffsetY'] = 0
	export let strokeWidth: TextType['strokeWidth'] = 0
	export let strokeColor: TextType['strokeColor'] = 0x808080
	export let strokeOpacity: TextType['strokeOpacity'] = 1
	export let fillOpacity: TextType['fillOpacity'] = 1

	export let position: PositionProp = undefined
	export let scale: ScaleProp = undefined
	export let rotation: RotationProp = undefined

	export let castShadow = defaults.mesh.castShadow
	export let receiveShadow = defaults.mesh.receiveShadow
	export let frustumCulled = defaults.mesh.frustumCulled
	export let renderOrder = defaults.mesh.renderOrder

	export let interactive: boolean = false
	export let ignorePointerEvents: boolean = false

	export let viewportAware: boolean = false
	export let inViewport: boolean | undefined = undefined

	export const textObject = new Text() as TextType

	const { render } = useThrelte()

	const dispatch = createEventDispatcher<{
		sync: undefined
	}>()

	$: {
		textObject.text = text
		textObject.anchorX = anchorX
		textObject.anchorY = anchorY
		textObject.curveRadius = curveRadius
		textObject.font = font
		textObject.fontSize = fontSize
		textObject.letterSpacing = letterSpacing
		textObject.lineHeight = lineHeight
		textObject.maxWidth = maxWidth
		textObject.overflowWrap = overflowWrap
		textObject.textAlign = textAlign
		textObject.textIndent = textIndent
		textObject.whiteSpace = whiteSpace
		if (material) textObject.material = material
		textObject.color = color
		textObject.depthOffset = depthOffset
		textObject.clipRect = clipRect
		textObject.glyphGeometryDetail = glyphGeometryDetail
		textObject.sdfGlyphSize = sdfGlyphSize
		textObject.outlineWidth = outlineWidth
		textObject.outlineColor = outlineColor
		textObject.outlineOpacity = outlineOpacity
		textObject.outlineBlur = outlineBlur
		textObject.outlineOffsetX = outlineOffsetX
		textObject.outlineOffsetY = outlineOffsetY
		textObject.strokeWidth = strokeWidth
		textObject.strokeColor = strokeColor
		textObject.strokeOpacity = strokeOpacity
		textObject.fillOpacity = fillOpacity

		textObject.sync(() => {
			render()
			dispatch('sync')
		})
	}

	$: {
		textObject.castShadow = castShadow
		textObject.receiveShadow = receiveShadow
		textObject.frustumCulled = frustumCulled
		textObject.renderOrder = renderOrder
		render()
	}

	onDestroy(() => {
		textObject.dispose()
	})
</script>

<Primitive
	on:viewportenter
	on:viewportleave
	on:click
	on:contextmenu
	on:pointerup
	on:pointerdown
	on:pointerenter
	on:pointerleave
	on:pointermove
	object={textObject}
	{position}
	{scale}
	{rotation}
	{interactive}
	{ignorePointerEvents}
	{viewportAware}
	{inViewport}
/>
