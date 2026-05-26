import"./disclose-version.DsnmJJEf.js";import"./legacy.BZ6q4bX4.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.74l6iTpt.js";import{f as B,a as D}from"./template.cF74NQJq.js";import{a as I}from"./await.eQe4Tc_U.js";import{c as O}from"./svelte-component.CmgrVerG.js";import{av as S,aI as y,T as _}from"./observe.svelte.C9iXwWTj.js";/* empty css                                                      */import{u as E}from"./useThrelte.RYiPwqiX.js";import{u as $}from"./useTask.svelte.BR7SFbMo.js";import{u as A}from"./useGltf.Df7erZLp.js";import"./raycast.BIiun7TH.js";import{u as G}from"./useFBO.svelte.K1CD_nH3.js";import{E as L}from"./Environment.awds-ZVy.js";import{O as M}from"./OrbitControls.CqoRaT9P.js";import{F as Q}from"./Pass.DGjQp--u.js";import{C as j}from"./Canvas.BKGblHP4.js";import"./branches.c6uAwFN9.js";import"./events.BgWfslDP.js";import"./create-subscriber.v8HejWhZ.js";import"./snippet.Dn0BqGl2.js";import"./if.DKCY-Hf3.js";import"./props.D9B9D2SC.js";import"./store.IXa4mVwD.js";import"./index.BE65HV78.js";import"./GLTFLoader.XV_3L3ld.js";import"./BufferGeometryUtils.DogOYP6e.js";import"./index-client.CfETg8We.js";import"./useStage.xqE9X3YT.js";import"./injectPlugin.Dm1l-MP0.js";import"./transitions.D1-baVkw.js";import"./loop.BGGTUj09.js";import"./render.Dzq4Aoun.js";import"./RGBELoader.CAVg0Y_t.js";import"./useEnvironment.svelte.BUIdu-4e.js";import"./OrbitControls.DK6dgeOD.js";import"./useControlsContext.BTIjfBPe.js";import"./this.CWS0BOnE.js";import"./Context.64nrMPqg.js";const z=`
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
