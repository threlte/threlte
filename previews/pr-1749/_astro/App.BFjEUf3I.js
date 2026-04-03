import"./disclose-version.DsnmJJEf.js";import"./legacy.CiYaW_ib.js";import{p as te,_ as de,g as e,$ as l,f as O,s as u,n as me,a as re,b as g,c as fe,r as he}from"./runtime.BsM9HEgF.js";import{c as pe,f as V,a as T}from"./template.BGiQ9W-B.js";import{C as xe}from"./Canvas.B2gaXdQD.js";import{b as ge,a3 as we,aG as Y,T as i,au as J,bW as ye,aK as Se,C as P,a6 as De,M as Ue,_ as Ce,bp as _e,W as F,fF as Me,eC as be}from"./observe.svelte.CpLsxWCV.js";import{i as Ie}from"./lifecycle.B1F0kgQF.js";/* empty css                                                      */import"./raycast.7awbxJDA.js";import{F as E}from"./Float.DlG_2-0_.js";import{a as ke}from"./index-client.D_TSzqy_.js";import{s as Pe}from"./snippet.pNoFfLl0.js";import{c as Q}from"./svelte-component.BIfa6ww3.js";import{p as s,s as Te,r as $e}from"./props.BdgQxxOQ.js";import{u as ee}from"./useTask.svelte.D-lvA5bL.js";import{E as Be}from"./Environment.Dfp_YH9t.js";import{O as Ae}from"./OrbitControls.DaI3IlTM.js";/* empty css                                                   */import"./if.DEmLpFs9.js";import"./branches.DU2v-rCt.js";import"./index.ujCWyV9u.js";import"./events.ClkcKFNI.js";import"./create-subscriber.Cjf9iS6d.js";import"./store.BuonI5uc.js";import"./useStage.GPR6E9rH.js";import"./injectPlugin.oLpntuRh.js";import"./transitions.CSu2MFFA.js";import"./loop.BGGTUj09.js";import"./render.CLVLJyMH.js";import"./utils.NcpWCyqV.js";import"./RGBELoader.DD-10_Rh.js";import"./useEnvironment.svelte.B-NkTRsP.js";import"./OrbitControls.DXY7XKCf.js";import"./useControlsContext.D6-GXOBu.js";import"./useThrelteUserContext.BnZJeu9W.js";const Ge={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`

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

		}`};var We=V("<!> <!> <!>",1);function Fe(w,t){te(t,!0);let f=s(t,"opacity",3,1),h=s(t,"width",3,1),y=s(t,"height",3,1),S=s(t,"blur",3,1),M=s(t,"far",3,10),b=s(t,"smooth",3,!0),d=s(t,"resolution",3,512),D=s(t,"frames",3,1/0),v=s(t,"scale",3,10),$=s(t,"color",3,"#000000"),c=s(t,"depthWrite",3,!1),p=s(t,"ref",15),m=$e(t,["$$slots","$$events","$$legacy","opacity","width","height","blur","far","smooth","resolution","frames","scale","color","depthWrite","ref","children"]);const{scene:o,renderer:n}=ge(),z=new we,B=l(()=>h()*(Array.isArray(v())?v()[0]:v()||1)),A=l(()=>y()*(Array.isArray(v())?v()[1]:v()||1)),U=l(()=>{const r=new J(d(),d());return r.texture.generateMipmaps=!1,r.texture.colorSpace=n.outputColorSpace,r}),G=l(()=>{const r=new J(d(),d());return r.texture.generateMipmaps=!1,r}),R=l(()=>new ye(e(B),e(A)).rotateX(Math.PI/2)),x=l(()=>new Ce(e(R))),H=l(()=>{const r=$(),_=new Se({depthTest:!1,depthWrite:!1});return _.onBeforeCompile=a=>{a.uniforms={...a.uniforms,uColor:{value:new P(r).convertSRGBToLinear()}},a.fragmentShader=`uniform vec3 uColor;
${a.fragmentShader}`,a.fragmentShader=a.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );"),a.fragmentShader=a.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);","vec4(uColor,(1.0-fragCoordZ)*1.0);")},_}),I=new Y({...Ge,depthTest:!1}),k=new Y({...Re,depthTest:!1}),C=l(()=>new De(-e(B)/2,e(B)/2,e(A)/2,-e(A)/2,0,M()));de(()=>e(C).updateProjectionMatrix());const L=l(()=>new Ue({map:e(U).texture,transparent:!0,opacity:f(),depthWrite:c()})),Z=r=>{e(x).visible=!0,e(x).material=I,I.uniforms.tDiffuse.value=e(U).texture,I.uniforms.h.value=r*1/256,n.setRenderTarget(e(G)),n.render(e(x),e(C)),e(x).material=k,k.uniforms.tDiffuse.value=e(G).texture,k.uniforms.v.value=r*1/256,n.setRenderTarget(e(U)),n.render(e(x),e(C)),e(x).visible=!1},W=()=>{const r=o.background;o.background=null;const _=o.overrideMaterial;o.overrideMaterial=e(H);const a=n.getClearAlpha();n.setClearAlpha(0),n.setRenderTarget(e(U)),n.render(o,e(C)),o.overrideMaterial=_,Z(S()),b()&&Z(S()*.4),n.setRenderTarget(null),o.background=r,n.setClearAlpha(a)},oe=()=>{W()},j=l(()=>D()===Number.POSITIVE_INFINITY);ee(W,{running:()=>e(j)});let N=0;ee(()=>{W(),N+=1},{running:()=>!e(j)&&N<D()}),ke(()=>{e(U).dispose(),e(G).dispose(),e(R).dispose(),e(H).dispose(),I.dispose(),k.dispose(),e(L).dispose()});var ae={refresh:oe};return i(w,Te({get is(){return z}},()=>m,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:0},get ref(){return p()},set ref(r){p(r)},children:(r,_)=>{var a=pe(),se=O(a);Q(se,()=>i.Group,(ne,ie)=>{ie(ne,{"rotation.x":Math.PI/2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:1},children:(le,ze)=>{var q=We(),K=O(q);Q(K,()=>i.Mesh,(ve,ce)=>{ce(ve,{"scale.y":-1,"rotation.x":-Math.PI/2,get material(){return e(L)},get geometry(){return e(R)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:2}})});var X=u(K,2);i(X,{get is(){return e(C)},manual:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:3}});var ue=u(X,2);Pe(ue,()=>t.children??me,()=>({ref:z})),T(le,q)},$$slots:{default:!0}})}),T(r,a)},$$slots:{default:!0}})),re(ae)}var Ee=V("<!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function Oe(w,t){te(t,!1),Ie();var f=Ee(),h=O(f);Be(h,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"});var y=u(h,2);i.PerspectiveCamera(y,{makeDefault:!0,position:[-10,10,10],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:0},children:(c,p)=>{Ae(c,{enabled:!1,autoRotate:!0,autoRotateSpeed:.5,"target.y":1})},$$slots:{default:!0}});var S=u(y,2);i.DirectionalLight(S,{intensity:.8,"position.x":5,"position.y":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:1}});var M=u(S,2);i.AmbientLight(M,{intensity:.2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:2}});var b=u(M,2);i.GridHelper(b,{args:[10,10],"position.y":-.001,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:3}});var d=u(b,2);Fe(d,{frames:200,scale:10,blur:2,far:2.5,opacity:.5});var D=u(d,2);E(D,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new _e(1,1,1)),o=g(()=>new F({color:new P("#0059BA")}));i.Mesh(c,{"position.y":1.2,"position.z":-.75,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:4}})}},$$slots:{default:!0}});var v=u(D,2);E(v,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new Me(.5,.15,100,12,2,3)),o=g(()=>new F({color:new P("#F85122")}));i.Mesh(c,{position:[1.2,1.5,.75],"rotation.x":5,"rotation.y":71,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:5}})}},$$slots:{default:!0}});var $=u(v,2);E($,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new be(1,0)),o=g(()=>new F({color:new P("#F8EBCE")}));i.Mesh(c,{position:[-1.4,1.5,.75],rotation:[-5,128,10],get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:6}})}},$$slots:{default:!0}}),T(w,f),re()}var Ve=V('<div class="svelte-sui09f"><!></div>');function Ct(w){var t=Ve(),f=fe(t);xe(f,{children:(h,y)=>{Oe(h,{})},$$slots:{default:!0}}),he(t),T(w,t)}export{Ct as default};
