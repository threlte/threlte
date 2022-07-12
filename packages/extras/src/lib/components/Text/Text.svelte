<script lang="ts">
  import { createEventDispatcher, onDestroy } from 'svelte'
  import { Text as ThreeText } from 'troika-three-text'
  import { useThrelte, MeshInstance } from '@threlte/core'
  import type { Text as TextType } from '../../types/types'
  import type { TextProperties } from '../../types/components'

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
  export let visible: TextProperties['visible'] = undefined
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
  export let direction: TextProperties['direction'] = undefined

  export const textObject = new ThreeText() as TextType
  const getTextObject = () => textObject

  const { invalidate } = useThrelte()

  const dispatch = createEventDispatcher<{
    sync: undefined
  }>()

  $: {
    const to = getTextObject()
    if (text !== undefined) to.text = text
    if (anchorX !== undefined) to.anchorX = anchorX
    if (anchorY !== undefined) to.anchorY = anchorY
    if (curveRadius !== undefined) to.curveRadius = curveRadius
    if (font !== undefined) to.font = font
    if (fontSize !== undefined) to.fontSize = fontSize
    if (letterSpacing !== undefined) to.letterSpacing = letterSpacing
    if (lineHeight !== undefined) to.lineHeight = lineHeight
    if (maxWidth !== undefined) to.maxWidth = maxWidth
    if (overflowWrap !== undefined) to.overflowWrap = overflowWrap
    if (textAlign !== undefined) to.textAlign = textAlign
    if (textIndent !== undefined) to.textIndent = textIndent
    if (whiteSpace !== undefined) to.whiteSpace = whiteSpace
    if (material) to.material = material
    if (color !== undefined) to.color = color
    if (depthOffset !== undefined) to.depthOffset = depthOffset
    if (clipRect !== undefined) to.clipRect = clipRect
    if (glyphGeometryDetail !== undefined) to.glyphGeometryDetail = glyphGeometryDetail
    if (sdfGlyphSize !== undefined) to.sdfGlyphSize = sdfGlyphSize
    if (outlineWidth !== undefined) to.outlineWidth = outlineWidth
    if (outlineColor !== undefined) to.outlineColor = outlineColor
    if (outlineOpacity !== undefined) to.outlineOpacity = outlineOpacity
    if (outlineBlur !== undefined) to.outlineBlur = outlineBlur
    if (outlineOffsetX !== undefined) to.outlineOffsetX = outlineOffsetX
    if (outlineOffsetY !== undefined) to.outlineOffsetY = outlineOffsetY
    if (strokeWidth !== undefined) to.strokeWidth = strokeWidth
    if (strokeColor !== undefined) to.strokeColor = strokeColor
    if (strokeOpacity !== undefined) to.strokeOpacity = strokeOpacity
    if (fillOpacity !== undefined) to.fillOpacity = fillOpacity

    to.sync(() => {
      invalidate('Text: sync finished')
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
  {visible}
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
