import"./disclose-version.DsnmJJEf.js";import"./legacy.Bo3sEplC.js";import{p as oe,f as x,g as n,n as ee,s as S,a as le,P as xe,u as ie,L as fe,d as te,bi as Me,b as se,c as Te,r as Ce}from"./runtime.DLdkg5Kz.js";import{c as U,f as z,a as v}from"./template.B2QqRX6L.js";import{C as Se}from"./Canvas.BuVTO3Iv.js";import{a0 as I,br as Y,t as _,W,ak as j,a2 as we,gf as Pe,f$ as Re,bh as Ae,cn as ye,bC as De,bA as Ee,bD as Be,bE as Fe,bz as Ue,bB as Ie,f9 as Ne,_ as N,V as F,by as Oe,M as ze,a as M,cN as ke,db as Le,cM as Ge,dn as Qe,m as Ve,D as $e,gA as He,as as We,Z as je,an as Xe}from"./observe.svelte.Cp4l21sn.js";import{e as Ye}from"./events.BHDVKm3g.js";import{c as T}from"./svelte-component.E5E5S4yf.js";/* empty css                                                      */import{u as pe}from"./useThrelte.B3LKSjsY.js";import{u as de}from"./useTask.svelte.KBguMLbe.js";import{h as me}from"./raycast.DW_ffWs-.js";import{O as Ke}from"./OrbitControls.DDLOTxJp.js";import"./index.D7yoe72k.js";import{s as re}from"./snippet.CCzzTW4D.js";import{a as ae}from"./await.C_JQfC3T.js";import{p as Ze,s as qe,r as Je}from"./props.Dt84Ixko.js";import{u as et}from"./useGltf.9lLROiHJ.js";import{u as tt}from"./useDraco.CjM5BtDM.js";import{e as st}from"./each.B2A49HXT.js";import{I as rt,a as it}from"./Instance.BOGpwSGj.js";import{P as k,F as ne}from"./Pass.Ds9d7srA.js";/* empty css                                                   */import"./if.CWhf68p6.js";import"./branches.2gxZijTC.js";import"./this.C9eRW5mT.js";import"./Context.XQTbsJFo.js";import"./create-subscriber.CY3q5QYX.js";import"./index.Dye25RjK.js";import"./store.qmFiJ8xo.js";import"./index-client.Bk7KcdZe.js";import"./BufferGeometryUtils.DmSxWwZi.js";import"./transitions._xWTTcFI.js";import"./loop.BGGTUj09.js";import"./render.jaBnYzsZ.js";import"./injectPlugin.gAkvDPq1.js";import"./OrbitControls.BvTIZk9J.js";import"./useControlsContext.svelte.eE0aSdWX.js";import"./GLTFLoader.zAVxBUGS.js";const X={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class at extends k{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof I?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Y.clone(e.uniforms),this.material=new I({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ne(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ce extends k{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){const i=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let a,h;this.inverse?(a=0,h=1):(a=1,h=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(i.REPLACE,i.REPLACE,i.REPLACE),s.buffers.stencil.setFunc(i.ALWAYS,a,4294967295),s.buffers.stencil.setClear(h),s.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(i.EQUAL,1,4294967295),s.buffers.stencil.setOp(i.KEEP,i.KEEP,i.KEEP),s.buffers.stencil.setLocked(!0)}}class ot extends k{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class lt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const r=e.getSize(new _);this._width=r.width,this._height=r.height,t=new W(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:j}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new at(X),this.copyPass.material.blending=we,this.timer=new Pe}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){this.timer.update(),e===void 0&&(e=this.timer.getDelta());const t=this.renderer.getRenderTarget();let r=!1;for(let i=0,s=this.passes.length;i<s;i++){const a=this.passes[i];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(i),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),a.needsSwap){if(r){const h=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}ce!==void 0&&(a instanceof ce?r=!0:a instanceof ot&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new _);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const r=this._width*this._pixelRatio,i=this._height*this._pixelRatio;this.renderTarget1.setSize(r,i),this.renderTarget2.setSize(r,i);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(r,i)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const H={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class nt extends k{constructor(){super(),this.isOutputPass=!0,this.uniforms=Y.clone(H.uniforms),this.material=new Re({name:H.name,uniforms:this.uniforms,vertexShader:H.vertexShader,fragmentShader:H.fragmentShader}),this._fsQuad=new ne(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,r){this.uniforms.tDiffuse.value=r.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Ae.getTransfer(this._outputColorSpace)===ye&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===De?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ee?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Be?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Fe?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ue?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ie?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ne&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ut extends k{constructor(e,t,r=null,i=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=i,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this.isRenderPass=!0,this._oldClearColor=new N}render(e,t,r){const i=e.autoClear;e.autoClear=!1;let s,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=i}}const ht={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new N(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class O extends k{constructor(e,t=1,r,i){super(),this.strength=t,this.radius=r,this.threshold=i,this.resolution=e!==void 0?new _(e.x,e.y):new _(256,256),this.clearColor=new N(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);this.renderTargetBright=new W(s,a,{type:j}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let o=0;o<this.nMips;o++){const u=new W(s,a,{type:j});u.texture.name="UnrealBloomPass.h"+o,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const m=new W(s,a,{type:j});m.texture.name="UnrealBloomPass.v"+o,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),s=Math.round(s/2),a=Math.round(a/2)}const h=ht;this.highPassUniforms=Y.clone(h.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new I({uniforms:this.highPassUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader}),this.separableBlurMaterials=[];const l=[6,10,14,18,22];s=Math.round(this.resolution.x/2),a=Math.round(this.resolution.y/2);for(let o=0;o<this.nMips;o++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[o])),this.separableBlurMaterials[o].uniforms.invSize.value=new _(1/s,1/a),s=Math.round(s/2),a=Math.round(a/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const A=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=A,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Y.clone(X.uniforms),this.blendMaterial=new I({uniforms:this.copyUniforms,vertexShader:X.vertexShader,fragmentShader:X.fragmentShader,premultipliedAlpha:!0,blending:Oe,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new N,this._oldClearAlpha=1,this._basic=new ze,this._fsQuad=new ne(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),i=Math.round(t/2);this.renderTargetBright.setSize(r,i);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(r,i),this.renderTargetsVertical[s].setSize(r,i),this.separableBlurMaterials[s].uniforms.invSize.value=new _(1/r,1/i),r=Math.round(r/2),i=Math.round(i/2)}render(e,t,r,i,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let h=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=h.texture,this.separableBlurMaterials[l].uniforms.direction.value=O.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=O.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),h=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(r),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){const t=[],r=e/3;for(let i=0;i<e;i++)t.push(.39894*Math.exp(-.5*i*i/(r*r))/r);return new I({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new _(.5,.5)},direction:{value:new _(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`

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

				}`})}_getCompositeMaterial(e){return new I({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

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

				}`})}}O.BlurDirectionX=new _(1,0);O.BlurDirectionY=new _(0,1);var ft=z("<!> <!>",1),pt=z("<!> <!> <!>",1),ct=z("<!> <!>",1);function dt(g,e){oe(e,!0);let t=Ze(e,"ref",15),r=Je(e,["$$slots","$$events","$$legacy","fallback","error","children","ref"]);const i=tt(),s=et("/spaceship-tutorial/models/spaceship-transformed.glb",{dracoLoader:i}),a=me("/spaceship-tutorial/textures/energy-beam-opacity.png");function h(o){o.transparent=!0,o.alphaToCoverage=!0,o.depthFunc=Qe,o.depthTest=!0,o.depthWrite=!0}s.then(o=>{h(o.materials.spaceship_racer),h(o.materials.cockpit)});var l=U(),A=x(l);T(A,()=>M.Group,(o,u)=>{u(o,qe({dispose:!1},()=>r,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:0},get ref(){return t()},set ref(m){t(m)},children:(m,y)=>{var b=ct(),w=x(b);ae(w,()=>s,C=>{var f=U(),c=x(f);re(c,()=>e.fallback??ee),v(C,f)},(C,f)=>{var c=U(),P=x(c);T(P,()=>M.Group,(E,B)=>{B(E,{scale:.003,rotation:[0,-Math.PI*.5,0],position:[.95,0,0],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:1},children:(L,K)=>{var G=pt(),Q=x(G);T(Q,()=>M.Mesh,(p,d)=>{d(p,{castShadow:!0,receiveShadow:!0,get geometry(){return n(f).nodes.Cube001_spaceship_racer_0.geometry},get material(){return n(f).materials.spaceship_racer},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:2}})});var V=S(Q,2);T(V,()=>M.Mesh,(p,d)=>{d(p,{castShadow:!0,receiveShadow:!0,get geometry(){return n(f).nodes.Cube005_cockpit_0.geometry},get material(){return n(f).materials.cockpit},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:3}})});var Z=S(V,2);ae(Z,()=>a,null,(p,d)=>{var R=U(),$=x(R);T($,()=>M.Mesh,(ge,ve)=>{ve(ge,{position:[0,0,-1350],"rotation.x":Math.PI*.5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:4},children:(_e,xt)=>{var ue=ft(),he=x(ue);T(he,()=>M.CylinderGeometry,(q,J)=>{J(q,{args:[70,25,1600,15],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:5}})});var be=S(he,2);T(be,()=>M.MeshBasicMaterial,(q,J)=>{J(q,{color:[1,.4,.02],get alphaMap(){return n(d)},transparent:!0,get blending(){return Ge},get blendDst(){return Le},get blendEquation(){return ke},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:6}})}),v(_e,ue)},$$slots:{default:!0}})}),v(p,R)}),v(L,G)},$$slots:{default:!0}})}),v(C,c)},(C,f)=>{var c=U(),P=x(c);re(P,()=>e.error??ee,()=>({error:n(f)})),v(C,c)});var D=S(w,2);re(D,()=>e.children??ee,()=>({ref:t()})),v(m,b)},$$slots:{default:!0}}))}),v(g,l),le()}var mt=z("<!> <!> <!>",1);function gt(g,e){oe(e,!0);let t=350,r=["#fcaa67","#C75D59","#ffffc7","#8CC5C6","#A5898C"],i=xe([]);const s=me("/spaceship-tutorial/textures/star.png");function a(o,u){let m=Math.random()*(u-o);return o+m}function h(o){a(0,1)>.8?(o.position=[a(-10,-30),a(-5,5),a(6,-6)],o.length=a(1.5,15)):(o.position=[a(-15,-45),a(-10.5,1.5),a(30,-45)],o.length=a(2.5,20)),o.speed=a(19.5,42),o.color.set(r[Math.floor(Math.random()*r.length)]??"white").convertSRGBToLinear().multiplyScalar(1.3)}for(let o=0;o<t;o++){const u={id:Ve.generateUUID(),position:[0,0,0],length:0,speed:0,color:new N};h(u),i.push(u)}de(o=>{for(const u of i)u.position[0]+=u.speed*o,u.position[0]>40&&h(u)});var l=U(),A=x(l);ae(A,()=>s,null,(o,u)=>{rt(o,{limit:t,range:t,children:(m,y)=>{var b=mt(),w=x(b);T(w,()=>M.PlaneGeometry,(f,c)=>{c(f,{args:[1,.05],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Stars.svelte",index:0}})});var D=S(w,2);T(D,()=>M.MeshBasicMaterial,(f,c)=>{c(f,{get side(){return $e},get alphaMap(){return n(u)},transparent:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Stars.svelte",index:1}})});var C=S(D,2);st(C,17,()=>i,({id:f,position:c,length:P,color:E})=>f,(f,c)=>{let P=()=>n(c).position,E=()=>n(c).length,B=()=>n(c).color;{let L=ie(()=>[E(),1,1]);it(f,{get position(){return P()},get scale(){return n(L)},get color(){return B()}})}}),v(m,b)},$$slots:{default:!0}})}),v(g,l),le()}var vt=z("<!> <!> <!> <!>",1);function _t(g,e){oe(e,!0);const{scene:t,size:r,camera:i,renderer:s}=pe();let a,h=0,l=0,A=new He(s),o,u=te(void 0),m=te(0),y=te(0);const b=new lt(s),w=new ut(t,i.current),D=new O(new _(r.current.width,r.current.height),.275,1,0),C=new nt;b.addPass(w),b.addPass(D),b.addPass(C),fe(()=>{b.setSize(r.current.width,r.current.height),D.resolution.set(r.current.width,r.current.height)}),fe(()=>{w.camera=i.current});const{renderStage:f}=pe();de(()=>{if(a){const p=a?.y||0;h+=(p-n(m))*.002,h*=.95,se(m,n(m)+h);const R=a.clone().sub(new F(0,n(m),0)).normalize().dot(new F(0,1,0)),$=Math.acos(R)-Math.PI*.5;l+=($-n(y))*.01,l*=.85,se(y,n(y)+l)}o&&o.dispose(),n(u)&&(n(u).visible=!1,t.background=null,o=A.fromScene(t,0,.1,1e3),t.background=new N("#598889").multiplyScalar(.05),n(u).visible=!0,n(u).traverse(p=>{if("material"in p){const d=p.material;"envMapIntensity"in d&&(d.envMap=o.texture,d.envMapIntensity=100,d.normalScale.set(.3,.3))}})),b.render()},{stage:f});const c=new We(20,20),P=new je(c),E=new Xe,B=new _;function L(p){B.x=p.clientX/window.innerWidth*2-1,B.y=-(p.clientY/window.innerHeight)*2+1,E.setFromCamera(B,i.current),a=E.intersectObject(P)[0]?.point,a&&(a.x=3)}var K=vt();Ye("pointermove",Me,L);var G=x(K);T(G,()=>M.PerspectiveCamera,(p,d)=>{d(p,{makeDefault:!0,position:[-10,6,15],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Scene.svelte",index:0},children:(R,$)=>{Ke(R,{enableDamping:!0,enableZoom:!1,target:[0,0,0]})},$$slots:{default:!0}})});var Q=S(G,2);T(Q,()=>M.DirectionalLight,(p,d)=>{d(p,{intensity:1.8,position:[0,10,0],castShadow:!0,"shadow.bias":-1e-4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Scene.svelte",index:1}})});var V=S(Q,2);{let p=ie(()=>[0,n(m),0]),d=ie(()=>[n(y),0,n(y),"ZXY"]);dt(V,{get position(){return n(p)},get rotation(){return n(d)},get ref(){return n(u)},set ref(R){se(u,R,!0)}})}var Z=S(V,2);gt(Z,{}),v(g,K),le()}var bt=z('<div class="svelte-1tcrzz0"><!></div>');function os(g){var e=bt(),t=Te(e);Se(t,{autoRender:!1,children:(r,i)=>{_t(r,{})},$$slots:{default:!0}}),Ce(e),v(g,e)}export{os as default};
