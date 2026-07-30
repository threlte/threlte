import"./disclose-version.DwdwGuwu.js";import{Ft as g,Gt as x,It as P,Pt as w,Xt as y,Yt as S,_ as T,ht as $,it as p,nn as _,nt as f,tn as F}from"./client.CmGS4DHB.js";import"./legacy.BVIVHw1B.js";import{ei as b,f as k,l as c,vo as C}from"./lib.BP7gumtS.js";import{t as G}from"./MathUtils.Czpk-1Bf.js";import{Q as M,o as z}from"./lib.CCfBeaz9.js";import{t as U}from"./motion.DDxCnjxt.js";import{c as I}from"./easing.BRnDC4Ae.js";import{t as j}from"./SimplexNoise.CEG7kKfZ.js";var A=`// Credit: https://madebyevan.com/shaders/grid/

varying vec2 vUv;
varying vec3 vPosition;
uniform vec3 pulsePosition;
uniform float pulseTimer;

void main() {

  float coord = vPosition.y * 2.;
  float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
  float lineFill = 1.0 - min(line, 1.0);
  lineFill = pow(lineFill, 1.0 / 2.2);

  float circleGrowTimer = min(pulseTimer * 2., 1.);
  float colorFadeTimer = 1. - pulseTimer;

  float circle = 1.0 - smoothstep(0.9 * circleGrowTimer, 1. * circleGrowTimer, length(pulsePosition.xz - vPosition.xz) * 0.05);

  // bright colors
  vec3 color = vec3(vPosition.y * 1.5, vUv.x, vUv.y) * 2.5;
  vec3 coloredLines = (color * colorFadeTimer * lineFill);

  vec3 final = coloredLines = mix(coloredLines, vec3(lineFill * 0.1), 1. - circle * colorFadeTimer);

  gl_FragColor = vec4(final, 1.);

}`,D=`varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  vUv = uv;
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}`,L=p("<!> <!>",1);function q(s,o){y(o,!1);const r=30,i=new b(r,r,100,100),v=new j,n=i.getAttribute("position");for(let e=0;e<n.count;e+=1){const t=n.getX(e),l=n.getY(e);n.setZ(e,v.noise(t/5,l/5)*2+v.noise(t/40,l/40)*3)}i.computeVertexNormals(),z();const d=new C,a=new U(0,{easing:I});T();var m=L(),u=g(m);c.PerspectiveCamera(u,{makeDefault:!0,position:[-70,50,10],fov:15,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/shaders/interactiveShader/Scene.svelte",index:0},children:(e,t)=>{M(e,{"target.y":1.5,autoRotateSpeed:.2})},$$slots:{default:!0}});var h=P(u,2);{let e=x(()=>G*-90);c.Mesh(h,{get geometry(){return i},get"rotation.x"(){return $(e)},onclick:({point:t})=>{d.copy(t),a.set(0,{duration:0}).then(()=>{a.set(1,{duration:2e3})})},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/shaders/interactiveShader/Scene.svelte",index:1},children:(t,l)=>{c.ShaderMaterial(t,{get fragmentShader(){return A},get vertexShader(){return D},uniforms:{pulseTimer:{value:0},pulsePosition:{value:0}},get"uniforms.pulseTimer.value"(){return a.current},get"uniforms.pulsePosition.value"(){return d},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/shaders/interactiveShader/Scene.svelte",index:2}})},$$slots:{default:!0}})}f(s,m),S()}var N=p('<div class="svelte-y24kuv"><!> <span class="absolute top-4 left-4 z-20 whitespace-nowrap text-white">Click on the terrain</span></div>');function H(s){var o=N();k(w(o),{children:(r,i)=>{q(r,{})},$$slots:{default:!0}}),F(2),_(o),f(s,o)}export{H as default};
