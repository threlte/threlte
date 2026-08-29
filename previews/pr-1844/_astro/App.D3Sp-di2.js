import"./disclose-version.DsnmJJEf.js";import"./legacy.CAweiG5b.js";import{p as te,az as de,g as e,u as l,f as E,s as u,n as me,a as re,ab as g,c as he,r as fe}from"./runtime.zyo6wXBK.js";import{c as pe,f as O,a as P}from"./template.CIy_TBqb.js";import{C as xe}from"./Canvas.Cn0cqNUm.js";import{Y as ge,aF as J,ah as i,at as X,bq as ye,aK as we,C as T,$ as Se,A as De,J as Ue,bl as Ce,y as W,bY as _e,bT as Me}from"./observe.svelte.Dzn6J_wL.js";import{i as be}from"./lifecycle.IM7DBa4t.js";/* empty css                                                      */import"./raycast.BzVFbbdq.js";import{F as z}from"./Float.DX-0N_9l.js";import{a as Ie}from"./index-client.GOdihHYm.js";import{s as ke}from"./snippet.BRaEWkfs.js";import{c as Q}from"./svelte-component.qR1qNqnL.js";import{p as s,s as Te,r as Pe}from"./props.upYgiiOB.js";import{u as $e}from"./useThrelte.Bw3MCU9g.js";import{u as ee}from"./useTask.svelte.D-7d0EJb.js";import{E as Be}from"./Environment.DsqQ9U6x.js";import{O as Ae}from"./OrbitControls.ure7kEnZ.js";/* empty css                                                   */import"./if.DhIWVpCr.js";import"./branches.x7VNdJgH.js";import"./this.O5en2FsB.js";import"./Context.bWLZF4Tz.js";import"./events.DtBhR3NB.js";import"./create-subscriber.DOwsJaC7.js";import"./index.DfSaZgs1.js";import"./store.T6Doaygs.js";import"./useStage.DwMLuwzn.js";import"./injectPlugin.M2o-TjPQ.js";import"./transitions.CBCWILOL.js";import"./loop.BGGTUj09.js";import"./render.CeLSf266.js";import"./RGBELoader.BoebagYt.js";import"./useEnvironment.svelte.CM9rFaHR.js";import"./OrbitControls.B5_VBk19.js";import"./useControlsContext.CnehWtui.js";const Re={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`

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

		}`};var Fe=O("<!> <!> <!>",1);function We(y,t){te(t,!0);let h=s(t,"opacity",3,1),f=s(t,"width",3,1),w=s(t,"height",3,1),S=s(t,"blur",3,1),M=s(t,"far",3,10),b=s(t,"smooth",3,!0),d=s(t,"resolution",3,512),D=s(t,"frames",3,1/0),v=s(t,"scale",3,10),$=s(t,"color",3,"#000000"),c=s(t,"depthWrite",3,!1),p=s(t,"ref",15),m=Pe(t,["$$slots","$$events","$$legacy","opacity","width","height","blur","far","smooth","resolution","frames","scale","color","depthWrite","ref","children"]);const{scene:o,renderer:n}=$e(),V=new ge,B=l(()=>f()*(Array.isArray(v())?v()[0]:v()||1)),A=l(()=>w()*(Array.isArray(v())?v()[1]:v()||1)),U=l(()=>{const r=new X(d(),d());return r.texture.generateMipmaps=!1,r.texture.colorSpace=n.outputColorSpace,r}),R=l(()=>{const r=new X(d(),d());return r.texture.generateMipmaps=!1,r}),G=l(()=>new ye(e(B),e(A)).rotateX(Math.PI/2)),x=l(()=>new Ue(e(G))),H=l(()=>{const r=$(),_=new we({depthTest:!1,depthWrite:!1});return _.onBeforeCompile=a=>{a.uniforms={...a.uniforms,uColor:{value:new T(r).convertSRGBToLinear()}},a.fragmentShader=`uniform vec3 uColor;
${a.fragmentShader}`,a.fragmentShader=a.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );"),a.fragmentShader=a.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);","vec4(uColor,(1.0-fragCoordZ)*1.0);")},_}),I=new J({...Re,depthTest:!1}),k=new J({...Ge,depthTest:!1}),C=l(()=>new Se(-e(B)/2,e(B)/2,e(A)/2,-e(A)/2,0,M()));de(()=>e(C).updateProjectionMatrix());const L=l(()=>new De({map:e(U).texture,transparent:!0,opacity:h(),depthWrite:c()})),Z=r=>{e(x).visible=!0,e(x).material=I,I.uniforms.tDiffuse.value=e(U).texture,I.uniforms.h.value=r*1/256,n.setRenderTarget(e(R)),n.render(e(x),e(C)),e(x).material=k,k.uniforms.tDiffuse.value=e(R).texture,k.uniforms.v.value=r*1/256,n.setRenderTarget(e(U)),n.render(e(x),e(C)),e(x).visible=!1},F=()=>{const r=o.background;o.background=null;const _=o.overrideMaterial;o.overrideMaterial=e(H);const a=n.getClearAlpha();n.setClearAlpha(0),n.setRenderTarget(e(U)),n.render(o,e(C)),o.overrideMaterial=_,Z(S()),b()&&Z(S()*.4),n.setRenderTarget(null),o.background=r,n.setClearAlpha(a)},oe=()=>{F()},j=l(()=>D()===Number.POSITIVE_INFINITY);ee(F,{running:()=>e(j)});let q=0;ee(()=>{F(),q+=1},{running:()=>!e(j)&&q<D()}),Ie(()=>{e(U).dispose(),e(R).dispose(),e(G).dispose(),e(H).dispose(),I.dispose(),k.dispose(),e(L).dispose()});var ae={refresh:oe};return i(y,Te({get is(){return V}},()=>m,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:0},get ref(){return p()},set ref(r){p(r)},children:(r,_)=>{var a=pe(),se=E(a);Q(se,()=>i.Group,(ne,ie)=>{ie(ne,{"rotation.x":Math.PI/2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:1},children:(le,Ve)=>{var N=Fe(),Y=E(N);Q(Y,()=>i.Mesh,(ve,ce)=>{ce(ve,{"scale.y":-1,"rotation.x":-Math.PI/2,get material(){return e(L)},get geometry(){return e(G)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:2}})});var K=u(Y,2);i(K,{get is(){return e(C)},manual:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:3}});var ue=u(K,2);ke(ue,()=>t.children??me,()=>({ref:V})),P(le,N)},$$slots:{default:!0}})}),P(r,a)},$$slots:{default:!0}})),re(ae)}var ze=O("<!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function Ee(y,t){te(t,!1),be();var h=ze(),f=E(h);Be(f,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"});var w=u(f,2);i.PerspectiveCamera(w,{makeDefault:!0,position:[-10,10,10],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:0},children:(c,p)=>{Ae(c,{enabled:!1,autoRotate:!0,autoRotateSpeed:.5,"target.y":1})},$$slots:{default:!0}});var S=u(w,2);i.DirectionalLight(S,{intensity:.8,"position.x":5,"position.y":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:1}});var M=u(S,2);i.AmbientLight(M,{intensity:.2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:2}});var b=u(M,2);i.GridHelper(b,{args:[10,10],"position.y":-.001,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:3}});var d=u(b,2);We(d,{frames:200,scale:10,blur:2,far:2.5,opacity:.5});var D=u(d,2);z(D,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new Ce(1,1,1)),o=g(()=>new W({color:new T("#0059BA")}));i.Mesh(c,{"position.y":1.2,"position.z":-.75,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:4}})}},$$slots:{default:!0}});var v=u(D,2);z(v,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new _e(.5,.15,100,12,2,3)),o=g(()=>new W({color:new T("#F85122")}));i.Mesh(c,{position:[1.2,1.5,.75],"rotation.x":5,"rotation.y":71,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:5}})}},$$slots:{default:!0}});var $=u(v,2);z($,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new Me(1,0)),o=g(()=>new W({color:new T("#F8EBCE")}));i.Mesh(c,{position:[-1.4,1.5,.75],rotation:[-5,128,10],get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:6}})}},$$slots:{default:!0}}),P(y,h),re()}var Oe=O('<div class="svelte-sui09f"><!></div>');function _t(y){var t=Oe(),h=he(t);xe(h,{children:(f,w)=>{Ee(f,{})},$$slots:{default:!0}}),fe(t),P(y,t)}export{_t as default};
