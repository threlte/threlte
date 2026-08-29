import"./disclose-version.DsnmJJEf.js";import"./legacy.CFq86F04.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.Cq5xh0TU.js";import{f as B,a as D}from"./template.L6xDPO6U.js";import{a as I}from"./await.CvR1qv4C.js";import{c as O}from"./svelte-component.B_Rq4ZKt.js";import{av as S,aI as y,T as _}from"./observe.svelte.C0rBo_1K.js";/* empty css                                                      */import{u as E}from"./useThrelte.Wdl2QUb4.js";import{u as $}from"./useTask.svelte.bJHaryD1.js";import{u as A}from"./useGltf.DPwQ2AfK.js";import"./raycast.CFpYK-V8.js";import{u as G}from"./useFBO.svelte.C6MTJ5fL.js";import{E as L}from"./Environment.ChqOPST0.js";import{O as M}from"./OrbitControls.DoM_3t9u.js";import{F as Q}from"./Pass.C7E3QrmL.js";import{C as j}from"./Canvas.W5tGNMdy.js";import"./branches.CjZ4fCu_.js";import"./events.-BVBOS9k.js";import"./create-subscriber.Cxqb2LK-.js";import"./index.D-QOJTr1.js";import"./snippet.B1WTn4og.js";import"./if.eGY2C9_P.js";import"./props.D2nmUwxA.js";import"./store.3KrUyxeZ.js";import"./GLTFLoader.BChjxnZD.js";import"./BufferGeometryUtils.CYgNS1cU.js";import"./index-client.CbnisDQz.js";import"./useStage.CWd7QsJH.js";import"./injectPlugin.Ckfbmr_3.js";import"./transitions.Bigw4laK.js";import"./loop.BGGTUj09.js";import"./render.DOVvO0Mi.js";import"./RGBELoader.BTIsI8-8.js";import"./useEnvironment.svelte.BzvNMzS_.js";import"./OrbitControls.BU7KfRIa.js";import"./useControlsContext.svelte.Co1ANGN5.js";import"./this.BCeOz4X_.js";import"./Context.DGw4xGmZ.js";const z=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var H=B("<!> <!> <!>",1);function J(t,o){b(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=E(),m=G(),k=`
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
	`,w=A("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new y({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=P(c);O(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{M(a,{})},$$slots:{default:!0}})});var v=g(d,2);I(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:F}=i(s);return{scene:F}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var U=g(v,2);L(U,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Be(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Be as default};
