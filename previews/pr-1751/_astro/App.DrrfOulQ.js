import"./disclose-version.DsnmJJEf.js";import"./legacy.eoQ0iq9U.js";import{p as b,N as q,f as P,s as g,g as i,$ as h,a as R}from"./runtime.XdAhm9hg.js";import{f as B,a as D}from"./template.D6i0fWOI.js";import{a as O}from"./await.fD-9oT2M.js";import{c as y}from"./svelte-component.C2lNx87h.js";import{u as E}from"./useGltf.D8oNO7NZ.js";import{c as I,au as S,a as _,aH as A,T as $}from"./T.CIQBugds.js";/* empty css                                                      */import"./raycast.CrDucA7w.js";import{u as G}from"./useFBO.svelte.BJ-w8GMT.js";import{E as H}from"./Environment.ByoOOHFY.js";import{O as M}from"./OrbitControls.vf8AzM1K.js";import{F as N}from"./Pass.DO7I3lz1.js";import{C as Q}from"./Canvas.DB8wxWRj.js";import"./branches.6GqzXayE.js";import"./GLTFLoader.BXVtHuf8.js";import"./BufferGeometryUtils.wYM1TIxp.js";import"./snippet.zb5DD4fg.js";import"./props.29maieIx.js";import"./store.PBLySVcD.js";import"./index.DNbPeuyJ.js";import"./create-subscriber.DeG5rlNu.js";import"./index-client.C7k-19DO.js";import"./if.B_4c_Y5G.js";import"./useStage.CgYX7zAO.js";import"./injectPlugin.BUbDuExm.js";import"./transitions.DqydtAYe.js";import"./loop.BGGTUj09.js";import"./render.DIB6WIKL.js";import"./events.B3d_pF6g.js";import"./utils.NcpWCyqV.js";import"./RGBELoader.BIBxThlu.js";import"./useEnvironment.svelte.CB2WeIPb.js";import"./OrbitControls.CBw4V2Xa.js";import"./useControlsContext.CGlm_l3U.js";import"./useThrelteUserContext.CL4gDbvX.js";const j=`
		varying vec2 vUv;

		void main() {
			vUv = uv;
			gl_Position = vec4(position, 1.0);
		}
`;var z=B("<!> <!> <!>",1);function J(t,o){b(o,!0);const{camera:n,renderStage:x,renderer:r,scene:T}=I(),m=G(),k=`
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
	`,w=E("/models/spaceships/Bob.gltf"),C=new S(m.texture),p=new S(0);_(e=>{p.value+=e});const u=new A({fragmentShader:k,uniforms:{uScene:C,uTime:p},vertexShader:j}),c=new N(u);q(()=>()=>{c.dispose(),u.dispose()}),_(()=>{const e=r.getRenderTarget();r.setRenderTarget(m),r.render(T,n.current),r.setRenderTarget(e),c.render(r)},{stage:x});var l=z(),d=P(l);y(d,()=>$.PerspectiveCamera,(e,s)=>{s(e,{makeDefault:!0,position:5,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:0},children:(a,f)=>{M(a,{})},$$slots:{default:!0}})});var v=g(d,2);O(v,()=>w,null,(e,s)=>{var a=h(()=>{var{scene:F}=i(s);return{scene:F}}),f=h(()=>i(a).scene);$(e,{get is(){return i(f)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/postprocessing/screen-quad/Scene.svelte",index:1}})});var U=g(v,2);H(U,{url:"/textures/equirectangular/hdr/shanghai_riverside_1k.hdr",isBackground:!0}),D(t,l),R()}function Pe(t){Q(t,{autoRender:!1,children:(o,n)=>{J(o,{})},$$slots:{default:!0}})}export{Pe as default};
