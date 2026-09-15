import"./disclose-version.DsnmJJEf.js";import"./legacy.Bo3sEplC.js";import{p as g,f as x,s as P,g as w,ac as S,a as y,c as T,b1 as $,r as b}from"./runtime.DLdkg5Kz.js";import{f as u,a as f}from"./template.3p3pSER-.js";import{C as F}from"./Canvas.CnQ1DH0a.js";import{bp as _,a as p,V as k}from"./observe.svelte.DZwCnh69.js";import{i as C}from"./lifecycle.BWFflPdz.js";import{D as M}from"./MathUtils.XNomTCTI.js";/* empty css                                                      */import"./raycast.Ck813DWf.js";import{O as z}from"./OrbitControls.CJ3UrTxZ.js";import"./index.B_G0GGxq.js";import{i as G}from"./index.4qv1mvWD.js";import{T as U}from"./tweened.L7E2Iz8A.js";import{d as D}from"./index.IuXc8keW.js";import{S as j}from"./SimplexNoise.CP3rPkJS.js";/* empty css                                                   */import"./snippet.COGFhncb.js";import"./branches.2gxZijTC.js";import"./if.CWhf68p6.js";import"./this.C9eRW5mT.js";import"./props.BNYK5s9I.js";import"./store.Dey8hlVV.js";import"./index.DoIdvkJn.js";import"./Context.6tjaM9BR.js";import"./events.BHDVKm3g.js";import"./create-subscriber.CY3q5QYX.js";import"./svelte-component.E5E5S4yf.js";import"./index-client.Bk7KcdZe.js";import"./useThrelte.u8vAkEcg.js";import"./transitions.BM2KEG7w.js";import"./loop.BGGTUj09.js";import"./render.CKcVmfJe.js";import"./injectPlugin.Q4w1Jnpc.js";import"./useTask.svelte.Ciwsfx4C.js";import"./OrbitControls.GK-V4hZZ.js";import"./useControlsContext.Do_2BonD.js";import"./utils.vK_o3JBb.js";const A=`// Credit: https://madebyevan.com/shaders/grid/

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

}`,I=`varying vec2 vUv;
varying vec3 vPosition;

void main() {
  vec4 modelPosition = modelMatrix * vec4(position, 1.0);

  vec4 viewPosition = viewMatrix * modelPosition;
  vec4 projectedPosition = projectionMatrix * viewPosition;

  gl_Position = projectedPosition;
  vUv = uv;
  vPosition = (modelMatrix * vec4(position, 1.0)).xyz;
}`;var L=u("<!> <!>",1);function O(s,t){g(t,!1);const i=30,r=new _(i,i,100,100),a=new j,n=r.getAttribute("position");for(let e=0;e<n.count;e+=1){const o=n.getX(e),m=n.getY(e);n.setZ(e,a.noise(o/5,m/5)*2+a.noise(o/40,m/40)*3)}r.computeVertexNormals(),G();const c=new k,l=new U(0,{easing:D});C();var v=L(),d=x(v);p.PerspectiveCamera(d,{makeDefault:!0,position:[-70,50,10],fov:15,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/shaders/interactiveShader/Scene.svelte",index:0},children:(e,o)=>{z(e,{"target.y":1.5,autoRotateSpeed:.2})},$$slots:{default:!0}});var h=P(d,2);{let e=S(()=>M*-90);p.Mesh(h,{get geometry(){return r},get"rotation.x"(){return w(e)},onclick:({point:o})=>{c.copy(o),l.set(0,{duration:0}).then(()=>{l.set(1,{duration:2e3})})},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/shaders/interactiveShader/Scene.svelte",index:1},children:(o,m)=>{p.ShaderMaterial(o,{get fragmentShader(){return A},get vertexShader(){return I},uniforms:{pulseTimer:{value:0},pulsePosition:{value:0}},get"uniforms.pulseTimer.value"(){return l.current},get"uniforms.pulsePosition.value"(){return c},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/shaders/interactiveShader/Scene.svelte",index:2}})},$$slots:{default:!0}})}f(s,v),y()}var V=u('<div class="svelte-y24kuv"><!> <span class="absolute top-4 left-4 z-20 whitespace-nowrap text-white">Click on the terrain</span></div>');function be(s){var t=V(),i=T(t);F(i,{children:(r,a)=>{O(r,{})},$$slots:{default:!0}}),$(2),b(t),f(s,t)}export{be as default};
