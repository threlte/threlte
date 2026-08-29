import"./disclose-version.DsnmJJEf.js";import{Z as T,p as B,g as S,d as X,b as R,f as x,n as b,s as j,a as q}from"./runtime.Cq5xh0TU.js";import{f as Z,a as F,c as J}from"./template.L6xDPO6U.js";import{s as G}from"./snippet.B1WTn4og.js";import{i as K}from"./if.eGY2C9_P.js";import{p as N}from"./props.D2nmUwxA.js";/* empty css                                                      */import{r as f,q as M,g8 as U,n as Q,a4 as Y,aj as $,V as ee,i as E,o as u}from"./observe.svelte.C0rBo_1K.js";import{u as ie}from"./useThrelte.Wdl2QUb4.js";import{u as te}from"./useTask.svelte.bJHaryD1.js";import{i as ae}from"./injectPlugin.Ckfbmr_3.js";const O=new M;class C{constructor(e){e=e||{},this.zNear=e.webGL===!0?-1:0,this.vertices={near:[new f,new f,new f,new f],far:[new f,new f,new f,new f]},e.projectionMatrix!==void 0&&this.setFromProjectionMatrix(e.projectionMatrix,e.maxFar||1e4)}setFromProjectionMatrix(e,i){const t=this.zNear,o=e.elements[11]===0;return O.copy(e).invert(),this.vertices.near[0].set(1,1,t),this.vertices.near[1].set(1,-1,t),this.vertices.near[2].set(-1,-1,t),this.vertices.near[3].set(-1,1,t),this.vertices.near.forEach(function(a){a.applyMatrix4(O)}),this.vertices.far[0].set(1,1,1),this.vertices.far[1].set(1,-1,1),this.vertices.far[2].set(-1,-1,1),this.vertices.far[3].set(-1,1,1),this.vertices.far.forEach(function(a){a.applyMatrix4(O);const r=Math.abs(a.z);o?a.z*=Math.min(i/r,1):a.multiplyScalar(Math.min(i/r,1))}),this.vertices}split(e,i){for(;e.length>i.length;)i.push(new C);i.length=e.length;for(let t=0;t<e.length;t++){const o=i[t];if(t===0)for(let a=0;a<4;a++)o.vertices.near[a].copy(this.vertices.near[a]);else for(let a=0;a<4;a++)o.vertices.near[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],e[t-1]);if(t===e.length-1)for(let a=0;a<4;a++)o.vertices.far[a].copy(this.vertices.far[a]);else for(let a=0;a<4;a++)o.vertices.far[a].lerpVectors(this.vertices.near[a],this.vertices.far[a],e[t])}}toSpace(e,i){for(let t=0;t<4;t++)i.vertices.near[t].copy(this.vertices.near[t]).applyMatrix4(e),i.vertices.far[t].copy(this.vertices.far[t]).applyMatrix4(e)}}const k={lights_fragment_begin:`
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );

vec3 geometryClearcoatNormal = vec3( 0.0 );

#ifdef USE_CLEARCOAT

	geometryClearcoatNormal = clearcoatNormal;

#endif

#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		// Iridescence F0 approximation
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif

IncidentLight directLight;

#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )

	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {

		pointLight = pointLights[ i ];

		getPointLightInfo( pointLight, geometryPosition, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowIntensity, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;

		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )

	SpotLight spotLight;
 	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;

	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {

		spotLight = spotLights[ i ];

		getSpotLightInfo( spotLight, geometryPosition, directLight );

  		// spot lights are ordered [shadows with maps, shadows without maps, maps without shadows, none]
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowIntensity, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;

		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && defined( USE_CSM ) && defined( CSM_CASCADES )

	DirectionalLight directionalLight;
	float linearDepth = (vViewPosition.z) / (shadowFar - cameraNear);
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#if defined( USE_SHADOWMAP ) && defined( CSM_FADE )
		vec2 cascade;
		float cascadeCenter;
		float closestEdge;
		float margin;
		float csmx;
		float csmy;

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
				// NOTE: Depth gets larger away from the camera.
				// cascade.x is closer, cascade.y is further
				cascade = CSM_cascades[ i ];
				cascadeCenter = ( cascade.x + cascade.y ) / 2.0;
				closestEdge = linearDepth < cascadeCenter ? cascade.x : cascade.y;
				margin = 0.25 * pow( closestEdge, 2.0 );
				csmx = cascade.x - margin / 2.0;
				csmy = cascade.y + margin / 2.0;
				if( linearDepth >= csmx && ( linearDepth < csmy || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 ) ) {

					float dist = min( linearDepth - csmx, csmy - linearDepth );
					float ratio = clamp( dist / margin, 0.0, 1.0 );

					vec3 prevColor = directLight.color;
					directionalLightShadow = directionalLightShadows[ i ];
					directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

					bool shouldFadeLastCascade = UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth > cascadeCenter;
					directLight.color = mix( prevColor, directLight.color, shouldFadeLastCascade ? ratio : 1.0 );

					ReflectedLight prevLight = reflectedLight;
					RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

					bool shouldBlend = UNROLLED_LOOP_INDEX != CSM_CASCADES - 1 || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1 && linearDepth < cascadeCenter;
					float blendRatio = shouldBlend ? ratio : 1.0;

					reflectedLight.directDiffuse = mix( prevLight.directDiffuse, reflectedLight.directDiffuse, blendRatio );
					reflectedLight.directSpecular = mix( prevLight.directSpecular, reflectedLight.directSpecular, blendRatio );
					reflectedLight.indirectDiffuse = mix( prevLight.indirectDiffuse, reflectedLight.indirectDiffuse, blendRatio );
					reflectedLight.indirectSpecular = mix( prevLight.indirectSpecular, reflectedLight.indirectSpecular, blendRatio );

				}
			#endif

		}
		#pragma unroll_loop_end
	#elif defined (USE_SHADOWMAP)

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];
			getDirectionalLightInfo( directionalLight, directLight );

			#if ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )

				directionalLightShadow = directionalLightShadows[ i ];
				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y) directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;

				if(linearDepth >= CSM_cascades[UNROLLED_LOOP_INDEX].x && (linearDepth < CSM_cascades[UNROLLED_LOOP_INDEX].y || UNROLLED_LOOP_INDEX == CSM_CASCADES - 1)) RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

			#endif

		}
		#pragma unroll_loop_end

	#elif ( NUM_DIR_LIGHT_SHADOWS > 0 )
		// note: no loop here - all CSM lights are in fact one light only
		getDirectionalLightInfo( directionalLights[0], directLight );
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	#endif

	#if ( NUM_DIR_LIGHTS > NUM_DIR_LIGHT_SHADOWS)
		// compute the lights not casting shadows (if any)

		#pragma unroll_loop_start
		for ( int i = NUM_DIR_LIGHT_SHADOWS; i < NUM_DIR_LIGHTS; i ++ ) {

			directionalLight = directionalLights[ i ];

			getDirectionalLightInfo( directionalLight, directLight );

			RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

		}
		#pragma unroll_loop_end

	#endif

#endif


#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct ) && !defined( USE_CSM ) && !defined( CSM_CASCADES )

	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {

		directionalLight = directionalLights[ i ];

		getDirectionalLightInfo( directionalLight, directLight );

		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowIntensity, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif

		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )

	RectAreaLight rectAreaLight;

	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {

		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );

	}
	#pragma unroll_loop_end

#endif

#if defined( RE_IndirectDiffuse )

	vec3 iblIrradiance = vec3( 0.0 );

	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );

	#if defined( USE_LIGHT_PROBES )

		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );

	#endif

	#if ( NUM_HEMI_LIGHTS > 0 )

		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {

			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );

		}
		#pragma unroll_loop_end

	#endif

#endif

#if defined( RE_IndirectSpecular )

	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );

#endif
`,lights_pars_begin:`
#if defined( USE_CSM ) && defined( CSM_CASCADES )
uniform vec2 CSM_cascades[CSM_CASCADES];
uniform float cameraNear;
uniform float shadowFar;
#endif
	`+U.lights_pars_begin},W=new M,v=new C({webGL:!0}),m=new f,D=new $,y=[],A=[],P=new M,z=new M,re=new f(0,1,0);class oe{constructor(e){this.camera=e.camera,this.parent=e.parent,this.cascades=e.cascades||3,this.maxFar=e.maxFar||1e5,this.mode=e.mode||"practical",this.shadowMapSize=e.shadowMapSize||2048,this.shadowBias=e.shadowBias||1e-6,this.lightDirection=e.lightDirection||new f(1,-1,1).normalize(),this.lightIntensity=e.lightIntensity||3,this.lightNear=e.lightNear||1,this.lightFar=e.lightFar||2e3,this.lightMargin=e.lightMargin||200,this.customSplitsCallback=e.customSplitsCallback,this.fade=!1,this.mainFrustum=new C({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let e=0;e<this.cascades;e++){const i=new Q(16777215,this.lightIntensity);i.castShadow=!0,i.shadow.mapSize.width=this.shadowMapSize,i.shadow.mapSize.height=this.shadowMapSize,i.shadow.camera.near=this.lightNear,i.shadow.camera.far=this.lightFar,i.shadow.bias=this.shadowBias,this.parent.add(i),this.parent.add(i.target),this.lights.push(i)}}_initCascades(){const e=this.camera;e.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(e.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){const e=this.frustums;for(let i=0;i<e.length;i++){const o=this.lights[i].shadow.camera,a=this.frustums[i],r=a.vertices.near,c=a.vertices.far,s=c[0];let h;s.distanceTo(c[2])>s.distanceTo(r[2])?h=c[2]:h=r[2];let n=s.distanceTo(h);if(this.fade){const _=this.camera,p=Math.max(_.far,this.maxFar),w=a.vertices.far[0].z/(p-_.near),I=.25*Math.pow(w,2)*(p-_.near);n+=I}o.left=-n/2,o.right=n/2,o.top=n/2,o.bottom=-n/2,o.updateProjectionMatrix()}}_getBreaks(){const e=this.camera,i=Math.min(e.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":t(this.cascades,e.near,i,this.breaks);break;case"logarithmic":o(this.cascades,e.near,i,this.breaks);break;case"practical":a(this.cascades,e.near,i,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,e.near,i,this.breaks);break}function t(r,c,s,h){for(let n=1;n<r;n++)h.push((c+(s-c)*n/r)/s);h.push(1)}function o(r,c,s,h){for(let n=1;n<r;n++)h.push(c*(s/c)**(n/r)/s);h.push(1)}function a(r,c,s,h,n){y.length=0,A.length=0,o(r,c,s,A),t(r,c,s,y);for(let _=1;_<r;_++)n.push(Y.lerp(y[_-1],A[_-1],h));n.push(1)}}update(){const e=this.camera,i=this.frustums;P.lookAt(new f,this.lightDirection,re),z.copy(P).invert();for(let t=0;t<i.length;t++){const o=this.lights[t],a=o.shadow.camera,r=(a.right-a.left)/this.shadowMapSize,c=(a.top-a.bottom)/this.shadowMapSize;W.multiplyMatrices(z,e.matrixWorld),i[t].toSpace(W,v);const s=v.vertices.near,h=v.vertices.far;D.makeEmpty();for(let n=0;n<4;n++)D.expandByPoint(s[n]),D.expandByPoint(h[n]);D.getCenter(m),m.z=D.max.z+this.lightMargin,m.x=Math.floor(m.x/r)*r,m.y=Math.floor(m.y/c)*c,m.applyMatrix4(P),o.position.copy(m),o.target.position.copy(m),o.target.position.x+=this.lightDirection.x,o.target.position.y+=this.lightDirection.y,o.target.position.z+=this.lightDirection.z}}_injectInclude(){U.lights_fragment_begin=k.lights_fragment_begin,U.lights_pars_begin=k.lights_pars_begin}setupMaterial(e){e.defines=e.defines||{},e.defines.USE_CSM=1,e.defines.CSM_CASCADES=this.cascades,this.fade&&(e.defines.CSM_FADE="");const i=[],t=this,o=this.shaders;e.onBeforeCompile=function(a){const r=Math.min(t.camera.far,t.maxFar);t._getExtendedBreaks(i),a.uniforms.CSM_cascades={value:i},a.uniforms.cameraNear={value:t.camera.near},a.uniforms.shadowFar={value:r},o.set(e,a)},o.set(e,null)}_updateUniforms(){const e=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(t,o){if(t!==null){const a=t.uniforms;this._getExtendedBreaks(a.CSM_cascades.value),a.cameraNear.value=this.camera.near,a.shadowFar.value=e}!this.fade&&"CSM_FADE"in o.defines?(delete o.defines.CSM_FADE,o.needsUpdate=!0):this.fade&&!("CSM_FADE"in o.defines)&&(o.defines.CSM_FADE="",o.needsUpdate=!0)},this)}_getExtendedBreaks(e){for(;e.length<this.breaks.length;)e.push(new ee);e.length=this.breaks.length;for(let i=0;i<this.cascades;i++){const t=this.breaks[i],o=this.breaks[i-1]||0;e[i].x=o,e[i].y=t}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let e=0;e<this.lights.length;e++)this.parent.remove(this.lights[e].target),this.parent.remove(this.lights[e])}dispose(){const e=this.shaders;e.forEach(function(i,t){delete t.onBeforeCompile,delete t.defines.USE_CSM,delete t.defines.CSM_CASCADES,delete t.defines.CSM_FADE,i!==null&&(delete i.uniforms.CSM_cascades,delete i.uniforms.cameraNear,delete i.uniforms.shadowFar),t.needsUpdate=!0}),e.clear()}}const se=()=>{let L;const e=new Set,i=r=>E(r,"MeshStandardMaterial")||E(r,"MeshPhongMaterial"),t=r=>{e.has(r)||(e.add(r),L?.(r))},o=r=>{i(r)?t(r):E(r,"Mesh")&&(Array.isArray(r.material)?r.material.forEach(c=>{i(c)&&t(c)}):i(r.material)&&t(r.material))},a=r=>{L=r};return ae("csm",r=>{T(()=>{o(r.ref)})}),T(()=>()=>L=void 0),{onNewMaterial:a,allMaterials:e}};var ne=Z("<!> <!>",1);function ue(L,e){B(e,!0);let i=N(e,"enabled",3,!0),t=N(e,"args",19,()=>({})),o=N(e,"lightDirection",19,()=>[1,-1,1]);const{camera:a,scene:r,size:c}=ie();let s=X(void 0);te(()=>S(s)?.update(),{autoInvalidate:!1});const{onNewMaterial:h,allMaterials:n}=se(),_=()=>{S(s)?.remove(),S(s)?.dispose(),R(s,void 0)};u(()=>[i()],([g])=>{if(g){const d=new oe({camera:e.camera??a.current,parent:r,...t()});e.configure?.(d);for(const l of n)d.setupMaterial(l);h(l=>d.setupMaterial(l)),R(s,d)}else h(void 0),_()}),u(()=>[c.current,S(s)],([,g])=>{g?.updateFrustums()}),u(()=>[a.current,e.camera,S(s)],([g,d,l])=>{l&&(l.camera=d??g,t().maxFar!==void 0&&(l.maxFar=t().maxFar),t().mode!==void 0&&(l.mode=t().mode),l.updateFrustums())}),u(()=>[S(s),e.lightIntensity,e.lightColor],([g,d,l])=>{g?.lights.forEach(H=>{d!==void 0&&(H.intensity=d/Math.PI),l!==void 0&&H.color.set(l)})}),u(()=>[S(s),o()],([g,d])=>{g?.lightDirection.set(...d).normalize()}),T(()=>_);var p=ne(),w=x(p);G(w,()=>e.children??b);var I=j(w,2);{var V=g=>{var d=J(),l=x(d);G(l,()=>e.fallback??b),F(g,d)};K(I,g=>{i()||g(V)})}F(L,p),q()}export{ue as C};
