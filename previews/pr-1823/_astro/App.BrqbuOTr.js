import"./disclose-version.DsnmJJEf.js";import"./legacy.HYr08gRB.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.DlhdfUbH.js";import{f as B,a as D}from"./template.Bu2kAh_t.js";import{a as I}from"./await.DGI1Nu41.js";import{c as O}from"./svelte-component.D5cvIrCJ.js";import{av as S,aI as y,T as _}from"./observe.svelte.BzV77cWn.js";/* empty css                                                      */import{u as E}from"./useThrelte.hy2iYxhn.js";import{u as $}from"./useTask.svelte.CiDF47B2.js";import{u as A}from"./useGltf.AOgQNkVS.js";import"./raycast.CrRWfF4b.js";import{u as G}from"./useFBO.svelte.BT5vkQ-G.js";import{E as L}from"./Environment.CWvZpNzO.js";import{O as M}from"./OrbitControls.CKwdYAA_.js";import{F as Q}from"./Pass.BGqADEcU.js";import{C as j}from"./Canvas.DSCLM5ba.js";import"./branches.pSyNqzUk.js";import"./events.Dw10-T4K.js";import"./create-subscriber.CrgRYuLx.js";import"./snippet.nMAcNWpK.js";import"./if.C3kzB4LH.js";import"./props.DYdebOnd.js";import"./store.Cj21Qh7F.js";import"./index.jPPQmAdV.js";import"./GLTFLoader.CK6H73TV.js";import"./BufferGeometryUtils.BpQuLHZV.js";import"./index-client.BDBavK0Q.js";import"./useStage.CYVDpzNh.js";import"./injectPlugin.CNmwTLAT.js";import"./transitions.CM0pWbTY.js";import"./loop.BGGTUj09.js";import"./render.C09Cx-hB.js";import"./RGBELoader.C5EKDRo0.js";import"./useEnvironment.svelte.B66SmS38.js";import"./OrbitControls.DjP7brvY.js";import"./useControlsContext.DeWmodMf.js";import"./this.C4LC8FKA.js";const z=`
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
