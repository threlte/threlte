import"./disclose-version.DsnmJJEf.js";import"./legacy.Bo3sEplC.js";import{p as oe,M as he,L as $,g as e,u as h,f as L,s as l,n as pe,a as ae,ac as y,c as xe,r as ge}from"./runtime.DLdkg5Kz.js";import{c as ye,f as O,a as R}from"./template.B2QqRX6L.js";import{C as we}from"./Canvas.1Mx23VKx.js";import{G as Se,W as Q,Z as De,a0 as ee,a as s,as as Ue,a9 as Ce,_ as B,aH as Me,M as _e,bk as be,b2 as E,bW as ke,bP as Ie}from"./observe.svelte.CmjctptC.js";import{i as Pe}from"./lifecycle.BWFflPdz.js";/* empty css                                                      */import"./raycast.sTQT5_rj.js";import{F as H}from"./Float.DqB9WrXc.js";import{a as Te}from"./index-client.Bk7KcdZe.js";import{s as $e}from"./snippet.CCzzTW4D.js";import{c as te}from"./svelte-component.E5E5S4yf.js";import{p as a,s as Be,r as Re}from"./props.C0aiEMAr.js";import{u as Ae}from"./useThrelte.BExRv3o8.js";import{u as re}from"./useTask.svelte.wM_--mkW.js";import{E as Ge}from"./Environment.DAkLwh8r.js";import{O as We}from"./OrbitControls.C1XVy3P1.js";import"./index.illIopZv.js";/* empty css                                                   */import"./if.CWhf68p6.js";import"./branches.2gxZijTC.js";import"./this.C9eRW5mT.js";import"./Context.BIUO1CFq.js";import"./events.BHDVKm3g.js";import"./create-subscriber.CY3q5QYX.js";import"./index.DoIdvkJn.js";import"./store.BOc5wNBj.js";import"./BufferGeometryUtils.DZHwJS_O.js";import"./transitions._xWTTcFI.js";import"./loop.BGGTUj09.js";import"./render.jaBnYzsZ.js";import"./injectPlugin.BsikqEG8.js";import"./RGBELoader.BsOlX4bu.js";import"./HDRLoader.h9UW-DqN.js";import"./useEnvironment.svelte.BivZeci8.js";import"./OrbitControls.DEbzxhIh.js";import"./useControlsContext.svelte.BmzdEKez.js";const Fe={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`

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

		}`},ze={name:"VerticalBlurShader",uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`

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

		}`};var Ee=O("<!> <!> <!>",1);function He(w,t){oe(t,!0);let p=a(t,"opacity",3,1),x=a(t,"width",3,1),S=a(t,"height",3,1),D=a(t,"blur",3,1),b=a(t,"far",3,10),k=a(t,"smooth",3,!0),c=a(t,"resolution",3,512),U=a(t,"frames",3,1/0),u=a(t,"scale",3,10),A=a(t,"color",3,"#000000"),v=a(t,"depthWrite",3,!1),g=a(t,"ref",15),m=Re(t,["$$slots","$$events","$$legacy","opacity","width","height","blur","far","smooth","resolution","frames","scale","color","depthWrite","ref","children"]);const{scene:r,renderer:n,colorSpace:se}=Ae(),V=new Se,G=h(()=>x()*(Array.isArray(u())?u()[0]:u()||1)),W=h(()=>S()*(Array.isArray(u())?u()[1]:u()||1)),I=he(()=>c()),d=new Q(I,I);d.texture.generateMipmaps=!1,$(()=>{d.texture.colorSpace=se.current});const C=new Q(I,I);C.texture.generateMipmaps=!1,$(()=>{d.setSize(c(),c()),C.setSize(c(),c())});const F=h(()=>new Ue(e(G),e(W)).rotateX(Math.PI/2)),f=new De;$(()=>{f.geometry=e(F)});const Z=h(()=>{const i=A(),_=new Ce({depthTest:!1,depthWrite:!1});return _.onBeforeCompile=o=>{o.uniforms={...o.uniforms,uColor:{value:new B(i).convertSRGBToLinear()}},o.fragmentShader=`uniform vec3 uColor;
${o.fragmentShader}`,o.fragmentShader=o.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );"),o.fragmentShader=o.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);","vec4(uColor,(1.0-fragCoordZ)*1.0);")},_}),P=new ee({...Fe,depthTest:!1}),T=new ee({...ze,depthTest:!1}),M=h(()=>new Me(-e(G)/2,e(G)/2,e(W)/2,-e(W)/2,0,b()));$(()=>{e(M).updateProjectionMatrix()});const j=h(()=>new _e({map:d.texture,transparent:!0,opacity:p(),depthWrite:v()})),N=i=>{f.visible=!0,f.material=P,P.uniforms.tDiffuse.value=d.texture,P.uniforms.h.value=i*1/256,n.setRenderTarget(C),n.render(f,e(M)),f.material=T,T.uniforms.tDiffuse.value=C.texture,T.uniforms.v.value=i*1/256,n.setRenderTarget(d),n.render(f,e(M)),f.visible=!1},z=()=>{const i=r.background;r.background=null;const _=r.overrideMaterial;r.overrideMaterial=e(Z);const o=n.getClearAlpha();n.setClearAlpha(0),n.setRenderTarget(d),n.render(r,e(M)),r.overrideMaterial=_,N(D()),k()&&N(D()*.4),n.setRenderTarget(null),r.background=i,n.setClearAlpha(o)},ne=()=>{z()},q=h(()=>U()===Number.POSITIVE_INFINITY);re(z,{running:()=>e(q)});let K=0;re(()=>{z(),K+=1},{running:()=>!e(q)&&K<U()}),Te(()=>{d.dispose(),C.dispose(),e(F).dispose(),e(Z).dispose(),P.dispose(),T.dispose(),e(j).dispose()});var ie={refresh:ne};return s(w,Be({get is(){return V}},()=>m,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:0},get ref(){return g()},set ref(i){g(i)},children:(i,_)=>{var o=ye(),le=L(o);te(le,()=>s.Group,(ue,ve)=>{ve(ue,{"rotation.x":Math.PI/2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:1},children:(ce,Ze)=>{var X=Ee(),Y=L(X);te(Y,()=>s.Mesh,(me,fe)=>{fe(me,{"scale.y":-1,"rotation.x":-Math.PI/2,get material(){return e(j)},get geometry(){return e(F)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:2}})});var J=l(Y,2);s(J,{get is(){return e(M)},manual:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:3}});var de=l(J,2);$e(de,()=>t.children??pe,()=>({ref:V})),R(ce,X)},$$slots:{default:!0}})}),R(i,o)},$$slots:{default:!0}})),ae(ie)}var Le=O("<!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function Oe(w,t){oe(t,!1),Pe();var p=Le(),x=L(p);Ge(x,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"});var S=l(x,2);s.PerspectiveCamera(S,{makeDefault:!0,position:[-10,10,10],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:0},children:(v,g)=>{We(v,{enabled:!1,autoRotate:!0,autoRotateSpeed:.5,"target.y":1})},$$slots:{default:!0}});var D=l(S,2);s.DirectionalLight(D,{intensity:.8,"position.x":5,"position.y":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:1}});var b=l(D,2);s.AmbientLight(b,{intensity:.2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:2}});var k=l(b,2);s.GridHelper(k,{args:[10,10],"position.y":-.001,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:3}});var c=l(k,2);He(c,{frames:200,scale:10,blur:2,far:2.5,opacity:.5});var U=l(c,2);H(U,{floatIntensity:1,floatingRange:[0,1],children:(v,g)=>{{let m=y(()=>new be(1,1,1)),r=y(()=>new E({color:new B("#0059BA")}));s.Mesh(v,{"position.y":1.2,"position.z":-.75,get geometry(){return e(m)},get material(){return e(r)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:4}})}},$$slots:{default:!0}});var u=l(U,2);H(u,{floatIntensity:1,floatingRange:[0,1],children:(v,g)=>{{let m=y(()=>new ke(.5,.15,100,12,2,3)),r=y(()=>new E({color:new B("#F85122")}));s.Mesh(v,{position:[1.2,1.5,.75],"rotation.x":5,"rotation.y":71,get geometry(){return e(m)},get material(){return e(r)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:5}})}},$$slots:{default:!0}});var A=l(u,2);H(A,{floatIntensity:1,floatingRange:[0,1],children:(v,g)=>{{let m=y(()=>new Ie(1,0)),r=y(()=>new E({color:new B("#F8EBCE")}));s.Mesh(v,{position:[-1.4,1.5,.75],rotation:[-5,128,10],get geometry(){return e(m)},get material(){return e(r)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:6}})}},$$slots:{default:!0}}),R(w,p),ae()}var Ve=O('<div class="svelte-sui09f"><!></div>');function Pt(w){var t=Ve(),p=xe(t);we(p,{children:(x,S)=>{Oe(x,{})},$$slots:{default:!0}}),ge(t),R(w,t)}export{Pt as default};
