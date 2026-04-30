import"./disclose-version.DsnmJJEf.js";import{p as W,L as R,f as z,s as l,a as V,b as x,g as a,d as y,c as Y,r as Z}from"./runtime.Blah4U0_.js";import{f as G,a as P,c as B}from"./template.DVDQvY7g.js";import{k as H}from"./key.BsxLP9RP.js";import{C as J}from"./Canvas.CuhrZCGL.js";import{M as K,bn as Q,aI as X,D as ee,av as E,C as q,T as $,i as te}from"./observe.svelte.pqSlaTIN.js";import{i as j}from"./if.CXc7XFr2.js";import{c as T}from"./svelte-component.BvCHua8c.js";import{a as F,s as re}from"./store.DYv7OeNg.js";/* empty css                                                      */import{u as oe}from"./useTask.svelte.DkZyWmQj.js";import{u as ae}from"./useGltf.Bs0rtPgt.js";import{u as ie,a as ne}from"./raycast.VCA6zDkW.js";import{C as se}from"./CameraControls.CvjV_-hV.js";import{B as le,W as me}from"./Wheel.Chl0JwGf.js";import{O as ce}from"./OrbitControls.CJg_IRMl.js";import{T as ve}from"./TrackballControls.2D4eHZrD.js";import{S as ge}from"./Sparkles.DOEPfH1C.js";import{B as pe}from"./Button.BIO0pEYf.js";import"./legacy.BoFs8jEp.js";import{P as fe}from"./tweakpane-plugin-waveform.C6SGzyQK.js";/* empty css                                                           */import{C as A}from"./Checkbox.DZgpKTlp.js";import{L as N}from"./List.Cpeg3OJ9.js";/* empty css                                                       *//* empty css                                                       */import{S as ue}from"./Suspense.Ch_Vxdmh.js";/* empty css                                                   */import"./branches.CA2z7e3L.js";import"./snippet.CGSK6t1_.js";import"./this.BZKhXxqX.js";import"./props.Bxx-6uk3.js";import"./events.CHLxDqHl.js";import"./index.BnMFe_7P.js";import"./create-subscriber.BIXwmmUZ.js";import"./GLTFLoader.BlA56y-J.js";import"./BufferGeometryUtils.CRfMea7W.js";import"./useThrelte.Duv4htzD.js";import"./index-client.B1KTrfLK.js";import"./useStage.DmtzRW7-.js";import"./injectPlugin.Dn35vxwe.js";import"./transitions.DyLRn5SF.js";import"./loop.BGGTUj09.js";import"./render.BbwVhprv.js";import"./camera-controls.module.D8Qr5Vvt.js";import"./useControlsContext.BmwCra1R.js";import"./useThrelteUserContext.DrlnukZL.js";import"./misc.ChbrZGdn.js";import"./GenericSlider.0BK5_0bA.js";import"./GenericInput.GOFyHvJ4.js";import"./GenericBinding.DORNxE_k.js";import"./lifecycle.65_nQaXc.js";import"./index.DgAtSlAd.js";import"./OrbitControls.DqypTWLW.js";import"./TrackballControls.nA6gGwah.js";import"./slot.l26HEDnm.js";import"./class.BpMtwUI3.js";import"./attributes.B79LgCJy.js";import"./style.Dvv6KC9i.js";/* empty css                                                                     */import"./Blade.CiwfxUus.js";const de=`
varying vec2 vUv;

void main () {
  vUv = uv;

  vec4 modelPosition = modelMatrix * vec4(position, 1.0);
  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectionPosition = projectionMatrix * viewPosition;
  gl_Position = projectionPosition;
}`,xe=`
//  Classic Perlin 3D Noise 
//  by Stefan Gustavson
//
vec4 permute(vec4 x) {
  return mod(((x*34.0)+1.0)*x, 289.0);
}

vec4 taylorInvSqrt(vec4 r) {
  return 1.79284291400159 - 0.85373472095314 * r;
}

vec3 fade(vec3 t) {
  return t*t*t*(t*(t*6.0-15.0)+10.0);
}

float cnoise(vec3 P) {
  vec3 Pi0 = floor(P); // Integer part for indexing
  vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
  Pi0 = mod(Pi0, 289.0);
  Pi1 = mod(Pi1, 289.0);
  vec3 Pf0 = fract(P); // Fractional part for interpolation
  vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
  vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
  vec4 iy = vec4(Pi0.yy, Pi1.yy);
  vec4 iz0 = Pi0.zzzz;
  vec4 iz1 = Pi1.zzzz;

  vec4 ixy = permute(permute(ix) + iy);
  vec4 ixy0 = permute(ixy + iz0);
  vec4 ixy1 = permute(ixy + iz1);

  vec4 gx0 = ixy0 / 7.0;
  vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
  gx0 = fract(gx0);
  vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
  vec4 sz0 = step(gz0, vec4(0.0));
  gx0 -= sz0 * (step(0.0, gx0) - 0.5);
  gy0 -= sz0 * (step(0.0, gy0) - 0.5);

  vec4 gx1 = ixy1 / 7.0;
  vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
  gx1 = fract(gx1);
  vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
  vec4 sz1 = step(gz1, vec4(0.0));
  gx1 -= sz1 * (step(0.0, gx1) - 0.5);
  gy1 -= sz1 * (step(0.0, gy1) - 0.5);

  vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
  vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
  vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
  vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
  vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
  vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
  vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
  vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

  vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
  g000 *= norm0.x;
  g010 *= norm0.y;
  g100 *= norm0.z;
  g110 *= norm0.w;
  vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
  g001 *= norm1.x;
  g011 *= norm1.y;
  g101 *= norm1.z;
  g111 *= norm1.w;

  float n000 = dot(g000, Pf0);
  float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
  float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
  float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
  float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
  float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
  float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
  float n111 = dot(g111, Pf1);

  vec3 fade_xyz = fade(Pf0);
  vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
  vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
  float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 

  return 2.2 * n_xyz;
}

varying vec2 vUv;

uniform float uTime;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;

void main () {
  // Displace the UV
  vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));

  // Perlin noise
  float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2));

  // Outer glow
  float outerGlow = distance(vUv, vec2(0.5)) * 6.0 - 1.8;

  strength += outerGlow;
  strength += step(-0.2, strength) * 0.8;

  vec3 color = mix(uColorStart, uColorEnd, strength);

  gl_FragColor = vec4(color, 1.0);
}`;var ye=G("<!> <!> <!> <!>",1);function ze(U,o){W(o,!0);const c=()=>F(I,"$texture",g),v=()=>F(M,"$gltf",g),[g,h]=re(),p=e=>{var t=B(),d=z(t);{var s=n=>{ce(n,{enableDamping:!0,enableZoom:!1,enablePan:!1})},r=n=>{se(n,{})},k=n=>{ve(n,{})};j(d,n=>{o.controls==="orbit"?n(s):o.controls==="camera"?n(r,1):o.controls==="trackball"&&n(k,2)})}P(e,t)},b=ie(),M=b(ae("/models/portal/portal.glb")),I=b(ne("/models/portal/portal_baked.jpg",{transform(e){return e.flipY=!1,e}})),D=new K({color:16777189}),f=new Q,_=new X({uniforms:{uTime:new E(0),uColorStart:new E(new q("#1E88E5")),uColorEnd:new E(new q("#5E35B1"))},side:ee,vertexShader:de,fragmentShader:xe});R(()=>{c()&&(f.map=c())}),oe(e=>{_.uniforms.uTime.value+=e});var u=ye(),m=z(u);{var w=e=>{var t=B(),d=z(t);T(d,()=>$.PerspectiveCamera,(s,r)=>{r(s,{makeDefault:!0,"position.x":20,"position.y":10,"position.z":-20,fov:50,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:0},children:(k,n)=>{p(k)},$$slots:{default:!0}})}),P(e,t)},L=e=>{var t=B(),d=z(t);T(d,()=>$.OrthographicCamera,(s,r)=>{r(s,{makeDefault:!0,"position.x":20,"position.y":10,"position.z":-20,zoom:50,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:1},children:(k,n)=>{p(k)},$$slots:{default:!0}})}),P(e,t)};j(m,e=>{o.camera==="perspective"?e(w):o.camera==="orthographic"&&e(L,1)})}var C=l(m,2);T(C,()=>$.DirectionalLight,(e,t)=>{t(e,{"position.y":10,"position.z":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:2}})});var S=l(C,2);T(S,()=>$.AmbientLight,(e,t)=>{t(e,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:3}})});var O=l(S,2);{var i=e=>{le(e,{get margin(){return o.margin},get animate(){return o.animate},get enabled(){return o.enabled},children:(t,d)=>{$(t,{get is(){return v().scene},oncreate:s=>{s.traverse(r=>{te(r,"Mesh")&&(r.name==="Portal"?r.material=_:r.name==="LampLight1"||r.name==="LampLight2"?r.material=D:r.material=f)})},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:4},children:(s,r)=>{ge(s,{position:[0,.8,0],size:4,scale:[4,1.5,4]})},$$slots:{default:!0}})},$$slots:{default:!0}})};j(O,e=>{v()&&e(i)})}P(U,u),V(),h()}var Pe=G("<!> <!> <!> <!> <!> <!>",1),he=G('<!> <div class="svelte-bzxr12"><!></div>',1);function Mt(U){let o=y("perspective"),c=y("orbit"),v=y(!0),g=y(1.5),h=y(!0),p=y(0);var b=he(),M=z(b);fe(M,{title:"",position:"fixed",children:(f,_)=>{var u=Pe(),m=z(u);N(m,{label:"camera",options:{OrthographicCamera:"orthographic",PerspectiveCamera:"perspective"},get value(){return a(o)},set value(i){x(o,i,!0)}});var w=l(m,2);N(w,{label:"controls",options:{OrbitControls:"orbit",CameraControls:"camera",TrackballControls:"trackball",None:"none"},get value(){return a(c)},set value(i){x(c,i,!0)}});var L=l(w,2);me(L,{label:"margin",step:.1,get value(){return a(g)},set value(i){x(g,i,!0)}});var C=l(L,2);A(C,{label:"animate",get value(){return a(v)},set value(i){x(v,i,!0)}});var S=l(C,2);A(S,{label:"enabled",get value(){return a(h)},set value(i){x(h,i,!0)}});var O=l(S,2);pe(O,{title:"Reset scene",$$events:{click:()=>x(p,a(p)+1)}}),P(f,u)},$$slots:{default:!0}});var I=l(M,2),D=Y(I);H(D,()=>a(p),f=>{J(f,{children:(_,u)=>{ue(_,{children:(m,w)=>{ze(m,{get camera(){return a(o)},get controls(){return a(c)},get margin(){return a(g)},get animate(){return a(v)},get enabled(){return a(h)}})},$$slots:{default:!0}})},$$slots:{default:!0}})}),Z(I),P(U,b)}export{Mt as default};
