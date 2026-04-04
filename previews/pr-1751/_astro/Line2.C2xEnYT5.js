import{eG as X,b2 as I,ba as P,ad as _,fR as K,B as C,e as N,h as y,aH as Y,g5 as L,fV as V,j as Z,g6 as B,$ as ee,V as z,eQ as te,g as ne,a6 as ie}from"./T.CIQBugds.js";const j=new C,E=new y;class q extends X{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry";const e=[-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],n=[-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],i=[0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5];this.setIndex(i),this.setAttribute("position",new I(e,3)),this.setAttribute("uv",new I(n,2))}applyMatrix4(e){const n=this.attributes.instanceStart,i=this.attributes.instanceEnd;return n!==void 0&&(n.applyMatrix4(e),i.applyMatrix4(e),n.needsUpdate=!0),this.boundingBox!==null&&this.computeBoundingBox(),this.boundingSphere!==null&&this.computeBoundingSphere(),this}setPositions(e){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const i=new P(n,6,1);return this.setAttribute("instanceStart",new _(i,3,0)),this.setAttribute("instanceEnd",new _(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let n;e instanceof Float32Array?n=e:Array.isArray(e)&&(n=new Float32Array(e));const i=new P(n,6,1);return this.setAttribute("instanceColorStart",new _(i,3,0)),this.setAttribute("instanceColorEnd",new _(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new K(e.geometry)),this}fromLineSegments(e){const n=e.geometry;return this.setPositions(n.attributes.position.array),this}computeBoundingBox(){this.boundingBox===null&&(this.boundingBox=new C);const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;e!==void 0&&n!==void 0&&(this.boundingBox.setFromBufferAttribute(e),j.setFromBufferAttribute(n),this.boundingBox.union(j))}computeBoundingSphere(){this.boundingSphere===null&&(this.boundingSphere=new N),this.boundingBox===null&&this.computeBoundingBox();const e=this.attributes.instanceStart,n=this.attributes.instanceEnd;if(e!==void 0&&n!==void 0){const i=this.boundingSphere.center;this.boundingBox.getCenter(i);let t=0;for(let o=0,c=e.count;o<c;o++)E.fromBufferAttribute(e,o),t=Math.max(t,i.distanceToSquared(E)),E.fromBufferAttribute(n,o),t=Math.max(t,i.distanceToSquared(E));this.boundingSphere.radius=Math.sqrt(t),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}B.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new Z(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}};L.line={uniforms:V.merge([B.common,B.fog,B.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			float alpha = opacity;

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class k extends Y{constructor(e){super({type:"LineMaterial",uniforms:V.clone(L.line.uniforms),vertexShader:L.line.vertexShader,fragmentShader:L.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){e===!0?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){e===!0!==this.dashed&&(this.needsUpdate=!0),e===!0?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(e===!0!==this.alphaToCoverage&&(this.needsUpdate=!0),e===!0?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}const M=new z,F=new y,H=new y,r=new z,a=new z,m=new z,D=new y,T=new ne,l=new te,R=new y,U=new C,A=new N,v=new z;let g,x;function G(d,e,n){return v.set(0,0,-e,1).applyMatrix4(d.projectionMatrix),v.multiplyScalar(1/v.w),v.x=x/n.width,v.y=x/n.height,v.applyMatrix4(d.projectionMatrixInverse),v.multiplyScalar(1/v.w),Math.abs(Math.max(v.x,v.y))}function se(d,e){const n=d.matrixWorld,i=d.geometry,t=i.attributes.instanceStart,o=i.attributes.instanceEnd,c=Math.min(i.instanceCount,t.count);for(let s=0,f=c;s<f;s++){l.start.fromBufferAttribute(t,s),l.end.fromBufferAttribute(o,s),l.applyMatrix4(n);const p=new y,h=new y;g.distanceSqToSegment(l.start,l.end,h,p),h.distanceTo(p)<x*.5&&e.push({point:h,pointOnLine:p,distance:g.origin.distanceTo(h),object:d,face:null,faceIndex:s,uv:null,uv1:null})}}function oe(d,e,n){const i=e.projectionMatrix,o=d.material.resolution,c=d.matrixWorld,s=d.geometry,f=s.attributes.instanceStart,p=s.attributes.instanceEnd,h=Math.min(s.instanceCount,f.count),u=-e.near;g.at(1,m),m.w=1,m.applyMatrix4(e.matrixWorldInverse),m.applyMatrix4(i),m.multiplyScalar(1/m.w),m.x*=o.x/2,m.y*=o.y/2,m.z=0,D.copy(m),T.multiplyMatrices(e.matrixWorldInverse,c);for(let w=0,$=h;w<$;w++){if(r.fromBufferAttribute(f,w),a.fromBufferAttribute(p,w),r.w=1,a.w=1,r.applyMatrix4(T),a.applyMatrix4(T),r.z>u&&a.z>u)continue;if(r.z>u){const b=r.z-a.z,S=(r.z-u)/b;r.lerp(a,S)}else if(a.z>u){const b=a.z-r.z,S=(a.z-u)/b;a.lerp(r,S)}r.applyMatrix4(i),a.applyMatrix4(i),r.multiplyScalar(1/r.w),a.multiplyScalar(1/a.w),r.x*=o.x/2,r.y*=o.y/2,a.x*=o.x/2,a.y*=o.y/2,l.start.copy(r),l.start.z=0,l.end.copy(a),l.end.z=0;const O=l.closestPointToPointParameter(D,!0);l.at(O,R);const W=ie.lerp(r.z,a.z,O),J=W>=-1&&W<=1,Q=D.distanceTo(R)<x*.5;if(J&&Q){l.start.fromBufferAttribute(f,w),l.end.fromBufferAttribute(p,w),l.start.applyMatrix4(c),l.end.applyMatrix4(c);const b=new y,S=new y;g.distanceSqToSegment(l.start,l.end,S,b),n.push({point:S,pointOnLine:b,distance:g.origin.distanceTo(S),object:d,face:null,faceIndex:w,uv:null,uv1:null})}}}class re extends ee{constructor(e=new q,n=new k({color:Math.random()*16777215})){super(e,n),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){const e=this.geometry,n=e.attributes.instanceStart,i=e.attributes.instanceEnd,t=new Float32Array(2*n.count);for(let c=0,s=0,f=n.count;c<f;c++,s+=2)F.fromBufferAttribute(n,c),H.fromBufferAttribute(i,c),t[s]=s===0?0:t[s-1],t[s+1]=t[s]+F.distanceTo(H);const o=new P(t,2,1);return e.setAttribute("instanceDistanceStart",new _(o,1,0)),e.setAttribute("instanceDistanceEnd",new _(o,1,1)),this}raycast(e,n){const i=this.material.worldUnits,t=e.camera;t===null&&!i&&console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');const o=e.params.Line2!==void 0&&e.params.Line2.threshold||0;g=e.ray;const c=this.matrixWorld,s=this.geometry,f=this.material;x=f.linewidth+o,s.boundingSphere===null&&s.computeBoundingSphere(),A.copy(s.boundingSphere).applyMatrix4(c);let p;if(i)p=x*.5;else{const u=Math.max(t.near,A.distanceToPoint(g.origin));p=G(t,u,f.resolution)}if(A.radius+=p,g.intersectsSphere(A)===!1)return;s.boundingBox===null&&s.computeBoundingBox(),U.copy(s.boundingBox).applyMatrix4(c);let h;if(i)h=x*.5;else{const u=Math.max(t.near,U.distanceToPoint(g.origin));h=G(t,u,f.resolution)}U.expandByScalar(h),g.intersectsBox(U)!==!1&&(i?se(this,n):oe(this,t,n))}onBeforeRender(e){const n=this.material.uniforms;n&&n.resolution&&(e.getViewport(M),this.material.uniforms.resolution.value.set(M.z,M.w))}}class ae extends q{constructor(){super(),this.isLineGeometry=!0,this.type="LineGeometry"}setPositions(e){const n=e.length-3,i=new Float32Array(2*n);for(let t=0;t<n;t+=3)i[2*t]=e[t],i[2*t+1]=e[t+1],i[2*t+2]=e[t+2],i[2*t+3]=e[t+3],i[2*t+4]=e[t+4],i[2*t+5]=e[t+5];return super.setPositions(i),this}setColors(e){const n=e.length-3,i=new Float32Array(2*n);for(let t=0;t<n;t+=3)i[2*t]=e[t],i[2*t+1]=e[t+1],i[2*t+2]=e[t+2],i[2*t+3]=e[t+3],i[2*t+4]=e[t+4],i[2*t+5]=e[t+5];return super.setColors(i),this}setFromPoints(e){const n=e.length-1,i=new Float32Array(6*n);for(let t=0;t<n;t++)i[6*t]=e[t].x,i[6*t+1]=e[t].y,i[6*t+2]=e[t].z||0,i[6*t+3]=e[t+1].x,i[6*t+4]=e[t+1].y,i[6*t+5]=e[t+1].z||0;return super.setPositions(i),this}fromLine(e){const n=e.geometry;return this.setPositions(n.attributes.position.array),this}}class ce extends re{constructor(e=new ae,n=new k({color:Math.random()*16777215})){super(e,n),this.isLine2=!0,this.type="Line2"}}export{ae as L,k as a,ce as b};
