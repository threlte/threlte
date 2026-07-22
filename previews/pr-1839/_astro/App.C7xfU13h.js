import"./disclose-version.DwdwGuwu.js";import{Ft as C,G as re,It as R,Kt as ae,Lt as Te,Nt as Ce,Pt as be,R as b,Ut as ee,V as Se,Vt as te,Xt as le,Yt as ne,Z as se,ht as n,i as we,it as O,kt as de,lt as Pe,n as Re,nn as ye,nt as x,o as Ae,on as ie,r as De,rt as I,s as me}from"./client.CmGS4DHB.js";import"./legacy.BVIVHw1B.js";import{D as Ue,Do as Y,Or as Ee,_o as M,a as _e,bn as j,ei as Be,f as Fe,ia as Ie,kr as Ne,l as S,lo as Z,na as ze,s as ge,vo as E,vt as Oe,wr as ke,xt as Le,ya as N,yt as z}from"./lib.BP7gumtS.js";import{At as xe,Nt as Ge,Q as $e,X as Qe,Y as Ve}from"./lib.CCfBeaz9.js";import{t as He}from"./useDraco.CgL8HOet.js";import{n as k,t as he}from"./Pass.BE1N5Sqb.js";var K={name:"CopyShader",uniforms:{tDiffuse:{value:null},opacity:{value:1}},vertexShader:`

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


		}`},We=class extends k{constructor(e,t="tDiffuse"){super(),this.textureID=t,this.uniforms=null,this.material=null,e instanceof N?(this.uniforms=e.uniforms,this.material=e):e&&(this.uniforms=Z.clone(e.uniforms),this.material=new N({name:e.name!==void 0?e.name:"unspecified",defines:Object.assign({},e.defines),uniforms:this.uniforms,vertexShader:e.vertexShader,fragmentShader:e.fragmentShader})),this._fsQuad=new he(this.material)}render(e,t,r){this.uniforms[this.textureID]&&(this.uniforms[this.textureID].value=r.texture),this._fsQuad.material=this.material,this.renderToScreen?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},ve=class extends k{constructor(e,t){super(),this.scene=e,this.camera=t,this.clear=!0,this.needsSwap=!1,this.inverse=!1}render(e,t,r){const s=e.getContext(),i=e.state;i.buffers.color.setMask(!1),i.buffers.depth.setMask(!1),i.buffers.color.setLocked(!0),i.buffers.depth.setLocked(!0);let a,o;this.inverse?(a=0,o=1):(a=1,o=0),i.buffers.stencil.setTest(!0),i.buffers.stencil.setOp(s.REPLACE,s.REPLACE,s.REPLACE),i.buffers.stencil.setFunc(s.ALWAYS,a,4294967295),i.buffers.stencil.setClear(o),i.buffers.stencil.setLocked(!0),e.setRenderTarget(r),this.clear&&e.clear(),e.render(this.scene,this.camera),e.setRenderTarget(t),this.clear&&e.clear(),e.render(this.scene,this.camera),i.buffers.color.setLocked(!1),i.buffers.depth.setLocked(!1),i.buffers.color.setMask(!0),i.buffers.depth.setMask(!0),i.buffers.stencil.setLocked(!1),i.buffers.stencil.setFunc(s.EQUAL,1,4294967295),i.buffers.stencil.setOp(s.KEEP,s.KEEP,s.KEEP),i.buffers.stencil.setLocked(!0)}},Xe=class extends k{constructor(){super(),this.needsSwap=!1}render(e){e.state.buffers.stencil.setLocked(!1),e.state.buffers.stencil.setTest(!1)}},Ye=class{constructor(e,t){if(this.renderer=e,this._pixelRatio=e.getPixelRatio(),t===void 0){const r=e.getSize(new M);this._width=r.width,this._height=r.height,t=new Y(this._width*this._pixelRatio,this._height*this._pixelRatio,{type:j}),t.texture.name="EffectComposer.rt1"}else this._width=t.width,this._height=t.height;this.renderTarget1=t,this.renderTarget2=t.clone(),this.renderTarget2.texture.name="EffectComposer.rt2",this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2,this.renderToScreen=!0,this.passes=[],this.copyPass=new We(K),this.copyPass.material.blending=0,this.clock=new Oe}swapBuffers(){const e=this.readBuffer;this.readBuffer=this.writeBuffer,this.writeBuffer=e}addPass(e){this.passes.push(e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}insertPass(e,t){this.passes.splice(t,0,e),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}removePass(e){const t=this.passes.indexOf(e);t!==-1&&this.passes.splice(t,1)}isLastEnabledPass(e){for(let t=e+1;t<this.passes.length;t++)if(this.passes[t].enabled)return!1;return!0}render(e){e===void 0&&(e=this.clock.getDelta());const t=this.renderer.getRenderTarget();let r=!1;for(let s=0,i=this.passes.length;s<i;s++){const a=this.passes[s];if(a.enabled!==!1){if(a.renderToScreen=this.renderToScreen&&this.isLastEnabledPass(s),a.render(this.renderer,this.writeBuffer,this.readBuffer,e,r),a.needsSwap){if(r){const o=this.renderer.getContext(),f=this.renderer.state.buffers.stencil;f.setFunc(o.NOTEQUAL,1,4294967295),this.copyPass.render(this.renderer,this.writeBuffer,this.readBuffer,e),f.setFunc(o.EQUAL,1,4294967295)}this.swapBuffers()}ve!==void 0&&(a instanceof ve?r=!0:a instanceof Xe&&(r=!1))}}this.renderer.setRenderTarget(t)}reset(e){if(e===void 0){const t=this.renderer.getSize(new M);this._pixelRatio=this.renderer.getPixelRatio(),this._width=t.width,this._height=t.height,e=this.renderTarget1.clone(),e.setSize(this._width*this._pixelRatio,this._height*this._pixelRatio)}this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.renderTarget1=e,this.renderTarget2=e.clone(),this.writeBuffer=this.renderTarget1,this.readBuffer=this.renderTarget2}setSize(e,t){this._width=e,this._height=t;const r=this._width*this._pixelRatio,s=this._height*this._pixelRatio;this.renderTarget1.setSize(r,s),this.renderTarget2.setSize(r,s);for(let i=0;i<this.passes.length;i++)this.passes[i].setSize(r,s)}setPixelRatio(e){this._pixelRatio=e,this.setSize(this._width,this._height)}dispose(){this.renderTarget1.dispose(),this.renderTarget2.dispose(),this.copyPass.dispose()}},X={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
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

		}`},je=class extends k{constructor(){super(),this.uniforms=Z.clone(X.uniforms),this.material=new ze({name:X.name,uniforms:this.uniforms,vertexShader:X.vertexShader,fragmentShader:X.fragmentShader}),this._fsQuad=new he(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,t,r){this.uniforms.tDiffuse.value=r.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},Le.getTransfer(this._outputColorSpace)==="srgb"&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===1?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===2?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===3?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===4?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===6?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===7?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===5&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),this.renderToScreen===!0?(e.setRenderTarget(null),this._fsQuad.render(e)):(e.setRenderTarget(t),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),this._fsQuad.render(e))}dispose(){this.material.dispose(),this._fsQuad.dispose()}},Ke=class extends k{constructor(e,t,r=null,s=null,i=null){super(),this.scene=e,this.camera=t,this.overrideMaterial=r,this.clearColor=s,this.clearAlpha=i,this.clear=!0,this.clearDepth=!1,this.needsSwap=!1,this._oldClearColor=new z}render(e,t,r){const s=e.autoClear;e.autoClear=!1;let i,a;this.overrideMaterial!==null&&(a=this.scene.overrideMaterial,this.scene.overrideMaterial=this.overrideMaterial),this.clearColor!==null&&(e.getClearColor(this._oldClearColor),e.setClearColor(this.clearColor,e.getClearAlpha())),this.clearAlpha!==null&&(i=e.getClearAlpha(),e.setClearAlpha(this.clearAlpha)),this.clearDepth==!0&&e.clearDepth(),e.setRenderTarget(this.renderToScreen?null:r),this.clear===!0&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil),e.render(this.scene,this.camera),this.clearColor!==null&&e.setClearColor(this._oldClearColor),this.clearAlpha!==null&&e.setClearAlpha(i),this.overrideMaterial!==null&&(this.scene.overrideMaterial=a),e.autoClear=s}},Ze={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new z(0)},defaultOpacity:{value:0}},vertexShader:`

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

		}`},ue=class oe extends k{constructor(t,r=1,s,i){super(),this.strength=r,this.radius=s,this.threshold=i,this.resolution=t!==void 0?new M(t.x,t.y):new M(256,256),this.clearColor=new z(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);this.renderTargetBright=new Y(a,o,{type:j}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let l=0;l<this.nMips;l++){const h=new Y(a,o,{type:j});h.texture.name="UnrealBloomPass.h"+l,h.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(h);const w=new Y(a,o,{type:j});w.texture.name="UnrealBloomPass.v"+l,w.texture.generateMipmaps=!1,this.renderTargetsVertical.push(w),a=Math.round(a/2),o=Math.round(o/2)}const f=Ze;this.highPassUniforms=Z.clone(f.uniforms),this.highPassUniforms.luminosityThreshold.value=i,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new N({uniforms:this.highPassUniforms,vertexShader:f.vertexShader,fragmentShader:f.fragmentShader}),this.separableBlurMaterials=[];const c=[3,5,7,9,11];a=Math.round(this.resolution.x/2),o=Math.round(this.resolution.y/2);for(let l=0;l<this.nMips;l++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(c[l])),this.separableBlurMaterials[l].uniforms.invSize.value=new M(1/a,1/o),a=Math.round(a/2),o=Math.round(o/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=r,this.compositeMaterial.uniforms.bloomRadius.value=.1;const p=[1,.8,.6,.4,.2];this.compositeMaterial.uniforms.bloomFactors.value=p,this.bloomTintColors=[new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1),new E(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=Z.clone(K.uniforms),this.blendMaterial=new N({uniforms:this.copyUniforms,vertexShader:K.vertexShader,fragmentShader:K.fragmentShader,blending:2,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new z,this._oldClearAlpha=1,this._basic=new Ne,this._fsQuad=new he(null)}dispose(){for(let t=0;t<this.renderTargetsHorizontal.length;t++)this.renderTargetsHorizontal[t].dispose();for(let t=0;t<this.renderTargetsVertical.length;t++)this.renderTargetsVertical[t].dispose();this.renderTargetBright.dispose();for(let t=0;t<this.separableBlurMaterials.length;t++)this.separableBlurMaterials[t].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(t,r){let s=Math.round(t/2),i=Math.round(r/2);this.renderTargetBright.setSize(s,i);for(let a=0;a<this.nMips;a++)this.renderTargetsHorizontal[a].setSize(s,i),this.renderTargetsVertical[a].setSize(s,i),this.separableBlurMaterials[a].uniforms.invSize.value=new M(1/s,1/i),s=Math.round(s/2),i=Math.round(i/2)}render(t,r,s,i,a){t.getClearColor(this._oldClearColor),this._oldClearAlpha=t.getClearAlpha();const o=t.autoClear;t.autoClear=!1,t.setClearColor(this.clearColor,0),a&&t.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=s.texture,t.setRenderTarget(null),t.clear(),this._fsQuad.render(t)),this.highPassUniforms.tDiffuse.value=s.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,t.setRenderTarget(this.renderTargetBright),t.clear(),this._fsQuad.render(t);let f=this.renderTargetBright;for(let c=0;c<this.nMips;c++)this._fsQuad.material=this.separableBlurMaterials[c],this.separableBlurMaterials[c].uniforms.colorTexture.value=f.texture,this.separableBlurMaterials[c].uniforms.direction.value=oe.BlurDirectionX,t.setRenderTarget(this.renderTargetsHorizontal[c]),t.clear(),this._fsQuad.render(t),this.separableBlurMaterials[c].uniforms.colorTexture.value=this.renderTargetsHorizontal[c].texture,this.separableBlurMaterials[c].uniforms.direction.value=oe.BlurDirectionY,t.setRenderTarget(this.renderTargetsVertical[c]),t.clear(),this._fsQuad.render(t),f=this.renderTargetsVertical[c];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,t.setRenderTarget(this.renderTargetsHorizontal[0]),t.clear(),this._fsQuad.render(t),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,a&&t.state.buffers.stencil.setTest(!0),this.renderToScreen?(t.setRenderTarget(null),this._fsQuad.render(t)):(t.setRenderTarget(s),this._fsQuad.render(t)),t.setClearColor(this._oldClearColor,this._oldClearAlpha),t.autoClear=o}_getSeparableBlurMaterial(t){const r=[];for(let s=0;s<t;s++)r.push(.39894*Math.exp(-.5*s*s/(t*t))/t);return new N({defines:{KERNEL_RADIUS:t},uniforms:{colorTexture:{value:null},invSize:{value:new M(.5,.5)},direction:{value:new M(.5,.5)},gaussianCoefficients:{value:r}},vertexShader:`varying vec2 vUv;
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
				}`})}_getCompositeMaterial(t){return new N({defines:{NUM_MIPS:t},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`varying vec2 vUv;
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
				}`})}};ue.BlurDirectionX=new M(1,0);ue.BlurDirectionY=new M(0,1);var qe=O("<!> <!>",1),Je=O("<!> <!> <!>",1),et=O("<!> <!>",1);function tt(e,t){le(t,!0);let r=Re(t,"ref",15),s=De(t,["$$slots","$$events","$$legacy","fallback","error","children","ref"]);const i=Ge("/spaceship-tutorial/models/spaceship-transformed.glb",{dracoLoader:He()}),a=xe("/spaceship-tutorial/textures/energy-beam-opacity.png");function o(p){p.transparent=!0,p.alphaToCoverage=!0,p.depthFunc=3,p.depthTest=!0,p.depthWrite=!0}i.then(p=>{o(p.materials.spaceship_racer),o(p.materials.cockpit)});var f=I(),c=C(f);b(c,()=>S.Group,(p,l)=>{l(p,we({dispose:!1},()=>s,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:0},get ref(){return r()},set ref(h){r(h)},children:(h,w)=>{var L=et(),P=C(L);re(P,()=>i,v=>{var d=I(),u=C(d);se(u,()=>t.fallback??ie),x(v,d)},(v,d)=>{var u=I(),m=C(u);b(m,()=>S.Group,(D,B)=>{B(D,{scale:.003,rotation:[0,-Math.PI*.5,0],position:[.95,0,0],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:1},children:(G,V)=>{var $=Je(),F=C($);b(F,()=>S.Mesh,(y,A)=>{A(y,{castShadow:!0,receiveShadow:!0,get geometry(){return n(d).nodes.Cube001_spaceship_racer_0.geometry},get material(){return n(d).materials.spaceship_racer},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:2}})});var H=R(F,2);b(H,()=>S.Mesh,(y,A)=>{A(y,{castShadow:!0,receiveShadow:!0,get geometry(){return n(d).nodes.Cube005_cockpit_0.geometry},get material(){return n(d).materials.cockpit},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:3}})});var W=R(H,2);re(W,()=>a,null,(y,A)=>{var Q=I(),g=C(Q);b(g,()=>S.Mesh,(_,U)=>{U(_,{position:[0,0,-1350],"rotation.x":Math.PI*.5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:4},children:(ce,lt)=>{var fe=qe(),pe=C(fe);b(pe,()=>S.CylinderGeometry,(q,J)=>{J(q,{args:[70,25,1600,15],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:5}})});var Me=R(pe,2);b(Me,()=>S.MeshBasicMaterial,(q,J)=>{J(q,{color:[1,.4,.02],get alphaMap(){return n(A)},transparent:!0,get blending(){return 5},get blendDst(){return 201},get blendEquation(){return 100},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/models/spaceship.svelte",index:6}})}),x(ce,fe)},$$slots:{default:!0}})}),x(y,Q)}),x(G,$)},$$slots:{default:!0}})}),x(v,u)},(v,d)=>{var u=I(),m=C(u);se(m,()=>t.error??ie,()=>({error:n(d)})),x(v,u)});var T=R(P,2);se(T,()=>t.children??ie,()=>({ref:r()})),x(h,L)},$$slots:{default:!0}}))}),x(e,f),ne()}var st=O("<!> <!> <!>",1);function it(e,t){le(t,!0);let r=350,s=["#fcaa67","#C75D59","#ffffc7","#8CC5C6","#A5898C"],i=Te([]);const a=xe("/spaceship-tutorial/textures/star.png");function o(l,h){return l+Math.random()*(h-l)}function f(l){o(0,1)>.8?(l.position=[o(-10,-30),o(-5,5),o(6,-6)],l.length=o(1.5,15)):(l.position=[o(-15,-45),o(-10.5,1.5),o(30,-45)],l.length=o(2.5,20)),l.speed=o(19.5,42),l.color.set(s[Math.floor(Math.random()*s.length)]??"white").convertSRGBToLinear().multiplyScalar(1.3)}for(let l=0;l<r;l++){const h={id:ke.generateUUID(),position:[0,0,0],length:0,speed:0,color:new z};f(h),i.push(h)}_e(l=>{for(const h of i)h.position[0]+=h.speed*l,h.position[0]>40&&f(h)});var c=I(),p=C(c);re(p,()=>a,null,(l,h)=>{Qe(l,{limit:r,range:r,children:(w,L)=>{var P=st(),T=C(P);b(T,()=>S.PlaneGeometry,(u,m)=>{m(u,{args:[1,.05],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Stars.svelte",index:0}})});var v=R(T,2);b(v,()=>S.MeshBasicMaterial,(u,m)=>{m(u,{get side(){return 2},get alphaMap(){return n(h)},transparent:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Stars.svelte",index:1}})});var d=R(v,2);Se(d,17,()=>i,({id:u,position:m,length:D,color:B})=>u,(u,m)=>{let D=()=>n(m).position,B=()=>n(m).length,G=()=>n(m).color;{let V=ae(()=>[B(),1,1]);Ve(u,{get position(){return D()},get scale(){return n(V)},get color(){return G()}})}}),x(w,P)},$$slots:{default:!0}})}),x(e,c),ne()}var rt=O("<!> <!> <!> <!>",1);function at(e,t){le(t,!0);const r=()=>me(c,"$camera",i),s=()=>me(f,"$size",i),[i,a]=Ae(),{scene:o,size:f,camera:c,renderer:p}=ge();let l,h=0,w=0,L=new Ue(p),P,T=ee(void 0),v=ee(0),d=ee(0);const u=new Ye(p),m=new Ke(o,r()),D=new ue(new M(s().width,s().height),.275,1,0),B=new je;u.addPass(m),u.addPass(D),u.addPass(B),de(()=>{u.setSize(s().width,s().height),D.resolution.set(s().width,s().height)}),de(()=>{m.camera=r()});const{renderStage:G}=ge();_e(()=>{if(l){const g=l?.y||0;h+=(g-n(v))*.002,h*=.95,te(v,n(v)+h);const _=l.clone().sub(new E(0,n(v),0)).normalize().dot(new E(0,1,0)),U=Math.acos(_)-Math.PI*.5;w+=(U-n(d))*.01,w*=.85,te(d,n(d)+w)}P&&P.dispose(),n(T)&&(n(T).visible=!1,o.background=null,P=L.fromScene(o,0,.1,1e3),o.background=new z("#598889").multiplyScalar(.05),n(T).visible=!0,n(T).traverse(g=>{if("material"in g){const _=g.material;"envMapIntensity"in _&&(_.envMap=P.texture,_.envMapIntensity=100,_.normalScale.set(.3,.3))}})),u.render()},{stage:G});const V=new Ee(new Be(20,20)),$=new Ie,F=new M;function H(g){F.x=g.clientX/window.innerWidth*2-1,F.y=-(g.clientY/window.innerHeight)*2+1,$.setFromCamera(F,r()),l=$.intersectObject(V)[0]?.point,l&&(l.x=3)}var W=rt();Pe("pointermove",Ce,H);var y=C(W);b(y,()=>S.PerspectiveCamera,(g,_)=>{_(g,{makeDefault:!0,position:[-10,6,15],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Scene.svelte",index:0},children:(U,ce)=>{$e(U,{enableDamping:!0,enableZoom:!1,target:[0,0,0]})},$$slots:{default:!0}})});var A=R(y,2);b(A,()=>S.DirectionalLight,(g,_)=>{_(g,{intensity:1.8,position:[0,10,0],castShadow:!0,"shadow.bias":-1e-4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/tutorials/animating-a-spaceship/Scene.svelte",index:1}})});var Q=R(A,2);{let g=ae(()=>[0,n(v),0]),_=ae(()=>[n(d),0,n(d),"ZXY"]);tt(Q,{get position(){return n(g)},get rotation(){return n(_)},get ref(){return n(T)},set ref(U){te(T,U,!0)}})}it(R(Q,2),{}),x(e,W),ne(),a()}var ot=O('<div class="svelte-1tcrzz0"><!></div>');function gt(e){var t=ot();Fe(be(t),{autoRender:!1,children:(r,s)=>{at(r,{})},$$slots:{default:!0}}),ye(t),x(e,t)}export{gt as default};
