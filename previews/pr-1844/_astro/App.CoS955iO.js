import"./disclose-version.DsnmJJEf.js";import"./legacy.BGYm4LQg.js";import{p as se,M as ye,L as A,g as e,u as p,f as V,s as u,n as we,a as ne,ab as y,c as Se,r as De}from"./runtime.BBxoejyG.js";import{c as Ue,f as H,a as G}from"./template.Bs5bR2Nc.js";import{C as Ce}from"./Canvas.BXbx6C4n.js";import{Y as _e,at as te,J as Me,aF as re,ah as a,bq as be,aK as $e,C as R,$ as Ie,A as ke,bl as Te,y as L,bY as Pe,bT as Be}from"./observe.svelte.CFYFNOc8.js";import{i as Ae}from"./lifecycle.D7Zym_9W.js";/* empty css                                                      */import"./raycast.B9A6jkWT.js";import{F as O}from"./Float.B9yQDaJ8.js";import{a as Re}from"./index-client.Cy63zNyZ.js";import{s as Ge}from"./snippet.DUyBEcRR.js";import{c as oe}from"./svelte-component.BCRxooPF.js";import{p as o,s as Fe,r as We}from"./props.CGk66viq.js";import{s as ze,a as Ee}from"./store.5lYVrety.js";import{u as Le}from"./useThrelte.o9barqGH.js";import{u as ae}from"./useTask.svelte.B27ZeBux.js";import{E as Oe}from"./Environment.BSYRrVu7.js";import{O as Ve}from"./OrbitControls.BezX-0tL.js";/* empty css                                                   */import"./if.UXK_Jlz6.js";import"./branches.Bg9W3cxg.js";import"./this.q4pHlqVj.js";import"./Context.lmo6U6Sz.js";import"./events.C6-11v6q.js";import"./create-subscriber.CDornkmJ.js";import"./index.DMCjpMEg.js";import"./useStage.DT-BgVhI.js";import"./injectPlugin.D3y05FLP.js";import"./transitions.Bdo3_t96.js";import"./loop.BGGTUj09.js";import"./render.D4buDWGY.js";import"./RGBELoader.Cij1OawQ.js";import"./useEnvironment.svelte.DQeN6zwm.js";import"./OrbitControls.CPMLV8H2.js";import"./useControlsContext.BNHFb7l2.js";const He={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`

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

		}`};var je=H("<!> <!> <!>",1);function qe(w,t){se(t,!0);const x=()=>ze(le,"$colorSpace",g),[g,S]=Ee();let M=o(t,"opacity",3,1),b=o(t,"width",3,1),$=o(t,"height",3,1),D=o(t,"blur",3,1),I=o(t,"far",3,10),k=o(t,"smooth",3,!0),c=o(t,"resolution",3,512),s=o(t,"frames",3,1/0),n=o(t,"scale",3,10),d=o(t,"color",3,"#000000"),m=o(t,"depthWrite",3,!1),Z=o(t,"ref",15),ie=We(t,["$$slots","$$events","$$legacy","opacity","width","height","blur","far","smooth","resolution","frames","scale","color","depthWrite","ref","children"]);const{scene:f,renderer:i,colorSpace:le}=Le(),j=new _e,F=p(()=>b()*(Array.isArray(n())?n()[0]:n()||1)),W=p(()=>$()*(Array.isArray(n())?n()[1]:n()||1)),T=ye(()=>c()),v=new te(T,T);v.texture.generateMipmaps=!1,A(()=>{v.texture.colorSpace=x()});const U=new te(T,T);U.texture.generateMipmaps=!1,A(()=>{v.setSize(c(),c()),U.setSize(c(),c())});const z=p(()=>new be(e(F),e(W)).rotateX(Math.PI/2)),h=new Me;A(()=>{h.geometry=e(z)});const q=p(()=>{const l=d(),_=new $e({depthTest:!1,depthWrite:!1});return _.onBeforeCompile=r=>{r.uniforms={...r.uniforms,uColor:{value:new R(l).convertSRGBToLinear()}},r.fragmentShader=`uniform vec3 uColor;
${r.fragmentShader}`,r.fragmentShader=r.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );"),r.fragmentShader=r.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);","vec4(uColor,(1.0-fragCoordZ)*1.0);")},_}),P=new re({...He,depthTest:!1}),B=new re({...Ze,depthTest:!1}),C=p(()=>new Ie(-e(F)/2,e(F)/2,e(W)/2,-e(W)/2,0,I()));A(()=>{e(C).updateProjectionMatrix()});const N=p(()=>new ke({map:v.texture,transparent:!0,opacity:M(),depthWrite:m()})),Y=l=>{h.visible=!0,h.material=P,P.uniforms.tDiffuse.value=v.texture,P.uniforms.h.value=l*1/256,i.setRenderTarget(U),i.render(h,e(C)),h.material=B,B.uniforms.tDiffuse.value=U.texture,B.uniforms.v.value=l*1/256,i.setRenderTarget(v),i.render(h,e(C)),h.visible=!1},E=()=>{const l=f.background;f.background=null;const _=f.overrideMaterial;f.overrideMaterial=e(q);const r=i.getClearAlpha();i.setClearAlpha(0),i.setRenderTarget(v),i.render(f,e(C)),f.overrideMaterial=_,Y(D()),k()&&Y(D()*.4),i.setRenderTarget(null),f.background=l,i.setClearAlpha(r)},ue=()=>{E()},K=p(()=>s()===Number.POSITIVE_INFINITY);ae(E,{running:()=>e(K)});let J=0;ae(()=>{E(),J+=1},{running:()=>!e(K)&&J<s()}),Re(()=>{v.dispose(),U.dispose(),e(z).dispose(),e(q).dispose(),P.dispose(),B.dispose(),e(N).dispose()});var ve={refresh:ue};a(w,Fe({get is(){return j}},()=>ie,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:0},get ref(){return Z()},set ref(l){Z(l)},children:(l,_)=>{var r=Ue(),de=V(r);oe(de,()=>a.Group,(me,fe)=>{fe(me,{"rotation.x":Math.PI/2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:1},children:(he,Je)=>{var X=je(),Q=V(X);oe(Q,()=>a.Mesh,(xe,ge)=>{ge(xe,{"scale.y":-1,"rotation.x":-Math.PI/2,get material(){return e(N)},get geometry(){return e(z)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:2}})});var ee=u(Q,2);a(ee,{get is(){return e(C)},manual:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:3}});var pe=u(ee,2);Ge(pe,()=>t.children??we,()=>({ref:j})),G(he,X)},$$slots:{default:!0}})}),G(l,r)},$$slots:{default:!0}}));var ce=ne(ve);return S(),ce}var Ne=H("<!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function Ye(w,t){se(t,!1),Ae();var x=Ne(),g=V(x);Oe(g,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"});var S=u(g,2);a.PerspectiveCamera(S,{makeDefault:!0,position:[-10,10,10],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:0},children:(s,n)=>{Ve(s,{enabled:!1,autoRotate:!0,autoRotateSpeed:.5,"target.y":1})},$$slots:{default:!0}});var M=u(S,2);a.DirectionalLight(M,{intensity:.8,"position.x":5,"position.y":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:1}});var b=u(M,2);a.AmbientLight(b,{intensity:.2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:2}});var $=u(b,2);a.GridHelper($,{args:[10,10],"position.y":-.001,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:3}});var D=u($,2);qe(D,{frames:200,scale:10,blur:2,far:2.5,opacity:.5});var I=u(D,2);O(I,{floatIntensity:1,floatingRange:[0,1],children:(s,n)=>{{let d=y(()=>new Te(1,1,1)),m=y(()=>new L({color:new R("#0059BA")}));a.Mesh(s,{"position.y":1.2,"position.z":-.75,get geometry(){return e(d)},get material(){return e(m)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:4}})}},$$slots:{default:!0}});var k=u(I,2);O(k,{floatIntensity:1,floatingRange:[0,1],children:(s,n)=>{{let d=y(()=>new Pe(.5,.15,100,12,2,3)),m=y(()=>new L({color:new R("#F85122")}));a.Mesh(s,{position:[1.2,1.5,.75],"rotation.x":5,"rotation.y":71,get geometry(){return e(d)},get material(){return e(m)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:5}})}},$$slots:{default:!0}});var c=u(k,2);O(c,{floatIntensity:1,floatingRange:[0,1],children:(s,n)=>{{let d=y(()=>new Be(1,0)),m=y(()=>new L({color:new R("#F8EBCE")}));a.Mesh(s,{position:[-1.4,1.5,.75],rotation:[-5,128,10],get geometry(){return e(d)},get material(){return e(m)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:6}})}},$$slots:{default:!0}}),G(w,x),ne()}var Ke=H('<div class="svelte-sui09f"><!></div>');function At(w){var t=Ke(),x=Se(t);Ce(x,{children:(g,S)=>{Ye(g,{})},$$slots:{default:!0}}),De(t),G(w,t)}export{At as default};
