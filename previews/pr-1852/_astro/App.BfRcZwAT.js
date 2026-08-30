import"./disclose-version.DsnmJJEf.js";import"./legacy.CFq86F04.js";import{p as se,M as ye,L as R,g as e,u as p,f as O,s as u,n as we,a as ne,ac as y,c as Se,r as De}from"./runtime.Cq5xh0TU.js";import{c as Ue,f as V,a as G}from"./template.L6xDPO6U.js";import{C as Ce}from"./Canvas.DIuF5wt1.js";import{G as Me,W as te,Y as _e,$ as re,a,bp as $e,a9 as ke,Z as A,aH as Ie,M as be,bk as Pe,b2 as H,gg as Te,fm as Be}from"./observe.svelte.XHimI-Ft.js";import{i as Re}from"./lifecycle.wtIJeE0B.js";/* empty css                                                      */import"./raycast.BcG-iZFx.js";import{F as L}from"./Float.BRjJyS0G.js";import{a as Ae}from"./index-client.CbnisDQz.js";import{s as Ge}from"./snippet.B1WTn4og.js";import{c as oe}from"./svelte-component.B_Rq4ZKt.js";import{p as o,s as We,r as Fe}from"./props.BuNG_qsO.js";import{a as ze,s as Ee}from"./store.Bdk9semh.js";import{u as He}from"./useThrelte.BUOnMkyN.js";import{u as ae}from"./useTask.svelte.CQYikn9N.js";import{E as Le}from"./Environment.J1Bu70f_.js";import{O as Oe}from"./OrbitControls.punH5agF.js";/* empty css                                                   */import"./if.eGY2C9_P.js";import"./branches.CjZ4fCu_.js";import"./this.BCeOz4X_.js";import"./Context.C8vled1A.js";import"./events.-BVBOS9k.js";import"./create-subscriber.Cxqb2LK-.js";import"./index.D-QOJTr1.js";import"./transitions.Bigw4laK.js";import"./loop.BGGTUj09.js";import"./render.DOVvO0Mi.js";import"./injectPlugin.vYxrg8CX.js";import"./RGBELoader.Bk0tzhNc.js";import"./HDRLoader.jW58dLtD.js";import"./useEnvironment.svelte.DK4GYYHh.js";import"./OrbitControls.BOcOv25N.js";import"./useControlsContext.D-iCiLeo.js";const Ve={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`

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

		}`};var je=V("<!> <!> <!>",1);function Ne(w,t){se(t,!0);const g=()=>ze(le,"$colorSpace",x),[x,S]=Ee();let _=o(t,"opacity",3,1),$=o(t,"width",3,1),k=o(t,"height",3,1),D=o(t,"blur",3,1),I=o(t,"far",3,10),b=o(t,"smooth",3,!0),c=o(t,"resolution",3,512),s=o(t,"frames",3,1/0),n=o(t,"scale",3,10),d=o(t,"color",3,"#000000"),m=o(t,"depthWrite",3,!1),Z=o(t,"ref",15),ie=Fe(t,["$$slots","$$events","$$legacy","opacity","width","height","blur","far","smooth","resolution","frames","scale","color","depthWrite","ref","children"]);const{scene:f,renderer:i,colorSpace:le}=He(),j=new Me,W=p(()=>$()*(Array.isArray(n())?n()[0]:n()||1)),F=p(()=>k()*(Array.isArray(n())?n()[1]:n()||1)),P=ye(()=>c()),v=new te(P,P);v.texture.generateMipmaps=!1,R(()=>{v.texture.colorSpace=g()});const U=new te(P,P);U.texture.generateMipmaps=!1,R(()=>{v.setSize(c(),c()),U.setSize(c(),c())});const z=p(()=>new $e(e(W),e(F)).rotateX(Math.PI/2)),h=new _e;R(()=>{h.geometry=e(z)});const N=p(()=>{const l=d(),M=new ke({depthTest:!1,depthWrite:!1});return M.onBeforeCompile=r=>{r.uniforms={...r.uniforms,uColor:{value:new A(l).convertSRGBToLinear()}},r.fragmentShader=`uniform vec3 uColor;
${r.fragmentShader}`,r.fragmentShader=r.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );"),r.fragmentShader=r.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);","vec4(uColor,(1.0-fragCoordZ)*1.0);")},M}),T=new re({...Ve,depthTest:!1}),B=new re({...Ze,depthTest:!1}),C=p(()=>new Ie(-e(W)/2,e(W)/2,e(F)/2,-e(F)/2,0,I()));R(()=>{e(C).updateProjectionMatrix()});const q=p(()=>new be({map:v.texture,transparent:!0,opacity:_(),depthWrite:m()})),Y=l=>{h.visible=!0,h.material=T,T.uniforms.tDiffuse.value=v.texture,T.uniforms.h.value=l*1/256,i.setRenderTarget(U),i.render(h,e(C)),h.material=B,B.uniforms.tDiffuse.value=U.texture,B.uniforms.v.value=l*1/256,i.setRenderTarget(v),i.render(h,e(C)),h.visible=!1},E=()=>{const l=f.background;f.background=null;const M=f.overrideMaterial;f.overrideMaterial=e(N);const r=i.getClearAlpha();i.setClearAlpha(0),i.setRenderTarget(v),i.render(f,e(C)),f.overrideMaterial=M,Y(D()),b()&&Y(D()*.4),i.setRenderTarget(null),f.background=l,i.setClearAlpha(r)},ue=()=>{E()},K=p(()=>s()===Number.POSITIVE_INFINITY);ae(E,{running:()=>e(K)});let X=0;ae(()=>{E(),X+=1},{running:()=>!e(K)&&X<s()}),Ae(()=>{v.dispose(),U.dispose(),e(z).dispose(),e(N).dispose(),T.dispose(),B.dispose(),e(q).dispose()});var ve={refresh:ue};a(w,We({get is(){return j}},()=>ie,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:0},get ref(){return Z()},set ref(l){Z(l)},children:(l,M)=>{var r=Ue(),de=O(r);oe(de,()=>a.Group,(me,fe)=>{fe(me,{"rotation.x":Math.PI/2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:1},children:(he,Xe)=>{var J=je(),Q=O(J);oe(Q,()=>a.Mesh,(ge,xe)=>{xe(ge,{"scale.y":-1,"rotation.x":-Math.PI/2,get material(){return e(q)},get geometry(){return e(z)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:2}})});var ee=u(Q,2);a(ee,{get is(){return e(C)},manual:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:3}});var pe=u(ee,2);Ge(pe,()=>t.children??we,()=>({ref:j})),G(he,J)},$$slots:{default:!0}})}),G(l,r)},$$slots:{default:!0}}));var ce=ne(ve);return S(),ce}var qe=V("<!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function Ye(w,t){se(t,!1),Re();var g=qe(),x=O(g);Le(x,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"});var S=u(x,2);a.PerspectiveCamera(S,{makeDefault:!0,position:[-10,10,10],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:0},children:(s,n)=>{Oe(s,{enabled:!1,autoRotate:!0,autoRotateSpeed:.5,"target.y":1})},$$slots:{default:!0}});var _=u(S,2);a.DirectionalLight(_,{intensity:.8,"position.x":5,"position.y":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:1}});var $=u(_,2);a.AmbientLight($,{intensity:.2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:2}});var k=u($,2);a.GridHelper(k,{args:[10,10],"position.y":-.001,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:3}});var D=u(k,2);Ne(D,{frames:200,scale:10,blur:2,far:2.5,opacity:.5});var I=u(D,2);L(I,{floatIntensity:1,floatingRange:[0,1],children:(s,n)=>{{let d=y(()=>new Pe(1,1,1)),m=y(()=>new H({color:new A("#0059BA")}));a.Mesh(s,{"position.y":1.2,"position.z":-.75,get geometry(){return e(d)},get material(){return e(m)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:4}})}},$$slots:{default:!0}});var b=u(I,2);L(b,{floatIntensity:1,floatingRange:[0,1],children:(s,n)=>{{let d=y(()=>new Te(.5,.15,100,12,2,3)),m=y(()=>new H({color:new A("#F85122")}));a.Mesh(s,{position:[1.2,1.5,.75],"rotation.x":5,"rotation.y":71,get geometry(){return e(d)},get material(){return e(m)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:5}})}},$$slots:{default:!0}});var c=u(b,2);L(c,{floatIntensity:1,floatingRange:[0,1],children:(s,n)=>{{let d=y(()=>new Be(1,0)),m=y(()=>new H({color:new A("#F8EBCE")}));a.Mesh(s,{position:[-1.4,1.5,.75],rotation:[-5,128,10],get geometry(){return e(d)},get material(){return e(m)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:6}})}},$$slots:{default:!0}}),G(w,g),ne()}var Ke=V('<div class="svelte-sui09f"><!></div>');function Rt(w){var t=Ke(),g=Se(t);Ce(g,{children:(x,S)=>{Ye(x,{})},$$slots:{default:!0}}),De(t),G(w,t)}export{Rt as default};
