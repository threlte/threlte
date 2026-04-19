import"./disclose-version.DsnmJJEf.js";import"./legacy.CUIl4KX-.js";import{p as te,Z as de,g as e,u as l,f as O,s as u,n as me,a as re,ac as g,c as fe,r as he}from"./runtime.D20saW8m.js";import{c as pe,f as V,a as T}from"./template.DY3hUOmN.js";import{C as xe}from"./Canvas.CVWzSuoq.js";import{b as ge,_ as we,aE as X,T as i,as as Y,bW as ye,aJ as Se,C as P,a1 as De,M as Ue,U as Ce,bp as _e,G as W,fF as Me,eC as Ie}from"./observe.svelte.BHiIsSLZ.js";import{i as be}from"./lifecycle.DPViJDaG.js";/* empty css                                                      */import"./raycast.CxKKhBrm.js";import{F as E}from"./Float.U_NWfgCt.js";import{a as ke}from"./index-client.Ci3t-hyE.js";import{s as Pe}from"./snippet.ZYtLD8wA.js";import{c as Q}from"./svelte-component.C-qodc9T.js";import{p as s,s as Te,r as $e}from"./props.BLzNsRtJ.js";import{u as ee}from"./useTask.svelte.Dq8lO6gS.js";import{E as Be}from"./Environment.tb-KOlva.js";import{O as Ae}from"./OrbitControls.BjrNmvNr.js";/* empty css                                                   */import"./if.KLqBe-U_.js";import"./branches.HJW2H96n.js";import"./index.XLhfXAo9.js";import"./events.D9j-qKmp.js";import"./create-subscriber.DvowZspB.js";import"./store.Djq20Duq.js";import"./useStage.DnSfKqbf.js";import"./injectPlugin.D55qsLoq.js";import"./transitions.Dv_byTtB.js";import"./loop.BGGTUj09.js";import"./render.CEiySluT.js";import"./utils.NcpWCyqV.js";import"./RGBELoader.B8kJQCHQ.js";import"./useEnvironment.svelte.B3D02NVH.js";import"./OrbitControls.BPuYDW-i.js";import"./useControlsContext.BWYpl56B.js";import"./useThrelteUserContext.DfTM5ErO.js";const Ge={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`

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

		}`},Re={name:"VerticalBlurShader",uniforms:{tDiffuse:{value:null},v:{value:1/512}},vertexShader:`

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

		}`};var Fe=V("<!> <!> <!>",1);function We(w,t){te(t,!0);let f=s(t,"opacity",3,1),h=s(t,"width",3,1),y=s(t,"height",3,1),S=s(t,"blur",3,1),M=s(t,"far",3,10),I=s(t,"smooth",3,!0),d=s(t,"resolution",3,512),D=s(t,"frames",3,1/0),v=s(t,"scale",3,10),$=s(t,"color",3,"#000000"),c=s(t,"depthWrite",3,!1),p=s(t,"ref",15),m=$e(t,["$$slots","$$events","$$legacy","opacity","width","height","blur","far","smooth","resolution","frames","scale","color","depthWrite","ref","children"]);const{scene:o,renderer:n}=ge(),Z=new we,B=l(()=>h()*(Array.isArray(v())?v()[0]:v()||1)),A=l(()=>y()*(Array.isArray(v())?v()[1]:v()||1)),U=l(()=>{const r=new Y(d(),d());return r.texture.generateMipmaps=!1,r.texture.colorSpace=n.outputColorSpace,r}),G=l(()=>{const r=new Y(d(),d());return r.texture.generateMipmaps=!1,r}),R=l(()=>new ye(e(B),e(A)).rotateX(Math.PI/2)),x=l(()=>new Ce(e(R))),z=l(()=>{const r=$(),_=new Se({depthTest:!1,depthWrite:!1});return _.onBeforeCompile=a=>{a.uniforms={...a.uniforms,uColor:{value:new P(r).convertSRGBToLinear()}},a.fragmentShader=`uniform vec3 uColor;
${a.fragmentShader}`,a.fragmentShader=a.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );"),a.fragmentShader=a.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);","vec4(uColor,(1.0-fragCoordZ)*1.0);")},_}),b=new X({...Ge,depthTest:!1}),k=new X({...Re,depthTest:!1}),C=l(()=>new De(-e(B)/2,e(B)/2,e(A)/2,-e(A)/2,0,M()));de(()=>e(C).updateProjectionMatrix());const H=l(()=>new Ue({map:e(U).texture,transparent:!0,opacity:f(),depthWrite:c()})),L=r=>{e(x).visible=!0,e(x).material=b,b.uniforms.tDiffuse.value=e(U).texture,b.uniforms.h.value=r*1/256,n.setRenderTarget(e(G)),n.render(e(x),e(C)),e(x).material=k,k.uniforms.tDiffuse.value=e(G).texture,k.uniforms.v.value=r*1/256,n.setRenderTarget(e(U)),n.render(e(x),e(C)),e(x).visible=!1},F=()=>{const r=o.background;o.background=null;const _=o.overrideMaterial;o.overrideMaterial=e(z);const a=n.getClearAlpha();n.setClearAlpha(0),n.setRenderTarget(e(U)),n.render(o,e(C)),o.overrideMaterial=_,L(S()),I()&&L(S()*.4),n.setRenderTarget(null),o.background=r,n.setClearAlpha(a)},oe=()=>{F()},j=l(()=>D()===Number.POSITIVE_INFINITY);ee(F,{running:()=>e(j)});let N=0;ee(()=>{F(),N+=1},{running:()=>!e(j)&&N<D()}),ke(()=>{e(U).dispose(),e(G).dispose(),e(R).dispose(),e(z).dispose(),b.dispose(),k.dispose(),e(H).dispose()});var ae={refresh:oe};return i(w,Te({get is(){return Z}},()=>m,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:0},get ref(){return p()},set ref(r){p(r)},children:(r,_)=>{var a=pe(),se=O(a);Q(se,()=>i.Group,(ne,ie)=>{ie(ne,{"rotation.x":Math.PI/2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:1},children:(le,Ze)=>{var q=Fe(),J=O(q);Q(J,()=>i.Mesh,(ve,ce)=>{ce(ve,{"scale.y":-1,"rotation.x":-Math.PI/2,get material(){return e(H)},get geometry(){return e(R)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:2}})});var K=u(J,2);i(K,{get is(){return e(C)},manual:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:3}});var ue=u(K,2);Pe(ue,()=>t.children??me,()=>({ref:Z})),T(le,q)},$$slots:{default:!0}})}),T(r,a)},$$slots:{default:!0}})),re(ae)}var Ee=V("<!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function Oe(w,t){te(t,!1),be();var f=Ee(),h=O(f);Be(h,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"});var y=u(h,2);i.PerspectiveCamera(y,{makeDefault:!0,position:[-10,10,10],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:0},children:(c,p)=>{Ae(c,{enabled:!1,autoRotate:!0,autoRotateSpeed:.5,"target.y":1})},$$slots:{default:!0}});var S=u(y,2);i.DirectionalLight(S,{intensity:.8,"position.x":5,"position.y":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:1}});var M=u(S,2);i.AmbientLight(M,{intensity:.2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:2}});var I=u(M,2);i.GridHelper(I,{args:[10,10],"position.y":-.001,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:3}});var d=u(I,2);We(d,{frames:200,scale:10,blur:2,far:2.5,opacity:.5});var D=u(d,2);E(D,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new _e(1,1,1)),o=g(()=>new W({color:new P("#0059BA")}));i.Mesh(c,{"position.y":1.2,"position.z":-.75,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:4}})}},$$slots:{default:!0}});var v=u(D,2);E(v,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new Me(.5,.15,100,12,2,3)),o=g(()=>new W({color:new P("#F85122")}));i.Mesh(c,{position:[1.2,1.5,.75],"rotation.x":5,"rotation.y":71,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:5}})}},$$slots:{default:!0}});var $=u(v,2);E($,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new Ie(1,0)),o=g(()=>new W({color:new P("#F8EBCE")}));i.Mesh(c,{position:[-1.4,1.5,.75],rotation:[-5,128,10],get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:6}})}},$$slots:{default:!0}}),T(w,f),re()}var Ve=V('<div class="svelte-sui09f"><!></div>');function Ct(w){var t=Ve(),f=fe(t);xe(f,{children:(h,y)=>{Oe(h,{})},$$slots:{default:!0}}),he(t),T(w,t)}export{Ct as default};
