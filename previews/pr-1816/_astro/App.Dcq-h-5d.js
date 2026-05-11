import"./disclose-version.DsnmJJEf.js";import"./legacy.BZTFKq7-.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.BCR9T1-m.js";import{f as B,a as D}from"./template.BG62XmY0.js";import{a as I}from"./await.B4xhOFHe.js";import{c as O}from"./svelte-component.Bj7n4lpb.js";import{av as S,aI as y,T as _}from"./observe.svelte.CrTTLJHu.js";/* empty css                                                      */import{u as E}from"./useThrelte.PIQgH1-9.js";import{u as $}from"./useTask.svelte.D1jOQCNE.js";import{u as A}from"./useGltf.DdXqcbjW.js";import"./raycast.BXSfPNu_.js";import{u as G}from"./useFBO.svelte.Dt3mPRT6.js";import{E as L}from"./Environment.DHpJ6Oxn.js";import{O as M}from"./OrbitControls.CxUS2dR-.js";import{F as Q}from"./Pass.B03VKld1.js";import{C as j}from"./Canvas.CSMS89D1.js";import"./branches.JQVJ1MKd.js";import"./events.CH29f32M.js";import"./create-subscriber.Ctz-Bjyw.js";import"./snippet.ZyuPLwuw.js";import"./if.CNX3zY-V.js";import"./props.C2drjlWL.js";import"./store.BJYJv71Q.js";import"./index.Mio5O7cK.js";import"./GLTFLoader.MNIovVws.js";import"./BufferGeometryUtils.DX6wpPcy.js";import"./index-client.CCD-nq1x.js";import"./useStage.CwLVMxKa.js";import"./injectPlugin.CVKLNgkt.js";import"./transitions.C5QvmAdc.js";import"./loop.BGGTUj09.js";import"./render.BwVvWXGy.js";import"./RGBELoader.BNCtiVNV.js";import"./useEnvironment.svelte.mM2pyKi5.js";import"./OrbitControls.jqJ87P2Y.js";import"./useControlsContext.BiGwnCVi.js";import"./this.CHVRJoj3.js";const z=`
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
	`,w=A("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new y({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=P(c);O(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{M(a,{})},$$slots:{default:!0}})});var v=g(d,2);I(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:F}=i(s);return{scene:F}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var U=g(v,2);L(U,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Re(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Re as default};
