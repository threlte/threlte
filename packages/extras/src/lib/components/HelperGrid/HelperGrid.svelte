<script lang="ts">
  import type { HelperGridProperties } from '$lib/types/components'
  import { useThrelte, T } from '@threlte/core'
  import { Color, ShaderMaterial, DoubleSide } from 'three'

  export let cellColor: HelperGridProperties['cellColor'] = '#000000'
  export let sectionColor: HelperGridProperties['sectionColor'] = '#0000ee'
  export let cellSize: HelperGridProperties['cellSize'] = 1
  export let sectionSize: HelperGridProperties['sectionSize'] = 10

  export let axes: HelperGridProperties['axes'] = 'xzy'
  export let gridSize: HelperGridProperties['gridSize'] = [20, 20]

  export let followCamera: HelperGridProperties['followCamera'] = false
  export let infiniteGrid: HelperGridProperties['infiniteGrid'] = false
  export let fadeDistance: HelperGridProperties['fadeDistance'] = 100
  export let fadeStrength: HelperGridProperties['fadeStrength'] = 1

  export let cellThickness: HelperGridProperties['cellThickness'] = 1
  export let sectionThickness: HelperGridProperties['sectionThickness'] = 2

  const { invalidate } = useThrelte()

  const makeGridMaterial = (axes: string) => {
    return new ShaderMaterial({
      side: DoubleSide,

      uniforms: {
        uSize1: {
          value: cellSize
        },
        uSize2: {
          value: sectionSize
        },
        uColor1: {
          value: new Color(cellColor)
        },
        uColor2: {
          value: new Color(sectionColor)
        },
        uFadeDistance: {
          value: fadeDistance
        },
        uFadeStrength: {
          value: fadeStrength
        },
        uThickness1: {
          value: 1
        },
        uThickness2: {
          value: 1
        },
        uInfiniteGrid: {
          value: infiniteGrid ? 1 : 0
        },
        uFollowCamera: {
          value: 0
        }
      },
      transparent: true,
      vertexShader: `
      varying vec3 worldPosition;
      uniform float uFadeDistance;
      uniform float uInfiniteGrid;
      uniform float uFollowCamera;

      void main() {

        vec3 pos = position.${axes} * (1. + uFadeDistance * uInfiniteGrid);
        pos.${axes.slice(0, 2)} += (cameraPosition.${axes.slice(0, 2)} * uFollowCamera);

        worldPosition = pos;

        gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);

      }`,

      fragmentShader: `
      varying vec3 worldPosition;
      uniform float uSize1;
      uniform float uSize2;
      uniform vec3 uColor1;
      uniform vec3 uColor2;
      uniform float uFadeDistance;
      uniform float uFadeStrength;
      uniform float uThickness1;
      uniform float uThickness2;
      uniform float uInfiniteGrid;

      float getGrid(float size, float thickness) {

        vec2 r = worldPosition.${axes.slice(0, 2)} / size;

        vec2 grid = abs(fract(r - 0.5) - 0.5) / fwidth(r);
        float line = min(grid.x, grid.y) + 1. - thickness;

        return 1.0 - min(line, 1.);
      }

      void main() {

        float g1 = getGrid(uSize1, uThickness1);
        float g2 = getGrid(uSize2, uThickness2);

        float d = 1.0 - min(distance(cameraPosition.${axes.slice(0, 2)}, worldPosition.${axes.slice(
        0,
        2
      )}) / uFadeDistance, 1.);
        
      // vec3 color = mix(uColor1, uColor2, g2);
      
      
        vec3 color = mix(uColor1, uColor2, min(1.,uThickness2*g2));

        gl_FragColor = vec4(color, (g1 + g2) * pow(d,uFadeStrength));
        gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);

        if(gl_FragColor.a <= 0.0)
          discard;

      }

       `,

      extensions: {
        derivatives: true
      }
    })
  }

  let material = makeGridMaterial(axes)

  $: {
    material = makeGridMaterial(axes)
    invalidate('Helper Grid axes changed')
  }

  $: {
    material.uniforms.uSize1 = { value: cellSize }
    material.uniforms.uSize2 = { value: sectionSize }
    material.uniforms.uColor1 = { value: new Color(cellColor) }
    material.uniforms.uColor2 = { value: new Color(sectionColor) }
    material.uniforms.uFadeDistance = { value: fadeDistance }
    material.uniforms.uFadeStrength = { value: fadeStrength }
    material.uniforms.uThickness1 = { value: cellThickness }
    material.uniforms.uThickness2 = { value: sectionThickness }
    material.uniforms.uFollowCamera = { value: followCamera ? 1 : 0 }
    material.uniforms.uInfiniteGrid = { value: infiniteGrid ? 1 : 0 }
    invalidate('Helper Grid uniforms changed')
  }
</script>

<T.Mesh {material}>
  >
  <T.PlaneGeometry args={typeof gridSize == 'number' ? [gridSize, gridSize] : gridSize} />
</T.Mesh>
