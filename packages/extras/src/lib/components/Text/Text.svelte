<script lang="ts">
  import { forwardEvents, T, useThrelte } from '@threlte/core'
  import { createEventDispatcher } from 'svelte'
  import { Text } from 'troika-three-text'
  import type { TextMesh, TextProps } from './Text.svelte'

  const TypedText = Text as TextMesh

  export let text: TextProps['text'] = undefined
  export let anchorX: TextProps['anchorX'] = undefined
  export let anchorY: TextProps['anchorY'] = undefined
  export let curveRadius: TextProps['curveRadius'] = undefined
  export let font: TextProps['font'] = undefined
  export let fontSize: TextProps['fontSize'] = undefined
  export let letterSpacing: TextProps['letterSpacing'] = undefined
  export let lineHeight: TextProps['lineHeight'] = undefined
  export let maxWidth: TextProps['maxWidth'] = undefined
  export let overflowWrap: TextProps['overflowWrap'] = undefined
  export let textAlign: TextProps['textAlign'] = undefined
  export let textIndent: TextProps['textIndent'] = undefined
  export let whiteSpace: TextProps['whiteSpace'] = undefined
  export let material: TextProps['material'] | null = undefined
  export let color: TextProps['color'] | null = undefined
  export let depthOffset: TextProps['depthOffset'] = undefined
  export let clipRect: TextProps['clipRect'] | null = undefined
  export let glyphGeometryDetail: TextProps['glyphGeometryDetail'] = undefined
  export let sdfGlyphSize: TextProps['sdfGlyphSize'] = undefined
  export let outlineWidth: TextProps['outlineWidth'] = undefined
  export let outlineColor: TextProps['outlineColor'] = undefined
  export let outlineOpacity: TextProps['outlineOpacity'] = undefined
  export let outlineBlur: TextProps['outlineBlur'] = undefined
  export let outlineOffsetX: TextProps['outlineOffsetX'] = undefined
  export let outlineOffsetY: TextProps['outlineOffsetY'] = undefined
  export let strokeWidth: TextProps['strokeWidth'] = undefined
  export let strokeColor: TextProps['strokeColor'] = undefined
  export let strokeOpacity: TextProps['strokeOpacity'] = undefined
  export let fillOpacity: TextProps['fillOpacity'] = undefined
  export let direction: TextProps['direction'] = undefined

  const { invalidate } = useThrelte()

  const dispatch = createEventDispatcher<{
    sync: undefined
  }>()

  const events = forwardEvents()

  let textObject: TextMesh | undefined = undefined

  $: {
    if (!textObject) break $
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
    if (direction !== undefined) textObject.direction = direction

    textObject.sync(() => {
      invalidate('Text: sync finished')
      dispatch('sync')
    })
  }
</script>

<T bind:ref={textObject} is={TypedText} let:ref {...$$restProps} bind:this={$events}>
  <slot {ref} />
</T>
