import"./disclose-version.DsnmJJEf.js";import"./legacy.BX9FVSsh.js";import{p as F,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.QwcowWmd.js";import{f as B,a as D}from"./template.BTOqUpqr.js";import{a as E}from"./await.BZuBEDNV.js";import{c as O}from"./svelte-component.CTAeTR9H.js";import{b as y,ar as S,aE as I,T as _}from"./observe.svelte.xONaORci.js";/* empty css                                                      */import{u as $}from"./useTask.svelte.CmJ2DNhI.js";import{u as A}from"./useGltf.CbGOSjbg.js";import"./raycast.DUGB3LdF.js";import{u as G}from"./useFBO.svelte.B27scT9E.js";import{E as L}from"./Environment.CI-lgsZm.js";import{O as M}from"./OrbitControls.BWIENR65.js";import{F as Q}from"./Pass.YDlMiGEP.js";import{C as j}from"./Canvas.CrwcQrtU.js";import"./branches.DtPcVk1i.js";import"./snippet.C4xr2bBf.js";import"./props.DGdK2eRS.js";import"./store.C3oo1Ja3.js";import"./index.BG6cyvtG.js";import"./events.C8apxgRN.js";import"./create-subscriber.CgMBEJ37.js";import"./GLTFLoader.DbYmZOmM.js";import"./BufferGeometryUtils.BrAkEs2g.js";import"./if.DdzMJn16.js";import"./index-client.CiRnKAZe.js";import"./useStage.DrJB8Ob4.js";import"./injectPlugin.GYwba6jh.js";import"./transitions.CsoAtMHn.js";import"./loop.BGGTUj09.js";import"./render.Cqw0wcF1.js";import"./utils.NcpWCyqV.js";import"./RGBELoader.BC550mMz.js";import"./useEnvironment.svelte.xi6msbFy.js";import"./OrbitControls.DBR4gFcW.js";import"./useControlsContext.Px4ypSoh.js";import"./useThrelteUserContext.BpiqKU-c.js";const z=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var H=B("<!> <!> <!>",1);function J(t,o){F(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=y(),m=G(),k=`
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
	`,w=A("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);$(e=>{p.value+=e});const u=new I({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:z}),l=new Q(u);q(()=>()=>{l.dispose(),u.dispose()}),$(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),l.render(r)},{stage:x});var c=H(),d=P(c);O(d,()=>_.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{M(a,{})},$$slots:{default:!0}})});var v=g(d,2);E(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:b}=i(s);return{scene:b}}),f=h(()=>i(a).scene);_(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var U=g(v,2);L(U,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,c),R()}function Re(t){j(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Re as default};
