import"./disclose-version.DsnmJJEf.js";import"./legacy.BAky0bDD.js";import{p as se,M as ye,L as R,g as e,u as p,f as L,s as u,n as we,a as ne,ab as y,c as Se,r as De}from"./runtime.BedC1VoK.js";import{c as Ue,f as V,a as G}from"./template.CRvxzHa8.js";import{C as Ce}from"./Canvas.DTUL7dTb.js";import{G as _e,W as te,H as Me,O as re,h as a,au as be,a4 as Ie,I as A,aK as $e,ah as ke,bm as Pe,b4 as E,bZ as Te,bS as Be}from"./observe.svelte.CfGpyHIb.js";import{i as Re}from"./lifecycle.DuyvAUgp.js";/* empty css                                                      */import"./raycast.CqghNW2K.js";import{F as H}from"./Float.CT47rAHr.js";import{a as Ae}from"./index-client.CdY_DjQS.js";import{s as Ge}from"./snippet.DJLeyYvd.js";import{c as oe}from"./svelte-component.CJo0mFpZ.js";import{p as o,s as We,r as Fe}from"./props.IXTf2h6r.js";import{s as ze,a as Oe}from"./store.2D4VV-eu.js";import{u as Ee}from"./useThrelte.BeIV9kYF.js";import{u as ae}from"./useTask.svelte.DevRmSGz.js";import{E as He}from"./Environment.CzTYuqWM.js";import{O as Le}from"./OrbitControls.Cw4GxMi0.js";import"./index.CuHW201-.js";/* empty css                                                   */import"./if.CiNDarPD.js";import"./branches.DlyjgEAM.js";import"./this.C6Ymr4aF.js";import"./Context.Ujje1ITu.js";import"./events.B4V7XOco.js";import"./create-subscriber.BcgUO-BS.js";import"./index.B1I5-WlL.js";import"./BufferGeometryUtils.DM4HpWZ8.js";import"./transitions.R9TyKVy9.js";import"./loop.BGGTUj09.js";import"./render.BWbGX-_p.js";import"./injectPlugin.DEz6-eQ3.js";import"./RGBELoader.Ds5kv_ke.js";import"./HDRLoader.C2ofd13u.js";import"./useEnvironment.svelte.CyHGh-EA.js";import"./OrbitControls.DOWVDKdd.js";import"./useControlsContext.IjVnfh6o.js";const Ve={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float h;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			sum += texture2D( tDiffuse, vec2( vUv.x - 4.0 * h, vUv.y ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x - 3.0 * h, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x - 2.0 * h, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x - 1.0 * h, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x + 1.0 * h, vUv.y ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x + 2.0 * h, vUv.y ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x + 3.0 * h, vUv.y ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x + 4.0 * h, vUv.y ) ) * 0.051;

			gl_FragColor = sum;

		}`},Ze={name:"VerticalBlurShader",uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform float v;

		varying vec2 vUv;

		void main() {

			vec4 sum = vec4( 0.0 );

			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 4.0 * v ) ) * 0.051;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 3.0 * v ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 2.0 * v ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y - 1.0 * v ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y ) ) * 0.1633;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 1.0 * v ) ) * 0.1531;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 2.0 * v ) ) * 0.12245;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 3.0 * v ) ) * 0.0918;
			sum += texture2D( tDiffuse, vec2( vUv.x, vUv.y + 4.0 * v ) ) * 0.051;

			gl_FragColor = sum;

		}`};var je=V("<!> <!> <!>",1);function Ne(w,t){se(t,!0);const x=()=>ze(le,"$colorSpace",g),[g,S]=Oe();let M=o(t,"opacity",3,1),b=o(t,"width",3,1),I=o(t,"height",3,1),D=o(t,"blur",3,1),$=o(t,"far",3,10),k=o(t,"smooth",3,!0),c=o(t,"resolution",3,512),s=o(t,"frames",3,1/0),n=o(t,"scale",3,10),d=o(t,"color",3,"#000000"),m=o(t,"depthWrite",3,!1),Z=o(t,"ref",15),ie=Fe(t,["$$slots","$$events","$$legacy","opacity","width","height","blur","far","smooth","resolution","frames","scale","color","depthWrite","ref","children"]);const{scene:h,renderer:i,colorSpace:le}=Ee(),j=new _e,W=p(()=>b()*(Array.isArray(n())?n()[0]:n()||1)),F=p(()=>I()*(Array.isArray(n())?n()[1]:n()||1)),P=ye(()=>c()),v=new te(P,P);v.texture.generateMipmaps=!1,R(()=>{v.texture.colorSpace=x()});const U=new te(P,P);U.texture.generateMipmaps=!1,R(()=>{v.setSize(c(),c()),U.setSize(c(),c())});const z=p(()=>new be(e(W),e(F)).rotateX(Math.PI/2)),f=new Me;R(()=>{f.geometry=e(z)});const N=p(()=>{const l=d(),_=new Ie({depthTest:!1,depthWrite:!1});return _.onBeforeCompile=r=>{r.uniforms={...r.uniforms,uColor:{value:new A(l).convertSRGBToLinear()}},r.fragmentShader=`uniform vec3 uColor;
${r.fragmentShader}`,r.fragmentShader=r.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );"),r.fragmentShader=r.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);","vec4(uColor,(1.0-fragCoordZ)*1.0);")},_}),T=new re({...Ve,depthTest:!1}),B=new re({...Ze,depthTest:!1}),C=p(()=>new $e(-e(W)/2,e(W)/2,e(F)/2,-e(F)/2,0,$()));R(()=>{e(C).updateProjectionMatrix()});const q=p(()=>new ke({map:v.texture,transparent:!0,opacity:M(),depthWrite:m()})),K=l=>{f.visible=!0,f.material=T,T.uniforms.tDiffuse.value=v.texture,T.uniforms.h.value=l*1/256,i.setRenderTarget(U),i.render(f,e(C)),f.material=B,B.uniforms.tDiffuse.value=U.texture,B.uniforms.v.value=l*1/256,i.setRenderTarget(v),i.render(f,e(C)),f.visible=!1},O=()=>{const l=h.background;h.background=null;const _=h.overrideMaterial;h.overrideMaterial=e(N);const r=i.getClearAlpha();i.setClearAlpha(0),i.setRenderTarget(v),i.render(h,e(C)),h.overrideMaterial=_,K(D()),k()&&K(D()*.4),i.setRenderTarget(null),h.background=l,i.setClearAlpha(r)},ue=()=>{O()},X=p(()=>s()===Number.POSITIVE_INFINITY);ae(O,{running:()=>e(X)});let Y=0;ae(()=>{O(),Y+=1},{running:()=>!e(X)&&Y<s()}),Ae(()=>{v.dispose(),U.dispose(),e(z).dispose(),e(N).dispose(),T.dispose(),B.dispose(),e(q).dispose()});var ve={refresh:ue};a(w,We({get is(){return j}},()=>ie,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:0},get ref(){return Z()},set ref(l){Z(l)},children:(l,_)=>{var r=Ue(),de=L(r);oe(de,()=>a.Group,(me,he)=>{he(me,{"rotation.x":Math.PI/2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:1},children:(fe,Ye)=>{var J=je(),Q=L(J);oe(Q,()=>a.Mesh,(xe,ge)=>{ge(xe,{"scale.y":-1,"rotation.x":-Math.PI/2,get material(){return e(q)},get geometry(){return e(z)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:2}})});var ee=u(Q,2);a(ee,{get is(){return e(C)},manual:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:3}});var pe=u(ee,2);Ge(pe,()=>t.children??we,()=>({ref:j})),G(fe,J)},$$slots:{default:!0}})}),G(l,r)},$$slots:{default:!0}}));var ce=ne(ve);return S(),ce}var qe=V("<!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function Ke(w,t){se(t,!1),Re();var x=qe(),g=L(x);He(g,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"});var S=u(g,2);a.PerspectiveCamera(S,{makeDefault:!0,position:[-10,10,10],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:0},children:(s,n)=>{Le(s,{enabled:!1,autoRotate:!0,autoRotateSpeed:.5,"target.y":1})},$$slots:{default:!0}});var M=u(S,2);a.DirectionalLight(M,{intensity:.8,"position.x":5,"position.y":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:1}});var b=u(M,2);a.AmbientLight(b,{intensity:.2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:2}});var I=u(b,2);a.GridHelper(I,{args:[10,10],"position.y":-.001,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:3}});var D=u(I,2);Ne(D,{frames:200,scale:10,blur:2,far:2.5,opacity:.5});var $=u(D,2);H($,{floatIntensity:1,floatingRange:[0,1],children:(s,n)=>{{let d=y(()=>new Pe(1,1,1)),m=y(()=>new E({color:new A("#0059BA")}));a.Mesh(s,{"position.y":1.2,"position.z":-.75,get geometry(){return e(d)},get material(){return e(m)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:4}})}},$$slots:{default:!0}});var k=u($,2);H(k,{floatIntensity:1,floatingRange:[0,1],children:(s,n)=>{{let d=y(()=>new Te(.5,.15,100,12,2,3)),m=y(()=>new E({color:new A("#F85122")}));a.Mesh(s,{position:[1.2,1.5,.75],"rotation.x":5,"rotation.y":71,get geometry(){return e(d)},get material(){return e(m)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:5}})}},$$slots:{default:!0}});var c=u(k,2);H(c,{floatIntensity:1,floatingRange:[0,1],children:(s,n)=>{{let d=y(()=>new Be(1,0)),m=y(()=>new E({color:new A("#F8EBCE")}));a.Mesh(s,{position:[-1.4,1.5,.75],rotation:[-5,128,10],get geometry(){return e(d)},get material(){return e(m)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:6}})}},$$slots:{default:!0}}),G(w,x),ne()}var Xe=V('<div class="svelte-sui09f"><!></div>');function Gt(w){var t=Xe(),x=Se(t);Ce(x,{children:(g,S)=>{Ke(g,{})},$$slots:{default:!0}}),De(t),G(w,t)}export{Gt as default};
