import {
  Fn,
  If,
  all,
  attribute,
  cameraProjectionMatrix,
  ceil,
  float,
  length,
  max,
  min,
  mod,
  modelViewMatrix,
  normalize,
  positionGeometry,
  screenSize,
  smoothstep,
  texture,
  uniform,
  uv,
  varying,
  vec2,
  vec3,
  vec4
} from 'three/tsl'
import { Color, type Texture } from 'three/webgpu'

export const createMeshLineUniforms = () => ({
  lineWidth: uniform(1),
  color: uniform(new Color('#ffffff')),
  opacity: uniform(1),
  sizeAttenuation: uniform(1),
  dashArray: uniform(0),
  useDash: uniform(0),
  dashOffset: uniform(0),
  dashRatio: uniform(0),
  scaleDown: uniform(0)
})

export type MeshLineUniforms = ReturnType<typeof createMeshLineUniforms>

export const createMeshLineNodes = (
  uniforms: MeshLineUniforms,
  options: { alphaMap: Texture | undefined }
) => {
  const vertexNode = Fn(() => {
    const previous = attribute<'vec3'>('previous', 'vec3')
    const next = attribute<'vec3'>('next', 'vec3')
    const side = attribute<'float'>('side', 'float')
    const pointWidth = attribute<'float'>('width', 'float')

    const matrix = cameraProjectionMatrix.mul(modelViewMatrix)

    const currentClip = matrix.mul(vec4(positionGeometry, 1)).toVar()
    const previousClip = matrix.mul(vec4(previous, 1)).toVar()
    const nextClip = matrix.mul(vec4(next, 1)).toVar()

    const currentNormed = currentClip.div(currentClip.w).toVar()
    const previousNormed = previousClip.div(previousClip.w).toVar()
    const nextNormed = nextClip.div(nextClip.w).toVar()

    const currentScreen = screenSize.mul(currentNormed.xy.mul(0.5).add(0.5)).toVar()
    const previousScreen = screenSize.mul(previousNormed.xy.mul(0.5).add(0.5)).toVar()
    const nextScreen = screenSize.mul(nextNormed.xy.mul(0.5).add(0.5)).toVar()

    const direction = vec2().toVar()

    If(all(nextScreen.equal(currentScreen)), () => {
      direction.assign(normalize(currentScreen.sub(previousScreen)))
    })
      .ElseIf(all(previousScreen.equal(currentScreen)), () => {
        direction.assign(normalize(nextScreen.sub(currentScreen)))
      })
      .Else(() => {
        const inDirection = currentScreen.sub(previousScreen).toVar()
        const outDirection = nextScreen.sub(currentScreen).toVar()
        const fullDirection = nextScreen.sub(previousScreen).toVar()

        If(length(fullDirection).greaterThan(0), () => {
          direction.assign(normalize(fullDirection))
        })
          .ElseIf(length(inDirection).greaterThan(0), () => {
            direction.assign(normalize(inDirection))
          })
          .Else(() => {
            direction.assign(normalize(outDirection))
          })
      })

    const normal = vec2(direction.y.negate(), direction.x).toVar()

    If(uniforms.sizeAttenuation.notEqual(0), () => {
      normal.divAssign(currentClip.w)
      normal.mulAssign(min(screenSize.x, screenSize.y))
    })

    If(uniforms.scaleDown.greaterThan(0), () => {
      const spread = length(nextNormed.sub(previousNormed))
      normal.mulAssign(smoothstep(0, uniforms.scaleDown, spread))
    })

    const offset = uniforms.lineWidth.mul(pointWidth).mul(normal).mul(side).mul(0.5)
    const offsetScreen = currentScreen.add(offset)
    const offsetNormed = vec3(offsetScreen.div(screenSize).mul(2).sub(1), currentNormed.z)

    return currentClip.w.mul(vec4(offsetNormed, 1))
  })()

  const opacityNode = Fn(() => {
    const alpha = uniforms.opacity.toVar()

    if (options.alphaMap !== undefined) {
      alpha.mulAssign(texture(options.alphaMap, uv()).r)
    }

    const counters = varying(attribute<'float'>('counters', 'float'))
    const period = max(uniforms.dashArray, float(1e-6))
    const dash = ceil(
      mod(counters.add(uniforms.dashOffset), period).sub(period.mul(uniforms.dashRatio))
    )

    alpha.mulAssign(uniforms.useDash.equal(1).select(dash, float(1)))

    return alpha
  })()

  return { vertexNode, colorNode: uniforms.color, opacityNode }
}
