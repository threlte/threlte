import"./disclose-version.DsnmJJEf.js";import{L as u,p as te,g as f,u as p,M as ae,f as W,n as V,s as oe,a as re}from"./runtime.DLdkg5Kz.js";import{f as se,a as X,c as ne}from"./template.B2QqRX6L.js";import{s as j}from"./snippet.CCzzTW4D.js";import{i as de}from"./if.CWhf68p6.js";import{p as L}from"./props.Dt84Ixko.js";/* empty css                                                      */import{gx as T,V as I,aV as ce,m as he,ao as U,af as le,t as ge,i as O}from"./observe.svelte.Cp4l21sn.js";import{u as fe}from"./useThrelte.B3LKSjsY.js";import{u as me}from"./useTask.svelte.KBguMLbe.js";import{C as Q,c as _e}from"./cascadeShadowBiases.Cby2dR2F.js";import{i as Se}from"./injectPlugin.gAkvDPq1.js";const q={lights_fragment_begin:`
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
	`+T.lights_pars_begin},J=new U,y=new Q({webGL:!0}),S=new I,Le=new I,D=new le,A=[],P=[],v=new U,K=new U,ue=new I(0,1,0);class pe{constructor(e){this.camera=e.camera,this.parent=e.parent,this.cascades=e.cascades||3,this.maxFar=e.maxFar||1e5,this.mode=e.mode||"practical",this.shadowMapSize=e.shadowMapSize||2048,this.shadowBias=e.shadowBias||1e-6,this.lightDirection=e.lightDirection||new I(1,-1,1).normalize(),this.lightIntensity=e.lightIntensity||3,this.lightNear=e.lightNear||1,this.lightFar=e.lightFar||2e3,this.lightMargin=e.lightMargin||200,this.customSplitsCallback=e.customSplitsCallback,this.fade=!1,this.mainFrustum=new Q({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let e=0;e<this.cascades;e++){const i=new ce(16777215,this.lightIntensity);i.castShadow=!0,i.shadow.mapSize.width=this.shadowMapSize,i.shadow.mapSize.height=this.shadowMapSize,i.shadow.camera.near=this.lightNear,i.shadow.camera.far=this.lightFar,i.shadow.bias=this.shadowBias,this.parent.add(i),this.parent.add(i.target),this.lights.push(i)}}_initCascades(){const e=this.camera;e.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(e.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){const e=this.frustums;for(let i=0;i<e.length;i++){const o=this.lights[i].shadow.camera,d=this.frustums[i],t=d.vertices.near,h=d.vertices.far,a=h[0];let s;a.distanceTo(h[2])>a.distanceTo(t[2])?s=h[2]:s=t[2];let n=a.distanceTo(s);if(this.fade){const g=this.camera,M=Math.max(g.far,this.maxFar),N=d.vertices.far[0].z/(M-g.near),E=.25*Math.pow(N,2)*(M-g.near);n+=E}o.left=-n/2,o.right=n/2,o.top=n/2,o.bottom=-n/2,o.updateProjectionMatrix()}}_getBreaks(){const e=this.camera,i=Math.min(e.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":r(this.cascades,e.near,i,this.breaks);break;case"logarithmic":o(this.cascades,e.near,i,this.breaks);break;case"practical":d(this.cascades,e.near,i,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,e.near,i,this.breaks);break}function r(t,h,a,s){for(let n=1;n<t;n++)s.push((h+(a-h)*n/t)/a);s.push(1)}function o(t,h,a,s){for(let n=1;n<t;n++)s.push(h*(a/h)**(n/t)/a);s.push(1)}function d(t,h,a,s,n){A.length=0,P.length=0,o(t,h,a,P),r(t,h,a,A);for(let g=1;g<t;g++)n.push(he.lerp(A[g-1],P[g-1],s));n.push(1)}}update(){const e=this.camera,i=this.frustums;v.lookAt(Le,this.lightDirection,ue),K.copy(v).invert();for(let r=0;r<i.length;r++){const o=this.lights[r],d=o.shadow.camera,t=(d.right-d.left)/this.shadowMapSize,h=(d.top-d.bottom)/this.shadowMapSize;J.multiplyMatrices(K,e.matrixWorld),i[r].toSpace(J,y);const a=y.vertices.near,s=y.vertices.far;D.makeEmpty();for(let n=0;n<4;n++)D.expandByPoint(a[n]),D.expandByPoint(s[n]);D.getCenter(S),S.z=D.max.z+this.lightMargin,S.x=Math.floor(S.x/t)*t,S.y=Math.floor(S.y/h)*h,S.applyMatrix4(v),o.position.copy(S),o.target.position.copy(S),o.target.position.x+=this.lightDirection.x,o.target.position.y+=this.lightDirection.y,o.target.position.z+=this.lightDirection.z}}_injectInclude(){T.lights_fragment_begin=q.lights_fragment_begin,T.lights_pars_begin=q.lights_pars_begin}setupMaterial(e){e.defines=e.defines||{},e.defines.USE_CSM=1,e.defines.CSM_CASCADES=this.cascades,this.fade&&(e.defines.CSM_FADE="");const i=[],r=this,o=this.shaders;e.onBeforeCompile=function(d){const t=Math.min(r.camera.far,r.maxFar);r._getExtendedBreaks(i),d.uniforms.CSM_cascades={value:i},d.uniforms.cameraNear={value:r.camera.near},d.uniforms.shadowFar={value:t},o.set(e,d)},o.set(e,null)}_updateUniforms(){const e=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(r,o){if(r!==null){const d=r.uniforms;this._getExtendedBreaks(d.CSM_cascades.value),d.cameraNear.value=this.camera.near,d.shadowFar.value=e}!this.fade&&"CSM_FADE"in o.defines?(delete o.defines.CSM_FADE,o.needsUpdate=!0):this.fade&&!("CSM_FADE"in o.defines)&&(o.defines.CSM_FADE="",o.needsUpdate=!0)},this)}_getExtendedBreaks(e){for(;e.length<this.breaks.length;)e.push(new ge);e.length=this.breaks.length;for(let i=0;i<this.cascades;i++){const r=this.breaks[i],o=this.breaks[i-1]||0;e[i].x=o,e[i].y=r}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let e=0;e<this.lights.length;e++)this.parent.remove(this.lights[e].target),this.parent.remove(this.lights[e])}dispose(){const e=this.shaders;e.forEach(function(i,r){delete r.onBeforeCompile,delete r.defines.USE_CSM,delete r.defines.CSM_CASCADES,delete r.defines.CSM_FADE,i!==null&&(delete i.uniforms.CSM_cascades,delete i.uniforms.cameraNear,delete i.uniforms.shadowFar),r.needsUpdate=!0}),e.clear()}}const we=()=>{let w;const e=new Set,i=t=>O(t,"MeshStandardMaterial")||O(t,"MeshPhongMaterial"),r=t=>{e.has(t)||(e.add(t),w?.(t))},o=t=>{i(t)?r(t):O(t,"Mesh")&&(Array.isArray(t.material)?t.material.forEach(h=>{i(h)&&r(h)}):i(t.material)&&r(t.material))},d=t=>{w=t};return Se("csm",t=>{u(()=>{o(t.ref)})}),u(()=>()=>w=void 0),{onNewMaterial:d,allMaterials:e}};var De=se("<!> <!>",1);function Re(w,e){te(e,!0);let i=L(e,"enabled",3,!0),r=L(e,"lightDirection",19,()=>[1,-1,1]),o=L(e,"shadowNormalBias",3,0),d=L(e,"shadowIntensity",3,1),t=L(e,"shadowRadius",3,1),h=L(e,"shadowBlurSamples",3,8),a=L(e,"csm",15),s=L(e,"args",19,()=>({}));const{camera:n,invalidate:g,scene:M,size:N}=fe(),E=p(()=>e.cascades??s().cascades??3),R=p(()=>e.maxFar??s().maxFar??1e5),H=p(()=>e.lightMargin??s().lightMargin??200),C=p(()=>e.shadowMapSize??s().shadowMapSize??2048),b=p(()=>e.shadowBias??s().shadowBias??1e-6),x=p(()=>e.shadowNear??s().lightNear??1),F=p(()=>e.shadowFar??s().lightFar??2e3),{onNewMaterial:G,allMaterials:Y}=we(),k=l=>{if(e.mode===void 0)l.mode=s().mode??"practical",s().customSplitsCallback!==void 0&&(l.customSplitsCallback=s().customSplitsCallback);else if(typeof e.mode=="function"){const m=e.mode;l.mode="custom",l.customSplitsCallback=(_,c,ee,ie)=>{ie.push(...m(_,c,ee))}}else l.mode=e.mode};u(()=>{if(!i())return;const l=f(E);return ae(()=>{const m=new pe({...s(),camera:e.camera??s().camera??n.current,parent:s().parent??M.current,cascades:l,maxFar:f(R),lightMargin:f(H),shadowMapSize:f(C),shadowBias:f(b),lightNear:f(x),lightFar:f(F)});k(m),e.configure?.(m);const _=c=>{m.setupMaterial(c),c.needsUpdate=!0};for(const c of Y)_(c);return G(_),a(m),g(),()=>{G(void 0),a(void 0),m.remove(),m.dispose()}})}),me(()=>a()?.update(),{autoInvalidate:!1}),u(()=>{a()!==void 0&&(N.current,a(a().camera=e.camera??n.current,!0),a(a().maxFar=f(R),!0),e.fade!==void 0&&a(a().fade=e.fade,!0),k(a()),a().updateFrustums(),g())}),u(()=>{if(a()===void 0)return;a(a().shadowMapSize=f(C),!0);const l=a().lights.map(_=>_.shadow),m=_e(l.length,f(b));for(const[_,c]of l.entries())c.mapSize.width!==f(C)&&(c.mapSize.setScalar(f(C)),c.map?.dispose(),c.map=null,c.mapPass?.dispose(),c.mapPass=null),c.bias=m[_],c.normalBias=o(),c.intensity=d(),c.radius=t(),c.blurSamples=h(),c.camera.near=f(x),c.camera.far=f(F),c.camera.updateProjectionMatrix();g()}),u(()=>{a()!==void 0&&(a(a().lightMargin=f(H),!0),g())}),u(()=>{a()!==void 0&&(a().lightDirection.set(...r()).normalize(),g())}),u(()=>{if(a()!==void 0){for(const l of a().lights)e.intensity!==void 0?l.intensity=e.intensity:e.lightIntensity!==void 0&&(l.intensity=e.lightIntensity/Math.PI),e.color!==void 0?l.color.set(e.color):e.lightColor!==void 0&&l.color.set(e.lightColor);g()}});var B=De(),z=W(B);j(z,()=>e.children??V);var Z=oe(z,2);{var $=l=>{var m=ne(),_=W(m);j(_,()=>e.fallback??V),X(l,m)};de(Z,l=>{i()||l($)})}X(w,B),re()}export{Re as C};
