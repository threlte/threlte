import"./disclose-version.DsnmJJEf.js";import"./legacy.CFq86F04.js";import{p as he,f as M,g as l,n as ie,s as R,a as ue,P as Te,u as le,L as me,d as re,bi as Ce,b as ae,c as Se,r as we}from"./runtime.Cq5xh0TU.js";import{c as I,f as k,a as b}from"./template.L6xDPO6U.js";import{C as Pe}from"./Canvas.DIuF5wt1.js";import{$ as N,bs as Z,s as x,W as j,am as X,a1 as Re,gf as Ae,fY as ye,bh as De,cu as Ee,bD as Fe,bB as Be,bE as Ue,bF as Ie,bA as Ne,bC as ze,f2 as Oe,Z as z,V as F,bz as ke,M as Le,a as T,cp as Ge,cT as $e,co as Qe,d3 as Ve,h as He,D as We,gC as Ye,bp as je,Y as Xe,ap as Ke}from"./observe.svelte.XHimI-Ft.js";import{e as Ze}from"./events.-BVBOS9k.js";import{c as C}from"./svelte-component.B_Rq4ZKt.js";import{a as ge,s as qe}from"./store.Bdk9semh.js";/* empty css                                                      */import{u as ve}from"./useThrelte.BUOnMkyN.js";import{u as be}from"./useTask.svelte.CQYikn9N.js";import{h as xe}from"./raycast.BcG-iZFx.js";import{O as Je}from"./OrbitControls.punH5agF.js";import{s as oe}from"./snippet.B1WTn4og.js";import{a as ne}from"./await.CvR1qv4C.js";import{p as et,s as tt,r as st}from"./props.BuNG_qsO.js";import{u as it}from"./useGltf.jgZfeguK.js";import{u as rt}from"./useDraco.q1SQIpDD.js";import{e as at}from"./each.BnTYX0wD.js";import{I as ot,a as lt}from"./Instance.nCUxojin.js";import{P as L,F as fe}from"./Pass.pXxz0IUG.js";/* empty css                                                   */import"./if.eGY2C9_P.js";import"./branches.CjZ4fCu_.js";import"./this.BCeOz4X_.js";import"./Context.C8vled1A.js";import"./create-subscriber.Cxqb2LK-.js";import"./index.D-QOJTr1.js";import"./index-client.CbnisDQz.js";import"./transitions.Bigw4laK.js";import"./loop.BGGTUj09.js";import"./render.DOVvO0Mi.js";import"./injectPlugin.vYxrg8CX.js";import"./OrbitControls.BOcOv25N.js";import"./useControlsContext.D-iCiLeo.js";import"./GLTFLoader.Bdn6H_F8.js";import"./BufferGeometryUtils.Dw5IauKo.js";const K={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform float opacity;

		uniform sampler2D tDiffuse;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );
			gl_FragColor = opacity * texel;


		}`};class nt extends L{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof N?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Z.clone(e.uniforms),this.material=new N({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new fe(this.material)}render(e,t,i){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=i.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class _e extends L{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,i){const r=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let o,u;this.inverse?(o=0,u=1):(o=1,u=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(r.REPLACE,r.REPLACE,r.REPLACE),s.buffers.stencil.setFunc(r.ALWAYS,o,4294967295),s.buffers.stencil.setClear(u),s.buffers.stencil.setLocked(!0),e.setRenderTarget(i),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(r.EQUAL,1,4294967295),s.buffers.stencil.setOp(r.KEEP,r.KEEP,r.KEEP),s.buffers.stencil.setLocked(!0)}}class ht extends L{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class ut{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const i=e.getSize(new x);this._width=i.width,this._height=i.height,t=new j(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:X}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new nt(K),this.copyPass.material.blending=Re,this.timer=new Ae}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let i=!1;for(let r=0,s=this.passes.length;r<s;r++){const o=this.passes[r];if(o.enabled!==!1){if(o.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(r),o.render(this.renderer,this.writeBuffer,this.readBuffer,e,i),o.needsSwap){if(i){const u=this.renderer.getContext(),n=this.renderer.state.buffers.stencil;n.setFunc(u.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),n.setFunc(u.EQUAL,1,4294967295)}this.swapBuffers()}_e!==void 0&&(o instanceof _e?i=!0:o instanceof ht&&(i=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new x);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const i=this._width*this._pixelRatio,r=this._height*this._pixelRatio;this.renderTarget1.setSize(i,r),this.renderTarget2.setSize(i,r);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(i,r)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const Y={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class ft extends L{constructor(){super(),this.isOutputPass=!0,this.uniforms=Z.clone(Y.uniforms),this.material=new ye({name:Y.name,uniforms:this.uniforms,vertexShader:Y.vertexShader,fragmentShader:Y.fragmentShader}),this._fsQuad=new fe(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,i){this.uniforms.tDiffuse.value=i.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},De.getTransfer(this._outputColorSpace)===Ee&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===Fe?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Be?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Ue?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Ie?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ne?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===ze?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Oe&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class pt extends L{constructor(e,t,i=null,r=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=i,this.clearColor=r,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new z}render(e,t,i){const r=e.autoClear;e.autoClear=!1;let s,o;this.overrideMaterial!==null&&(o=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:i),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=o),e.autoClear=r}}const ct={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new z(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class O extends L{constructor(e,t=1,i,r){super(),this.strength=t,this.radius=i,this.threshold=r,this.resolution=e!==void 0?new x(e.x,e.y):new x(256,256),this.clearColor=new z(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new j(s,o,{type:X}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let a=0;a<this.nMips;a++){const f=new j(s,o,{type:X});f.texture.name="UnrealBloomPass.h"+a,f.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(f);const c=new j(s,o,{type:X});c.texture.name="UnrealBloomPass.v"+a,c.texture.generateMipmaps=!1,this.renderTargetsVertical.push(c),s=Math.round(s/2),o=Math.round(o/2)}const u=ct;this.highPassUniforms=Z.clone(u.uniforms),this.highPassUniforms.luminosityThreshold.value=r,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new N({uniforms:this.highPassUniforms,vertexShader:u.vertexShader,fragmentShader:u.fragmentShader}),this.separableBlurMaterials=[];const n=[6,10,14,18,22];s=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let a=0;a<this.nMips;a++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(n[a])),this.separableBlurMaterials[a].uniforms.invSize.value=new x(1/s,1/o),s=Math.round(s/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const A=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=A,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Z.clone(K.uniforms),this.blendMaterial=new N({uniforms:this.copyUniforms,vertexShader:K.vertexShader,fragmentShader:K.fragmentShader,premultipliedAlpha:!0,blending:ke,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new z,this._oldClearAlpha=1,this._basic=new Le,this._fsQuad=new fe(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let i=Math.round(e/2),r=Math.round(t/2);this.renderTargetBright.setSize(i,r);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(i,r),this.renderTargetsVertical[s].setSize(i,r),this.separableBlurMaterials[s].uniforms.invSize.value=new x(1/i,1/r),i=Math.round(i/2),r=Math.round(r/2)}render(e,t,i,r,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const o=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=i.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=i.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let u=this.renderTargetBright;for(let n=0;n<this.nMips;n++)this._fsQuad.material=this.separableBlurMaterials[n],this.separableBlurMaterials[n].uniforms.colorTexture.value=u.texture,this.separableBlurMaterials[n].uniforms.direction.value=O.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[n]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[n].uniforms.colorTexture.value=this.renderTargetsHorizontal[n].texture,this.separableBlurMaterials[n].uniforms.direction.value=O.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[n]),e.clear(),this._fsQuad.render(e),u=this.renderTargetsVertical[n];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(i),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=o}_getSeparableBlurMaterial(e){const t=[],i=e/3;for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(i*i))/i);return new N({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new x(.5,.5)},direction:{value:new x(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new N({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}O.BlurDirectionX=new x(1,0);O.BlurDirectionY=new x(0,1);var dt=k("<!> <!>",1),mt=k("<!> <!> <!>",1),gt=k("<!> <!>",1);function vt(g,e){he(e,!0);let t=et(e,"ref",15),i=st(e,["$$slots","$$events","$$legacy","fallback","error","children","ref"]);const r=rt(),s=it("/spaceship-tutorial/models/spaceship-transformed.glb",{dracoLoader:r}),o=xe("/spaceship-tutorial/textures/energy-beam-opacity.png");function u(a){a.transparent=!0,a.alphaToCoverage=!0,a.depthFunc=Ve,a.depthTest=!0,a.depthWrite=!0}s.then(a=>{u(a.materials.spaceship_racer),u(a.materials.cockpit)});var n=I(),A=M(n);C(A,()=>T.Group,(a,f)=>{f(a,tt({dispose:!1},()=>i,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:0},get ref(){return t()},set ref(c){t(c)},children:(c,q)=>{var S=gt(),_=M(S);ne(_,()=>s,v=>{var h=I(),p=M(h);oe(p,()=>e.fallback??ie),b(v,h)},(v,h)=>{var p=I(),P=M(p);C(P,()=>T.Group,(B,G)=>{G(B,{scale:.003,rotation:[0,-Math.PI*.5,0],position:[.95,0,0],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:1},children:($,pe)=>{var Q=mt(),U=M(Q);C(U,()=>T.Mesh,(y,D)=>{D(y,{castShadow:!0,receiveShadow:!0,get geometry(){return l(h).nodes.Cube001_spaceship_racer_0.geometry},get material(){return l(h).materials.spaceship_racer},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:2}})});var H=R(U,2);C(H,()=>T.Mesh,(y,D)=>{D(y,{castShadow:!0,receiveShadow:!0,get geometry(){return l(h).nodes.Cube005_cockpit_0.geometry},get material(){return l(h).materials.cockpit},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:3}})});var W=R(H,2);ne(W,()=>o,null,(y,D)=>{var V=I(),J=M(V);C(J,()=>T.Mesh,(d,m)=>{m(d,{position:[0,0,-1350],"rotation.x":Math.PI*.5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:4},children:(E,ee)=>{var ce=dt(),de=M(ce);C(de,()=>T.CylinderGeometry,(te,se)=>{se(te,{args:[70,25,1600,15],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:5}})});var Me=R(de,2);C(Me,()=>T.MeshBasicMaterial,(te,se)=>{se(te,{color:[1,.4,.02],get alphaMap(){return l(D)},transparent:!0,get blending(){return Qe},get blendDst(){return $e},get blendEquation(){return Ge},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:6}})}),b(E,ce)},$$slots:{default:!0}})}),b(y,V)}),b($,Q)},$$slots:{default:!0}})}),b(v,p)},(v,h)=>{var p=I(),P=M(p);oe(P,()=>e.error??ie,()=>({error:l(h)})),b(v,p)});var w=R(_,2);oe(w,()=>e.children??ie,()=>({ref:t()})),b(c,S)},$$slots:{default:!0}}))}),b(g,n),ue()}var _t=k("<!> <!> <!>",1);function bt(g,e){he(e,!0);let t=350,i=["#fcaa67","#C75D59","#ffffc7","#8CC5C6","#A5898C"],r=Te([]);const s=xe("/spaceship-tutorial/textures/star.png");function o(a,f){let c=Math.random()*(f-a);return a+c}function u(a){o(0,1)>.8?(a.position=[o(-10,-30),o(-5,5),o(6,-6)],a.length=o(1.5,15)):(a.position=[o(-15,-45),o(-10.5,1.5),o(30,-45)],a.length=o(2.5,20)),a.speed=o(19.5,42),a.color.set(i[Math.floor(Math.random()*i.length)]??"white").convertSRGBToLinear().multiplyScalar(1.3)}for(let a=0;a<t;a++){const f={id:He.generateUUID(),position:[0,0,0],length:0,speed:0,color:new z};u(f),r.push(f)}be(a=>{for(const f of r)f.position[0]+=f.speed*a,f.position[0]>40&&u(f)});var n=I(),A=M(n);ne(A,()=>s,null,(a,f)=>{ot(a,{limit:t,range:t,children:(c,q)=>{var S=_t(),_=M(S);C(_,()=>T.PlaneGeometry,(h,p)=>{p(h,{args:[1,.05],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Stars.svelte",index:0}})});var w=R(_,2);C(w,()=>T.MeshBasicMaterial,(h,p)=>{p(h,{get side(){return We},get alphaMap(){return l(f)},transparent:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Stars.svelte",index:1}})});var v=R(w,2);at(v,17,()=>r,({id:h,position:p,length:P,color:B})=>h,(h,p)=>{let P=()=>l(p).position,B=()=>l(p).length,G=()=>l(p).color;{let $=le(()=>[B(),1,1]);lt(h,{get position(){return P()},get scale(){return l($)},get color(){return G()}})}}),b(c,S)},$$slots:{default:!0}})}),b(g,n),ue()}var xt=k("<!> <!> <!> <!>",1);function Mt(g,e){he(e,!0);const t=()=>ge(n,"$camera",r),i=()=>ge(u,"$size",r),[r,s]=qe(),{scene:o,size:u,camera:n,renderer:A}=ve();let a,f=0,c=0,q=new Ye(A),S,_=re(void 0),w=re(0),v=re(0);const h=new ut(A),p=new pt(o,t()),P=new O(new x(i().width,i().height),.275,1,0),B=new ft;h.addPass(p),h.addPass(P),h.addPass(B),me(()=>{h.setSize(i().width,i().height),P.resolution.set(i().width,i().height)}),me(()=>{p.camera=t()});const{renderStage:G}=ve();be(()=>{if(a){const d=a?.y||0;f+=(d-l(w))*.002,f*=.95,ae(w,l(w)+f);const E=a.clone().sub(new F(0,l(w),0)).normalize().dot(new F(0,1,0)),ee=Math.acos(E)-Math.PI*.5;c+=(ee-l(v))*.01,c*=.85,ae(v,l(v)+c)}S&&S.dispose(),l(_)&&(l(_).visible=!1,o.background=null,S=q.fromScene(o,0,.1,1e3),o.background=new z("#598889").multiplyScalar(.05),l(_).visible=!0,l(_).traverse(d=>{if("material"in d){const m=d.material;"envMapIntensity"in m&&(m.envMap=S.texture,m.envMapIntensity=100,m.normalScale.set(.3,.3))}})),h.render()},{stage:G});const $=new je(20,20),pe=new Xe($),Q=new Ke,U=new x;function H(d){U.x=d.clientX/window.innerWidth*2-1,U.y=-(d.clientY/window.innerHeight)*2+1,Q.setFromCamera(U,t()),a=Q.intersectObject(pe)[0]?.point,a&&(a.x=3)}var W=xt();Ze("pointermove",Ce,H);var y=M(W);C(y,()=>T.PerspectiveCamera,(d,m)=>{m(d,{makeDefault:!0,position:[-10,6,15],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Scene.svelte",index:0},children:(E,ee)=>{Je(E,{enableDamping:!0,enableZoom:!1,target:[0,0,0]})},$$slots:{default:!0}})});var D=R(y,2);C(D,()=>T.DirectionalLight,(d,m)=>{m(d,{intensity:1.8,position:[0,10,0],castShadow:!0,"shadow.bias":-1e-4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Scene.svelte",index:1}})});var V=R(D,2);{let d=le(()=>[0,l(w),0]),m=le(()=>[l(v),0,l(v),"ZXY"]);vt(V,{get position(){return l(d)},get rotation(){return l(m)},get ref(){return l(_)},set ref(E){ae(_,E,!0)}})}var J=R(V,2);bt(J,{}),b(g,W),ue(),s()}var Tt=k('<div class="svelte-1tcrzz0"><!></div>');function ls(g){var e=Tt(),t=Se(e);Pe(t,{autoRender:!1,children:(i,r)=>{Mt(i,{})},$$slots:{default:!0}}),we(e),b(g,e)}export{ls as default};
