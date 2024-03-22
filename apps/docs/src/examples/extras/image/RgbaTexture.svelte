<script lang="ts">
  import { useTask, useThrelte, T } from '@threlte/core'
  import { useFBO, useTexture } from '@threlte/extras'

  const { renderer, autoRenderTask } = useThrelte()
  import { colorProcessingTexture } from './App.svelte'
  import { onDestroy, onMount } from 'svelte'
  import { DoubleSide, Mesh, OrthographicCamera, PlaneGeometry, Scene, ShaderMaterial } from 'three'

  const rgbaTextureTarget = useFBO()

  const scene = new Scene()
  const camera = new OrthographicCamera(-1, 1, 1, -1, -1, 1)

  // * r - hue
  //  *
  //  * g - saturation
  //  *
  //  * b - lightness
  //  *
  //  * a - alpha override

  const shaderMaterial = new ShaderMaterial({
    uniforms: {
      uTime: { value: 0 },
      uVideoTexture: { value: null }
    },
    vertexShader: `
		varying vec2 vUv;
    void main() {
      gl_Position = vec4(position, 1.0);
			vUv = uv;
    }
  `,
    fragmentShader: `
		varying vec2 vUv;
		uniform sampler2D uVideoTexture;
		uniform float uTime;

		float rand(vec2 n) {
			return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
		}

		// https://www.shadertoy.com/view/tljXR1
		float noise(vec2 p){
			vec2 ip = floor(p);
			vec2 u = fract(p);
			u = u*u*(3.0-2.0*u);

			float res = mix(
				mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x),
				mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y);
			return res*res;
		}

		#define NUM_OCTAVES 5

		float fbm(vec2 x) {
			float v = 0.0;
			float a = 0.5;
			vec2 shift = vec2(100);
			// Rotate to reduce axial bias
				mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.50));
			for (int i = 0; i < NUM_OCTAVES; ++i) {
				v += a * noise(x);
				x = rot * x * 2.0 + shift;
				a *= 0.5;
			}
			return v;
		}

		float hexGrid(float scale){
			vec2 u = scale*vUv;
			vec2 s = vec2(1.,1.732);
			vec2 a = mod(u,s)*2.-s;
			vec2 b = mod(u+s*.5,s)*2.-s;

			return pow(0.5*min(dot(a,a),dot(b,b)),3.)*2.;
		}

    void main() {
			vec2 p = vUv*0.5 - 1.;
			float t = uTime * 0.15;
			float rad = atan(p.x,p.y)+t*0.2;
			float hue = fbm(35.*vec2(cos(rad),sin(rad))+30.*vec2(fbm(p+t),-fbm(p+t)));
			hue = pow(hue, 2.) ;


			float saturation = clamp(pow(distance(0.5, fract((vUv.x+vUv.y)+uTime*0.2)), 2.) * 10.,0.,1.);

			float lightness = clamp(hexGrid(8.) * pow(distance(0.5, fract(vUv.x*16.+uTime)), 2.) * 20.,0.,1.);

			float alpha = texture2D(uVideoTexture, vUv).r;

      gl_FragColor = vec4(hue, saturation, lightness, alpha);
    }
  `
  })

  const alphaTexture = useTexture('/textures/alpha.jpg')

  $: shaderMaterial.uniforms.uVideoTexture.value = $alphaTexture

  const quad = new Mesh(new PlaneGeometry(2, 2), shaderMaterial)

  scene.add(quad)

  useTask(
    (delta) => {
      shaderMaterial.uniforms.uTime.value += delta
      renderer.setRenderTarget(rgbaTextureTarget)
      renderer.render(scene, camera)
      renderer.setRenderTarget(null)
    },
    {
      before: autoRenderTask
    }
  )

  onMount(() => {
    colorProcessingTexture.set(rgbaTextureTarget.texture)
  })

  onDestroy(() => {
    colorProcessingTexture.set(undefined)
  })
</script>

<T.Mesh>
  <T.MeshBasicMaterial
    map={rgbaTextureTarget.texture}
    side={DoubleSide}
  />
  <T.BoxGeometry />
</T.Mesh>
