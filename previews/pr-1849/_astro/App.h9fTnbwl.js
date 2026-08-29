import"./disclose-version.DsnmJJEf.js";import"./legacy.CFq86F04.js";import{p as oe,f as M,g as n,n as ee,s as S,a as le,P as Me,u as ie,L as fe,d as te,bi as Te,b as se,c as be,r as Ce}from"./runtime.Cq5xh0TU.js";import{c as U,f as z,a as v}from"./template.L6xDPO6U.js";import{C as Se}from"./Canvas.DCMAFG-V.js";import{aI as I,bp as Y,V as _,aw as W,aV as j,aJ as we,eB as Pe,fD as Re,ag as ye,dN as Ae,bA as De,by as Ee,bB as Be,bC as Fe,bx as Ue,bz as Ie,eO as Ne,C as N,r as F,bw as Oe,M as ze,T,cj as ke,cN as Le,ci as Ge,cX as Qe,a4 as Ve,D as $e,gb as He,bn as We,Z as je,aY as Xe}from"./observe.svelte.TvC_xpcN.js";import{e as Ye}from"./events.-BVBOS9k.js";import{c as b}from"./svelte-component.B_Rq4ZKt.js";/* empty css                                                      */import{u as pe}from"./useThrelte.VmojktKP.js";import{u as de}from"./useTask.svelte.BxJSwWIP.js";import{a as me}from"./raycast.C0iVgLjf.js";import{O as Ke}from"./OrbitControls.DvI1KsXZ.js";import{s as re}from"./snippet.B1WTn4og.js";import{a as ae}from"./await.CvR1qv4C.js";import{p as Ze,s as qe,r as Je}from"./props.D2nmUwxA.js";import{u as et}from"./useGltf.ChIJQM4j.js";import{u as tt}from"./useDraco.NKl3UzNf.js";import{e as st}from"./each.BnTYX0wD.js";import{I as rt,a as it}from"./Instance.Dr-lCkLh.js";import{P as k,F as ne}from"./Pass.CVuA8L7c.js";/* empty css                                                   */import"./if.eGY2C9_P.js";import"./branches.CjZ4fCu_.js";import"./this.BCeOz4X_.js";import"./Context.7Jzo4MMn.js";import"./create-subscriber.Cxqb2LK-.js";import"./index.D-QOJTr1.js";import"./store.3KrUyxeZ.js";import"./index-client.CbnisDQz.js";import"./useStage.BE_Gz_ew.js";import"./injectPlugin.PIq3zzX0.js";import"./transitions.Bigw4laK.js";import"./loop.BGGTUj09.js";import"./render.DOVvO0Mi.js";import"./OrbitControls.D1AV46m0.js";import"./useControlsContext.svelte.Dv7Tlgil.js";import"./GLTFLoader.CvlpEr2o.js";import"./BufferGeometryUtils.CT7woJjE.js";const X={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`};class at extends k{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof I?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Y.clone(e.uniforms),this.material=new I({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new ne(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ce extends k{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){const a=e.getContext(),s=e.state;s.buffers.color.setMask(!1),s.buffers.depth.setMask(!1),s.buffers.color.setLocked(!0),s.buffers.depth.setLocked(!0);let i,h;this.inverse?(i=0,h=1):(i=1,h=0),s.buffers.stencil.setTest(!0),s.buffers.stencil.setOp(a.REPLACE,a.REPLACE,a.REPLACE),s.buffers.stencil.setFunc(a.ALWAYS,i,4294967295),s.buffers.stencil.setClear(h),s.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),s.buffers.color.setLocked(!1),s.buffers.depth.setLocked(!1),s.buffers.color.setMask(!0),s.buffers.depth.setMask(!0),s.buffers.stencil.setLocked(!1),s.buffers.stencil.setFunc(a.EQUAL,1,4294967295),s.buffers.stencil.setOp(a.KEEP,a.KEEP,a.KEEP),s.buffers.stencil.setLocked(!0)}}class ot extends k{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}}class lt{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const r=e.getSize(new _);this._width=r.width,this._height=r.height,t=new W(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:j}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new at(X),this.copyPass.material.blending=we,this.clock=new Pe}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let r=!1;for(let a=0,s=this.passes.length;a<s;a++){const i=this.passes[a];if(i.enabled!==!1){if(i.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(a),i.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),i.needsSwap){if(r){const h=this.renderer.getContext(),l=this.renderer.state.buffers.stencil;l.setFunc(h.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),l.setFunc(h.EQUAL,1,4294967295)}this.swapBuffers()}ce!==void 0&&(i instanceof ce?r=!0:i instanceof ot&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new _);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const r=this._width*this._pixelRatio,a=this._height*this._pixelRatio;this.renderTarget1.setSize(r,a),this.renderTarget2.setSize(r,a);for(let s=0;s<this.passes.length;s++)this.passes[s].setSize(r,a)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}}const H={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`};class nt extends k{constructor(){super(),this.uniforms=Y.clone(H.uniforms),this.material=new Re({name:H.name,uniforms:this.uniforms,vertexShader:H.vertexShader,fragmentShader:H.fragmentShader}),this._fsQuad=new ne(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,r){this.uniforms.tDiffuse.value=r.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},ye.getTransfer(this._outputColorSpace)===Ae&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===De?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===Ee?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===Be?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===Fe?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===Ue?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===Ie?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===Ne&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}}class ut extends k{constructor(e,t,r=null,a=null,s=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=a,this.clearAlpha=s,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new N}render(e,t,r){const a=e.autoClear;e.autoClear=!1;let s,i;this.overrideMaterial!==null&&(i=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(s=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(s),this.overrideMaterial!==null&&(this.scene.overrideMaterial=i),e.autoClear=a}}const ht={uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new N(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`};class O extends k{constructor(e,t=1,r,a){super(),this.strength=t,this.radius=r,this.threshold=a,this.resolution=e!==void 0?new _(e.x,e.y):new _(256,256),this.clearColor=new N(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let s=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);this.renderTargetBright=new W(s,i,{type:j}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let o=0;o<this.nMips;o++){const u=new W(s,i,{type:j});u.texture.name="UnrealBloomPass.h"+o,u.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(u);const m=new W(s,i,{type:j});m.texture.name="UnrealBloomPass.v"+o,m.texture.generateMipmaps=!1,this.renderTargetsVertical.push(m),s=Math.round(s/2),i=Math.round(i/2)}const h=ht;this.highPassUniforms=Y.clone(h.uniforms),this.highPassUniforms.luminosityThreshold.value=a,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new I({uniforms:this.highPassUniforms,vertexShader:h.vertexShader,fragmentShader:h.fragmentShader}),this.separableBlurMaterials=[];const l=[3,5,7,9,11];s=Math.round(this.resolution.x/2),i=Math.round(this.resolution.y/2);for(let o=0;o<this.nMips;o++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(l[o])),this.separableBlurMaterials[o].uniforms.invSize.value=new _(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=t,this.compositeMaterial.uniforms.bloomRadius.value=.1;const y=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=y,this.bloomTintColors=[new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1),new F(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Y.clone(X.uniforms),this.blendMaterial=new I({uniforms:this.copyUniforms,vertexShader:X.vertexShader,fragmentShader:X.fragmentShader,blending:Oe,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new N,this._oldClearAlpha=1,this._basic=new ze,this._fsQuad=new ne(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,t){let r=Math.round(e/2),a=Math.round(t/2);this.renderTargetBright.setSize(r,a);for(let s=0;s<this.nMips;s++)this.renderTargetsHorizontal[s].setSize(r,a),this.renderTargetsVertical[s].setSize(r,a),this.separableBlurMaterials[s].uniforms.invSize.value=new _(1/r,1/a),r=Math.round(r/2),a=Math.round(a/2)}render(e,t,r,a,s){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();const i=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),s&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=r.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=r.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let h=this.renderTargetBright;for(let l=0;l<this.nMips;l++)this._fsQuad.material=this.separableBlurMaterials[l],this.separableBlurMaterials[l].uniforms.colorTexture.value=h.texture,this.separableBlurMaterials[l].uniforms.direction.value=O.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[l]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[l].uniforms.colorTexture.value=this.renderTargetsHorizontal[l].texture,this.separableBlurMaterials[l].uniforms.direction.value=O.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[l]),e.clear(),this._fsQuad.render(e),h=this.renderTargetsVertical[l];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,s&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(r),this._fsQuad.render(e)),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=i}_getSeparableBlurMaterial(e){const t=[];for(let r=0;r<e;r++)t.push(.39894*Math.exp(-.5*r*r/(e*e))/e);return new I({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new _(.5,.5)},direction:{value:new _(.5,.5)},gaussianCoefficients:{value:t}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`#include <common>
				varying vec2 vUv;
				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {
					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;
					for( int i = 1; i < KERNEL_RADIUS; i ++ ) {
						float x = float(i);
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += (sample1 + sample2) * w;
						weightSum += 2.0 * w;
					}
					gl_FragColor = vec4(diffuseSum/weightSum, 1.0);
				}`})}_getCompositeMaterial(e){return new I({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
				void main() {
					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
				}`,fragmentShader:`varying vec2 vUv;
				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor(const in float factor) {
					float mirrorFactor = 1.2 - factor;
					return mix(factor, mirrorFactor, bloomRadius);
				}

				void main() {
					gl_FragColor = bloomStrength * ( lerpBloomFactor(bloomFactors[0]) * vec4(bloomTintColors[0], 1.0) * texture2D(blurTexture1, vUv) +
						lerpBloomFactor(bloomFactors[1]) * vec4(bloomTintColors[1], 1.0) * texture2D(blurTexture2, vUv) +
						lerpBloomFactor(bloomFactors[2]) * vec4(bloomTintColors[2], 1.0) * texture2D(blurTexture3, vUv) +
						lerpBloomFactor(bloomFactors[3]) * vec4(bloomTintColors[3], 1.0) * texture2D(blurTexture4, vUv) +
						lerpBloomFactor(bloomFactors[4]) * vec4(bloomTintColors[4], 1.0) * texture2D(blurTexture5, vUv) );
				}`})}}O.BlurDirectionX=new _(1,0);O.BlurDirectionY=new _(0,1);var ft=z("<!> <!>",1),pt=z("<!> <!> <!>",1),ct=z("<!> <!>",1);function dt(g,e){oe(e,!0);let t=Ze(e,"ref",15),r=Je(e,["$$slots","$$events","$$legacy","fallback","error","children","ref"]);const a=tt(),s=et("/spaceship-tutorial/models/spaceship-transformed.glb",{dracoLoader:a}),i=me("/spaceship-tutorial/textures/energy-beam-opacity.png");function h(o){o.transparent=!0,o.alphaToCoverage=!0,o.depthFunc=Qe,o.depthTest=!0,o.depthWrite=!0}s.then(o=>{h(o.materials.spaceship_racer),h(o.materials.cockpit)});var l=U(),y=M(l);b(y,()=>T.Group,(o,u)=>{u(o,qe({dispose:!1},()=>r,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:0},get ref(){return t()},set ref(m){t(m)},children:(m,A)=>{var x=ct(),w=M(x);ae(w,()=>s,C=>{var f=U(),c=M(f);re(c,()=>e.fallback??ee),v(C,f)},(C,f)=>{var c=U(),P=M(c);b(P,()=>T.Group,(E,B)=>{B(E,{scale:.003,rotation:[0,-Math.PI*.5,0],position:[.95,0,0],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:1},children:(L,K)=>{var G=pt(),Q=M(G);b(Q,()=>T.Mesh,(p,d)=>{d(p,{castShadow:!0,receiveShadow:!0,get geometry(){return n(f).nodes.Cube001_spaceship_racer_0.geometry},get material(){return n(f).materials.spaceship_racer},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:2}})});var V=S(Q,2);b(V,()=>T.Mesh,(p,d)=>{d(p,{castShadow:!0,receiveShadow:!0,get geometry(){return n(f).nodes.Cube005_cockpit_0.geometry},get material(){return n(f).materials.cockpit},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:3}})});var Z=S(V,2);ae(Z,()=>i,null,(p,d)=>{var R=U(),$=M(R);b($,()=>T.Mesh,(ge,ve)=>{ve(ge,{position:[0,0,-1350],"rotation.x":Math.PI*.5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:4},children:(_e,Mt)=>{var ue=ft(),he=M(ue);b(he,()=>T.CylinderGeometry,(q,J)=>{J(q,{args:[70,25,1600,15],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:5}})});var xe=S(he,2);b(xe,()=>T.MeshBasicMaterial,(q,J)=>{J(q,{color:[1,.4,.02],get alphaMap(){return n(d)},transparent:!0,get blending(){return Ge},get blendDst(){return Le},get blendEquation(){return ke},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:6}})}),v(_e,ue)},$$slots:{default:!0}})}),v(p,R)}),v(L,G)},$$slots:{default:!0}})}),v(C,c)},(C,f)=>{var c=U(),P=M(c);re(P,()=>e.error??ee,()=>({error:n(f)})),v(C,c)});var D=S(w,2);re(D,()=>e.children??ee,()=>({ref:t()})),v(m,x)},$$slots:{default:!0}}))}),v(g,l),le()}var mt=z("<!> <!> <!>",1);function gt(g,e){oe(e,!0);let t=350,r=["#fcaa67","#C75D59","#ffffc7","#8CC5C6","#A5898C"],a=Me([]);const s=me("/spaceship-tutorial/textures/star.png");function i(o,u){let m=Math.random()*(u-o);return o+m}function h(o){i(0,1)>.8?(o.position=[i(-10,-30),i(-5,5),i(6,-6)],o.length=i(1.5,15)):(o.position=[i(-15,-45),i(-10.5,1.5),i(30,-45)],o.length=i(2.5,20)),o.speed=i(19.5,42),o.color.set(r[Math.floor(Math.random()*r.length)]??"white").convertSRGBToLinear().multiplyScalar(1.3)}for(let o=0;o<t;o++){const u={id:Ve.generateUUID(),position:[0,0,0],length:0,speed:0,color:new N};h(u),a.push(u)}de(o=>{for(const u of a)u.position[0]+=u.speed*o,u.position[0]>40&&h(u)});var l=U(),y=M(l);ae(y,()=>s,null,(o,u)=>{rt(o,{limit:t,range:t,children:(m,A)=>{var x=mt(),w=M(x);b(w,()=>T.PlaneGeometry,(f,c)=>{c(f,{args:[1,.05],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Stars.svelte",index:0}})});var D=S(w,2);b(D,()=>T.MeshBasicMaterial,(f,c)=>{c(f,{get side(){return $e},get alphaMap(){return n(u)},transparent:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Stars.svelte",index:1}})});var C=S(D,2);st(C,17,()=>a,({id:f,position:c,length:P,color:E})=>f,(f,c)=>{let P=()=>n(c).position,E=()=>n(c).length,B=()=>n(c).color;{let L=ie(()=>[E(),1,1]);it(f,{get position(){return P()},get scale(){return n(L)},get color(){return B()}})}}),v(m,x)},$$slots:{default:!0}})}),v(g,l),le()}var vt=z("<!> <!> <!> <!>",1);function _t(g,e){oe(e,!0);const{scene:t,size:r,camera:a,renderer:s}=pe();let i,h=0,l=0,y=new He(s),o,u=te(void 0),m=te(0),A=te(0);const x=new lt(s),w=new ut(t,a.current),D=new O(new _(r.current.width,r.current.height),.275,1,0),C=new nt;x.addPass(w),x.addPass(D),x.addPass(C),fe(()=>{x.setSize(r.current.width,r.current.height),D.resolution.set(r.current.width,r.current.height)}),fe(()=>{w.camera=a.current});const{renderStage:f}=pe();de(()=>{if(i){const p=i?.y||0;h+=(p-n(m))*.002,h*=.95,se(m,n(m)+h);const R=i.clone().sub(new F(0,n(m),0)).normalize().dot(new F(0,1,0)),$=Math.acos(R)-Math.PI*.5;l+=($-n(A))*.01,l*=.85,se(A,n(A)+l)}o&&o.dispose(),n(u)&&(n(u).visible=!1,t.background=null,o=y.fromScene(t,0,.1,1e3),t.background=new N("#598889").multiplyScalar(.05),n(u).visible=!0,n(u).traverse(p=>{if("material"in p){const d=p.material;"envMapIntensity"in d&&(d.envMap=o.texture,d.envMapIntensity=100,d.normalScale.set(.3,.3))}})),x.render()},{stage:f});const c=new We(20,20),P=new je(c),E=new Xe,B=new _;function L(p){B.x=p.clientX/window.innerWidth*2-1,B.y=-(p.clientY/window.innerHeight)*2+1,E.setFromCamera(B,a.current),i=E.intersectObject(P)[0]?.point,i&&(i.x=3)}var K=vt();Ye("pointermove",Te,L);var G=M(K);b(G,()=>T.PerspectiveCamera,(p,d)=>{d(p,{makeDefault:!0,position:[-10,6,15],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Scene.svelte",index:0},children:(R,$)=>{Ke(R,{enableDamping:!0,enableZoom:!1,target:[0,0,0]})},$$slots:{default:!0}})});var Q=S(G,2);b(Q,()=>T.DirectionalLight,(p,d)=>{d(p,{intensity:1.8,position:[0,10,0],castShadow:!0,"shadow.bias":-1e-4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Scene.svelte",index:1}})});var V=S(Q,2);{let p=ie(()=>[0,n(m),0]),d=ie(()=>[n(A),0,n(A),"ZXY"]);dt(V,{get position(){return n(p)},get rotation(){return n(d)},get ref(){return n(u)},set ref(R){se(u,R,!0)}})}var Z=S(V,2);gt(Z,{}),v(g,K),le()}var xt=z('<div class="svelte-1tcrzz0"><!></div>');function os(g){var e=xt(),t=be(e);Se(t,{autoRender:!1,children:(r,a)=>{_t(r,{})},$$slots:{default:!0}}),Ce(e),v(g,e)}export{os as default};
