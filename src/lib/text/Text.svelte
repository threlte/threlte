<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { Text as ThreeText } from 'troika-three-text'
  import { useThrelte } from '../hooks/useThrelte'
  import MeshInstance from '../instances/MeshInstance.svelte'
  import type { TextProperties } from '../types/components'
  import type { Text as TextType } from '../types/types'

  // MeshInstance
  export let position: TextProperties['position'] = undefined
  export let scale: TextProperties['scale'] = undefined
  export let rotation: TextProperties['rotation'] = undefined
  export let viewportAware: TextProperties['viewportAware'] = false
  export let inViewport: TextProperties['inViewport'] = false
  export let castShadow: TextProperties['castShadow'] = undefined
  export let receiveShadow: TextProperties['receiveShadow'] = undefined
  export let frustumCulled: TextProperties['frustumCulled'] = undefined
  export let renderOrder: TextProperties['renderOrder'] = undefined
  export let interactive: TextProperties['interactive'] = false
  export let ignorePointer: TextProperties['ignorePointer'] = false
  export let lookAt: TextProperties['lookAt'] = undefined

  // self
  export let text: TextProperties['text'] = undefined
  export let anchorX: TextProperties['anchorX'] = undefined
  export let anchorY: TextProperties['anchorY'] = undefined
  export let curveRadius: TextProperties['curveRadius'] = undefined
  export let font: TextProperties['font'] = undefined
  export let fontSize: TextProperties['fontSize'] = undefined
  export let letterSpacing: TextProperties['letterSpacing'] = undefined
  export let lineHeight: TextProperties['lineHeight'] = undefined
  export let maxWidth: TextProperties['maxWidth'] = undefined
  export let overflowWrap: TextProperties['overflowWrap'] = undefined
  export let textAlign: TextProperties['textAlign'] = undefined
  export let textIndent: TextProperties['textIndent'] = undefined
  export let whiteSpace: TextProperties['whiteSpace'] = undefined
  export let material: TextProperties['material'] | null = undefined
  export let color: TextProperties['color'] | null = undefined
  export let depthOffset: TextProperties['depthOffset'] = undefined
  export let clipRect: TextProperties['clipRect'] | null = undefined
  export let glyphGeometryDetail: TextProperties['glyphGeometryDetail'] = undefined
  export let sdfGlyphSize: TextProperties['sdfGlyphSize'] = undefined
  export let outlineWidth: TextProperties['outlineWidth'] = undefined
  export let outlineColor: TextProperties['outlineColor'] = undefined
  export let outlineOpacity: TextProperties['outlineOpacity'] = undefined
  export let outlineBlur: TextProperties['outlineBlur'] = undefined
  export let outlineOffsetX: TextProperties['outlineOffsetX'] = undefined
  export let outlineOffsetY: TextProperties['outlineOffsetY'] = undefined
  export let strokeWidth: TextProperties['strokeWidth'] = undefined
  export let strokeColor: TextProperties['strokeColor'] = undefined
  export let strokeOpacity: TextProperties['strokeOpacity'] = undefined
  export let fillOpacity: TextProperties['fillOpacity'] = undefined

  export const textObject = new ThreeText() as TextType

  const { render } = useThrelte()

  const dispatch = createEventDispatcher<{
    sync: undefined
  }>()

  $: {
    if (text !== undefined) textObject.text = text
    if (anchorX !== undefined) textObject.anchorX = anchorX
    if (anchorY !== undefined) textObject.anchorY = anchorY
    if (curveRadius !== undefined) textObject.curveRadius = curveRadius
    if (font !== undefined) textObject.font = font
    if (fontSize !== undefined) textObject.fontSize = fontSize
    if (letterSpacing !== undefined) textObject.letterSpacing = letterSpacing
    if (lineHeight !== undefined) textObject.lineHeight = lineHeight
    if (maxWidth !== undefined) textObject.maxWidth = maxWidth
    if (overflowWrap !== undefined) textObject.overflowWrap = overflowWrap
    if (textAlign !== undefined) textObject.textAlign = textAlign
    if (textIndent !== undefined) textObject.textIndent = textIndent
    if (whiteSpace !== undefined) textObject.whiteSpace = whiteSpace
    if (material) textObject.material = material
    if (color !== undefined) textObject.color = color
    if (depthOffset !== undefined) textObject.depthOffset = depthOffset
    if (clipRect !== undefined) textObject.clipRect = clipRect
    if (glyphGeometryDetail !== undefined) textObject.glyphGeometryDetail = glyphGeometryDetail
    if (sdfGlyphSize !== undefined) textObject.sdfGlyphSize = sdfGlyphSize
    if (outlineWidth !== undefined) textObject.outlineWidth = outlineWidth
    if (outlineColor !== undefined) textObject.outlineColor = outlineColor
    if (outlineOpacity !== undefined) textObject.outlineOpacity = outlineOpacity
    if (outlineBlur !== undefined) textObject.outlineBlur = outlineBlur
    if (outlineOffsetX !== undefined) textObject.outlineOffsetX = outlineOffsetX
    if (outlineOffsetY !== undefined) textObject.outlineOffsetY = outlineOffsetY
    if (strokeWidth !== undefined) textObject.strokeWidth = strokeWidth
    if (strokeColor !== undefined) textObject.strokeColor = strokeColor
    if (strokeOpacity !== undefined) textObject.strokeOpacity = strokeOpacity
    if (fillOpacity !== undefined) textObject.fillOpacity = fillOpacity

    textObject.sync(() => {
      render('Text: sync finished')
      dispatch('sync')
    })
  }

  onDestroy(() => {
    textObject.dispose()
  })
</script>

<MeshInstance
  mesh={textObject}
  {lookAt}
  {position}
  {scale}
  {rotation}
  {castShadow}
  {receiveShadow}
  {frustumCulled}
  {renderOrder}
  {interactive}
  {ignorePointer}
  on:click
  on:contextmenu
  on:pointerup
  on:pointerdown
  on:pointerenter
  on:pointerleave
  on:pointermove
  {viewportAware}
  bind:inViewport
  on:viewportenter
  on:viewportleave
>
  <slot />
</MeshInstance>
