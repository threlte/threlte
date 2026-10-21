/**
 * three types `Texture['image']` as `unknown` — only the loader that produced a
 * texture knows its concrete image type. Every source three accepts
 * (`HTMLImageElement`, `HTMLCanvasElement`, `ImageBitmap`, raw texture data, …)
 * carries pixel dimensions, so check for them rather than asserting them.
 *
 * @param image - A texture's `image`, or one face of a `CubeTexture`'s.
 * @returns The image's dimensions, or `undefined` if it has none.
 */
export const getImageSize = (image: unknown): { width: number; height: number } | undefined => {
  const size = image as { width?: unknown; height?: unknown } | null | undefined
  return typeof size?.width === 'number' && typeof size.height === 'number'
    ? (size as { width: number; height: number })
    : undefined
}
