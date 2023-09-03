import { ShaderChunk } from 'three'
export const fragmentShader = `
    ${ShaderChunk.fog_pars_fragment}
    ${ShaderChunk.logdepthbuf_pars_fragment}

    uniform float useDash;
    uniform float dashArray;
    uniform float dashOffset;
    uniform float dashRatio;
    uniform sampler2D alphaMap;
    uniform float useAlphaMap;

    varying vec2 vUV;
    varying vec4 vColor;
    varying float vCounters;

    void main()	{

        ${ShaderChunk.logdepthbuf_fragment}
        ${ShaderChunk.encodings_fragment}

        vec4 c = vColor;

        if( useAlphaMap == 1. ) c.a *= texture2D( alphaMap, vUV ).r;

        if( useDash == 1. ){
            c.a *= ceil(mod(vCounters + dashOffset, dashArray) - (dashArray * dashRatio));
        }

        gl_FragColor = LinearTosRGB(c);
    }
`
