import"./disclose-version.DsnmJJEf.js";import{L as w,p as ne,g as m,u as D,M as de,f as X,n as V,s as ce,a as he}from"./runtime.BedC1VoK.js";import{f as le,a as j,c as ge}from"./template.CRvxzHa8.js";import{s as q}from"./snippet.DJLeyYvd.js";import{i as fe}from"./if.CiNDarPD.js";import{p}from"./props.IXTf2h6r.js";import{s as J,a as me}from"./store.2D4VV-eu.js";/* empty css                                                      */import{gz as U,V as O,aX as _e,M as Se,aq as R,ad as Le,o as ue,j as y}from"./observe.svelte.CfGpyHIb.js";import{u as pe}from"./useThrelte.BeIV9kYF.js";import{u as we}from"./useTask.svelte.DevRmSGz.js";import{C as Z,c as De}from"./cascadeShadowBiases.8VbJTAlL.js";import{i as Me}from"./injectPlugin.DEz6-eQ3.js";const K={lights_fragment_begin:`
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
	`+U.lights_pars_begin},Q=new R,A=new Z({webGL:!0}),u=new O,Ce=new O,I=new Le,P=[],v=[],T=new R,Y=new R,Ie=new O(0,1,0);class Ne{constructor(e){this.camera=e.camera,this.parent=e.parent,this.cascades=e.cascades||3,this.maxFar=e.maxFar||1e5,this.mode=e.mode||"practical",this.shadowMapSize=e.shadowMapSize||2048,this.shadowBias=e.shadowBias||1e-6,this.lightDirection=e.lightDirection||new O(1,-1,1).normalize(),this.lightIntensity=e.lightIntensity||3,this.lightNear=e.lightNear||1,this.lightFar=e.lightFar||2e3,this.lightMargin=e.lightMargin||200,this.customSplitsCallback=e.customSplitsCallback,this.fade=!1,this.mainFrustum=new Z({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let e=0;e<this.cascades;e++){const i=new _e(16777215,this.lightIntensity);i.castShadow=!0,i.shadow.mapSize.width=this.shadowMapSize,i.shadow.mapSize.height=this.shadowMapSize,i.shadow.camera.near=this.lightNear,i.shadow.camera.far=this.lightFar,i.shadow.bias=this.shadowBias,this.parent.add(i),this.parent.add(i.target),this.lights.push(i)}}_initCascades(){const e=this.camera;e.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(e.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){const e=this.frustums;for(let i=0;i<e.length;i++){const a=this.lights[i].shadow.camera,s=this.frustums[i],t=s.vertices.near,c=s.vertices.far,l=c[0];let g;l.distanceTo(c[2])>l.distanceTo(t[2])?g=c[2]:g=t[2];let n=l.distanceTo(g);if(this.fade){const S=this.camera,r=Math.max(S.far,this.maxFar),f=s.vertices.far[0].z/(r-S.near),N=.25*Math.pow(f,2)*(r-S.near);n+=N}a.left=-n/2,a.right=n/2,a.top=n/2,a.bottom=-n/2,a.updateProjectionMatrix()}}_getBreaks(){const e=this.camera,i=Math.min(e.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":o(this.cascades,e.near,i,this.breaks);break;case"logarithmic":a(this.cascades,e.near,i,this.breaks);break;case"practical":s(this.cascades,e.near,i,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,e.near,i,this.breaks);break}function o(t,c,l,g){for(let n=1;n<t;n++)g.push((c+(l-c)*n/t)/l);g.push(1)}function a(t,c,l,g){for(let n=1;n<t;n++)g.push(c*(l/c)**(n/t)/l);g.push(1)}function s(t,c,l,g,n){P.length=0,v.length=0,a(t,c,l,v),o(t,c,l,P);for(let S=1;S<t;S++)n.push(Se.lerp(P[S-1],v[S-1],g));n.push(1)}}update(){const e=this.camera,i=this.frustums;T.lookAt(Ce,this.lightDirection,Ie),Y.copy(T).invert();for(let o=0;o<i.length;o++){const a=this.lights[o],s=a.shadow.camera,t=(s.right-s.left)/this.shadowMapSize,c=(s.top-s.bottom)/this.shadowMapSize;Q.multiplyMatrices(Y,e.matrixWorld),i[o].toSpace(Q,A);const l=A.vertices.near,g=A.vertices.far;I.makeEmpty();for(let n=0;n<4;n++)I.expandByPoint(l[n]),I.expandByPoint(g[n]);I.getCenter(u),u.z=I.max.z+this.lightMargin,u.x=Math.floor(u.x/t)*t,u.y=Math.floor(u.y/c)*c,u.applyMatrix4(T),a.position.copy(u),a.target.position.copy(u),a.target.position.x+=this.lightDirection.x,a.target.position.y+=this.lightDirection.y,a.target.position.z+=this.lightDirection.z}}_injectInclude(){U.lights_fragment_begin=K.lights_fragment_begin,U.lights_pars_begin=K.lights_pars_begin}setupMaterial(e){e.defines=e.defines||{},e.defines.USE_CSM=1,e.defines.CSM_CASCADES=this.cascades,this.fade&&(e.defines.CSM_FADE="");const i=[],o=this,a=this.shaders;e.onBeforeCompile=function(s){const t=Math.min(o.camera.far,o.maxFar);o._getExtendedBreaks(i),s.uniforms.CSM_cascades={value:i},s.uniforms.cameraNear={value:o.camera.near},s.uniforms.shadowFar={value:t},a.set(e,s)},a.set(e,null)}_updateUniforms(){const e=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(o,a){if(o!==null){const s=o.uniforms;this._getExtendedBreaks(s.CSM_cascades.value),s.cameraNear.value=this.camera.near,s.shadowFar.value=e}!this.fade&&"CSM_FADE"in a.defines?(delete a.defines.CSM_FADE,a.needsUpdate=!0):this.fade&&!("CSM_FADE"in a.defines)&&(a.defines.CSM_FADE="",a.needsUpdate=!0)},this)}_getExtendedBreaks(e){for(;e.length<this.breaks.length;)e.push(new ue);e.length=this.breaks.length;for(let i=0;i<this.cascades;i++){const o=this.breaks[i],a=this.breaks[i-1]||0;e[i].x=a,e[i].y=o}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let e=0;e<this.lights.length;e++)this.parent.remove(this.lights[e].target),this.parent.remove(this.lights[e])}dispose(){const e=this.shaders;e.forEach(function(i,o){delete o.onBeforeCompile,delete o.defines.USE_CSM,delete o.defines.CSM_CASCADES,delete o.defines.CSM_FADE,i!==null&&(delete i.uniforms.CSM_cascades,delete i.uniforms.cameraNear,delete i.uniforms.shadowFar),o.needsUpdate=!0}),e.clear()}}const Ee=()=>{let M;const e=new Set,i=t=>y(t,"MeshStandardMaterial")||y(t,"MeshPhongMaterial"),o=t=>{e.has(t)||(e.add(t),M?.(t))},a=t=>{i(t)?o(t):y(t,"Mesh")&&(Array.isArray(t.material)?t.material.forEach(c=>{i(c)&&o(c)}):i(t.material)&&o(t.material))},s=t=>{M=t};return Me("csm",t=>{w(()=>{a(t.ref)})}),w(()=>()=>M=void 0),{onNewMaterial:s,allMaterials:e}};var Oe=le("<!> <!>",1);function Be(M,e){ne(e,!0);const i=()=>J(ee,"$size",a),o=()=>J(N,"$defaultCamera",a),[a,s]=me();let t=p(e,"enabled",3,!0),c=p(e,"lightDirection",19,()=>[1,-1,1]),l=p(e,"shadowNormalBias",3,0),g=p(e,"shadowIntensity",3,1),n=p(e,"shadowRadius",3,1),S=p(e,"shadowBlurSamples",3,8),r=p(e,"csm",15),f=p(e,"args",19,()=>({}));const{camera:N,invalidate:C,scene:$,size:ee}=pe(),ie=D(()=>e.cascades??f().cascades??3),H=D(()=>e.maxFar??f().maxFar??1e5),b=D(()=>e.lightMargin??f().lightMargin??200),E=D(()=>e.shadowMapSize??f().shadowMapSize??2048),x=D(()=>e.shadowBias??f().shadowBias??1e-6),F=D(()=>e.shadowNear??f().lightNear??1),G=D(()=>e.shadowFar??f().lightFar??2e3),{onNewMaterial:k,allMaterials:te}=Ee(),B=h=>{if(e.mode===void 0)h.mode=f().mode??"practical",f().customSplitsCallback!==void 0&&(h.customSplitsCallback=f().customSplitsCallback);else if(typeof e.mode=="function"){const _=e.mode;h.mode="custom",h.customSplitsCallback=(L,d,re,se)=>{se.push(..._(L,d,re))}}else h.mode=e.mode};w(()=>{if(!t())return;const h=m(ie);return de(()=>{const _=new Ne({...f(),camera:e.camera??f().camera??N.current,parent:f().parent??$,cascades:h,maxFar:m(H),lightMargin:m(b),shadowMapSize:m(E),shadowBias:m(x),lightNear:m(F),lightFar:m(G)});B(_),e.configure?.(_);const L=d=>{_.setupMaterial(d),d.needsUpdate=!0};for(const d of te)L(d);return k(L),r(_),C(),()=>{k(void 0),r(void 0),_.remove(),_.dispose()}})}),we(()=>r()?.update(),{autoInvalidate:!1}),w(()=>{r()!==void 0&&(i(),r(r().camera=e.camera??o(),!0),r(r().maxFar=m(H),!0),e.fade!==void 0&&r(r().fade=e.fade,!0),B(r()),r().updateFrustums(),C())}),w(()=>{if(r()===void 0)return;r(r().shadowMapSize=m(E),!0);const h=r().lights.map(L=>L.shadow),_=De(h.length,m(x));for(const[L,d]of h.entries())d.mapSize.width!==m(E)&&(d.mapSize.setScalar(m(E)),d.map?.dispose(),d.map=null,d.mapPass?.dispose(),d.mapPass=null),d.bias=_[L],d.normalBias=l(),d.intensity=g(),d.radius=n(),d.blurSamples=S(),d.camera.near=m(F),d.camera.far=m(G),d.camera.updateProjectionMatrix();C()}),w(()=>{r()!==void 0&&(r(r().lightMargin=m(b),!0),C())}),w(()=>{r()!==void 0&&(r().lightDirection.set(...c()).normalize(),C())}),w(()=>{if(r()!==void 0){for(const h of r().lights)e.intensity!==void 0?h.intensity=e.intensity:e.lightIntensity!==void 0&&(h.intensity=e.lightIntensity/Math.PI),e.color!==void 0?h.color.set(e.color):e.lightColor!==void 0&&h.color.set(e.lightColor);C()}});var z=Oe(),W=X(z);q(W,()=>e.children??V);var ae=ce(W,2);{var oe=h=>{var _=ge(),L=X(_);q(L,()=>e.fallback??V),j(h,_)};fe(ae,h=>{t()||h(oe)})}j(M,z),he(),s()}export{Be as C};
