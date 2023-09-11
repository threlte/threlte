import { ShaderChunk } from 'three'
export const vertexShader = `
    ${ShaderChunk.logdepthbuf_pars_vertex}
    ${ShaderChunk.fog_pars_vertex}

    attribute vec3 previous;
    attribute vec3 next;
    attribute float side;
    attribute float width;
    attribute float counters;

    uniform vec2 resolution;
    uniform float lineWidth;
    uniform vec3 color;
    uniform float opacity;
    uniform float sizeAttenuation;
    uniform float scaleDown;

    varying vec2 vUV;
    varying vec4 vColor;
    varying float vCounters;

    vec2 fix( vec4 i, float aspect ) {
        vec2 res = i.xy / i.w;
        res.x *= aspect;
        vCounters = counters;
        return res;
    }

    void main()	{

        float aspect = resolution.x / resolution.y;

        vColor = vec4( color, opacity );
        vUV = uv;

        mat4 m = projectionMatrix * modelViewMatrix;
        vec4 finalPosition = m * vec4( position, 1.0 );
        vec4 prevPos = m * vec4( previous, 1.0 );
        vec4 nextPos = m * vec4( next, 1.0 );

        vec2 currentP = fix( finalPosition, aspect );
        vec2 prevP = fix( prevPos, aspect );
        vec2 nextP = fix( nextPos, aspect );

        float w = lineWidth * width;

        vec2 dir;
        if( nextP == currentP ) dir = normalize( currentP - prevP );
        else if( prevP == currentP ) dir = normalize( nextP - currentP );
        else {
            vec2 dir1 = normalize( currentP - prevP );
            vec2 dir2 = normalize( nextP - currentP );
            dir = normalize( dir1 + dir2 );

            vec2 perp = vec2( -dir1.y, dir1.x );
            vec2 miter = vec2( -dir.y, dir.x );
        }

        vec4 normal = vec4( -dir.y, dir.x, 0., 1. );
        normal.xy *= .5 * w;
        normal *= projectionMatrix;

        if( scaleDown > 0. ) {
            float dist = length(currentP - prevP);
            normal *= smoothstep(0.0, scaleDown, dist);
        }

        if( sizeAttenuation == 0. ) {
            normal.xy *= finalPosition.w;
            normal.xy /= ( vec4( resolution, 0., 1. ) * projectionMatrix ).xy;
        }

        finalPosition.xy += normal.xy * side;

        gl_Position = finalPosition;

        ${ShaderChunk.logdepthbuf_vertex}
        ${ShaderChunk.fog_vertex}
    }
`
