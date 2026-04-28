import"./disclose-version.DsnmJJEf.js";import{Z as T,p as Z,g as S,d as q,b,f as F,n as G,s as J,a as K}from"./runtime.HAn2cbcW.js";import{f as Q,a as k,c as Y}from"./template.D0onEdCl.js";import{s as W}from"./snippet.ILc-veMr.js";import{i as $}from"./if.Lug6H8hl.js";import{p as N}from"./props.DsKWk81K.js";import{a as ee,s as ie}from"./store.BmD_Ou3p.js";import{l as _,k as M,g6 as U,j as te,a0 as ae,af as re,V as oe,i as E,b as se,o as u}from"./observe.svelte.nNuzPOmT.js";/* empty css                                                      */import{u as ne}from"./useTask.svelte.BmmWtCbe.js";import{i as ce}from"./injectPlugin.eyJF8E0t.js";const O=new M;class C{constructor(e){e=e||{},this.zNear=e.webGL===!0?-1:0,this.vertices={near:[new _,new _,new _,new _],far:[new _,new _,new _,new _]},e.projectionMatrix!==void 0&&this.setFromProjectionMatrix(e.projectionMatrix,e.maxFar||1e4)}setFromProjectionMatrix(e,i){const a=this.zNear,o=e.elements[11]===0;return O.copy(e).invert(),this.vertices.near[0].set(1,1,a),this.vertices.near[1].set(1,-1,a),this.vertices.near[2].set(-1,-1,a),this.vertices.near[3].set(-1,1,a),this.vertices.near.forEach(function(t){t.applyMatrix4(O)}),this.vertices.far[0].set(1,1,1),this.vertices.far[1].set(1,-1,1),this.vertices.far[2].set(-1,-1,1),this.vertices.far[3].set(-1,1,1),this.vertices.far.forEach(function(t){t.applyMatrix4(O);const r=Math.abs(t.z);o?t.z*=Math.min(i/r,1):t.multiplyScalar(Math.min(i/r,1))}),this.vertices}split(e,i){for(;e.length>i.length;)i.push(new C);i.length=e.length;for(let a=0;a<e.length;a++){const o=i[a];if(a===0)for(let t=0;t<4;t++)o.vertices.near[t].copy(this.vertices.near[t]);else for(let t=0;t<4;t++)o.vertices.near[t].lerpVectors(this.vertices.near[t],this.vertices.far[t],e[a-1]);if(a===e.length-1)for(let t=0;t<4;t++)o.vertices.far[t].copy(this.vertices.far[t]);else for(let t=0;t<4;t++)o.vertices.far[t].lerpVectors(this.vertices.near[t],this.vertices.far[t],e[a])}}toSpace(e,i){for(let a=0;a<4;a++)i.vertices.near[a].copy(this.vertices.near[a]).applyMatrix4(e),i.vertices.far[a].copy(this.vertices.far[a]).applyMatrix4(e)}}const z={lights_fragment_begin:`
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
	`+U.lights_pars_begin},V=new M,v=new C({webGL:!0}),m=new _,D=new re,y=[],A=[],P=new M,B=new M,he=new _(0,1,0);class de{constructor(e){this.camera=e.camera,this.parent=e.parent,this.cascades=e.cascades||3,this.maxFar=e.maxFar||1e5,this.mode=e.mode||"practical",this.shadowMapSize=e.shadowMapSize||2048,this.shadowBias=e.shadowBias||1e-6,this.lightDirection=e.lightDirection||new _(1,-1,1).normalize(),this.lightIntensity=e.lightIntensity||3,this.lightNear=e.lightNear||1,this.lightFar=e.lightFar||2e3,this.lightMargin=e.lightMargin||200,this.customSplitsCallback=e.customSplitsCallback,this.fade=!1,this.mainFrustum=new C({webGL:!0}),this.frustums=[],this.breaks=[],this.lights=[],this.shaders=new Map,this._createLights(),this.updateFrustums(),this._injectInclude()}_createLights(){for(let e=0;e<this.cascades;e++){const i=new te(16777215,this.lightIntensity);i.castShadow=!0,i.shadow.mapSize.width=this.shadowMapSize,i.shadow.mapSize.height=this.shadowMapSize,i.shadow.camera.near=this.lightNear,i.shadow.camera.far=this.lightFar,i.shadow.bias=this.shadowBias,this.parent.add(i),this.parent.add(i.target),this.lights.push(i)}}_initCascades(){const e=this.camera;e.updateProjectionMatrix(),this.mainFrustum.setFromProjectionMatrix(e.projectionMatrix,this.maxFar),this.mainFrustum.split(this.breaks,this.frustums)}_updateShadowBounds(){const e=this.frustums;for(let i=0;i<e.length;i++){const o=this.lights[i].shadow.camera,t=this.frustums[i],r=t.vertices.near,n=t.vertices.far,h=n[0];let d;h.distanceTo(n[2])>h.distanceTo(r[2])?d=n[2]:d=r[2];let s=h.distanceTo(d);if(this.fade){const c=this.camera,p=Math.max(c.far,this.maxFar),I=t.vertices.far[0].z/(p-c.near),w=.25*Math.pow(I,2)*(p-c.near);s+=w}o.left=-s/2,o.right=s/2,o.top=s/2,o.bottom=-s/2,o.updateProjectionMatrix()}}_getBreaks(){const e=this.camera,i=Math.min(e.far,this.maxFar);switch(this.breaks.length=0,this.mode){case"uniform":a(this.cascades,e.near,i,this.breaks);break;case"logarithmic":o(this.cascades,e.near,i,this.breaks);break;case"practical":t(this.cascades,e.near,i,.5,this.breaks);break;case"custom":this.customSplitsCallback===void 0&&console.error("CSM: Custom split scheme callback not defined."),this.customSplitsCallback(this.cascades,e.near,i,this.breaks);break}function a(r,n,h,d){for(let s=1;s<r;s++)d.push((n+(h-n)*s/r)/h);d.push(1)}function o(r,n,h,d){for(let s=1;s<r;s++)d.push(n*(h/n)**(s/r)/h);d.push(1)}function t(r,n,h,d,s){y.length=0,A.length=0,o(r,n,h,A),a(r,n,h,y);for(let c=1;c<r;c++)s.push(ae.lerp(y[c-1],A[c-1],d));s.push(1)}}update(){const e=this.camera,i=this.frustums;P.lookAt(new _,this.lightDirection,he),B.copy(P).invert();for(let a=0;a<i.length;a++){const o=this.lights[a],t=o.shadow.camera,r=(t.right-t.left)/this.shadowMapSize,n=(t.top-t.bottom)/this.shadowMapSize;V.multiplyMatrices(B,e.matrixWorld),i[a].toSpace(V,v);const h=v.vertices.near,d=v.vertices.far;D.makeEmpty();for(let s=0;s<4;s++)D.expandByPoint(h[s]),D.expandByPoint(d[s]);D.getCenter(m),m.z=D.max.z+this.lightMargin,m.x=Math.floor(m.x/r)*r,m.y=Math.floor(m.y/n)*n,m.applyMatrix4(P),o.position.copy(m),o.target.position.copy(m),o.target.position.x+=this.lightDirection.x,o.target.position.y+=this.lightDirection.y,o.target.position.z+=this.lightDirection.z}}_injectInclude(){U.lights_fragment_begin=z.lights_fragment_begin,U.lights_pars_begin=z.lights_pars_begin}setupMaterial(e){e.defines=e.defines||{},e.defines.USE_CSM=1,e.defines.CSM_CASCADES=this.cascades,this.fade&&(e.defines.CSM_FADE="");const i=[],a=this,o=this.shaders;e.onBeforeCompile=function(t){const r=Math.min(a.camera.far,a.maxFar);a._getExtendedBreaks(i),t.uniforms.CSM_cascades={value:i},t.uniforms.cameraNear={value:a.camera.near},t.uniforms.shadowFar={value:r},o.set(e,t)},o.set(e,null)}_updateUniforms(){const e=Math.min(this.camera.far,this.maxFar);this.shaders.forEach(function(a,o){if(a!==null){const t=a.uniforms;this._getExtendedBreaks(t.CSM_cascades.value),t.cameraNear.value=this.camera.near,t.shadowFar.value=e}!this.fade&&"CSM_FADE"in o.defines?(delete o.defines.CSM_FADE,o.needsUpdate=!0):this.fade&&!("CSM_FADE"in o.defines)&&(o.defines.CSM_FADE="",o.needsUpdate=!0)},this)}_getExtendedBreaks(e){for(;e.length<this.breaks.length;)e.push(new oe);e.length=this.breaks.length;for(let i=0;i<this.cascades;i++){const a=this.breaks[i],o=this.breaks[i-1]||0;e[i].x=o,e[i].y=a}}updateFrustums(){this._getBreaks(),this._initCascades(),this._updateShadowBounds(),this._updateUniforms()}remove(){for(let e=0;e<this.lights.length;e++)this.parent.remove(this.lights[e].target),this.parent.remove(this.lights[e])}dispose(){const e=this.shaders;e.forEach(function(i,a){delete a.onBeforeCompile,delete a.defines.USE_CSM,delete a.defines.CSM_CASCADES,delete a.defines.CSM_FADE,i!==null&&(delete i.uniforms.CSM_cascades,delete i.uniforms.cameraNear,delete i.uniforms.shadowFar),a.needsUpdate=!0}),e.clear()}}const le=()=>{let L;const e=new Set,i=r=>E(r,"MeshStandardMaterial")||E(r,"MeshPhongMaterial"),a=r=>{e.has(r)||(e.add(r),L?.(r))},o=r=>{i(r)?a(r):E(r,"Mesh")&&(Array.isArray(r.material)?r.material.forEach(n=>{i(n)&&a(n)}):i(r.material)&&a(r.material))},t=r=>{L=r};return ce("csm",r=>{T(()=>{o(r.ref)})}),T(()=>()=>L=void 0),{onNewMaterial:t,allMaterials:e}};var ge=Q("<!> <!>",1);function Ie(L,e){Z(e,!0);const i=()=>ee(h,"$defaultCamera",a),[a,o]=ie();let t=N(e,"enabled",3,!0),r=N(e,"args",19,()=>({})),n=N(e,"lightDirection",19,()=>[1,-1,1]);const{camera:h,scene:d,size:s}=se();let c=q(void 0);ne(()=>S(c)?.update(),{autoInvalidate:!1});const{onNewMaterial:p,allMaterials:I}=le(),w=()=>{S(c)?.remove(),S(c)?.dispose(),b(c,void 0)};u(()=>[t()],([f])=>{if(f){const l=new de({camera:e.camera??i(),parent:d,...r()});e.configure?.(l);for(const g of I)l.setupMaterial(g);p(g=>l.setupMaterial(g)),b(c,l)}else p(void 0),w()}),u(()=>[s,S(c)],([,f])=>{f?.updateFrustums()}),u(()=>[h,e.camera,S(c)],([f,l,g])=>{g&&(g.camera=l??f,r().maxFar!==void 0&&(g.maxFar=r().maxFar),r().mode!==void 0&&(g.mode=r().mode),g.updateFrustums())}),u(()=>[S(c),e.lightIntensity,e.lightColor],([f,l,g])=>{f?.lights.forEach(x=>{l!==void 0&&(x.intensity=l/Math.PI),g!==void 0&&x.color.set(g)})}),u(()=>[S(c),n()],([f,l])=>{f?.lightDirection.set(...l).normalize()}),T(()=>w);var H=ge(),R=F(H);W(R,()=>e.children??G);var X=J(R,2);{var j=f=>{var l=Y(),g=F(l);W(g,()=>e.fallback??G),k(f,l)};$(X,f=>{t()||f(j)})}k(L,H),K(),o()}export{Ie as C};
