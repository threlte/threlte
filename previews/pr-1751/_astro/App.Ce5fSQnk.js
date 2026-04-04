import"./disclose-version.DsnmJJEf.js";import"./legacy.eoQ0iq9U.js";import{p as te,_ as de,g as e,$ as l,f as E,s as u,n as me,a as re,b as g,c as he,r as fe}from"./runtime.XdAhm9hg.js";import{c as pe,f as L,a as P}from"./template.D6i0fWOI.js";import{C as xe}from"./Canvas.DB8wxWRj.js";import{c as ge,a4 as we,aH as Y,a as J,T as i,av as Q,bX as ye,aL as Se,C as $,a7 as De,M as Ue,$ as Ce,bq as Me,X as W,fH as _e,eD as Ie}from"./T.CIQBugds.js";import{i as be}from"./lifecycle.xbdt471Q.js";/* empty css                                                      */import"./raycast.CrDucA7w.js";import{F as H}from"./Float.BLTg4ici.js";import{a as ke}from"./index-client.C7k-19DO.js";import{s as $e}from"./snippet.zb5DD4fg.js";import{c as ee}from"./svelte-component.C2lNx87h.js";import{p as s,s as Pe,r as Te}from"./props.29maieIx.js";import{E as Be}from"./Environment.ByoOOHFY.js";import{O as Ae}from"./OrbitControls.vf8AzM1K.js";/* empty css                                                   */import"./if.B_4c_Y5G.js";import"./branches.6GqzXayE.js";import"./index.DNbPeuyJ.js";import"./create-subscriber.DeG5rlNu.js";import"./store.PBLySVcD.js";import"./useStage.CgYX7zAO.js";import"./injectPlugin.BUbDuExm.js";import"./transitions.DqydtAYe.js";import"./loop.BGGTUj09.js";import"./render.DIB6WIKL.js";import"./events.B3d_pF6g.js";import"./utils.NcpWCyqV.js";import"./RGBELoader.BIBxThlu.js";import"./useEnvironment.svelte.CB2WeIPb.js";import"./OrbitControls.CBw4V2Xa.js";import"./useControlsContext.CGlm_l3U.js";import"./useThrelteUserContext.CL4gDbvX.js";const Re={name:"HorizontalBlurShader",uniforms:{tDiffuse:{value:null},h:{value:1/512}},vertexShader:`

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

		}`};var Fe=L("<!> <!> <!>",1);function We(w,t){te(t,!0);let h=s(t,"opacity",3,1),f=s(t,"width",3,1),y=s(t,"height",3,1),S=s(t,"blur",3,1),_=s(t,"far",3,10),I=s(t,"smooth",3,!0),d=s(t,"resolution",3,512),D=s(t,"frames",3,1/0),v=s(t,"scale",3,10),T=s(t,"color",3,"#000000"),c=s(t,"depthWrite",3,!1),p=s(t,"ref",15),m=Te(t,["$$slots","$$events","$$legacy","opacity","width","height","blur","far","smooth","resolution","frames","scale","color","depthWrite","ref","children"]);const{scene:o,renderer:n}=ge(),O=new we,B=l(()=>f()*(Array.isArray(v())?v()[0]:v()||1)),A=l(()=>y()*(Array.isArray(v())?v()[1]:v()||1)),U=l(()=>{const r=new Q(d(),d());return r.texture.generateMipmaps=!1,r.texture.colorSpace=n.outputColorSpace,r}),R=l(()=>{const r=new Q(d(),d());return r.texture.generateMipmaps=!1,r}),G=l(()=>new ye(e(B),e(A)).rotateX(Math.PI/2)),x=l(()=>new Ce(e(G))),V=l(()=>{const r=T(),M=new Se({depthTest:!1,depthWrite:!1});return M.onBeforeCompile=a=>{a.uniforms={...a.uniforms,uColor:{value:new $(r).convertSRGBToLinear()}},a.fragmentShader=`uniform vec3 uColor;
${a.fragmentShader}`,a.fragmentShader=a.fragmentShader.replace("vec4( vec3( 1.0 - fragCoordZ ), opacity );","vec4( uColor, ( 1.0 - fragCoordZ ) * 1.0 );"),a.fragmentShader=a.fragmentShader.replace("vec4(vec3(1.0-fragCoordZ),opacity);","vec4(uColor,(1.0-fragCoordZ)*1.0);")},M}),b=new Y({...Re,depthTest:!1}),k=new Y({...Ge,depthTest:!1}),C=l(()=>new De(-e(B)/2,e(B)/2,e(A)/2,-e(A)/2,0,_()));de(()=>e(C).updateProjectionMatrix());const z=l(()=>new Ue({map:e(U).texture,transparent:!0,opacity:h(),depthWrite:c()})),Z=r=>{e(x).visible=!0,e(x).material=b,b.uniforms.tDiffuse.value=e(U).texture,b.uniforms.h.value=r*1/256,n.setRenderTarget(e(R)),n.render(e(x),e(C)),e(x).material=k,k.uniforms.tDiffuse.value=e(R).texture,k.uniforms.v.value=r*1/256,n.setRenderTarget(e(U)),n.render(e(x),e(C)),e(x).visible=!1},F=()=>{const r=o.background;o.background=null;const M=o.overrideMaterial;o.overrideMaterial=e(V);const a=n.getClearAlpha();n.setClearAlpha(0),n.setRenderTarget(e(U)),n.render(o,e(C)),o.overrideMaterial=M,Z(S()),I()&&Z(S()*.4),n.setRenderTarget(null),o.background=r,n.setClearAlpha(a)},oe=()=>{F()},j=l(()=>D()===Number.POSITIVE_INFINITY);J(F,{running:()=>e(j)});let q=0;J(()=>{F(),q+=1},{running:()=>!e(j)&&q<D()}),ke(()=>{e(U).dispose(),e(R).dispose(),e(G).dispose(),e(V).dispose(),b.dispose(),k.dispose(),e(z).dispose()});var ae={refresh:oe};return i(w,Pe({get is(){return O}},()=>m,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:0},get ref(){return p()},set ref(r){p(r)},children:(r,M)=>{var a=pe(),se=E(a);ee(se,()=>i.Group,(ne,ie)=>{ie(ne,{"rotation.x":Math.PI/2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:1},children:(le,Oe)=>{var N=Fe(),X=E(N);ee(X,()=>i.Mesh,(ve,ce)=>{ce(ve,{"scale.y":-1,"rotation.x":-Math.PI/2,get material(){return e(z)},get geometry(){return e(G)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:2}})});var K=u(X,2);i(K,{get is(){return e(C)},manual:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/ContactShadows/ContactShadows.svelte",index:3}});var ue=u(K,2);$e(ue,()=>t.children??me,()=>({ref:O})),P(le,N)},$$slots:{default:!0}})}),P(r,a)},$$slots:{default:!0}})),re(ae)}var He=L("<!> <!> <!> <!> <!> <!> <!> <!> <!>",1);function Ee(w,t){te(t,!1),be();var h=He(),f=E(h);Be(f,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr"});var y=u(f,2);i.PerspectiveCamera(y,{makeDefault:!0,position:[-10,10,10],fov:25,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:0},children:(c,p)=>{Ae(c,{enabled:!1,autoRotate:!0,autoRotateSpeed:.5,"target.y":1})},$$slots:{default:!0}});var S=u(y,2);i.DirectionalLight(S,{intensity:.8,"position.x":5,"position.y":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:1}});var _=u(S,2);i.AmbientLight(_,{intensity:.2,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:2}});var I=u(_,2);i.GridHelper(I,{args:[10,10],"position.y":-.001,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:3}});var d=u(I,2);We(d,{frames:200,scale:10,blur:2,far:2.5,opacity:.5});var D=u(d,2);H(D,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new Me(1,1,1)),o=g(()=>new W({color:new $("#0059BA")}));i.Mesh(c,{"position.y":1.2,"position.z":-.75,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:4}})}},$$slots:{default:!0}});var v=u(D,2);H(v,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new _e(.5,.15,100,12,2,3)),o=g(()=>new W({color:new $("#F85122")}));i.Mesh(c,{position:[1.2,1.5,.75],"rotation.x":5,"rotation.y":71,get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:5}})}},$$slots:{default:!0}});var T=u(v,2);H(T,{floatIntensity:1,floatingRange:[0,1],children:(c,p)=>{{let m=g(()=>new Ie(1,0)),o=g(()=>new W({color:new $("#F8EBCE")}));i.Mesh(c,{position:[-1.4,1.5,.75],rotation:[-5,128,10],get geometry(){return e(m)},get material(){return e(o)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/contact-shadows/Scene.svelte",index:6}})}},$$slots:{default:!0}}),P(w,h),re()}var Le=L('<div class="svelte-sui09f"><!></div>');function Ut(w){var t=Le(),h=he(t);xe(h,{children:(f,y)=>{Ee(f,{})},$$slots:{default:!0}}),fe(t),P(w,t)}export{Ut as default};
