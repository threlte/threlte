<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import type { HSL } from 'three'
  import { NearestFilter, WebGLRenderTarget } from 'three'
  import { gameState } from './state'

  const { gameScene, gameCamera, gameTexture, averageScreenColor } = gameState

  const { renderer } = useThrelte()

  const textureWidth = 300
  const textureHeight = Math.round((textureWidth * 3) / 4)

  const gameRenderTarget = new WebGLRenderTarget(textureWidth, textureHeight)
  gameRenderTarget.texture.minFilter = NearestFilter
  gameRenderTarget.texture.magFilter = NearestFilter
  $gameTexture = gameRenderTarget.texture

  const pixels = new Uint8Array(textureWidth * textureHeight * 4)

  const hsl: HSL = { h: 0, s: 0, l: 0 }

  const sampleEveryXPixel = 2
  const sampleCount = (textureWidth * textureHeight) / sampleEveryXPixel

  const samplePixels = () => {
    let r = 0
    let g = 0
    let b = 0

    for (let index = 0; index < pixels.length; index += sampleEveryXPixel * 4) {
      r += pixels[index]
      g += pixels[index + 1]
      b += pixels[index + 2]
    }

    r = r / sampleCount
    g = g / sampleCount
    b = b / sampleCount

    averageScreenColor.update((c) => {
      c.setRGB(r / 255, g / 255, b / 255)
      c.getHSL(hsl)
      hsl.s = Math.max(0.4, hsl.s)
      c.setHSL(hsl.h, hsl.s, hsl.l)
      return c
    })
  }

  let frame = 0
  let renderEvery = 2
  useTask(() => {
    frame += 1
    if (!$gameScene || !$gameCamera || frame % renderEvery !== 0) return
    renderer.setRenderTarget(gameRenderTarget)
    renderer.clear()
    renderer.render($gameScene, $gameCamera)
    const context = renderer.getContext()
    context.readPixels(
      0,
      0,
      textureWidth,
      textureHeight,
      context.RGBA,
      context.UNSIGNED_BYTE,
      pixels
    )
    samplePixels()
    renderer.setRenderTarget(null)
  })
</script>
