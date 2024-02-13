import type { Events, Props, Slots } from '@threlte/core'
import { SvelteComponent } from 'svelte'
import type { Color, ColorRepresentation, Material, Mesh } from 'three'

export interface TextMesh extends Mesh {
  /**
   * The string of text to be rendered.
   */
  text: string
  /**
   * Defines the horizontal position in the text block that should line up with the local origin.
   * Can be specified as a numeric x position in local units, a string percentage of the total
   * text block width e.g. `'25%'`, or one of the following keyword strings: 'left', 'center',
   * or 'right'.
   */
  anchorX: number | 'left' | 'center' | 'right' | string
  /**
   * Defines the vertical position in the text block that should line up with the local origin.
   * Can be specified as a numeric y position in local units (note: down is negative y), a string
   * percentage of the total text block height e.g. `'25%'`, or one of the following keyword strings:
   * 'top', 'top-baseline', 'middle', 'bottom-baseline', or 'bottom'.
   */
  anchorY: number | 'top' | 'top-baseline' | 'middle' | 'bottom-baseline' | 'bottom' | string
  /**
   * Defines a cylindrical radius along which the text's plane will be curved. Positive numbers put
   * the cylinder's centerline (oriented vertically) that distance in front of the text, for a concave
   * curvature, while negative numbers put it behind the text for a convex curvature. The centerline
   * will be aligned with the text's local origin; you can use `anchorX` to offset it.
   *
   * Since each glyph is by default rendered with a simple quad, each glyph remains a flat plane
   * internally. You can use `glyphGeometryDetail` to add more vertices for curvature inside glyphs.
   */
  curveRadius: number
  /**
   * Sets the base direction for the text. The default value of "auto" will choose a direction based
   * on the text's content according to the bidi spec. A value of "ltr" or "rtl" will force the direction.
   */
  direction: 'auto' | 'ltr' | 'rtl'
  /**
   * URL of a custom font to be used. Font files can be any of the formats supported by
   * OpenType (see https://github.com/opentypejs/opentype.js).
   * Defaults to the Roboto font loaded from Google Fonts.
   */
  font: null | string

  /**
   * MIDDLE
   */

  /**
   * The size at which to render the font in local units; corresponds to the em-box height
   * of the chosen `font`.
   */
  fontSize: number

  /**
   * Sets a uniform adjustment to spacing between letters after kerning is applied. Positive
   * numbers increase spacing and negative numbers decrease it.
   */
  letterSpacing: number

  /**
   * Sets the height of each line of text, as a multiple of the `fontSize`. Defaults to 'normal'
   * which chooses a reasonable height based on the chosen font's ascender/descender metrics.
   */
  lineHeight: number | string

  /**
   * The maximum width of the text block, above which text may start wrapping according to the
   * `whiteSpace` and `overflowWrap` properties.
   */
  maxWidth: number

  /**
   * Defines how text wraps if the `whiteSpace` property is `normal`. Can be either `'normal'`
   * to break at whitespace characters, or `'break-word'` to allow breaking within words.
   * Defaults to `'normal'`.
   */
  overflowWrap: 'normal' | 'break-word' | 'normal'

  /**
   * The horizontal alignment of each line of text within the overall text bounding box.
   */
  textAlign: 'left' | 'right' | 'center' | 'justify'

  /**
   * Indentation for the first character of a line; see CSS `text-indent`.
   */
  textIndent: number

  /**
   * Defines whether text should wrap when a line reaches the `maxWidth`. Can
   * be either `'normal'` (the default), to allow wrapping according to the `overflowWrap` property,
   * or `'nowrap'` to prevent wrapping. Note that `'normal'` here honors newline characters to
   * manually break lines, making it behave more like `'pre-wrap'` does in CSS.
   */
  whiteSpace: 'normal' | 'nowrap' | 'pre-wrap'

  /**
   * Defines a _base_ material to be used when rendering the text. This material will be
   * automatically replaced with a material derived from it, that adds shader code to
   * decrease the alpha for each fragment (pixel) outside the text glyphs, with antialiasing.
   * By default it will derive from a simple white MeshBasicMaterial, but you can use any
   * of the other mesh materials to gain other features like lighting, texture maps, etc.
   *
   * Also see the `color` shortcut property.
   */
  material: Material | Material[]

  /**
   * This is a shortcut for setting the `color` of the text's material. You can use this
   * if you don't want to specify a whole custom `material`. Also, if you do use a custom
   * `material`, this color will only be used for this particuar Text instance, even if
   * that same material instance is shared across multiple Text objects.
   */
  color: string | number | Color | null

  /**
   * This is a shortcut for setting the material's `polygonOffset` and related properties,
   * which can be useful in preventing z-fighting when this text is laid on top of another
   * plane in the scene. Positive numbers are further from the camera, negatives closer.
   */
  depthOffset: number

  /**
   * If specified, defines a `[minX, minY, maxX, maxY]` of a rectangle outside of which all
   * pixels will be discarded. This can be used for example to clip overflowing text when
   * `whiteSpace='nowrap'`.
   */
  clipRect: [number, number, number, number] | null

  /**
   * Controls number of vertical/horizontal segments that make up each glyph's rectangular
   * plane. Defaults to 1. This can be increased to provide more geometrical detail for custom
   * vertex shader effects, for example.
   */
  glyphGeometryDetail: number

  /**
   * The size of each glyph's SDF (signed distance field) used for rendering. This must be a
   * power-of-two number. Defaults to 64 which is generally a good balance of size and quality
   * for most fonts. Larger sizes can improve the quality of glyph rendering by increasing
   * the sharpness of corners and preventing loss of very thin lines, at the expense of
   * increased memory footprint and longer SDF generation time.
   */
  sdfGlyphSize: number | null

  /**
   * WARNING: This API is experimental and may change.
   * The width of an outline/halo to be drawn around each text glyph using the `outlineColor` and `outlineOpacity`.
   * Can be specified as either an absolute number in local units, or as a percentage string e.g.
   * `"12%"` which is treated as a percentage of the `fontSize`. Defaults to `0`, which means
   * no outline will be drawn unless an `outlineOffsetX/Y` or `outlineBlur` is set.
   */
  outlineWidth: number | string

  /**
   * WARNING: This API is experimental and may change.
   * The color of the text outline, if `outlineWidth`/`outlineBlur`/`outlineOffsetX/Y` are set.
   * Defaults to black.
   */
  outlineColor: ColorRepresentation

  /**
   * WARNING: This API is experimental and may change.
   * The opacity of the outline, if `outlineWidth`/`outlineBlur`/`outlineOffsetX/Y` are set.
   * Defaults to `1`.
   */
  outlineOpacity: number

  /**
   * WARNING: This API is experimental and may change.
   * A blur radius applied to the outer edge of the text's outline. If the `outlineWidth` is
   * zero, the blur will be applied at the glyph edge, like CSS's `text-shadow` blur radius.
   * Can be specified as either an absolute number in local units, or as a percentage string e.g.
   * `"12%"` which is treated as a percentage of the `fontSize`. Defaults to `0`.
   */
  outlineBlur: number | string

  /**
   * WARNING: This API is experimental and may change.
   * A horizontal offset for the text outline.
   * Can be specified as either an absolute number in local units, or as a percentage string e.g. `"12%"`
   * which is treated as a percentage of the `fontSize`. Defaults to `0`.
   */
  outlineOffsetX: number | string

  /**
   * WARNING: This API is experimental and may change.
   * A vertical offset for the text outline.
   * Can be specified as either an absolute number in local units, or as a percentage string e.g. `"12%"`
   * which is treated as a percentage of the `fontSize`. Defaults to `0`.
   */
  outlineOffsetY: number | string

  /**
   * WARNING: This API is experimental and may change.
   * The width of an inner stroke drawn inside each text glyph using the `strokeColor` and `strokeOpacity`.
   * Can be specified as either an absolute number in local units, or as a percentage string e.g. `"12%"`
   * which is treated as a percentage of the `fontSize`. Defaults to `0`.
   */
  strokeWidth: number | string

  /**
   * WARNING: This API is experimental and may change.
   * The color of the text stroke, if `strokeWidth` is greater than zero. Defaults to gray.
   */
  strokeColor: ColorRepresentation | Color

  /**
   * WARNING: This API is experimental and may change.
   * The opacity of the stroke, if `strokeWidth` is greater than zero. Defaults to `1`.
   */
  strokeOpacity: number

  /**
   * WARNING: This API is experimental and may change.
   * The opacity of the glyph's fill from 0 to 1. This behaves like the material's `opacity` but allows
   * giving the fill a different opacity than the `strokeOpacity`. A fillOpacity of `0` makes the
   * interior of the glyph invisible, leaving just the `strokeWidth`. Defaults to `1`.
   */
  fillOpacity: number

  sync: (cb: () => void) => void

  /**
   * A string or array of string character sequences for which to pre-generate
   * glyph SDF textures. Note that this will honor ligature substitution, so you
   * may need to specify ligature sequences in addition to their individual
   * characters to get all possible glyphs, e.g. ["t", "h", "th"] to get the "t"
   * and "h" glyphs plus the "th" glyph.
   */
  characters?: string | string[] | null

  /**
   * WARNING: This API is experimental and may change.
   * This allows more fine-grained control of colors for individual or ranges of characters,
   * taking precedence over the material's `color`. Its format is an Object whose keys each
   * define a starting character index for a range, and whose values are the color for each
   * range. The color value can be a numeric hex color value, a `THREE.Color` object, or
   * any of the strings accepted by `THREE.Color`.
   */
  colorRanges?: { [key: `${number}`]: ColorRepresentation } | null
}

export type TextProps = Props<TextMesh>

export type TextEvents = Events<TextMesh>

export type TextSlots = Slots<TextMesh>

export default class Text extends SvelteComponent<TextProps, TextEvents, TextSlots> {}
