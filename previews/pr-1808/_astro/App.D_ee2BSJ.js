import"./disclose-version.DsnmJJEf.js";import"./legacy.Czmb_xZx.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.DzQ_psC6.js";import{f as B,a as D}from"./template.8KXtkVtj.js";import{a as I}from"./await.Dkb9WPMu.js";import{c as O}from"./svelte-component.BBXKg7rO.js";import{av as S,aI as y,T as _}from"./observe.svelte.xccpUs8q.js";/* empty css                                                      */import{u as E}from"./useThrelte.CCRdU4bg.js";import{u as $}from"./useTask.svelte.DsNb2MUY.js";import{u as A}from"./useGltf.6L7RN3Eg.js";import"./raycast.Bur1F6oO.js";import{u as G}from"./useFBO.svelte.DHQ25KCP.js";import{E as L}from"./Environment.Zpt08sMV.js";import{O as M}from"./OrbitControls.Cd-zRLWH.js";import{F as Q}from"./Pass.CZNxUUMG.js";import{C as j}from"./Canvas.D-Y9lEJ2.js";import"./branches.BJP20hya.js";import"./events.B3DJ_dn2.js";import"./create-subscriber.BEQ1GfdS.js";import"./snippet.DmFhUaYK.js";import"./props.Ci72VGG8.js";import"./store.DAPwzoj_.js";import"./index.BcWjEkQL.js";import"./GLTFLoader.Dm_7Dae5.js";import"./BufferGeometryUtils.Cyr_hEhS.js";import"./if.BUgNH0S1.js";import"./index-client.CiAupFbP.js";import"./useStage.CKxg3T9B.js";import"./injectPlugin.Bphqmf9I.js";import"./transitions.gnMhmDPO.js";import"./loop.BGGTUj09.js";import"./render.DF57hdxh.js";import"./RGBELoader.BT7tMFTM.js";import"./useEnvironment.svelte.BGgejakG.js";import"./OrbitControls.BHzV205Z.js";import"./useControlsContext.BnxLz5XE.js";import"./useThrelteUserContext.DKpQCGOx.js";import"./this.BRwWLcrx.js";const z=`
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
