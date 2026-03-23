import { patchShaders } from 'gl-noise'

export const vertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition; // use the world position instead of the uv
  void main() {
    vUv = uv;
    vPosition = position;
  }`

export const fragmentShader = patchShaders(/* glsl */ `
  varying vec2 vUv;
  varying vec3 vPosition;
  uniform float uThickness;
  uniform vec3 uColor;
  uniform float uSeed;
  uniform float uProgress;
  uniform float uScale;


  void main() {
    gln_tFBMOpts opts = gln_tFBMOpts(uSeed, 0.3, 2.0, uScale, 1.0, 5, false, false);
		// seed	float	Seed for PRNG generation.
		// persistance	float	Factor by which successive layers of noise will decrease in amplitude.
		// lacunarity	float	Factor by which successive layers of noise will increase in frequency.
		// scale	float	"Zoom level" of generated noise.
		// redistribution	float	Flatness in the generated noise.
		// octaves	int	Number of layers of noise to stack.
		// terbulance	boolean	Enable terbulance
		// ridge
    // float noise = gln_sfbm(vUv, opts); // THE ORIGINAL CODE FROM THE TUTORIAL
    float noise = gln_sfbm(vPosition, opts); //  use the world position instead of the uv for a better effect working on all objects
    noise = gln_normalize(noise);

    float progress = uProgress;

    float alpha = step(1.0 - progress, noise);
    float border = step((1.0 - progress) - uThickness, noise) - alpha;

    csm_DiffuseColor.a = alpha + border;
    csm_DiffuseColor.rgb = mix(csm_DiffuseColor.rgb, uColor, border);
  }`) as string
