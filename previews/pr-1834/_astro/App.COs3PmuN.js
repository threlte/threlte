import"./disclose-version.DsnmJJEf.js";import"./legacy.BZ6q4bX4.js";import{p as te,Z as de,g as e,u as l,f as E,s as u,n as me,a as re,af as g,c as fe,r as he}from"./runtime.74l6iTpt.js";import{c as pe,f as O,a as T}from"./template.cF74NQJq.js";import{C as xe}from"./Canvas.Ck9jyZCw.js";import{a2 as ge,aI as X,T as i,aw as Y,c2 as we,aN as ye,C as P,a5 as Se,M as De,Z as Ue,bx as Ce,U as W,fI as Me,eJ as _e}from"./observe.svelte.C4xtbfD3.js";import{i as Ie}from"./lifecycle.13fege8Y.js";/* empty css                                                      */import"./raycast.BIulMTqv.js";import{F as Z}from"./Float.JUcYr4Mk.js";import{a as ke}from"./index-client.CfETg8We.js";import{s as be}from"./snippet.Dn0BqGl2.js";import{c as Q}from"./svelte-component.CrBlPMkI.js";import{p as s,s as Pe,r as Te}from"./props.D9B9D2SC.js";import{u as $e}from"./useThrelte.JVWszcQG.js";import{u as ee}from"./useTask.svelte.WMpeN9g8.js";import{E as Be}from"./Environment.BUlmC2u0.js";import{O as Ae}from"./OrbitControls.DtsuiXDj.js";/* empty css                                                   */import"./if.DKCY-Hf3.js";import"./branches.c6uAwFN9.js";import"./this.CWS0BOnE.js";import"./events.BgWfslDP.js";import"./create-subscriber.v8HejWhZ.js";import"./index.BE65HV78.js";import"./store.IXa4mVwD.js";import"./injectPlugin.CU8vFiGK.js";import"./useStage.DSR6RuO6.js";import"./transitions.D1-baVkw.js";import"./loop.BGGTUj09.js";import"./render.Dzq4Aoun.js";import"./RGBELoader.BEmB6-v5.js";import"./useEnvironment.svelte.CKNgBn8H.js";import"./OrbitControls.BQPyxtss.js";import"./useControlsContext.CclFTluQ.js";const Re={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`

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

		}`},Ge={name:"VerticalBlurShader",uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`

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

		}`};var Fe=O("<!> <!> <!>",1);function We(w,t){te(t,!0);let f=s(t,"opacity",3,1),h=s(t,"width",3,1),y=s(t,"height",3,1),S=s(t,"blur",3,1),_=s(t,"far",3,10),I=s(t,"smooth",3,!0),d=s(t,"resolution",3,512),D=s(t,"frames",3,1/0),v=s(t,"scale",3,10),$=s(t,"color",3,"#000000"),c=s(t,"depthWrite",3,!1),p=s(t,"ref",15),m=Te(t,["$$slots","$$events","$$legacy","opacity","width","height","blur","far","smooth","resolution","frames","scale","color","depthWrite","ref","children"]);const{scene:o,renderer:n}=$e(),V=new ge,B=l(()=>h()*(Array.isArray(v())?v()[0]:v()||1)),A=l(()=>y()*(Array.isArray(v())?v()[1]:v()||1)),U=l(()=>{const r=new Y(d(),d());return r.texture.generateMipmaps=!1,r.texture.colorSpace=n.outputColorSpace,r}),R=l(()=>{const r=new Y(d(),d());return r.texture.generateMipmaps=!1,r}),G=l(()=>new we(e(B),e(A)).rotateX(Math.PI/2)),x=l(()=>new Ue(e(G))),z=l(()=>{const r=$(),M=new ye({depthTest:!1,depthWrite:!1});return M.onBeforeCompile=a=>{a.uniforms={...a.uniforms,uColor:{value:new P(r).convertSRGBToLinear()}},a.fragmentShader=`uniform vec3 uColor;
${a.fragmentShader}`,a.fragmentShader=a.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );"),a.fragmentShader=a.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);","vec4(uColor,(1.0-fragCoordZ)*1.0);")},M}),k=new X({...Re,depthTest:!1}),b=new X({...Ge,depthTest:!1}),C=l(()=>new Se(-e(B)/2,e(B)/2,e(A)/2,-e(A)/2,0,_()));de(()=>e(C).updateProjectionMatrix());const H=l(()=>new De({map:e(U).texture,transparent:!0,opacity:f(),depthWrite:c()})),L=r=>{e(x).visible=!0,e(x).material=k,k.uniforms.tDiffuse.value=e(U).texture,k.uniforms.h.value=r*1/256,n.setRenderTarget(e(R)),n.render(e(x),e(C)),e(x).material=b,b.uniforms.tDiffuse.value=e(R).texture,b.uniforms.v.value=r*1/256,n.setRenderTarget(e(U)),n.render(e(x),e(C)),e(x).visible=!1},F=()=>{const r=o.background;o.background=null;const M=o.overrideMaterial;o.overrideMaterial=e(z);const a=n.getClearAlpha();n.setClearAlpha(0),n.setRenderTarget(e(U)),n.render(o,e(C)),o.overrideMaterial=M,L(S()),I()&&L(S()*.4),n.setRenderTarget(null),o.background=r,n.setClearAlpha(a)},oe=()=>{F()},N=l(()=>D()===Number.POSITIVE_INFINITY);ee(F,{running:()=>e(N)});let j=0;ee(()=>{F(),j+=1},{running:()=>!e(N)&&j<D()}),ke(()=>{e(U).dispose(),e(R).dispose(),e(G).dispose(),e(z).dispose(),k.dispose(),b.dispose(),e(H).dispose()});var ae={refresh:oe};return i(w,Pe({get is(){return V}},()=>m,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:0},get ref(){return p()},set ref(r){p(r)},children:(r,M)=>{var a=pe(),se=E(a);Q(se,()=>i.Group,(ne,ie)=>{ie(ne,{"rotation.x":Math.PI/2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:1},children:(le,Ve)=>{var q=Fe(),J=E(q);Q(J,()=>i.Mesh,(ve,ce)=>{ce(ve,{"scale.y":-1,"rotation.x":-Math.PI/2,get material(){return e(H)},get geometry(){return e(G)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:2}})});var K=u(J,2);i(K,{get is(){return e(C)},manual:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:3}});var ue=u(K,2);be(ue,()=>t.children??me,()=>({ref:V})),T(le,q)},$$slots:{default:!0}})}),T(r,a)},$$slots:{default:!0}})),re(ae)}var Ze=O("<!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function Ee(w,t){te(t,!1),Ie();var f=Ze(),h=E(f);Be(h,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"});var y=u(h,2);i.PerspectiveCamera(y,{makeDefault:!0,position:[-10,10,10],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:0},children:(c,p)=>{Ae(c,{enabled:!1,autoRotate:!0,autoRotateSpeed:.5,"target.y":1})},$$slots:{default:!0}});var S=u(y,2);i.DirectionalLight(S,{intensity:.8,"position.x":5,"position.y":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:1}});var _=u(S,2);i.AmbientLight(_,{intensity:.2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:2}});var I=u(_,2);i.GridHelper(I,{args:[10,10],"position.y":-.001,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:3}});var d=u(I,2);We(d,{frames:200,scale:10,blur:2,far:2.5,opacity:.5});var D=u(d,2);Z(D,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new Ce(1,1,1)),o=g(()=>new W({color:new P("#0059BA")}));i.Mesh(c,{"position.y":1.2,"position.z":-.75,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:4}})}},$$slots:{default:!0}});var v=u(D,2);Z(v,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new Me(.5,.15,100,12,2,3)),o=g(()=>new W({color:new P("#F85122")}));i.Mesh(c,{position:[1.2,1.5,.75],"rotation.x":5,"rotation.y":71,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:5}})}},$$slots:{default:!0}});var $=u(v,2);Z($,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new _e(1,0)),o=g(()=>new W({color:new P("#F8EBCE")}));i.Mesh(c,{position:[-1.4,1.5,.75],rotation:[-5,128,10],get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:6}})}},$$slots:{default:!0}}),T(w,f),re()}var Oe=O('<div class="svelte-sui09f"><!></div>');function Ct(w){var t=Oe(),f=fe(t);xe(f,{children:(h,y)=>{Ee(h,{})},$$slots:{default:!0}}),he(t),T(w,t)}export{Ct as default};
