import"./disclose-version.DsnmJJEf.js";import"./legacy.CAweiG5b.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.zyo6wXBK.js";import{f as B,a as D}from"./template.CIy_TBqb.js";import{a as O}from"./await.YUxb3Rmg.js";import{c as y}from"./svelte-component.qR1qNqnL.js";import{as as S,aF as E,ah as _}from"./observe.svelte.Dzn6J_wL.js";/* empty css                                                      */import{u as I}from"./useThrelte.Bw3MCU9g.js";import{u as $}from"./useTask.svelte.D-7d0EJb.js";import{u as A}from"./useGltf.BumJkIdK.js";import"./raycast.CJzyi2Ro.js";import{u as G}from"./useFBO.svelte.CnHxA78R.js";import{E as L}from"./Environment.Dtr19ADM.js";import{O as M}from"./OrbitControls.DMQi3F21.js";import{F as Q}from"./Pass.DQ0KHOIk.js";import{C as j}from"./Canvas.Cn0cqNUm.js";import"./branches.x7VNdJgH.js";import"./events.DtBhR3NB.js";import"./create-subscriber.DOwsJaC7.js";import"./snippet.BRaEWkfs.js";import"./if.DhIWVpCr.js";import"./props.upYgiiOB.js";import"./store.T6Doaygs.js";import"./index.DfSaZgs1.js";import"./GLTFLoader.C81axfbB.js";import"./BufferGeometryUtils.BMWNtV2X.js";import"./index-client.GOdihHYm.js";import"./useStage.DwMLuwzn.js";import"./injectPlugin.M2o-TjPQ.js";import"./transitions.CBCWILOL.js";import"./loop.BGGTUj09.js";import"./render.CeLSf266.js";import"./RGBELoader.BoebagYt.js";import"./useEnvironment.svelte.CM9rFaHR.js";import"./OrbitControls.B5_VBk19.js";import"./useControlsContext.DnF-ZnSk.js";import"./this.O5en2FsB.js";import"./Context.bWLZF4Tz.js";const z=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var H=B("<!> <!> <!>",1);function J(t,o){b(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=I(),m=G(),k=`
		uniform sampler2D uScene;
		uniform float uTime;

		varying vec2 vUv;

		void main() {

			gl_FragColor = vec4(0.0, 0.0, 0.0, 1.0);

			vec2 center = vec2(0.5, 0.5);

			float radius = 1.0 - 0.5 * (1.0 + sin(uTime));

			if (length(center - vUv) - radius < 0.0) {
				gl_FragColor = texture2D(uScene, vUv);
			}
		}
	`,w=A("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new E({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=P(c);y(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{M(a,{})},$$slots:{default:!0}})});var v=g(d,2);O(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:U}=i(s);return{scene:U}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var F=g(v,2);L(F,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Be(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Be as default};
