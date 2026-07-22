import"./disclose-version.DwdwGuwu.js";import{Ft as z,It as l,Pt as R,R as T,U as V,Ut as p,Vt as y,W as D,Xt as W,Yt as Y,ht as a,it as F,kt as Z,nn as K,nt as P,o as Q,rt as E,s as j}from"./client.CmGS4DHB.js";import{Fr as X,a as H,f as J,kr as ee,l as $,m as te,so as O,ya as re,yt as B}from"./lib.BP7gumtS.js";import{At as oe,K as ae,Nt as ne,Q as se,Z as ie,h as le,ht as ce,tt as ve,xt as ge}from"./lib.CCfBeaz9.js";import{c as ue,g as G,u as me,v as A,x as de}from"./dist.C7OXXE4P.js";var fe=`
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
}`,pe=F("<!> <!> <!> <!>",1);function ye(q,o){W(o,!0);const v=()=>j(M,"$texture",u),g=()=>j(I,"$gltf",u),[u,h]=Q(),m=e=>{var t=E(),x=z(t),i=s=>{se(s,{enableDamping:!0,enableZoom:!1,enablePan:!1})},r=s=>{ce(s,{})},k=s=>{ie(s,{})};D(x,s=>{o.controls==="orbit"?s(i):o.controls==="camera"?s(r,1):o.controls==="trackball"&&s(k,2)}),P(e,t)},_=ge(),I=_(ne("/models/portal/portal.glb")),M=_(oe("/models/portal/portal_baked.jpg",{transform(e){return e.flipY=!1,e}})),L=new ee({color:16777189}),d=new X,b=new re({uniforms:{uTime:new O(0),uColorStart:new O(new B("#1E88E5")),uColorEnd:new O(new B("#5E35B1"))},side:2,vertexShader:fe,fragmentShader:xe});Z(()=>{v()&&(d.map=v())}),H(e=>{b.uniforms.uTime.value+=e});var f=pe(),c=z(f),w=e=>{var t=E(),x=z(t);T(x,()=>$.PerspectiveCamera,(i,r)=>{r(i,{makeDefault:!0,"position.x":20,"position.y":10,"position.z":-20,fov:50,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:0},children:(k,s)=>{m(k)},$$slots:{default:!0}})}),P(e,t)},U=e=>{var t=E(),x=z(t);T(x,()=>$.OrthographicCamera,(i,r)=>{r(i,{makeDefault:!0,"position.x":20,"position.y":10,"position.z":-20,zoom:50,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:1},children:(k,s)=>{m(k)},$$slots:{default:!0}})}),P(e,t)};D(c,e=>{o.camera==="perspective"?e(w):o.camera==="orthographic"&&e(U,1)});var C=l(c,2);T(C,()=>$.DirectionalLight,(e,t)=>{t(e,{"position.y":10,"position.z":10,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:2}})});var S=l(C,2);T(S,()=>$.AmbientLight,(e,t)=>{t(e,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:3}})});var n=l(S,2),N=e=>{ve(e,{get margin(){return o.margin},get animate(){return o.animate},get enabled(){return o.enabled},children:(t,x)=>{$(t,{get is(){return g().scene},oncreate:i=>{i.traverse(r=>{te(r,"Mesh")&&(r.name==="Portal"?r.material=b:r.name==="LampLight1"||r.name==="LampLight2"?r.material=L:r.material=d)})},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/bounds/Scene.svelte",index:4},children:(i,r)=>{ae(i,{position:[0,.8,0],size:4,scale:[4,1.5,4]})},$$slots:{default:!0}})},$$slots:{default:!0}})};D(n,e=>{g()&&e(N)}),P(q,f),Y(),h()}var ze=F("<!> <!> <!> <!> <!> <!>",1),Pe=F('<!> <div class="svelte-bzxr12"><!></div>',1);function Se(q){let o=p("perspective"),v=p("orbit"),g=p(!0),u=p(1.5),h=p(!0),m=p(0);var _=Pe(),I=z(_);ue(I,{title:"",position:"fixed",children:(d,b)=>{var f=ze(),c=z(f);G(c,{label:"camera",options:{OrthographicCamera:"orthographic",PerspectiveCamera:"perspective"},get value(){return a(o)},set value(n){y(o,n,!0)}});var w=l(c,2);G(w,{label:"controls",options:{OrbitControls:"orbit",CameraControls:"camera",TrackballControls:"trackball",None:"none"},get value(){return a(v)},set value(n){y(v,n,!0)}});var U=l(w,2);me(U,{label:"margin",step:.1,get value(){return a(u)},set value(n){y(u,n,!0)}});var C=l(U,2);A(C,{label:"animate",get value(){return a(g)},set value(n){y(g,n,!0)}});var S=l(C,2);A(S,{label:"enabled",get value(){return a(h)},set value(n){y(h,n,!0)}}),de(l(S,2),{title:"Reset scene",$$events:{click:()=>y(m,a(m)+1)}}),P(d,f)},$$slots:{default:!0}});var M=l(I,2),L=R(M);V(L,()=>a(m),d=>{J(d,{children:(b,f)=>{le(b,{children:(c,w)=>{ye(c,{get camera(){return a(o)},get controls(){return a(v)},get margin(){return a(u)},get animate(){return a(g)},get enabled(){return a(h)}})},$$slots:{default:!0}})},$$slots:{default:!0}})}),K(M),P(q,_)}export{Se as default};
