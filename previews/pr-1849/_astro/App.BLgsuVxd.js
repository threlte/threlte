import"./disclose-version.DsnmJJEf.js";import"./legacy.CFq86F04.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.Cq5xh0TU.js";import{f as B,a as D}from"./template.L6xDPO6U.js";import{a as I}from"./await.CvR1qv4C.js";import{c as O}from"./svelte-component.B_Rq4ZKt.js";import{av as S,aI as y,T as _}from"./observe.svelte.TvC_xpcN.js";/* empty css                                                      */import{u as E}from"./useThrelte.VmojktKP.js";import{u as $}from"./useTask.svelte.BxJSwWIP.js";import{u as A}from"./useGltf.ChIJQM4j.js";import"./raycast.C0iVgLjf.js";import{u as G}from"./useFBO.svelte.C_zbcul1.js";import{E as L}from"./Environment.Cq3K5lHS.js";import{O as M}from"./OrbitControls.DvI1KsXZ.js";import{F as Q}from"./Pass.CVuA8L7c.js";import{C as j}from"./Canvas.DCMAFG-V.js";import"./branches.CjZ4fCu_.js";import"./events.-BVBOS9k.js";import"./create-subscriber.Cxqb2LK-.js";import"./index.D-QOJTr1.js";import"./snippet.B1WTn4og.js";import"./if.eGY2C9_P.js";import"./props.D2nmUwxA.js";import"./store.3KrUyxeZ.js";import"./GLTFLoader.CvlpEr2o.js";import"./BufferGeometryUtils.CT7woJjE.js";import"./index-client.CbnisDQz.js";import"./useStage.BE_Gz_ew.js";import"./injectPlugin.PIq3zzX0.js";import"./transitions.Bigw4laK.js";import"./loop.BGGTUj09.js";import"./render.DOVvO0Mi.js";import"./RGBELoader.BmXhK2F6.js";import"./useEnvironment.svelte.hUQm9FMR.js";import"./OrbitControls.D1AV46m0.js";import"./useControlsContext.svelte.Dv7Tlgil.js";import"./this.BCeOz4X_.js";import"./Context.7Jzo4MMn.js";const z=`
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
