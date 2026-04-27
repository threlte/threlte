import"./disclose-version.DsnmJJEf.js";import"./legacy.zjNW9yEZ.js";import{p as g,f as x,s as P,g as w,ac as S,a as y,c as T,a_ as $,r as F}from"./runtime.HAn2cbcW.js";import{f as u,a as f}from"./template.D0onEdCl.js";import{C as _}from"./Canvas.CBtZvrQ2.js";import{bW as b,l as k,T as c}from"./observe.svelte.nNuzPOmT.js";import{i as C}from"./lifecycle.D2JJOSiE.js";import{D as M}from"./MathUtils.XNomTCTI.js";/* empty css                                                      */import"./raycast.BaKV6GpV.js";import{O as z}from"./OrbitControls.CIehoe_r.js";import{i as G}from"./index.DUB8aJkP.js";import{T as U}from"./tweened.NY0tNCsj.js";import{d as D}from"./index.IuXc8keW.js";import{S as j}from"./SimplexNoise.CP3rPkJS.js";/* empty css                                                   */import"./snippet.ILc-veMr.js";import"./branches.DmVhxYr2.js";import"./if.Lug6H8hl.js";import"./props.DsKWk81K.js";import"./store.BmD_Ou3p.js";import"./index.BH4vLsnN.js";import"./events.BvDTqhu8.js";import"./create-subscriber.BzboetKF.js";import"./useTask.svelte.BmmWtCbe.js";import"./svelte-component.DYzPROXC.js";import"./index-client.CKKesSrH.js";import"./useStage.cNR6tDTI.js";import"./injectPlugin.eyJF8E0t.js";import"./transitions.BxEO2i3S.js";import"./loop.BGGTUj09.js";import"./render.Bbi3B6Ko.js";import"./utils.NcpWCyqV.js";import"./OrbitControls.CJcTsPOj.js";import"./useControlsContext.BM6ZOWfO.js";import"./useThrelteUserContext.DvT1_uS8.js";import"./utils.vK_o3JBb.js";const A=`// Credit: https://madebyevan.com/shaders/grid/

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
}`;var L=u("<!> <!>",1);function O(s,t){g(t,!1);const i=30,r=new b(i,i,100,100),a=new j,n=r.getAttribute("position");for(let e=0;e<n.count;e+=1){const o=n.getX(e),m=n.getY(e);n.setZ(e,a.noise(o/5,m/5)*2+a.noise(o/40,m/40)*3)}r.computeVertexNormals(),G();const p=new k,l=new U(0,{easing:D});C();var v=L(),d=x(v);c.PerspectiveCamera(d,{makeDefault:!0,position:[-70,50,10],fov:15,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/shaders/interactiveShader/Scene.svelte",index:0},children:(e,o)=>{z(e,{"target.y":1.5,autoRotateSpeed:.2})},$$slots:{default:!0}});var h=P(d,2);{let e=S(()=>M*-90);c.Mesh(h,{get geometry(){return r},get"rotation.x"(){return w(e)},onclick:({point:o})=>{p.copy(o),l.set(0,{duration:0}).then(()=>{l.set(1,{duration:2e3})})},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/shaders/interactiveShader/Scene.svelte",index:1},children:(o,m)=>{c.ShaderMaterial(o,{get fragmentShader(){return A},get vertexShader(){return I},uniforms:{pulseTimer:{value:0},pulsePosition:{value:0}},get"uniforms.pulseTimer.value"(){return l.current},get"uniforms.pulsePosition.value"(){return p},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/shaders/interactiveShader/Scene.svelte",index:2}})},$$slots:{default:!0}})}f(s,v),y()}var q=u('<div class="svelte-y24kuv"><!> <span class="absolute top-4 left-4 z-20 whitespace-nowrap text-white">Click on the terrain</span></div>');function $e(s){var t=q(),i=T(t);_(i,{children:(r,a)=>{O(r,{})},$$slots:{default:!0}}),$(2),F(t),f(s,t)}export{$e as default};
