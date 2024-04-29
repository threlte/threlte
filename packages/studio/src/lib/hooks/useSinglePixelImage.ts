let img: HTMLImageElement | undefined

const initialize = () => {
  img = document.createElement('img')

  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  canvas.width = 1
  canvas.height = 1

  if (ctx === null) return img

  ctx.fillStyle = 'rgba(0,0,0,0)'
  ctx.fillRect(0, 0, 1, 1)

  img.src = canvas.toDataURL('image/png')

  return img
}

export const useSinglePixelImage = () => {
  return img ?? initialize()
}
