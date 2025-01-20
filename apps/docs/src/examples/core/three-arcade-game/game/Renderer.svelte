<script lang="ts">
  import { useTask, useThrelte } from '@threlte/core'
  import { useFBO } from '@threlte/extras'
  import type { HSL } from 'three'
  import { NearestFilter } from 'three'
  import { game } from './Game.svelte'

  const { renderer } = useThrelte()

  const textureWidth = 300
  const textureHeight = Math.round((textureWidth * 3) / 4)

  const gameRenderTarget = useFBO({
    size: {
      width: textureWidth,
      height: textureHeight
    },
    minFilter: NearestFilter,
    magFilter: NearestFilter
  })

  game.gameTexture = gameRenderTarget.texture

  const pixels = new Uint8Array(textureWidth * textureHeight * 4)

  const hsl: HSL = { h: 0, s: 0, l: 0 }

  const sampleEveryXPixel = 2
  const sampleCount = (textureWidth * textureHeight) / sampleEveryXPixel

  const samplePixels = () => {
    let r = 0
    let g = 0
    let b = 0

    for (let index = 0; index < pixels.length; index += sampleEveryXPixel * 4) {
      r += pixels[index]!
      g += pixels[index + 1]!
      b += pixels[index + 2]!
    }

    r = r / sampleCount
    g = g / sampleCount
    b = b / sampleCount

    game.averageScreenColor.setRGB(r / 255, g / 255, b / 255)
    game.averageScreenColor.getHSL(hsl)
    hsl.s = Math.max(0.4, hsl.s)
    game.averageScreenColor.setHSL(hsl.h, hsl.s, hsl.l)
  }

  let frame = 0
  let renderEvery = 2
  useTask(() => {
    frame += 1
    if (!game.gameScene || !game.gameCamera || frame % renderEvery !== 0) return

    const lastRenderTarget = renderer.getRenderTarget()
    renderer.setRenderTarget(gameRenderTarget)
    renderer.clear()
    renderer.render(game.gameScene, game.gameCamera)
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
    renderer.setRenderTarget(lastRenderTarget)
  })
</script>
