import"./disclose-version.DsnmJJEf.js";import"./legacy.BoFs8jEp.js";import{p as b,L as q,f as P,s as g,g as i,u as h,a as R}from"./runtime.Blah4U0_.js";import{f as B,a as D}from"./template.DVDQvY7g.js";import{a as I}from"./await.B0cp0lsw.js";import{c as O}from"./svelte-component.BvCHua8c.js";import{av as S,aI as y,T as _}from"./observe.svelte.Bzra_Ed9.js";/* empty css                                                      */import{u as E}from"./useThrelte.C7nCZ9td.js";import{u as $}from"./useTask.svelte.DtaG2cjy.js";import{u as A}from"./useGltf.iLf_Mjx5.js";import"./raycast.DtGR1HHe.js";import{u as G}from"./useFBO.svelte.CiiCDAcT.js";import{E as L}from"./Environment.x7b8TydM.js";import{O as M}from"./OrbitControls.BqkXXn3b.js";import{F as Q}from"./Pass.CN-Q9Ioh.js";import{C as j}from"./Canvas.Nj7JsRU-.js";import"./branches.CA2z7e3L.js";import"./events.CHLxDqHl.js";import"./snippet.CGSK6t1_.js";import"./props.Bxx-6uk3.js";import"./store.DYv7OeNg.js";import"./index.BnMFe_7P.js";import"./create-subscriber.BIXwmmUZ.js";import"./GLTFLoader.6rSu2nkF.js";import"./BufferGeometryUtils.CjD8P52s.js";import"./if.CXc7XFr2.js";import"./index-client.B1KTrfLK.js";import"./useStage.DWKt8Pnp.js";import"./injectPlugin.ImT5Yft9.js";import"./transitions.DyLRn5SF.js";import"./loop.BGGTUj09.js";import"./render.BbwVhprv.js";import"./RGBELoader.DGREBprb.js";import"./useEnvironment.svelte.EOVTHJV8.js";import"./OrbitControls.CivuT4ke.js";import"./useControlsContext.BHc1Huov.js";import"./useThrelteUserContext.B6GyGnor.js";import"./this.BZKhXxqX.js";const z=`
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
