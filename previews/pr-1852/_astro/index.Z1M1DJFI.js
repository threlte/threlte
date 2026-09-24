import"./disclose-version.DsnmJJEf.js";import{gz as M,ct as Ae,i as le,aH as Ce,a7 as ie,aB as ce,fu as Pe,a5 as ze,j as ue,R as ne,N as I,w as fe,B as O,bp as Oe,s as ae,a6 as we,aV as Re,M as Ue,aW as Fe,bv as oe,c3 as E,an as U,C as B,$ as Ne,W as Ve,gA as ke,Y as $e,ay as Ee,a9 as Be,b as He,bs as Ge}from"./observe.svelte.Bodsz5r2.js";import{p as Le,L as de,g as j,u as W,a as Ze}from"./runtime.DLdkg5Kz.js";import{p as Y}from"./props.BNYK5s9I.js";/* empty css                                                      */import{u as je}from"./useThrelte.Bfy33Awn.js";const q=M.shadowmap_pars_fragment,H=q.includes("unpackRGBAToDepth"),he=H?"unpackRGBAToDepth(texture2D(shadowMap, ":"texture2D(shadowMap, ",me=H?"))":").r";function vr(r,e){Le(e,!0);const{renderer:t,scene:i}=je();let n=Y(e,"size",3,25),a=Y(e,"focus",3,0),o=Y(e,"samples",3,10);const l=W(()=>n()*1.25),c=W(()=>(1/o()).toFixed(8));let s=W(()=>`
		// Hash from a single dot+fract; same statistical quality as the
		// 10-tap RGB high-pass it replaces, ~30x cheaper.
		float pcssNoise(vec2 position) {
			return fract(52.9829189 * fract(dot(position, vec2(0.06711056, 0.00583715))));
		}

		// Note: three.js's #pragma unroll_loop only substitutes "[ i ]"
		// subscripts and the UNROLLED_LOOP_INDEX token; bare i references
		// stay literal and won't compile. Use UNROLLED_LOOP_INDEX everywhere
		// the iteration index appears outside an array subscript, and hoist
		// any per-iteration declarations out of the loop body to avoid
		// "redefinition" errors after unrolling.

		vec2 vogelDiskSample(int sampleIndex, float angle) {
			const float goldenAngle = 2.399963f;
			float r = sqrt(float(sampleIndex) + 0.5) / sqrt(float(${o()}));
			float theta = float(sampleIndex) * goldenAngle + angle;
			return vec2(cos(theta), sin(theta)) * r;
		}

		float PCSS (sampler2D shadowMap, vec4 coords) {
			vec2 uv = coords.xy;
			float zReceiver = coords.z;
			float texelSize = 1.0 / float(textureSize(shadowMap, 0).x);

			float angle = pcssNoise(gl_FragCoord.xy) * PI2;

			// The blocker search and the penumbra filter both want N Vogel
			// samples around the same angle — only their scale differs. Compute
			// the unscaled offsets once instead of recomputing sin/cos per loop.
			vec2 offsets[${o()}];
			#pragma unroll_loop_start
			for (int i = 0; i < ${o()}; i++) {
				offsets[ i ] = vogelDiskSample(UNROLLED_LOOP_INDEX, angle) * texelSize;
			}
			#pragma unroll_loop_end

			// Blocker search.
			float blockerDepthSum = float(${a()});
			float blockers = 0.0;
			float blockerSearchScale = 2.0 * float(${n()});
			vec2 offset;
			float depth;
			float isBlocker;
			#pragma unroll_loop_start
			for (int i = 0; i < ${o()}; i++) {
				offset = offsets[ i ] * blockerSearchScale;
				depth = ${he}uv + offset${me};
				// Branchless: 1 when depth < zReceiver (blocker), 0 otherwise.
				isBlocker = 1.0 - step(zReceiver, depth);
				blockerDepthSum += depth * isBlocker;
				blockers += isBlocker;
			}
			#pragma unroll_loop_end

			if (blockers == 0.0) return 1.0;

			float avgBlockerDepth = blockerDepthSum / blockers;
			float penumbraRatio = (zReceiver - avgBlockerDepth) / avgBlockerDepth;
			float filterMult = 1.0 + penumbraRatio * float(${j(l)});

			float shadow = 0.0;
			#pragma unroll_loop_start
			for (int i = 0; i < ${o()}; i++) {
				offset = offsets[ i ] * filterMult;
				shadow += step(zReceiver, ${he}uv + offset${me});
			}
			#pragma unroll_loop_end

			return shadow * float(${j(c)});
	}`);const d=u=>{t.properties.remove(u),u.needsUpdate=!0},m=()=>{i.traverse(u=>{const f=u.material;if(Array.isArray(f))for(const h of f)le(h,"Material")&&d(h);else le(f,"Material")&&d(f)}),t.info.programs!==null&&(t.info.programs.length=0)};de(()=>{let u=null;return H||(u=t.shadowMap.type,t.shadowMap.type=Ae),()=>{u!==null&&(t.shadowMap.type=u)}}),de(()=>{let u=q.replace("#ifdef USE_SHADOWMAP",`#ifdef USE_SHADOWMAP
${j(s)}`);return H?u=u.replace("#if defined( SHADOWMAP_TYPE_PCF )",`
return PCSS(shadowMap, shadowCoord);
#if defined( SHADOWMAP_TYPE_PCF )`):u=u.replace("float depth = texture2D( shadowMap, shadowCoord.xy ).r;",`return PCSS( shadowMap, shadowCoord );
				float depth = texture2D( shadowMap, shadowCoord.xy ).r;`),M.shadowmap_pars_fragment=u,m(),()=>{M.shadowmap_pars_fragment=q,m()}}),Ze()}const gr=`
    #include <common>
    ${M.logdepthbuf_pars_vertex}
    ${M.fog_pars_vertex}

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

    vec2 intoScreen(vec4 i) {
        return resolution * (0.5 * i.xy / i.w + 0.5);
    }

    void main() {
        float aspect = resolution.y / resolution.x;

        mat4 m = projectionMatrix * modelViewMatrix;

        vec4 currentClip = m * vec4( position, 1.0 );
        vec4 prevClip = m * vec4( previous, 1.0 );
        vec4 nextClip = m * vec4( next, 1.0 );

        vec4 currentNormed = currentClip / currentClip.w;
        vec4 prevNormed = prevClip / prevClip.w;
        vec4 nextNormed = nextClip / nextClip.w;

        vec2 currentScreen = intoScreen(currentNormed);
        vec2 prevScreen = intoScreen(prevNormed);
        vec2 nextScreen = intoScreen(nextNormed);

        float actualWidth = lineWidth * width;

        vec2 dir;
        if(nextScreen == currentScreen) {
            dir = normalize( currentScreen - prevScreen );
        } else if(prevScreen == currentScreen) {
            dir = normalize( nextScreen - currentScreen );
        } else {
            vec2 inDir = currentScreen - prevScreen;
            vec2 outDir = nextScreen - currentScreen;
            vec2 fullDir = nextScreen - prevScreen;

            if(length(fullDir) > 0.0) {
                dir = normalize(fullDir);
            } else if(length(inDir) > 0.0){
                dir = normalize(inDir);
            } else {
                dir = normalize(outDir);
            }
        }

        vec2 normal = vec2(-dir.y, dir.x);

        if(sizeAttenuation != 0.0) {
            normal /= currentClip.w;
            normal *= min(resolution.x, resolution.y);
        }

        if (scaleDown > 0.0) {
            float dist = length(nextNormed - prevNormed);
            normal *= smoothstep(0.0, scaleDown, dist);
        }

        vec2 offsetInScreen = actualWidth * normal * side * 0.5;

        vec2 withOffsetScreen = currentScreen + offsetInScreen;
        vec3 withOffsetNormed = vec3((2.0 * withOffsetScreen/resolution - 1.0), currentNormed.z);

        vCounters = counters;
        vColor = vec4( color, opacity );
        vUV = uv;

        gl_Position = currentClip.w * vec4(withOffsetNormed, 1.0);

        ${M.logdepthbuf_vertex}
        ${M.fog_vertex}
    }
`,xr=`
uniform vec3 glowColor;
uniform float falloffAmount;
uniform float glowSharpness;
uniform float glowInternalRadius;

varying vec3 vPosition;
varying vec3 vNormal;

void main()
{
	// Normal
	vec3 normal = normalize(vNormal);
	if(!gl_FrontFacing)
			normal *= - 1.0;
	vec3 viewDirection = normalize(cameraPosition - vPosition);
	float fresnel = dot(viewDirection, normal);
	fresnel = pow(fresnel, glowInternalRadius + 0.1);
	float falloff = smoothstep(0., falloffAmount, fresnel);
	float fakeGlow = fresnel;
	fakeGlow += fresnel * glowSharpness;
	fakeGlow *= falloff;
	gl_FragColor = vec4(clamp(glowColor * fresnel, 0., 1.0), clamp(fakeGlow, 0., 1.0));

	${M.tonemapping_fragment}
	${M.colorspace_fragment}
}`,yr=`
uniform sampler2D pointTexture;
uniform float fade;
uniform float opacity;
uniform float rounded;

varying vec3 vColor;
void main() {
	float d = distance(gl_PointCoord, vec2(0.5, 0.5));
	float pointOpacity = 1.0;
	if (fade == 1.0) {
		pointOpacity = 1.0 / (1.0 + exp(16.0 * (d - 0.25)));
	}
	if (rounded == 1.0) {
		pointOpacity *= 1.0 - smoothstep(0.3, 0.5, d);
	}
	gl_FragColor = vec4(vColor, pointOpacity * opacity);

	${M.tonemapping_fragment}
	${M.colorspace_fragment}
}`,We=`

// A stack of uint32 indices can can store the indices for
// a perfectly balanced tree with a depth up to 31. Lower stack
// depth gets higher performance.
//
// However not all trees are balanced. Best value to set this to
// is the trees max depth.
#ifndef BVH_STACK_DEPTH
#define BVH_STACK_DEPTH 60
#endif

#ifndef INFINITY
#define INFINITY 1e20
#endif

// Utilities
uvec4 uTexelFetch1D( usampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

ivec4 iTexelFetch1D( isampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 texelFetch1D( sampler2D tex, uint index ) {

	uint width = uint( textureSize( tex, 0 ).x );
	uvec2 uv;
	uv.x = index % width;
	uv.y = index / width;

	return texelFetch( tex, ivec2( uv ), 0 );

}

vec4 textureSampleBarycoord( sampler2D tex, vec3 barycoord, uvec3 faceIndices ) {

	return
		barycoord.x * texelFetch1D( tex, faceIndices.x ) +
		barycoord.y * texelFetch1D( tex, faceIndices.y ) +
		barycoord.z * texelFetch1D( tex, faceIndices.z );

}

void ndcToCameraRay(
	vec2 coord, mat4 cameraWorld, mat4 invProjectionMatrix,
	out vec3 rayOrigin, out vec3 rayDirection
) {

	// get camera look direction and near plane for camera clipping
	vec4 lookDirection = cameraWorld * vec4( 0.0, 0.0, - 1.0, 0.0 );
	vec4 nearVector = invProjectionMatrix * vec4( 0.0, 0.0, - 1.0, 1.0 );
	float near = abs( nearVector.z / nearVector.w );

	// get the camera direction and position from camera matrices
	vec4 origin = cameraWorld * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec4 direction = invProjectionMatrix * vec4( coord, 0.5, 1.0 );
	direction /= direction.w;
	direction = cameraWorld * direction - origin;

	// slide the origin along the ray until it sits at the near clip plane position
	origin.xyz += direction.xyz * near / dot( direction, lookDirection );

	rayOrigin = origin.xyz;
	rayDirection = direction.xyz;

}
`,Ye=`

#ifndef TRI_INTERSECT_EPSILON
#define TRI_INTERSECT_EPSILON 1e-5
#endif

// Raycasting
bool intersectsBounds( vec3 rayOrigin, vec3 rayDirection, vec3 boundsMin, vec3 boundsMax, out float dist ) {

	// https://www.reddit.com/r/opengl/comments/8ntzz5/fast_glsl_ray_box_intersection/
	// https://tavianator.com/2011/ray_box.html
	vec3 invDir = 1.0 / rayDirection;

	// find intersection distances for each plane
	vec3 tMinPlane = invDir * ( boundsMin - rayOrigin );
	vec3 tMaxPlane = invDir * ( boundsMax - rayOrigin );

	// get the min and max distances from each intersection
	vec3 tMinHit = min( tMaxPlane, tMinPlane );
	vec3 tMaxHit = max( tMaxPlane, tMinPlane );

	// get the furthest hit distance
	vec2 t = max( tMinHit.xx, tMinHit.yz );
	float t0 = max( t.x, t.y );

	// get the minimum hit distance
	t = min( tMaxHit.xx, tMaxHit.yz );
	float t1 = min( t.x, t.y );

	// set distance to 0.0 if the ray starts inside the box
	dist = max( t0, 0.0 );

	return t1 >= dist;

}

bool intersectsTriangle(
	vec3 rayOrigin, vec3 rayDirection, vec3 a, vec3 b, vec3 c,
	out vec3 barycoord, out vec3 norm, out float dist, out float side
) {

	// https://stackoverflow.com/questions/42740765/intersection-between-line-and-triangle-in-3d
	vec3 edge1 = b - a;
	vec3 edge2 = c - a;
	norm = cross( edge1, edge2 );

	float det = - dot( rayDirection, norm );
	float invdet = 1.0 / det;

	vec3 AO = rayOrigin - a;
	vec3 DAO = cross( AO, rayDirection );

	vec4 uvt;
	uvt.x = dot( edge2, DAO ) * invdet;
	uvt.y = - dot( edge1, DAO ) * invdet;
	uvt.z = dot( AO, norm ) * invdet;
	uvt.w = 1.0 - uvt.x - uvt.y;

	// set the hit information
	barycoord = uvt.wxy; // arranged in A, B, C order
	dist = uvt.z;
	side = sign( det );
	norm = side * normalize( norm );

	// add an epsilon to avoid misses between triangles
	uvt += vec4( TRI_INTERSECT_EPSILON );

	return all( greaterThanEqual( uvt, vec4( 0.0 ) ) );

}

bool intersectTriangles(
	// geometry info and triangle range
	sampler2D positionAttr, usampler2D indexAttr, uint offset, uint count,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// outputs
	inout float minDistance, inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	bool found = false;
	vec3 localBarycoord, localNormal;
	float localDist, localSide;
	for ( uint i = offset, l = offset + count; i < l; i ++ ) {

		uvec3 indices = uTexelFetch1D( indexAttr, i ).xyz;
		vec3 a = texelFetch1D( positionAttr, indices.x ).rgb;
		vec3 b = texelFetch1D( positionAttr, indices.y ).rgb;
		vec3 c = texelFetch1D( positionAttr, indices.z ).rgb;

		if (
			intersectsTriangle( rayOrigin, rayDirection, a, b, c, localBarycoord, localNormal, localDist, localSide )
			&& localDist < minDistance
		) {

			found = true;
			minDistance = localDist;

			faceIndices = uvec4( indices.xyz, i );
			faceNormal = localNormal;

			side = localSide;
			barycoord = localBarycoord;
			dist = localDist;

		}

	}

	return found;

}

bool intersectsBVHNodeBounds( vec3 rayOrigin, vec3 rayDirection, sampler2D bvhBounds, uint currNodeIndex, out float dist ) {

	uint cni2 = currNodeIndex * 2u;
	vec3 boundsMin = texelFetch1D( bvhBounds, cni2 ).xyz;
	vec3 boundsMax = texelFetch1D( bvhBounds, cni2 + 1u ).xyz;
	return intersectsBounds( rayOrigin, rayDirection, boundsMin, boundsMax, dist );

}

// use a macro to hide the fact that we need to expand the struct into separate fields
#define	bvhIntersectFirstHit(		bvh,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)	_bvhIntersectFirstHit(		bvh.position, bvh.index, bvh.bvhBounds, bvh.bvhContents,		rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist	)

bool _bvhIntersectFirstHit(
	// bvh info
	sampler2D bvh_position, usampler2D bvh_index, sampler2D bvh_bvhBounds, usampler2D bvh_bvhContents,

	// ray
	vec3 rayOrigin, vec3 rayDirection,

	// output variables split into separate variables due to output precision
	inout uvec4 faceIndices, inout vec3 faceNormal, inout vec3 barycoord,
	inout float side, inout float dist
) {

	// stack needs to be twice as long as the deepest tree we expect because
	// we push both the left and right child onto the stack every traversal
	int ptr = 0;
	uint stack[ BVH_STACK_DEPTH ];
	stack[ 0 ] = 0u;

	float triangleDistance = INFINITY;
	bool found = false;
	while ( ptr > - 1 && ptr < BVH_STACK_DEPTH ) {

		uint currNodeIndex = stack[ ptr ];
		ptr --;

		// check if we intersect the current bounds
		float boundsHitDistance;
		if (
			! intersectsBVHNodeBounds( rayOrigin, rayDirection, bvh_bvhBounds, currNodeIndex, boundsHitDistance )
			|| boundsHitDistance > triangleDistance
		) {

			continue;

		}

		uvec2 boundsInfo = uTexelFetch1D( bvh_bvhContents, currNodeIndex ).xy;
		bool isLeaf = bool( boundsInfo.x & 0xffff0000u );

		if ( isLeaf ) {

			uint count = boundsInfo.x & 0x0000ffffu;
			uint offset = boundsInfo.y;

			found = intersectTriangles(
				bvh_position, bvh_index, offset, count,
				rayOrigin, rayDirection, triangleDistance,
				faceIndices, faceNormal, barycoord, side, dist
			) || found;

		} else {

			uint leftIndex = currNodeIndex + 1u;
			uint splitAxis = boundsInfo.x & 0x0000ffffu;
			uint rightIndex = boundsInfo.y;

			bool leftToRight = rayDirection[ splitAxis ] >= 0.0;
			uint c1 = leftToRight ? leftIndex : rightIndex;
			uint c2 = leftToRight ? rightIndex : leftIndex;

			// set c2 in the stack so we traverse it later. We need to keep track of a pointer in
			// the stack while we traverse. The second pointer added is the one that will be
			// traversed first
			ptr ++;
			stack[ ptr ] = c2;

			ptr ++;
			stack[ ptr ] = c1;

		}

	}

	return found;

}
`,Xe=`
struct BVH {

	usampler2D index;
	sampler2D position;

	sampler2D bvhBounds;
	usampler2D bvhContents;

};
`,Ke=Xe,qe=`
	${We}
	${Ye}
`,br=`#define ENVMAP_TYPE_CUBE_UV
precision highp isampler2D;
precision highp usampler2D;
varying vec3 vWorldPosition;
varying vec3 vNormal;
varying mat4 vModelMatrixInverse;

#ifdef USE_INSTANCING_COLOR
	varying vec3 vInstanceColor;
#endif

#ifdef ENVMAP_TYPE_CUBEM
	uniform samplerCube envMap;
#else
	uniform sampler2D envMap;
#endif

uniform float bounces;
${Ke}
${qe}
uniform BVH bvh;
uniform float ior;
uniform bool correctMips;
uniform vec2 resolution;
uniform float fresnel;
uniform mat4 modelMatrix;
uniform mat4 projectionMatrixInverse;
uniform mat4 viewMatrixInverse;
uniform float aberrationStrength;
uniform vec3 color;

float fresnelFunc(vec3 viewDirection, vec3 worldNormal) {
	return pow( 1.0 + dot( viewDirection, worldNormal), 10.0 );
}

vec3 totalInternalReflection(vec3 ro, vec3 rd, vec3 normal, float ior, mat4 modelMatrixInverse) {
	vec3 rayOrigin = ro;
	vec3 rayDirection = rd;
	rayDirection = refract(rayDirection, normal, 1.0 / ior);
	rayOrigin = vWorldPosition + rayDirection * 0.001;
	rayOrigin = (modelMatrixInverse * vec4(rayOrigin, 1.0)).xyz;
	rayDirection = normalize((modelMatrixInverse * vec4(rayDirection, 0.0)).xyz);
	for(float i = 0.0; i < bounces; i++) {
		uvec4 faceIndices = uvec4( 0u );
		vec3 faceNormal = vec3( 0.0, 0.0, 1.0 );
		vec3 barycoord = vec3( 0.0 );
		float side = 1.0;
		float dist = 0.0;
		bvhIntersectFirstHit( bvh, rayOrigin, rayDirection, faceIndices, faceNormal, barycoord, side, dist );
		vec3 hitPos = rayOrigin + rayDirection * max(dist - 0.001, 0.0);
		vec3 tempDir = refract(rayDirection, faceNormal, ior);
		if (length(tempDir) != 0.0) {
			rayDirection = tempDir;
			break;
		}
		rayDirection = reflect(rayDirection, faceNormal);
		rayOrigin = hitPos + rayDirection * 0.01;
	}
	rayDirection = normalize((modelMatrix * vec4(rayDirection, 0.0)).xyz);
	return rayDirection;
}

#include <common>
#include <cube_uv_reflection_fragment>

#ifdef ENVMAP_TYPE_CUBEM
	vec4 textureGradient(samplerCube envMap, vec3 rayDirection, vec3 directionCamPerfect) {
		return textureGrad(envMap, rayDirection, dFdx(correctMips ? directionCamPerfect: rayDirection), dFdy(correctMips ? directionCamPerfect: rayDirection));
	}
#else
	vec4 textureGradient(sampler2D envMap, vec3 rayDirection, vec3 directionCamPerfect) {
		vec2 uvv = equirectUv( rayDirection );
		vec2 smoothUv = equirectUv( directionCamPerfect );
		return textureGrad(envMap, uvv, dFdx(correctMips ? smoothUv : uvv), dFdy(correctMips ? smoothUv : uvv));
	}
#endif

void main() {
	vec2 uv = gl_FragCoord.xy / resolution;
	vec3 directionCamPerfect = (projectionMatrixInverse * vec4(uv * 2.0 - 1.0, 0.0, 1.0)).xyz;
	directionCamPerfect = (viewMatrixInverse * vec4(directionCamPerfect, 0.0)).xyz;
	directionCamPerfect = normalize(directionCamPerfect);
	vec3 normal = vNormal;
	vec3 rayOrigin = cameraPosition;
	vec3 rayDirection = normalize(vWorldPosition - cameraPosition);
	vec3 finalColor;
	#ifdef CHROMATIC_ABERRATIONS
		vec3 rayDirectionG = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
		#ifdef FAST_CHROMA
			vec3 rayDirectionR = normalize(rayDirectionG + 1.0 * vec3(aberrationStrength / 2.0));
			vec3 rayDirectionB = normalize(rayDirectionG - 1.0 * vec3(aberrationStrength / 2.0));
		#else
			vec3 rayDirectionR = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 - aberrationStrength), 1.0), vModelMatrixInverse);
			vec3 rayDirectionB = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior * (1.0 + aberrationStrength), 1.0), vModelMatrixInverse);
		#endif
		float finalColorR = textureGradient(envMap, rayDirectionR, directionCamPerfect).r;
		float finalColorG = textureGradient(envMap, rayDirectionG, directionCamPerfect).g;
		float finalColorB = textureGradient(envMap, rayDirectionB, directionCamPerfect).b;
		finalColor = vec3(finalColorR, finalColorG, finalColorB);
	#else
		rayDirection = totalInternalReflection(rayOrigin, rayDirection, normal, max(ior, 1.0), vModelMatrixInverse);
		finalColor = textureGradient(envMap, rayDirection, directionCamPerfect).rgb;
	#endif

	finalColor *= color;
	#ifdef USE_INSTANCING_COLOR
		finalColor *= vInstanceColor;
	#endif

	vec3 viewDirection = normalize(vWorldPosition - cameraPosition);
	float nFresnel = fresnelFunc(viewDirection, normal) * fresnel;
	gl_FragColor = vec4(mix(finalColor, vec3(1.0), nFresnel), 1.0);
	${M.tonemapping_fragment}
	${M.colorspace_fragment}
}`;var Je=Object.defineProperty,Qe=(r,e,t)=>e in r?Je(r,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):r[e]=t,y=(r,e,t)=>(Qe(r,typeof e!="symbol"?e+"":e,t),t);const De=/\bvoid\s+main\s*\(\s*\)\s*{/g;function J(r){const e=/^[ \t]*#include +<([\w\d./]+)>/gm;function t(i,n){let a=M[n];return a?J(a):i}return r.replace(e,t)}const D=[];for(let r=0;r<256;r++)D[r]=(r<16?"0":"")+r.toString(16);function et(){const r=Math.random()*4294967295|0,e=Math.random()*4294967295|0,t=Math.random()*4294967295|0,i=Math.random()*4294967295|0;return(D[r&255]+D[r>>8&255]+D[r>>16&255]+D[r>>24&255]+"-"+D[e&255]+D[e>>8&255]+"-"+D[e>>16&15|64]+D[e>>24&255]+"-"+D[t&63|128]+D[t>>8&255]+"-"+D[t>>16&255]+D[t>>24&255]+D[i&255]+D[i>>8&255]+D[i>>16&255]+D[i>>24&255]).toUpperCase()}const A=Object.assign||function(){let r=arguments[0];for(let e=1,t=arguments.length;e<t;e++){let i=arguments[e];if(i)for(let n in i)Object.prototype.hasOwnProperty.call(i,n)&&(r[n]=i[n])}return r},tt=Date.now(),pe=new WeakMap,ve=new Map;let rt=1e10;function G(r,e){const t=ot(e);let i=pe.get(r);if(i||pe.set(r,i=Object.create(null)),i[t])return new i[t];const n=`_onBeforeCompile${t}`,a=function(s,d){r.onBeforeCompile.call(this,s,d);const m=this.customProgramCacheKey()+"|"+s.vertexShader+"|"+s.fragmentShader;let u=ve[m];if(!u){const f=it(this,s,e,t);u=ve[m]=f}s.vertexShader=u.vertexShader,s.fragmentShader=u.fragmentShader,A(s.uniforms,this.uniforms),e.timeUniform&&(s.uniforms[e.timeUniform]={get value(){return Date.now()-tt}}),this[n]&&this[n](s)},o=function(){return l(e.chained?r:r.clone())},l=function(s){const d=Object.create(s,c);return Object.defineProperty(d,"baseMaterial",{value:r}),Object.defineProperty(d,"id",{value:rt++}),d.uuid=et(),d.uniforms=A({},s.uniforms,e.uniforms),d.defines=A({},s.defines,e.defines),d.defines[`TROIKA_DERIVED_MATERIAL_${t}`]="",d.extensions=A({},s.extensions,e.extensions),d._listeners=void 0,d},c={constructor:{value:o},isDerivedMaterial:{value:!0},type:{get:()=>r.type,set:s=>{r.type=s}},isDerivedFrom:{writable:!0,configurable:!0,value:function(s){const d=this.baseMaterial;return s===d||d.isDerivedMaterial&&d.isDerivedFrom(s)||!1}},customProgramCacheKey:{writable:!0,configurable:!0,value:function(){return r.customProgramCacheKey()+"|"+t}},onBeforeCompile:{get(){return a},set(s){this[n]=s}},copy:{writable:!0,configurable:!0,value:function(s){return r.copy.call(this,s),!r.isShaderMaterial&&!r.isDerivedMaterial&&(A(this.extensions,s.extensions),A(this.defines,s.defines),A(this.uniforms,Ge.clone(s.uniforms))),this}},clone:{writable:!0,configurable:!0,value:function(){const s=new r.constructor;return l(s).copy(this)}},getDepthMaterial:{writable:!0,configurable:!0,value:function(){let s=this._depthMaterial;return s||(s=this._depthMaterial=G(r.isDerivedMaterial?r.getDepthMaterial():new Be({depthPacking:He}),e),s.defines.IS_DEPTH_MATERIAL="",s.uniforms=this.uniforms),s}},getDistanceMaterial:{writable:!0,configurable:!0,value:function(){let s=this._distanceMaterial;return s||(s=this._distanceMaterial=G(r.isDerivedMaterial?r.getDistanceMaterial():new Ee,e),s.defines.IS_DISTANCE_MATERIAL="",s.uniforms=this.uniforms),s}},dispose:{writable:!0,configurable:!0,value(){const{_depthMaterial:s,_distanceMaterial:d}=this;s&&s.dispose(),d&&d.dispose(),r.dispose.call(this)}}};return i[t]=o,new o}function it(r,{vertexShader:e,fragmentShader:t},i,n){let{vertexDefs:a,vertexMainIntro:o,vertexMainOutro:l,vertexTransform:c,fragmentDefs:s,fragmentMainIntro:d,fragmentMainOutro:m,fragmentColorTransform:u,customRewriter:f,timeUniform:h}=i;if(a=a||"",o=o||"",l=l||"",s=s||"",d=d||"",m=m||"",(c||f)&&(e=J(e)),(u||f)&&(t=t.replace(/^[ \t]*#include <((?:tonemapping|encodings|colorspace|fog|premultiplied_alpha|dithering)_fragment)>/gm,`
//!BEGIN_POST_CHUNK $1
$&
//!END_POST_CHUNK
`),t=J(t)),f){let p=f({vertexShader:e,fragmentShader:t});e=p.vertexShader,t=p.fragmentShader}if(u){let p=[];t=t.replace(/^\/\/!BEGIN_POST_CHUNK[^]+?^\/\/!END_POST_CHUNK/gm,v=>(p.push(v),"")),m=`${u}
${p.join(`
`)}
${m}`}if(h){const p=`
uniform float ${h};
`;a=p+a,s=p+s}return c&&(e=`vec3 troika_position_${n};
vec3 troika_normal_${n};
vec2 troika_uv_${n};
${e}
`,a=`${a}
void troikaVertexTransform${n}(inout vec3 position, inout vec3 normal, inout vec2 uv) {
  ${c}
}
`,o=`
troika_position_${n} = vec3(position);
troika_normal_${n} = vec3(normal);
troika_uv_${n} = vec2(uv);
troikaVertexTransform${n}(troika_position_${n}, troika_normal_${n}, troika_uv_${n});
${o}
`,e=e.replace(/\b(position|normal|uv)\b/g,(p,v,b,_)=>/\battribute\s+vec[23]\s+$/.test(_.substr(0,b))?v:`troika_${v}_${n}`),r.map&&r.map.channel>0||(e=e.replace(/\bMAP_UV\b/g,`troika_uv_${n}`))),e=ge(e,n,a,o,l),t=ge(t,n,s,d,m),{vertexShader:e,fragmentShader:t}}function ge(r,e,t,i,n){return(i||n||t)&&(r=r.replace(De,`
${t}
void troikaOrigMain${e}() {`),r+=`
void main() {
  ${i}
  troikaOrigMain${e}();
  ${n}
}`),r}function nt(r,e){return r==="uniforms"?void 0:typeof e=="function"?e.toString():e}let at=0;const xe=new Map;function ot(r){const e=JSON.stringify(r,nt);let t=xe.get(e);return t==null&&xe.set(e,t=++at),t}const st={MeshDepthMaterial:"depth",MeshDistanceMaterial:"distanceRGBA",MeshNormalMaterial:"normal",MeshBasicMaterial:"basic",MeshLambertMaterial:"lambert",MeshPhongMaterial:"phong",MeshToonMaterial:"toon",MeshStandardMaterial:"physical",MeshPhysicalMaterial:"physical",MeshMatcapMaterial:"matcap",LineBasicMaterial:"basic",LineDashedMaterial:"dashed",PointsMaterial:"points",ShadowMaterial:"shadow",SpriteMaterial:"sprite"};function lt(r){let e=st[r.type];return e?ke[e]:r}function ye(r){let e=/\buniform\s+(int|float|vec[234]|mat[34])\s+([A-Za-z_][\w]*)/g,t=Object.create(null),i;for(;(i=e.exec(r))!==null;)t[i[2]]=i[1];return t}function ct(r){let e=[],t="";const i=G(r,{chained:!0,customRewriter({vertexShader:a,fragmentShader:o}){let l=[],c=[],s=[],d=ye(a),m=ye(o);return e.forEach(u=>{let f=d[u],h=m[u];const p=f||h;if(p){const v=new RegExp(`\\buniform\\s+${p}\\s+${u}\\s*;`,"g"),b=new RegExp(`\\b${u}\\b`,"g"),_=`troika_attr_${u}`,g=`troika_vary_${u}`;if(l.push(`attribute ${p} ${_};`),f&&(a=a.replace(v,""),a=a.replace(b,_)),h){o=o.replace(v,""),o=o.replace(b,g);let x=`varying ${h} ${g};`;l.push(x),s.push(x),c.push(`${g} = ${_};`)}}}),a=`${l.join(`
`)}
${a.replace(De,`
$&
${c.join(`
`)}`)}`,s.length&&(o=`${s.join(`
`)}
${o}`),{vertexShader:a,fragmentShader:o}}});i.setUniformNames=function(a){e=a||[];const o=e.sort().join("|");o!==t&&(t=o,this.needsUpdate=!0)};const n=i.customProgramCacheKey();return i.customProgramCacheKey=function(){return n+"|"+t},i.isInstancedUniformsMaterial=!0,i}class ut extends Re{constructor(e,t,i){super(e,t,i),this._maxCount=i,this._instancedUniformNames=[]}get geometry(){let e=this._derivedGeometry;const t=this._baseGeometry;return(!e||e.baseGeometry!==t)&&(e=this._derivedGeometry=Object.create(t),e.baseGeometry=t,e.attributes=Object.create(t.attributes),t.addEventListener("dispose",function i(){t.removeEventListener("dispose",i),e.dispose()})),e}set geometry(e){this._baseGeometry=e}get material(){let e=this._derivedMaterial;const t=this._baseMaterial||this._defaultMaterial||(this._defaultMaterial=new Ue);return(!e||e.baseMaterial!==t)&&(e=this._derivedMaterial=ct(t),t.addEventListener("dispose",function i(){t.removeEventListener("dispose",i),e.dispose()})),e.setUniformNames(this._instancedUniformNames),e}set material(e){if(Array.isArray(e))throw new Error("InstancedUniformsMesh does not support multiple materials");for(;e&&e.isInstancedUniformsMaterial;)e=e.baseMaterial;this._baseMaterial=e}get customDepthMaterial(){return this.material.getDepthMaterial()}set customDepthMaterial(e){}get customDistanceMaterial(){return this.material.getDistanceMaterial()}set customDistanceMaterial(e){}setUniformAt(e,t,i){const n=this.geometry.attributes,a=`troika_attr_${e}`;let o=n[a];if(!o){const l=ft(this._baseMaterial,e),c=dt(l);if(o=n[a]=new Fe(new Float32Array(c*this._maxCount),c),l!==null)for(let s=0;s<this._maxCount;s++)be(o,s,l);this._instancedUniformNames=[...this._instancedUniformNames,e]}be(o,t,i),o.needsUpdate=!0}unsetUniform(e){this.geometry.deleteAttribute(`troika_attr_${e}`),this._instancedUniformNames=this._instancedUniformNames.filter(t=>t!==e)}}function be(r,e,t){let i=r.itemSize;i===1?r.setX(e,t):i===2?r.setXY(e,t.x,t.y):i===3?t.isColor?r.setXYZ(e,t.r,t.g,t.b):r.setXYZ(e,t.x,t.y,t.z):i===4?r.setXYZW(e,t.x,t.y,t.z,t.w):t.toArray?t.toArray(r.array,e*i):r.set(t,e*i)}function ft(r,e){let t=r.uniforms;return t&&t[e]||(t=lt(r).uniforms,t&&t[e])?t[e].value:null}function dt(r){return r==null?0:typeof r=="number"?1:r.isVector2?2:r.isVector3||r.isColor?3:r.isVector4||r.isQuaternion?4:r.elements?r.elements.length:Array.isArray(r)?r.length:0}const ht=(r,e)=>{const t=r.split(`
`),i=/vMapUv|vAlphaMapUv|vNormalMapUv/g;return t.map(n=>!n.includes("varying")&&!n.includes("uniform")?n.replace(i,e):n).join(`
`)},mt=(r,e)=>{const t={USE_UV:""};return e&&(t.TRI_GEOMETRY=""),G(r,{defines:t,uniforms:{animationData:{value:null},animationDataSize:{value:0},billboarding:{value:0},flipX:{value:0},flipY:{value:0},spritesheetData:{value:null},dataSize:{value:new ae(0,0)},tint:{value:new we(0,0,0,0)}},vertexDefs:`
    uniform float billboarding;
    flat varying int vId;
    `,vertexMainOutro:`
    vId = gl_InstanceID;
    if(billboarding == 1.){
      vec3 instancePosition = vec3(instanceMatrix[3]);
      vec3 instanceScale = vec3(length(instanceMatrix[0]), length(instanceMatrix[1]), length(instanceMatrix[2]));

      vec3 cameraRight_worldspace = vec3(modelViewMatrix[0][0], modelViewMatrix[1][0], modelViewMatrix[2][0]);
      vec3 cameraUp_worldspace = vec3(modelViewMatrix[0][1], modelViewMatrix[1][1], modelViewMatrix[2][1]);

      vec3 vertexPosition_worldspace = instancePosition
        + cameraRight_worldspace * position.x * instanceScale.x
        + cameraUp_worldspace * position.y * instanceScale.y;

      gl_Position = projectionMatrix * modelViewMatrix * vec4(vertexPosition_worldspace, 1.0);
    }
    `,customRewriter:({vertexShader:i,fragmentShader:n})=>(n=n.replace("void main() {",`void main() {
      float y = float(vId / animationDataSize) / float(animationDataSize);
      float x = mod(float(vId),float(animationDataSize)) / float(animationDataSize);

      float spritesheetFrameId = texture2D(animationData, vec2(x,y)).r;

			// x,y,w,h
			vec4 frameMeta = readData(spritesheetFrameId, 0.f);

			vec2 fSize = frameMeta.zw;
			vec2 fOffset = vec2(frameMeta.xy);

      vec2 transformedPlaneUv = vUv + vec2(0.,0.);

      // todo  == 1. caused a flickering bug. look into Precision/interpolation?
      if(flipX > 0.){
        transformedPlaneUv.x = 1. - transformedPlaneUv.x;
      }
      if(flipY > 0.){
        transformedPlaneUv.y = 1. - transformedPlaneUv.y;
      }

			vec2 spriteUv = fSize * transformedPlaneUv + fOffset ;

      #ifdef TRI_GEOMETRY
        // Shift UVs if mesh uses triangle geometry
        // TODO optimize ugly math
        if(vUv.y>0.5 || vUv.x<0.25 || vUv.x>0.75){
          discard;
        }

        vec2 zoomCenter = vec2(fSize.x * 0.5,0.) + fOffset;
        float zoomFactor = 2.;
        vec2 shiftedUV = spriteUv - zoomCenter;
        shiftedUV *= zoomFactor;
        shiftedUV += zoomCenter;
        spriteUv = shiftedUV;
      #endif



			`),n=`
			
			uniform sampler2D animationData;
      uniform int animationDataSize;
			uniform sampler2D spritesheetData;
      uniform float startTime;
			uniform float time;
			uniform float flipX;
			uniform float flipY;
			uniform vec2 dataSize;
      uniform vec4 tint;

      flat varying int vId;
			
			
			vec4 readData(float col, float row) {
				float wStep = 1.f / dataSize.x;
				float wHalfStep = wStep * 0.5f;
				float hStep = 1.f / dataSize.y;
				float hHalfStep = 1.f / dataSize.y * 0.5f;
				return texture2D(spritesheetData, vec2(col * wStep + wHalfStep, row * hStep + hHalfStep));
			}

      vec2 zoomUV(vec2 uv, vec2 zoomCenter, float zoomFactor) {
        // Shift UVs so that the zoom center is the origin
        vec2 shiftedUV = uv - zoomCenter;

        // Scale (zoom) the UV coordinates
        shiftedUV *= zoomFactor;

        // Shift back
        shiftedUV += zoomCenter;

        return shiftedUV;
    }
			
			${n}
			`,n=n.replace("vec4 sampledDiffuseColor = texture2D( map, vMapUv );",`
        vec4 sampledDiffuseColor = texture2D( map, vMapUv );
        if(tint.w == 1.){
          vec3 hue_term = 1.0 - min(abs(vec3(tint.x) - vec3(0,2.0,1.0)), 1.0);
          hue_term.x = 1.0 - dot(hue_term.yz, vec2(1));
          vec3 res = vec3(dot(sampledDiffuseColor.xyz, hue_term.xyz), dot(sampledDiffuseColor.xyz, hue_term.zxy), dot(sampledDiffuseColor.xyz, hue_term.yzx));
          res = mix(vec3(dot(res, vec3(0.2, 0.5, 0.3))), res, tint.y);
          res = res * tint.z;

          sampledDiffuseColor = vec4(res, sampledDiffuseColor.a);
        }

        // sampledDiffuseColor = vec4(texture2D(animationData, vUv).rgb, 1.);
      `),n=ht(n,"spriteUv"),{vertexShader:i,fragmentShader:n})})},_r=r=>{const e=[],t=[],i={},n=[],a=r.meta.size.w,o=r.meta.size.h,l=[r.meta.size.w,r.meta.size.h];for(const c in r.frames){const s=r.frames[c];e.push([s.frame.x/a,s.frame.y/o,s.frame.w/a,s.frame.h/o]),t.push(s.duration)}for(const c of r.meta.frameTags){i[c.name]=[];for(let s=c.from;s<=c.to;s++)i[c.name].push([s,t[s]]);n.push(i[c.name].length)}return{frames:e,animations:i,sheetSize:l,animationLengths:n}},pt=r=>{const{frames:e,animationLengths:t,animations:i}=r,n=Math.max(e.length,t.length,...Object.values(i).map(f=>f.length)),a=2+Object.values(i).length,o=e.flat().concat(new Array((n-e.length)*4).fill(0)),l=t.map(f=>[f,0,0,0]).flat().concat(new Array((n-t.length)*4).fill(0)),c=[],s=new Map;for(let f=0;f<Object.keys(i).length;f++){const h=Object.keys(i)[f];s.set(h,f);const p=i[h].map(v=>[...v,0,0]).flat().concat(new Array((n-i[h].length)*4).fill(0));c.push(...p)}const d=[...o,...l,...c],m=new Float32Array(d);m.set(d);const u=new oe(m,n,a,E,U);return u.type=U,u.minFilter=I,u.magFilter=I,u.wrapS=B,u.wrapT=ne,u.needsUpdate=!0,{dataTexture:u,dataWidth:n,dataHeight:a,animMap:s}},vt=()=>{const r=new ie,e=new Float32Array([0,1,0,-1,-1,0,1,-1,0]);r.setAttribute("position",new O(e,3));const t=new Float32Array([.5,1,0,0,1,0]);return r.setAttribute("uv",new O(t,2)),r.computeVertexNormals(),r},gt=new Ce(-1,1,1,-1,0,1);class xt extends ie{constructor(){super(),this.setAttribute("position",new ce([-1,3,0,-1,-1,0,3,-1,0],3)),this.setAttribute("uv",new ce([0,2,0,0,2,0],2))}}const yt=new xt;class bt{constructor(e){this._mesh=new $e(yt,e)}dispose(){this._mesh.geometry.dispose()}render(e){e.render(this._mesh,gt)}get material(){return this._mesh.material}set material(e){this._mesh.material=e}}class _t{constructor(e,t,i){this.variables=[],this.currentTextureIndex=0;let n=U;const a={passThruTexture:{value:null}},o=s(m(),a),l=new bt(o);this.setDataType=function(u){return n=u,this},this.addVariable=function(u,f,h){const p=this.createShaderMaterial(f),v={name:u,initialValueTexture:h,material:p,dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:I,magFilter:I};return this.variables.push(v),v},this.setVariableDependencies=function(u,f){u.dependencies=f},this.init=function(){if(i.capabilities.maxVertexTextures===0)return"No support for vertex shader textures.";for(let u=0;u<this.variables.length;u++){const f=this.variables[u];f.renderTargets[0]=this.createRenderTarget(e,t,f.wrapS,f.wrapT,f.minFilter,f.magFilter),f.renderTargets[1]=this.createRenderTarget(e,t,f.wrapS,f.wrapT,f.minFilter,f.magFilter),this.renderTexture(f.initialValueTexture,f.renderTargets[0]),this.renderTexture(f.initialValueTexture,f.renderTargets[1]);const h=f.material,p=h.uniforms;if(f.dependencies!==null)for(let v=0;v<f.dependencies.length;v++){const b=f.dependencies[v];if(b.name!==f.name){let _=!1;for(let g=0;g<this.variables.length;g++)if(b.name===this.variables[g].name){_=!0;break}if(!_)return"Variable dependency not found. Variable="+f.name+", dependency="+b.name}p[b.name]={value:null},h.fragmentShader=`
uniform sampler2D `+b.name+`;
`+h.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){const u=this.currentTextureIndex,f=this.currentTextureIndex===0?1:0;for(let h=0,p=this.variables.length;h<p;h++){const v=this.variables[h];if(v.dependencies!==null){const b=v.material.uniforms;for(let _=0,g=v.dependencies.length;_<g;_++){const x=v.dependencies[_];b[x.name].value=x.renderTargets[u].texture}}this.doRenderTarget(v.material,v.renderTargets[f])}this.currentTextureIndex=f},this.getCurrentRenderTarget=function(u){return u.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(u){return u.renderTargets[this.currentTextureIndex===0?1:0]},this.dispose=function(){l.dispose();const u=this.variables;for(let f=0;f<u.length;f++){const h=u[f];h.initialValueTexture&&h.initialValueTexture.dispose();const p=h.renderTargets;for(let v=0;v<p.length;v++)p[v].dispose()}};function c(u){u.defines.resolution="vec2( "+e.toFixed(1)+", "+t.toFixed(1)+" )"}this.addResolutionDefine=c;function s(u,f){f=f||{};const h=new Ne({name:"GPUComputationShader",uniforms:f,vertexShader:d(),fragmentShader:u});return c(h),h}this.createShaderMaterial=s,this.createRenderTarget=function(u,f,h,p,v,b){return u=u||e,f=f||t,h=h||B,p=p||B,v=v||I,b=b||I,new Ve(u,f,{wrapS:h,wrapT:p,minFilter:v,magFilter:b,format:E,type:n,depthBuffer:!1})},this.createTexture=function(){const u=new Float32Array(e*t*4),f=new oe(u,e,t,E,U);return f.needsUpdate=!0,f},this.renderTexture=function(u,f){a.passThruTexture.value=u,this.doRenderTarget(o,f),a.passThruTexture.value=null},this.doRenderTarget=function(u,f){const h=i.getRenderTarget(),p=i.xr.enabled,v=i.shadowMap.autoUpdate;i.xr.enabled=!1,i.shadowMap.autoUpdate=!1,l.material=u,i.setRenderTarget(f),l.render(i),l.material=o,i.xr.enabled=p,i.shadowMap.autoUpdate=v,i.setRenderTarget(h)};function d(){return`void main()	{

	gl_Position = vec4( position, 1.0 );

}
`}function m(){return`uniform sampler2D passThruTexture;

void main() {

	vec2 uv = gl_FragCoord.xy / resolution.xy;

	gl_FragColor = texture2D( passThruTexture, uv );

}
`}}}const wt=`
  #include <common>
  uniform sampler2D instructionsTexture;

  uniform sampler2D spritesheetData;
  uniform vec2 dataSize;
  uniform float fps;
  uniform float deltaTime;

  // read spritesheet metadata
  vec4 readData(float col, float row, sampler2D tex) {
    float wStep = 1.f / dataSize.x;
    float wHalfStep = wStep * 0.5f;
    float hStep = 1.f / dataSize.y;
    float hHalfStep = 1.f / dataSize.y * 0.5f;
    return texture2D(spritesheetData, vec2(col * wStep + wHalfStep, row * hStep + hHalfStep));
  }



  void main()	{

    // OUTPUT FROM THIS SHADER
    // progressValue.r - picked animation frame
    // progressValue.g - previous progress state (for pause, reverse & pingpong consistency)
    // progressValue.b - not used yet
    // progressValue.a - previous animationID

    vec2 cellSize = 1.0 / resolution.xy;
    vec2 uv = gl_FragCoord.xy * cellSize;


    vec4 progressValue = texture2D( progress, uv );

    vec4 instructions = texture2D( instructionsTexture, uv);

    // FREEZE FRAME - return to save calculations?
    if(instructions.a >=10.){
      progressValue.r = instructions.a - 10.;
      progressValue.a = instructions.x;
      progressValue.g = progressValue.g;
      gl_FragColor = progressValue;
      return;
    }


    progressValue.b = 0.;

    // todo shouldn't be rounding here, pick
    float animationId = round(instructions.x);

    float offset = instructions.g;

    float animLength = readData(animationId, 1.f, spritesheetData).r;
    float totalTime = animLength / fps;

    // new delta is % of animation
    float newProgress = deltaTime / totalTime;
    // add new delta to saved progress
    float frameTimedId = mod(progressValue.g + newProgress, 1.);
    // frameTimedId = 0.;
    // float frameTimedId = progressValue.g;
    // save for use in next frame



    float playMode = mod(instructions.b, 10.);

    // forward
    if(playMode == 0.){
      frameTimedId = progressValue.g + newProgress;
    }
    // reverse
    if(playMode == 1.){
      frameTimedId = progressValue.g - newProgress;
    }
    // 2 - pause - do nothing
    if(playMode == 2.){
      frameTimedId = progressValue.g;
    }

    // //todo pingpong
    // if(playMode == 3.){
    // }

    // loop (play once over 10.)
    if(instructions.b < 10.){
      frameTimedId = mod(frameTimedId, 1.);
    }

    // todo This could be optional and user would reset manually,
    // todo allowing for consistent movement across multiple animations
    // todo for example - running steps being syncec
    // start anim from beginning if animationID changes
    if(progressValue.a != instructions.x){
      frameTimedId = 0.;
    }

    float frameId = floor(animLength * frameTimedId);
    float spritesheetFrameId = readData(frameId, 2.f + animationId, spritesheetData).r;



    // Picked sprite frame that goes to material
    progressValue.r = spritesheetFrameId;

    progressValue.a = instructions.x;
    progressValue.g = frameTimedId;

    gl_FragColor = progressValue;
  }
`,Dt=(r=512)=>{const e=new Float32Array(r**2*4);for(let i=0;i<r**2*4;i++)e[i]=0;const t=new oe(e,r,r,E,U);return t.minFilter=I,t.magFilter=I,t.wrapS=B,t.wrapT=ne,t.needsUpdate=!0,t},Mt=r=>{if(r<=0)return 1;let e=1;for(;e<r;)e<<=1;return e},St=(r,e)=>{const t=Mt(Math.sqrt(e)),i=new _t(t,t,r),n=i.createTexture(),a=i.addVariable("progress",wt,n),o=Dt(t);a.material.uniforms.instructionsTexture={value:o},a.material.uniforms.spritesheetData={value:null},a.material.uniforms.fps={value:0},a.material.uniforms.deltaTime={value:0},a.material.uniforms.dataSize={value:new ae},i.setVariableDependencies(a,[a]);const l=i.init();l!==null&&console.error(l);let c=!1;return{gpuCompute:i,animationRunner:a,progressDataTexture:o,utils:{updateAnimationAt:(s,d)=>{const m=s*4;o.image.data[m]=d,c=!0},updateOffsetAt:(s,d)=>{const m=s*4;o.image.data[m+1]=d,c=!0},updatePlaymodeAt:(s,d)=>{const m=s*4;o.image.data[m+2]=d,c=!0},updateFrameAt:(s,d)=>{const m=s*4;o.image.data[m+3]=d+10,c=!0}},update:()=>{c&&(o.needsUpdate=!0,c=!1),i.compute()}}};class Tt{constructor(){y(this,"_previousTime"),y(this,"_currentTime"),y(this,"_startTime"),y(this,"_delta"),y(this,"_elapsed"),y(this,"_timescale"),y(this,"_useFixedDelta"),y(this,"_fixedDelta"),y(this,"_usePageVisibilityAPI"),y(this,"_pageVisibilityHandler"),this._previousTime=0,this._currentTime=0,this._startTime=X(),this._delta=0,this._elapsed=0,this._timescale=1,this._useFixedDelta=!1,this._fixedDelta=16.67,this._usePageVisibilityAPI=typeof document<"u"&&document.hidden!==void 0,this._usePageVisibilityAPI===!0&&(this._pageVisibilityHandler=It.bind(this),document.addEventListener("visibilitychange",this._pageVisibilityHandler,!1))}disableFixedDelta(){return this._useFixedDelta=!1,this}dispose(){return this._usePageVisibilityAPI===!0&&document.removeEventListener("visibilitychange",this._pageVisibilityHandler),this}enableFixedDelta(){return this._useFixedDelta=!0,this}getDelta(){return this._delta/1e3}getElapsed(){return this._elapsed/1e3}getFixedDelta(){return this._fixedDelta/1e3}getTimescale(){return this._timescale}reset(){return this._currentTime=X()-this._startTime,this}setFixedDelta(e){return this._fixedDelta=e*1e3,this}setTimescale(e){return this._timescale=e,this}update(){return this._useFixedDelta===!0?this._delta=this._fixedDelta:(this._previousTime=this._currentTime,this._currentTime=X()-this._startTime,this._delta=this._currentTime-this._previousTime),this._delta*=this._timescale,this._elapsed+=this._delta,this}}function X(){return(typeof performance>"u"?Date:performance).now()}function It(){document.hidden===!1&&this.reset()}const K={FORWARD:0,REVERSE:1,PAUSE:2,PINGPONG:3};class wr extends ut{constructor(e,t,i,n={geometry:"quad"}){let a;n.geometry||(n.geometry="quad"),n.geometry==="tri"&&(a=vt()),n.geometry==="quad"&&(a=new Oe(1,1)),n.geometry&&typeof n.geometry!="string"&&(a=n.geometry);const o=mt(e,n?.geometry==="tri");super(a,o,t),y(this,"_spriteMaterial"),y(this,"_spritesheet"),y(this,"_animationMap"),y(this,"_fps",15),y(this,"_timer"),y(this,"compute"),this.instanceMatrix.clearUpdateRanges(),this.instanceMatrix.addUpdateRange(0,t*16),this.instanceColor&&(this.instanceColor.clearUpdateRanges(),this.instanceColor.addUpdateRange(0,t*3)),this.compute=St(i,t),this._spriteMaterial=o,n.spritesheet&&this.updateSpritesheet(n.spritesheet),this._timer=new Tt,this._animationMap=new Map,this._spriteMaterial.uniforms.animationData.value=this.compute.gpuCompute.getCurrentRenderTarget(this.compute.animationRunner).texture,this._spriteMaterial.uniforms.animationDataSize.value=this.compute.progressDataTexture.image.width}updateSpritesheet(e){const{dataTexture:t,dataWidth:i,dataHeight:n,animMap:a}=pt(e);this._spriteMaterial.uniforms.spritesheetData.value=t,this._spriteMaterial.uniforms.dataSize.value.x=i,this._spriteMaterial.uniforms.dataSize.value.y=n,this.compute.animationRunner.material.uniforms.dataSize.value=new ae(i,n),this.compute.animationRunner.material.uniforms.spritesheetData.value=t,this._animationMap=a}get spritesheet(){return this._spritesheet}set spritesheet(e){this.updateSpritesheet(e),this._spritesheet=e}get animationMap(){return this._animationMap}get animation(){return{setAt:(e,t)=>{this.compute.utils.updateAnimationAt(e,this._animationMap.get(t)||0)}}}get frame(){return{setAt:(e,t,i)=>{var n;let a=t;i&&(a=(n=this.spritesheet)==null?void 0:n.animations[i][t][0]),this.compute.utils.updateFrameAt(e,a)},unsetAt:e=>{this.compute.utils.updateFrameAt(e,-10)},unsetAll:()=>{for(let e=0;e<this.count;e++)this.compute.utils.updateFrameAt(e,-10)}}}get playmode(){return{setAt:(e,t)=>{this.compute.utils.updatePlaymodeAt(e,K[t])},setAll:e=>{for(let t=0;t<this.count;t++){const i=this.compute.progressDataTexture.image.data[t*4+2]>=10?10:0;this.compute.utils.updatePlaymodeAt(t,i+K[e])}}}}get billboarding(){return{setAt:(e,t)=>{this.setUniformAt("billboarding",e,t?1:0)},setAll:e=>{this._spriteMaterial.uniforms.billboarding.value=e?1:0},unsetAll:()=>{this.unsetUniform("billboarding")}}}get offset(){return{setAt:(e,t)=>{this.compute.utils.updateOffsetAt(e,t)},randomizeAll:(e=1)=>{for(let t=0;t<this.count;t++)this.compute.utils.updateOffsetAt(t,Math.random()*e)}}}get loop(){return{setAt:(e,t)=>{const i=this.compute.progressDataTexture.image.data[e*4+2]%10;this.compute.utils.updatePlaymodeAt(e,i+(t?0:10))},setAll:e=>{for(let t=0;t<this.count;t++){const i=this.compute.progressDataTexture.image.data[t*4+2]%10;this.compute.utils.updatePlaymodeAt(t,i+(e?0:10))}}}}get flipX(){return{setAt:(e,t)=>{this.setUniformAt("flipX",e,t?1:0)},setGlobal:e=>{this._spriteMaterial.uniforms.flipX.value=e?1:0},unsetAll:()=>{this.unsetUniform("flipX")}}}get flipY(){return{setAt:(e,t)=>{this.setUniformAt("flipY",e,t?1:0)},setGlobal:e=>{this._spriteMaterial.uniforms.flipY.value=e?1:0},unsetAll:()=>{this.unsetUniform("flipY")}}}play(e,t=!0,i="FORWARD"){return{at:n=>{this.compute.utils.updateAnimationAt(n,this._animationMap.get(e)||0),this.compute.utils.updatePlaymodeAt(n,K[i]+(t?0:10))}}}get hueShift(){const e=new we;return{setGlobal:t=>{t?e.set(t.h,t.s,t.v,1):e.setW(0),this._spriteMaterial.uniforms.tint.value=e}}}get fps(){return this._fps}set fps(e){this._fps=e,this.compute.animationRunner.material.uniforms.fps.value=e}update(){this._timer.update();const e=this._timer.getDelta();this.compute.animationRunner.material.uniforms.deltaTime.value=e,this.compute.update()}}function At(r){return r&&r.__esModule&&Object.prototype.hasOwnProperty.call(r,"default")?r.default:r}var se={exports:{}};se.exports=L;se.exports.default=L;function L(r,e,t){t=t||2;var i=e&&e.length,n=i?e[0]*t:r.length,a=Me(r,0,n,t,!0),o=[];if(!a||a.next===a.prev)return o;var l,c,s,d,m,u,f;if(i&&(a=Rt(r,e,a,t)),r.length>80*t){l=s=r[0],c=d=r[1];for(var h=t;h<n;h+=t)m=r[h],u=r[h+1],m<l&&(l=m),u<c&&(c=u),m>s&&(s=m),u>d&&(d=u);f=Math.max(s-l,d-c),f=f!==0?32767/f:0}return F(a,o,t,l,c,f,0),o}function Me(r,e,t,i,n){var a,o;if(n===te(r,e,t,i)>0)for(a=e;a<t;a+=i)o=_e(a,r[a],r[a+1],o);else for(a=t-i;a>=e;a-=i)o=_e(a,r[a],r[a+1],o);return o&&Z(o,o.next)&&(V(o),o=o.next),o}function C(r,e){if(!r)return r;e||(e=r);var t=r,i;do if(i=!1,!t.steiner&&(Z(t,t.next)||w(t.prev,t,t.next)===0)){if(V(t),t=e=t.prev,t===t.next)break;i=!0}else t=t.next;while(i||t!==e);return e}function F(r,e,t,i,n,a,o){if(r){!o&&a&&kt(r,i,n,a);for(var l=r,c,s;r.prev!==r.next;){if(c=r.prev,s=r.next,a?Pt(r,i,n,a):Ct(r)){e.push(c.i/t|0),e.push(r.i/t|0),e.push(s.i/t|0),V(r),r=s.next,l=s.next;continue}if(r=s,r===l){o?o===1?(r=zt(C(r),e,t),F(r,e,t,i,n,a,2)):o===2&&Ot(r,e,t,i,n,a):F(C(r),e,t,i,n,a,1);break}}}}function Ct(r){var e=r.prev,t=r,i=r.next;if(w(e,t,i)>=0)return!1;for(var n=e.x,a=t.x,o=i.x,l=e.y,c=t.y,s=i.y,d=n<a?n<o?n:o:a<o?a:o,m=l<c?l<s?l:s:c<s?c:s,u=n>a?n>o?n:o:a>o?a:o,f=l>c?l>s?l:s:c>s?c:s,h=i.next;h!==e;){if(h.x>=d&&h.x<=u&&h.y>=m&&h.y<=f&&R(n,l,a,c,o,s,h.x,h.y)&&w(h.prev,h,h.next)>=0)return!1;h=h.next}return!0}function Pt(r,e,t,i){var n=r.prev,a=r,o=r.next;if(w(n,a,o)>=0)return!1;for(var l=n.x,c=a.x,s=o.x,d=n.y,m=a.y,u=o.y,f=l<c?l<s?l:s:c<s?c:s,h=d<m?d<u?d:u:m<u?m:u,p=l>c?l>s?l:s:c>s?c:s,v=d>m?d>u?d:u:m>u?m:u,b=Q(f,h,e,t,i),_=Q(p,v,e,t,i),g=r.prevZ,x=r.nextZ;g&&g.z>=b&&x&&x.z<=_;){if(g.x>=f&&g.x<=p&&g.y>=h&&g.y<=v&&g!==n&&g!==o&&R(l,d,c,m,s,u,g.x,g.y)&&w(g.prev,g,g.next)>=0||(g=g.prevZ,x.x>=f&&x.x<=p&&x.y>=h&&x.y<=v&&x!==n&&x!==o&&R(l,d,c,m,s,u,x.x,x.y)&&w(x.prev,x,x.next)>=0))return!1;x=x.nextZ}for(;g&&g.z>=b;){if(g.x>=f&&g.x<=p&&g.y>=h&&g.y<=v&&g!==n&&g!==o&&R(l,d,c,m,s,u,g.x,g.y)&&w(g.prev,g,g.next)>=0)return!1;g=g.prevZ}for(;x&&x.z<=_;){if(x.x>=f&&x.x<=p&&x.y>=h&&x.y<=v&&x!==n&&x!==o&&R(l,d,c,m,s,u,x.x,x.y)&&w(x.prev,x,x.next)>=0)return!1;x=x.nextZ}return!0}function zt(r,e,t){var i=r;do{var n=i.prev,a=i.next.next;!Z(n,a)&&Se(n,i,i.next,a)&&N(n,a)&&N(a,n)&&(e.push(n.i/t|0),e.push(i.i/t|0),e.push(a.i/t|0),V(i),V(i.next),i=r=a),i=i.next}while(i!==r);return C(i)}function Ot(r,e,t,i,n,a){var o=r;do{for(var l=o.next.next;l!==o.prev;){if(o.i!==l.i&&Bt(o,l)){var c=Te(o,l);o=C(o,o.next),c=C(c,c.next),F(o,e,t,i,n,a,0),F(c,e,t,i,n,a,0);return}l=l.next}o=o.next}while(o!==r)}function Rt(r,e,t,i){var n=[],a,o,l,c,s;for(a=0,o=e.length;a<o;a++)l=e[a]*i,c=a<o-1?e[a+1]*i:r.length,s=Me(r,l,c,i,!1),s===s.next&&(s.steiner=!0),n.push(Et(s));for(n.sort(Ut),a=0;a<n.length;a++)t=Ft(n[a],t);return t}function Ut(r,e){return r.x-e.x}function Ft(r,e){var t=Nt(r,e);if(!t)return e;var i=Te(t,r);return C(i,i.next),C(t,t.next)}function Nt(r,e){var t=e,i=r.x,n=r.y,a=-1/0,o;do{if(n<=t.y&&n>=t.next.y&&t.next.y!==t.y){var l=t.x+(n-t.y)*(t.next.x-t.x)/(t.next.y-t.y);if(l<=i&&l>a&&(a=l,o=t.x<t.next.x?t:t.next,l===i))return o}t=t.next}while(t!==e);if(!o)return null;var c=o,s=o.x,d=o.y,m=1/0,u;t=o;do i>=t.x&&t.x>=s&&i!==t.x&&R(n<d?i:a,n,s,d,n<d?a:i,n,t.x,t.y)&&(u=Math.abs(n-t.y)/(i-t.x),N(t,r)&&(u<m||u===m&&(t.x>o.x||t.x===o.x&&Vt(o,t)))&&(o=t,m=u)),t=t.next;while(t!==c);return o}function Vt(r,e){return w(r.prev,r,e.prev)<0&&w(e.next,r,r.next)<0}function kt(r,e,t,i){var n=r;do n.z===0&&(n.z=Q(n.x,n.y,e,t,i)),n.prevZ=n.prev,n.nextZ=n.next,n=n.next;while(n!==r);n.prevZ.nextZ=null,n.prevZ=null,$t(n)}function $t(r){var e,t,i,n,a,o,l,c,s=1;do{for(t=r,r=null,a=null,o=0;t;){for(o++,i=t,l=0,e=0;e<s&&(l++,i=i.nextZ,!!i);e++);for(c=s;l>0||c>0&&i;)l!==0&&(c===0||!i||t.z<=i.z)?(n=t,t=t.nextZ,l--):(n=i,i=i.nextZ,c--),a?a.nextZ=n:r=n,n.prevZ=a,a=n;t=i}a.nextZ=null,s*=2}while(o>1);return r}function Q(r,e,t,i,n){return r=(r-t)*n|0,e=(e-i)*n|0,r=(r|r<<8)&16711935,r=(r|r<<4)&252645135,r=(r|r<<2)&858993459,r=(r|r<<1)&1431655765,e=(e|e<<8)&16711935,e=(e|e<<4)&252645135,e=(e|e<<2)&858993459,e=(e|e<<1)&1431655765,r|e<<1}function Et(r){var e=r,t=r;do(e.x<t.x||e.x===t.x&&e.y<t.y)&&(t=e),e=e.next;while(e!==r);return t}function R(r,e,t,i,n,a,o,l){return(n-o)*(e-l)>=(r-o)*(a-l)&&(r-o)*(i-l)>=(t-o)*(e-l)&&(t-o)*(a-l)>=(n-o)*(i-l)}function Bt(r,e){return r.next.i!==e.i&&r.prev.i!==e.i&&!Ht(r,e)&&(N(r,e)&&N(e,r)&&Gt(r,e)&&(w(r.prev,r,e.prev)||w(r,e.prev,e))||Z(r,e)&&w(r.prev,r,r.next)>0&&w(e.prev,e,e.next)>0)}function w(r,e,t){return(e.y-r.y)*(t.x-e.x)-(e.x-r.x)*(t.y-e.y)}function Z(r,e){return r.x===e.x&&r.y===e.y}function Se(r,e,t,i){var n=$(w(r,e,t)),a=$(w(r,e,i)),o=$(w(t,i,r)),l=$(w(t,i,e));return!!(n!==a&&o!==l||n===0&&k(r,t,e)||a===0&&k(r,i,e)||o===0&&k(t,r,i)||l===0&&k(t,e,i))}function k(r,e,t){return e.x<=Math.max(r.x,t.x)&&e.x>=Math.min(r.x,t.x)&&e.y<=Math.max(r.y,t.y)&&e.y>=Math.min(r.y,t.y)}function $(r){return r>0?1:r<0?-1:0}function Ht(r,e){var t=r;do{if(t.i!==r.i&&t.next.i!==r.i&&t.i!==e.i&&t.next.i!==e.i&&Se(t,t.next,r,e))return!0;t=t.next}while(t!==r);return!1}function N(r,e){return w(r.prev,r,r.next)<0?w(r,e,r.next)>=0&&w(r,r.prev,e)>=0:w(r,e,r.prev)<0||w(r,r.next,e)<0}function Gt(r,e){var t=r,i=!1,n=(r.x+e.x)/2,a=(r.y+e.y)/2;do t.y>a!=t.next.y>a&&t.next.y!==t.y&&n<(t.next.x-t.x)*(a-t.y)/(t.next.y-t.y)+t.x&&(i=!i),t=t.next;while(t!==r);return i}function Te(r,e){var t=new ee(r.i,r.x,r.y),i=new ee(e.i,e.x,e.y),n=r.next,a=e.prev;return r.next=e,e.prev=r,t.next=n,n.prev=t,i.next=t,t.prev=i,a.next=i,i.prev=a,i}function _e(r,e,t,i){var n=new ee(r,e,t);return i?(n.next=i.next,n.prev=i,i.next.prev=n,i.next=n):(n.prev=n,n.next=n),n}function V(r){r.next.prev=r.prev,r.prev.next=r.next,r.prevZ&&(r.prevZ.nextZ=r.nextZ),r.nextZ&&(r.nextZ.prevZ=r.prevZ)}function ee(r,e,t){this.i=r,this.x=e,this.y=t,this.prev=null,this.next=null,this.z=0,this.prevZ=null,this.nextZ=null,this.steiner=!1}L.deviation=function(r,e,t,i){var n=e&&e.length,a=n?e[0]*t:r.length,o=Math.abs(te(r,0,a,t));if(n)for(var l=0,c=e.length;l<c;l++){var s=e[l]*t,d=l<c-1?e[l+1]*t:r.length;o-=Math.abs(te(r,s,d,t))}var m=0;for(l=0;l<i.length;l+=3){var u=i[l]*t,f=i[l+1]*t,h=i[l+2]*t;m+=Math.abs((r[u]-r[h])*(r[f+1]-r[u+1])-(r[u]-r[f])*(r[h+1]-r[u+1]))}return o===0&&m===0?0:Math.abs((m-o)/o)};function te(r,e,t,i){for(var n=0,a=e,o=t-i;a<t;a+=i)n+=(r[o]-r[a])*(r[a+1]+r[o+1]),o=a;return n}L.flatten=function(r){for(var e=r[0][0].length,t={vertices:[],holes:[],dimensions:e},i=0,n=0;n<r.length;n++){for(var a=0;a<r[n].length;a++)for(var o=0;o<e;o++)t.vertices.push(r[n][a][o]);n>0&&(i+=r[n-1].length,t.holes.push(i))}return t};var Lt=se.exports;const Zt=At(Lt);function jt(r,e){var t=r%e,i=Math.floor(r/e);return[t,i]}function Wt(r,e,t){for(var i=0,n=0;i<r.length;i+=e,n++)r.set(t([r[i],r[i+1]],n),i);return r}function Yt(r,e,t,i){var n=t.x-i.x,a=r.x-e.x,o=t.y-i.y,l=r.y-e.y,c=a*o-l*n;if(c==0)throw new Error("Number of intersection points is zero or infinity.");var s=r.x*e.y-r.y*e.x,d=t.x*i.y-t.y*i.x,m=(s*n-a*d)/c,u=(s*o-l*d)/c,f={x:m,y:u};return f}function Xt(r){for(var e=0,t=0,i=r.length;t<i;t++){var n=r[t].x,a=r[t==r.length-1?0:t+1].y,o=r[t==r.length-1?0:t+1].x,l=r[t].y;e+=n*a*.5,e-=o*l*.5}return Math.abs(e)}function Kt([r,e,t]){return Math.abs((r.x*(e.y-t.y)+e.x*(t.y-r.y)+t.x*(r.y-e.y))/2)}function qt(r,e=8){const t=r.slice();let i=0;for(;t.length>e&&i<1e3;){i++;let n=1/0,a=null;for(let o=0;o<=t.length-1;o++){const l=t.length,c=[o,(o+1)%l,(o+2)%l,(o+3)%l],s=t[c[0]],d=t[c[1]],m=t[c[2]],u=t[c[3]];try{const f=Yt(s,d,m,u),h=Kt([f,d,m]);h<n&&(n=h,a={point:f,area:h,indicesToRemove:[c[1],c[2]]})}catch(f){console.log(f)}}if(a){const o=a.indicesToRemove[0],l=a.indicesToRemove[1];l>o?(t.splice(l,1),t.splice(o,1)):(t.splice(o,1),t.splice(l,1)),t.splice(Math.min(o,l),0,a.point)}}return t}var re;(r=>{function e(n){let a=n.slice();return a.sort(r.POINT_COMPARATOR),r.makeHullPresorted(a)}r.makeHull=e;function t(n){if(n.length<=1)return n.slice();let a=[];for(let l=0;l<n.length;l++){const c=n[l];for(;a.length>=2;){const s=a[a.length-1],d=a[a.length-2];if((s.x-d.x)*(c.y-d.y)>=(s.y-d.y)*(c.x-d.x))a.pop();else break}a.push(c)}a.pop();let o=[];for(let l=n.length-1;l>=0;l--){const c=n[l];for(;o.length>=2;){const s=o[o.length-1],d=o[o.length-2];if((s.x-d.x)*(c.y-d.y)>=(s.y-d.y)*(c.x-d.x))o.pop();else break}o.push(c)}return o.pop(),a.length==1&&o.length==1&&a[0].x==o[0].x&&a[0].y==o[0].y?a:a.concat(o)}r.makeHullPresorted=t;function i(n,a){return n.x<a.x?-1:n.x>a.x?1:n.y<a.y?-1:n.y>a.y?1:0}r.POINT_COMPARATOR=i})(re||(re={}));function Jt(r,e){const t=new Float32Array(r);for(let i=0;i<r;i++)t[i*3]=e[0],t[i*3+1]=e[1],t[i*3+2]=e[2];return t}function Qt(r,e,t=()=>Math.random()){const i=e+1,n=new Float32Array(r.length/e*i);for(let a=0;a<r.length;a+=e){let o=a/e*i;n[o]=r[a],n[o+1]=r[a+1],n[o+2]=t(o)}return n}function er(r){const e=new Float32Array(r.length*2);for(let t=0;t<r.length;t++)e[t*2]=r[t].x,e[t*2+1]=r[t].y;return e}function tr(r,e,t){const i=[],n=r%(e*4)/4,a=Math.floor(r/(e*4)),o=a-1,l=a+1,c=n-1,s=n+1;return o>=0?i.push(o*e+n):i.push(null),l<t?i.push(l*e+n):i.push(null),c>=0?i.push(a*e+c):i.push(null),s<e?i.push(a*e+s):i.push(null),i}const rr=r=>(...e)=>e[3]/255>0,ir={threshold:.01,slices:[1,1],indices:[0,0],scale:1,filter:rr};class nr{constructor(e,t,i){y(this,"points",[]),y(this,"data",{areaReduction:0}),y(this,"debug",!0),y(this,"index"),y(this,"positions"),y(this,"uv"),y(this,"defaultSettings",ir),y(this,"settings"),this.vertices=i,this.settings={...this.defaultSettings,...t};const{slices:n}=this.settings,a=ar("bvc-image",e.width,e.height);this.points=this.getPoints(e,a);let o=re.makeHull(this.points);const l=qt(o,i),c=l.map(u=>{let f=or(u,[e.width,e.height],n);return f.y=-1*f.y,f}),{scale:s}=this.settings;this.data.areaReduction=1-Xt(l)/(e.width/n[0]*(e.height/n[1]))*s;const d=er(c),m=Zt(d,null,2);this.positions=Qt(d,2,()=>0),this.index=Uint32Array.from(m),this.uv=Wt(d.slice(0),2,u=>{let f=u[0]+.5;f=f/this.settings.slices[0]+1/this.settings.slices[0]*this.settings.indices[0];let h=u[1]+.5;return h=h/this.settings.slices[1]+1-1/this.settings.slices[1]*(this.settings.indices[1]+1),[f,h]})}getImageData(e,t){const i=t.getContext("2d");i.drawImage(e,0,0);const[n,a]=this.settings.indices,[o,l]=this.settings.slices,c=t.width/o,s=t.height/l;return i.getImageData(c*n,s*a,c,s)}getPoints(e,t){const i=this.getImageData(e,t),n=i.data,a=[],o=this.settings.filter(this.settings.threshold),l=c=>c!==null&&o(n[c*4],n[c*4+1],n[c*4+2],n[c*4+3]);for(let c=0;c<n.length;c+=4)if(o(n[c+0],n[c+1],n[c+2],n[c+3])){if(tr(c,t.width,t.height).every(l))continue;const[s,d]=jt(c/4,i.width);a.push({x:s,y:d})}return a}}const ar=(r="debug-canvas",e,t)=>{const i=document.querySelector(`#${r}`)||document.createElement("canvas");return i.id=r,i.width=e,i.height=t,i.id=r,i},or=(r,e,t)=>({x:(r.x-e[0]/(2*t[0]))/(e[0]/t[0]),y:(r.y-e[1]/(2*t[1]))/(e[1]/t[1])}),sr={threshold:.01,slices:[1,1],indices:[1,1]};class lr extends ie{constructor(e,t=8,i=.01,n=[1,1],a=[0,0]){super(),y(this,"image"),y(this,"vertices",8),y(this,"settings",sr),this.vertices=t,this.settings={...this.settings,threshold:i,slices:n,indices:a},this.image="image"in e?e.image:e,this.build()}build(){const e=new nr(this.image,this.settings,this.vertices),t=e.positions.length,i=new O(e.index,1),n=new O(e.positions,3),a=new O(Jt(t,[0,0,1]),3),o=new O(e.uv,2);this.userData.reduction=e.data.areaReduction,this.setIndex(i),this.setAttribute("position",n),this.setAttribute("normal",a),this.setAttribute("uv",o)}}const Dr=()=>new cr;class cr{constructor(){y(this,"animations"),this.animations=[]}add(e,t,i){const n={name:"",imageUrl:e};return Array.isArray(i)?n.multiAnimations=i:n.name=i,t.type=="rowColumn"&&(n.auto={type:"rowColumn",width:t.width,height:t.height}),t.type=="frameSize"&&(n.auto={type:"frameSize",width:t.width,height:t.height}),this.animations.push(n),this}async build(e={}){const t=new Pe,i={frames:[],animations:{},sheetSize:[0,0],animationLengths:[]};let n=new ze;const a=[];let o=0,l=0;for(const p of this.animations){const v=await t.loadAsync(p.imageUrl),b=v.width,_=v.height;o=Math.max(o,b),l+=_,a.push({img:v,w:b,h:_})}const c=document.createElement("canvas");c.width=o,c.height=l;const s=c.getContext("2d");let d=0;for(const{img:p,h:v}of a)s?.drawImage(p,0,d,p.width,p.height),d+=v;n=new ue(c),n.needsUpdate=!0;let m=0,u=0,f=0,h=64;for(const p of this.animations){const v=a[m];let b=0;if(p.auto){let _=0,g=0;p.auto.type=="frameSize"&&(g=v.w/p.auto.width,_=v.h/p.auto.height),p.auto.type=="rowColumn"&&(g=p.auto.width,_=p.auto.height);const x=v.w/g,P=v.h/_;b=_*g,p.multiAnimations||(i.animations[p.name]=[]);const z=new Map;for(let S=0;S<_;S++){f+=P;for(let T=0;T<g;T++){if(i.frames.push([v.w/g*T/o,1-f/l,x/o,P/l]),p.multiAnimations){const Ie=S*g+T;z.set(Ie,u)}else i.animations[p.name].push([u,1]);u++}}if(p.multiAnimations)for(const S of p.multiAnimations){i.animations[S.name]=[],i.animationLengths.push(S.frameRange[1]-S.frameRange[0]+1);for(let T=S.frameRange[0];T<=S.frameRange[1];T++)i.animations[S.name].push([z.get(T),1])}else i.animationLengths.push(b)}m++}if(n.matrixAutoUpdate=!1,n.generateMipmaps=!1,n.premultiplyAlpha=!1,n.wrapS=n.wrapT=ne,n.magFilter=n.minFilter=I,n.colorSpace=fe,i.sheetSize=[o,l],e.makeSlimGeometry){const p=document.createElement("canvas");p.width=h,p.height=h;const v=p.getContext("2d"),b=o/h,_=l/h;for(let P=0;P<b;P++)for(let z=0;z<_;z++){const S=P*h,T=z*h;v?.drawImage(c,S,T,h,h,0,0,h,h)}const g=new ue(p);g.magFilter=n.minFilter=I,g.colorSpace=fe;const x=new lr(g,e.slimOptions?e.slimOptions.vertices:8,e.slimOptions?e.slimOptions.alphaThreshold:0);return{spritesheet:i,texture:n,geometry:x}}return{spritesheet:i,texture:n}}}export{Dr as J,vr as S,wr as X,_r as Y,yr as a,br as b,xr as f,gr as v};
