import"./disclose-version.DsnmJJEf.js";import{p as se,L as k,a as ie,f as p,s as n,g as r,d as le,P as xe,b as ce,c as ge,u as J,r as we}from"./runtime.BCR9T1-m.js";import{f as w,a as x,c as _e}from"./template.BG62XmY0.js";import{p as f,s as ye}from"./props.C2drjlWL.js";import{C as Se}from"./Canvas.CEDrpzoF.js";import{u as De,av as I,r as de,i as Me,aN as ze,a as Pe,b4 as Ie,T as m}from"./observe.svelte.CdQzGXvv.js";import"./legacy.BZTFKq7-.js";import{P as Ae}from"./tweakpane-plugin-waveform.DkMIXL7R.js";/* empty css                                                           */import{C as re}from"./Checkbox.BpxNIuYd.js";import{L as ke}from"./List.CXJlNdpc.js";import{P as ue}from"./Point.BMBLuFFg.js";import{S as L}from"./Slider.C9OviDJL.js";import{F as oe}from"./Folder.ufqwZ2c6.js";/* empty css                                                       *//* empty css                                                       */import{i as Ee}from"./if.CNX3zY-V.js";import{e as me,i as fe}from"./each.DqAU4M1L.js";import{c as A}from"./svelte-component.Bj7n4lpb.js";import{a as ne,s as pe}from"./store.BJYJv71Q.js";/* empty css                                                      */import{u as ve}from"./useGltf.BI8o74-5.js";import{F as qe}from"./raycast.T8IQgo1F.js";import{E as Ce}from"./Environment.BaKD1-NF.js";import{O as Be}from"./OrbitControls.Cfa8jX9d.js";import{I as be,a as he}from"./Instance.nVwUyON2.js";import{R as Fe}from"./RadialGradientTexture.DOxdSHb9.js";import{u as Te}from"./useThrelte.D6Fuzykw.js";import{u as Ne}from"./useTask.svelte.sucEsllt.js";import{W as We}from"./Wireframe.evauQ8y8.js";/* empty css                                                   */import"./snippet.ZyuPLwuw.js";import"./branches.JQVJ1MKd.js";import"./this.CHVRJoj3.js";import"./events.CH29f32M.js";import"./create-subscriber.Ctz-Bjyw.js";import"./index.Mio5O7cK.js";import"./index-client.CCD-nq1x.js";import"./slot.B0nFqtsf.js";import"./lifecycle.YjgCuyPv.js";import"./class.Io3oJyj_.js";import"./attributes.B79LgCJy.js";import"./style.CorZR95y.js";/* empty css                                                                     */import"./misc.cx9t0dBM.js";import"./GenericInput.CXnyWXlU.js";import"./GenericBinding.BivrT6Y7.js";import"./index.DgAtSlAd.js";import"./Blade.Cvd7VPb3.js";import"./GenericInputFolding.DsONGXkS.js";import"./GenericSlider.CQzbWuhO.js";import"./GLTFLoader.CguNz5AY.js";import"./BufferGeometryUtils.Bn8vmnBY.js";import"./useStage.Bn7f0gsq.js";import"./injectPlugin.C_ysUsaw.js";import"./transitions.C5QvmAdc.js";import"./loop.BGGTUj09.js";import"./render.BwVvWXGy.js";import"./RGBELoader.DxykOROX.js";import"./useEnvironment.svelte.CIJNTTSK.js";import"./OrbitControls.Drx4UGVX.js";import"./useControlsContext.jdy9G8xs.js";import"./common.D06VaDkQ.js";const Oe=`
    vec3 wobbleMod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 wobbleMod289(vec4 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
    vec4 wobblePermute(vec4 x) { return wobbleMod289(((x * 34.0) + 10.0) * x); }
    vec4 wobbleTaylorInvSqrt(vec4 r) { return 1.79284291400159 - 0.85373472095314 * r; }

    float wobbleSnoise(vec3 v) {
      const vec2 C = vec2(1.0 / 6.0, 1.0 / 3.0);
      const vec4 D = vec4(0.0, 0.5, 1.0, 2.0);
      vec3 i = floor(v + dot(v, C.yyy));
      vec3 x0 = v - i + dot(i, C.xxx);
      vec3 g = step(x0.yzx, x0.xyz);
      vec3 l = 1.0 - g;
      vec3 i1 = min(g.xyz, l.zxy);
      vec3 i2 = max(g.xyz, l.zxy);
      vec3 x1 = x0 - i1 + C.xxx;
      vec3 x2 = x0 - i2 + C.yyy;
      vec3 x3 = x0 - D.yyy;
      i = wobbleMod289(i);
      vec4 p = wobblePermute(wobblePermute(wobblePermute(
                 i.z + vec4(0.0, i1.z, i2.z, 1.0))
               + i.y + vec4(0.0, i1.y, i2.y, 1.0))
               + i.x + vec4(0.0, i1.x, i2.x, 1.0));
      float n_ = 0.142857142857;
      vec3 ns = n_ * D.wyz - D.xzx;
      vec4 j = p - 49.0 * floor(p * ns.z * ns.z);
      vec4 x_ = floor(j * ns.z);
      vec4 y_ = floor(j - 7.0 * x_);
      vec4 x = x_ * ns.x + ns.yyyy;
      vec4 y = y_ * ns.x + ns.yyyy;
      vec4 h = 1.0 - abs(x) - abs(y);
      vec4 b0 = vec4(x.xy, y.xy);
      vec4 b1 = vec4(x.zw, y.zw);
      vec4 s0 = floor(b0) * 2.0 + 1.0;
      vec4 s1 = floor(b1) * 2.0 + 1.0;
      vec4 sh = -step(h, vec4(0.0));
      vec4 a0 = b0.xzyw + s0.xzyw * sh.xxyy;
      vec4 a1 = b1.xzyw + s1.xzyw * sh.zzww;
      vec3 p0 = vec3(a0.xy, h.x);
      vec3 p1 = vec3(a0.zw, h.y);
      vec3 p2 = vec3(a1.xy, h.z);
      vec3 p3 = vec3(a1.zw, h.w);
      vec4 norm = wobbleTaylorInvSqrt(vec4(dot(p0, p0), dot(p1, p1), dot(p2, p2), dot(p3, p3)));
      p0 *= norm.x;
      p1 *= norm.y;
      p2 *= norm.z;
      p3 *= norm.w;
      vec4 m = max(0.5 - vec4(dot(x0, x0), dot(x1, x1), dot(x2, x2), dot(x3, x3)), 0.0);
      m = m * m;
      return 42.0 * dot(m * m, vec4(dot(p0, x0), dot(p1, x1), dot(p2, x2), dot(p3, x3)));
    }

    // Fractal Brownian motion: 4 octaves of simplex noise at doubling
    // frequencies and halving amplitudes. The standard recipe for organic,
    // wind-like motion. Normalized so the result stays roughly in [-1, 1].
    float wobbleFbm(vec3 v) {
      float sum = 0.0;
      float amp = 1.0;
      float freq = 1.0;
      for (int i = 0; i < 4; i++) {
        sum += amp * wobbleSnoise(v * freq);
        amp *= 0.5;
        freq *= 2.0;
      }
      return sum / 1.875;
    }

    // Rodrigues' rotation formula: rotate v around unit-vector k by angle.
    vec3 wobbleRotate(vec3 v, vec3 k, float angle) {
      float c = cos(angle);
      float s = sin(angle);
      return v * c + cross(k, v) * s + k * dot(k, v) * (1.0 - c);
    }
  `,Ge="__wobble_v2",ae=(o,e,{withNormals:c})=>{o.uniforms.time=e.time,o.uniforms.factor=e.factor,o.uniforms.frequency=e.frequency,o.uniforms.noise=e.noise,o.uniforms.pulse=e.pulse,o.uniforms.drift=e.drift,o.uniforms.bendiness=e.bendiness,o.uniforms.axis=e.axis,o.uniforms.anchor=e.anchor,o.uniforms.hasAnchor=e.hasAnchor,o.uniforms.forceDirection=e.forceDirection,o.uniforms.hasForceDirection=e.hasForceDirection,o.vertexShader=`
      uniform float time;
      uniform float factor;
      uniform float frequency;
      uniform float noise;
      uniform float pulse;
      uniform float drift;
      uniform float bendiness;
      uniform vec3 axis;
      uniform float anchor;
      uniform bool hasAnchor;
      uniform vec3 forceDirection;
      uniform bool hasForceDirection;
      ${Oe}
      ${o.vertexShader}
    `,o.vertexShader=o.vertexShader.replace("#include <begin_vertex>",`// Build an orthonormal basis aligned to the wobble axis. The two
       // perpendicular axes (across1/across2) span the "across" plane that
       // bend, noise, and force direction all live in.
       vec3 wobbleAxis = normalize(axis);
       vec3 wobbleRef = abs(wobbleAxis.y) < 0.9 ? vec3(0.0, 1.0, 0.0) : vec3(1.0, 0.0, 0.0);
       vec3 across1 = normalize(cross(wobbleAxis, wobbleRef));
       vec3 across2 = cross(wobbleAxis, across1);

       float along = dot(position, wobbleAxis);
       vec2 acrossPos = vec2(dot(position, across1), dot(position, across2));

       // For InstancedMesh / BatchedMesh, fold each instance's "across"
       // translation into the noise sample so instances wobble out of
       // phase. #ifdef guards keep us safe on non-instanced meshes.
       vec2 instanceOffset = vec2(0.0);
       #ifdef USE_INSTANCING
         vec3 instTrans = vec3(instanceMatrix[3].x, instanceMatrix[3].y, instanceMatrix[3].z);
         instanceOffset = vec2(dot(instTrans, across1), dot(instTrans, across2));
       #endif
       #ifdef USE_BATCHING
         vec3 batchTrans = vec3(batchingMatrix[3].x, batchingMatrix[3].y, batchingMatrix[3].z);
         instanceOffset = vec2(dot(batchTrans, across1), dot(batchTrans, across2));
       #endif

       float weight = hasAnchor ? abs(along - anchor) : 1.0;
       vec2 spatialSample = (acrossPos + instanceOffset) * frequency;

       float sineWobble = sin(1.0 + time + along * frequency + instanceOffset.x);
       // Domain warping: sample fBM once to perturb the input of a second
       // fBM call. Breaks up the grid-aligned feel of straight noise and
       // gives fluid, swirling motion (iquilezles's classic trick).
       vec3 noiseInput = vec3(spatialSample * 0.6, time * 0.5);
       float warpScale = 0.5;
       vec3 warpedInput = noiseInput + warpScale * vec3(
         wobbleFbm(noiseInput),
         wobbleFbm(noiseInput + vec3(5.2, 1.3, 0.0)),
         wobbleFbm(noiseInput + vec3(0.0, 2.1, 4.6))
       );
       float noiseWobble = wobbleFbm(warpedInput);
       float wobble = mix(sineWobble, noiseWobble, noise);
       // Slow time-only fBM modulates magnitude when "pulse > 0". Instance
       // offset feeds in so neighbours pulse out of sync.
       float pulseNoise = wobbleFbm(vec3(time * 0.3 + instanceOffset.x * 0.3, 0.0, instanceOffset.y * 0.3)) * 0.5 + 0.5;
       float gust = mix(1.0, 0.1 + 1.4 * pulseNoise, pulse);
       float theta = wobble * gust / 2.0 * factor * weight;

       // Twist around the wobble axis.
       vec3 twisted = wobbleRotate(position, wobbleAxis, theta);
       ${c?"vec3 twistedNormal = wobbleRotate(vNormal, wobbleAxis, theta);":""}

       // Bend: tilt in the across-plane toward forceDirection.
       float pivotAlong = hasAnchor ? anchor : 0.0;
       vec3 anchorPoint = wobbleAxis * pivotAlong;
       vec3 forceDir;
       if (hasForceDirection) {
         vec3 fd = forceDirection - dot(forceDirection, wobbleAxis) * wobbleAxis;
         float fdLen = length(fd);
         forceDir = fdLen > 0.0001 ? fd / fdLen : across1;
       } else {
         // Slow drift scaled by "drift". At 0 the direction holds steady,
         // at 1 it sweeps the full circle over time.
         float driftAngle = wobbleFbm(vec3(time * 0.08, 0.0, 0.0)) * 3.14159 * drift;
         forceDir = across1 * cos(driftAngle) + across2 * sin(driftAngle);
       }
       vec3 bendAxisVec = cross(wobbleAxis, forceDir);
       // Bend uses its own slow oscillation — macroscopic sway is much
       // slower than the per-vertex twist flutter.
       float bendUniform = sin(time * 0.25 + instanceOffset.x * 0.2);
       float bendPerVertex = wobbleFbm(vec3(spatialSample * 0.3, time * 0.15));
       float bendWobble = mix(bendUniform, bendPerVertex, noise);
       float bendTheta = bendWobble * gust * factor * weight / 2.0;
       vec3 fromAnchor = position - anchorPoint;
       vec3 bent = wobbleRotate(fromAnchor, bendAxisVec, bendTheta) + anchorPoint;

       vec3 transformed = mix(twisted, bent, bendiness);
       ${c?`vec3 bentNormal = wobbleRotate(vNormal, bendAxisVec, bendTheta);
            vNormal = mix(twistedNormal, bentNormal, bendiness);`:""}`)},Re=(o,e)=>{const c=o.onBeforeCompile,_=o.customProgramCacheKey;return o.onBeforeCompile=function(b,t){c.call(this,b,t),ae(b,e,{withNormals:!0})},o.customProgramCacheKey=function(){return`${_.call(this)}|${Ge}`},o.needsUpdate=!0,()=>{o.onBeforeCompile=c,o.customProgramCacheKey=_,o.needsUpdate=!0}},Le=(o,e)=>{const c=o.customDepthMaterial,_=o.customDistanceMaterial,b=new ze({depthPacking:Pe});b.onBeforeCompile=y=>ae(y,e,{withNormals:!1});const t=new Ie;return t.onBeforeCompile=y=>ae(y,e,{withNormals:!1}),o.customDepthMaterial=b,o.customDistanceMaterial=t,()=>{o.customDepthMaterial=c,o.customDistanceMaterial=_,b.dispose(),t.dispose()}};function ee(o,e){se(e,!0);const c=()=>ne(Y,"$parent",_),[_,b]=pe(),{invalidate:t}=Te();let y=f(e,"speed",3,1),B=f(e,"factor",3,1),j=f(e,"frequency",3,1),U=f(e,"noise",3,0),F=f(e,"pulse",3,0),V=f(e,"drift",3,0),E=f(e,"bendiness",3,0),S=f(e,"axis",19,()=>[0,1,0]),q=f(e,"shadow",3,!0);const Y=De(),i={time:new I(0),factor:new I(1),frequency:new I(1),noise:new I(0),pulse:new I(0),drift:new I(0),bendiness:new I(0),axis:new I(new de(0,1,0)),anchor:new I(0),hasAnchor:new I(!1),forceDirection:new I(new de),hasForceDirection:new I(!1)};k(()=>{i.factor.value=B(),t()}),k(()=>{i.frequency.value=j(),t()}),k(()=>{i.noise.value=U(),t()}),k(()=>{i.pulse.value=F(),t()}),k(()=>{i.drift.value=V(),t()}),k(()=>{i.bendiness.value=E(),t()}),k(()=>{i.axis.value.set(S()[0],S()[1],S()[2]),t()}),k(()=>{e.anchor===void 0?i.hasAnchor.value=!1:(i.anchor.value=e.anchor,i.hasAnchor.value=!0),t()}),k(()=>{e.forceDirection===void 0?i.hasForceDirection.value=!1:(i.forceDirection.value.set(e.forceDirection[0],e.forceDirection[1],e.forceDirection[2]),i.hasForceDirection.value=!0),t()}),k(()=>{e.time!==void 0&&(i.time.value=e.time,t())}),k(()=>{const D=c();if(!Me(D,"Mesh")){console.error("<Wobble> must be placed inside a <T.Mesh>.");return}const T=e.material??D.material;if(!T)return;const K=(Array.isArray(T)?T:[T]).map(G=>Re(G,i)),H=q()?Le(D,i):void 0;return()=>{K.forEach(G=>G()),H?.()}}),Ne(D=>{i.time.value+=D*y()},{running:()=>e.time===void 0&&y()!==0}),ie(),b()}var je=w("<!> <!>",1),Ue=w("<!> <!>",1),Ve=w("<!> <!> <!>",1),Ke=w("<!> <!>",1),He=w("<!> <!> <!> <!>",1),Ye=w("<!> <!> <!> <!>",1),Ze=w("<!> <!> <!> <!>",1),Je=w("<!> <!>",1),Qe=w("<!> <!> <!> <!> <!> <!> <!>",1);function Xe(o,e){se(e,!0);const c=()=>ne(Y,"$plantGltf",b),_=()=>ne(i,"$flowerGltf",b),[b,t]=pe();let y=f(e,"subject",3,"plant"),B=f(e,"speed",3,1),j=f(e,"factor",3,.5),U=f(e,"frequency",3,1),F=f(e,"noise",3,0),V=f(e,"pulse",3,0),E=f(e,"drift",3,0),S=f(e,"bendiness",3,0),q=f(e,"axis",19,()=>[0,1,0]);const Y=ve("/models/rhyzome_plant-baked.glb"),i=ve("/models/Flower.glb"),D=Array.from({length:20},(l,a)=>{const d=a/10*Math.PI*2+Math.random()*.4,R=.3+Math.random();return{x:Math.cos(d)*R,z:Math.sin(d)*R,scale:2+Math.random()*1.5,rotation:Math.random()*Math.PI*2}});var T=Qe(),Z=p(T);A(Z,()=>m.PerspectiveCamera,(l,a)=>{a(l,{makeDefault:!0,position:[0,4,7],fov:35,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:0}})});var K=n(Z,2);Be(K,{enableDamping:!0,enableZoom:!1,"target.y":1.7});var H=n(K,2);A(H,()=>m.DirectionalLight,(l,a)=>{a(l,{position:[1,5,1],intensity:4,castShadow:!0,"shadow.mapSize.width":1024,"shadow.mapSize.height":1024,"shadow.camera.left":-4,"shadow.camera.right":4,"shadow.camera.top":4,"shadow.camera.bottom":-4,"shadow.camera.near":.5,"shadow.camera.far":20,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:1}})});var G=n(H,2);Ce(G,{url:"/textures/equirectangular/hdr/industrial_sunset_puresky_1k.hdr"});var Q=n(G,2);qe(Q,{size:10,samples:10,focus:1.5});var X=n(Q,2);A(X,()=>m.Mesh,(l,a)=>{a(l,{"rotation.x":-Math.PI/2,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:2},children:(d,R)=>{var M=je(),O=p(M);A(O,()=>m.CircleGeometry,(g,u)=>{u(g,{args:[6,64],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:3}})});var z=n(O,2);A(z,()=>m.MeshStandardMaterial,(g,u)=>{u(g,{transparent:!0,roughness:0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:4},children:(h,P)=>{Fe(h,{outerRadius:256,stops:[{offset:0,color:"white"},{offset:1,color:"rgba(255, 255, 255, 0)"}]})},$$slots:{default:!0}})}),x(d,M)},$$slots:{default:!0}})});var s=n(X,2);{var $=l=>{var a=Ke(),d=p(a);A(d,()=>m.Mesh,(M,O)=>{O(M,{castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:5},children:(z,g)=>{var u=Ue(),h=p(u);m(h,{get is(){return c().nodes.concrete_pot_lambert3_0.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:6}});var P=n(h,2);m(P,{get is(){return c().materials.lambert3},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:7}}),x(z,u)},$$slots:{default:!0}})});var R=n(d,2);A(R,()=>m.Mesh,(M,O)=>{O(M,{castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:8},children:(z,g)=>{var u=Ve(),h=p(u);m(h,{get is(){return c().nodes.plant_lambert2_0.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:9}});var P=n(h,2);m(P,{get is(){return c().materials.lambert2},roughness:.4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:10}});var C=n(P,2);ee(C,{get speed(){return B()},get factor(){return j()},get frequency(){return U()},get noise(){return F()},get pulse(){return V()},get drift(){return E()},get bendiness(){return S()},get axis(){return q()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}}),x(z,u)},$$slots:{default:!0}})}),x(l,a)},N=l=>{var a=_e(),d=p(a);A(d,()=>m.Mesh,(R,M)=>{M(R,{"position.y":1.5,castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:11},children:(O,z)=>{var g=He(),u=p(g);A(u,()=>m.SphereGeometry,(v,te)=>{te(v,{args:[1,32,32],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:12}})});var h=n(u,2);A(h,()=>m.MeshStandardMaterial,(v,te)=>{te(v,{color:"#ff7755",roughness:.1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:13}})});var P=n(h,2);ee(P,{get speed(){return B()},get factor(){return j()},get frequency(){return U()},get noise(){return F()},get pulse(){return V()},get drift(){return E()},get bendiness(){return S()},get axis(){return q()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}});var C=n(P,2);We(C,{}),x(O,g)},$$slots:{default:!0}})}),x(l,a)},W=l=>{var a=Je(),d=p(a);be(d,{castShadow:!0,receiveShadow:!0,get limit(){return D.length},children:(M,O)=>{var z=Ye(),g=p(z);m(g,{get is(){return _().nodes.Stem.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:14}});var u=n(g,2);A(u,()=>m.MeshStandardMaterial,(C,v)=>{v(C,{color:"#3d7a3a",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:15}})});var h=n(u,2);ee(h,{get speed(){return B()},get factor(){return j()},get frequency(){return U()},get noise(){return F()},get pulse(){return V()},get drift(){return E()},get bendiness(){return S()},get axis(){return q()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}});var P=n(h,2);me(P,17,()=>D,fe,(C,v)=>{he(C,{get"position.x"(){return r(v).x},get"position.z"(){return r(v).z},get scale(){return r(v).scale},get"rotation.y"(){return r(v).rotation}})}),x(M,z)},$$slots:{default:!0}});var R=n(d,2);be(R,{castShadow:!0,receiveShadow:!0,get limit(){return D.length},children:(M,O)=>{var z=Ze(),g=p(z);m(g,{get is(){return _().nodes.Blossom.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:16}});var u=n(g,2);A(u,()=>m.MeshStandardMaterial,(C,v)=>{v(C,{color:"#ff5599",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:17}})});var h=n(u,2);ee(h,{get speed(){return B()},get factor(){return j()},get frequency(){return U()},get noise(){return F()},get pulse(){return V()},get drift(){return E()},get bendiness(){return S()},get axis(){return q()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}});var P=n(h,2);me(P,17,()=>D,fe,(C,v)=>{he(C,{get"position.x"(){return r(v).x},get"position.z"(){return r(v).z},get scale(){return r(v).scale},get"rotation.y"(){return r(v).rotation}})}),x(M,z)},$$slots:{default:!0}}),x(l,a)};Ee(s,l=>{y()==="plant"&&c()?l($):y()==="orb"?l(N,1):y()==="flowers"&&_()&&l(W,2)})}x(o,T),ie(),t()}var $e=w("<!> <!>",1),et=w("<!> <!>",1),tt=w("<!> <!>",1),rt=w("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),ot=w('<div class="svelte-2sbcau"><!></div> <!>',1);function fr(o,e){se(e,!0);const c={frequency:1,axis:[0,1,0],forceDirectionEnabled:!1,forceDirection:[1,0,0],timeEnabled:!1,time:0},_={plant:{...c,speed:2.5,factor:.3,noise:.4,pulse:.4,drift:.4,bendiness:.4,anchorEnabled:!0,anchor:.76},orb:{...c,speed:2.5,factor:3,noise:.1,pulse:.1,drift:.1,bendiness:.5,anchorEnabled:!1,anchor:0},flowers:{...c,speed:5,factor:3,noise:.75,pulse:.75,drift:.75,bendiness:1,anchorEnabled:!0,anchor:0}};let b=le("plant"),t=le(xe(_.plant));k(()=>{ce(t,_[r(b)],!0)});var y=ot(),B=p(y),j=ge(B);Se(j,{children:(F,V)=>{{let E=J(()=>r(t).anchorEnabled?r(t).anchor:void 0),S=J(()=>r(t).forceDirectionEnabled?r(t).forceDirection:void 0),q=J(()=>r(t).timeEnabled?r(t).time:void 0);Xe(F,ye({get subject(){return r(b)}},()=>r(t),{get anchor(){return r(E)},get forceDirection(){return r(S)},get time(){return r(q)}}))}},$$slots:{default:!0}}),we(B);var U=n(B,2);Ae(U,{title:"Wobble",position:"fixed",children:(F,V)=>{var E=rt(),S=p(E);ke(S,{label:"subject",options:{Plant:"plant",Orb:"orb",Flowers:"flowers"},get value(){return r(b)},set value(s){ce(b,s,!0)}});var q=n(S,2);L(q,{label:"speed",min:0,max:5,step:.01,get value(){return r(t).speed},set value(s){r(t).speed=s}});var Y=n(q,2);L(Y,{label:"factor",min:0,max:3,step:.01,get value(){return r(t).factor},set value(s){r(t).factor=s}});var i=n(Y,2);L(i,{label:"frequency",min:.1,max:5,step:.01,get value(){return r(t).frequency},set value(s){r(t).frequency=s}});var D=n(i,2);L(D,{label:"noise",min:0,max:1,step:.01,get value(){return r(t).noise},set value(s){r(t).noise=s}});var T=n(D,2);L(T,{label:"pulse",min:0,max:1,step:.01,get value(){return r(t).pulse},set value(s){r(t).pulse=s}});var Z=n(T,2);L(Z,{label:"drift",min:0,max:1,step:.01,get value(){return r(t).drift},set value(s){r(t).drift=s}});var K=n(Z,2);L(K,{label:"bendiness",min:0,max:1,step:.01,get value(){return r(t).bendiness},set value(s){r(t).bendiness=s}});var H=n(K,2);ue(H,{label:"axis",min:-1,max:1,step:.01,get value(){return r(t).axis},set value(s){r(t).axis=s}});var G=n(H,2);oe(G,{title:"anchor",children:(s,$)=>{var N=$e(),W=p(N);re(W,{label:"enabled",get value(){return r(t).anchorEnabled},set value(a){r(t).anchorEnabled=a}});var l=n(W,2);{let a=J(()=>!r(t).anchorEnabled);L(l,{label:"along axis",min:-2,max:4,step:.01,get disabled(){return r(a)},get value(){return r(t).anchor},set value(d){r(t).anchor=d}})}x(s,N)},$$slots:{default:!0}});var Q=n(G,2);oe(Q,{title:"forceDirection",children:(s,$)=>{var N=et(),W=p(N);re(W,{label:"enabled",get value(){return r(t).forceDirectionEnabled},set value(a){r(t).forceDirectionEnabled=a}});var l=n(W,2);{let a=J(()=>!r(t).forceDirectionEnabled);ue(l,{label:"xyz",min:-1,max:1,step:.01,get disabled(){return r(a)},get value(){return r(t).forceDirection},set value(d){r(t).forceDirection=d}})}x(s,N)},$$slots:{default:!0}});var X=n(Q,2);oe(X,{title:"time",children:(s,$)=>{var N=tt(),W=p(N);re(W,{label:"external",get value(){return r(t).timeEnabled},set value(a){r(t).timeEnabled=a}});var l=n(W,2);{let a=J(()=>!r(t).timeEnabled);L(l,{label:"seconds",min:0,max:30,step:.01,get disabled(){return r(a)},get value(){return r(t).time},set value(d){r(t).time=d}})}x(s,N)},$$slots:{default:!0}}),x(F,E)},$$slots:{default:!0}}),x(o,y),ie()}export{fr as default};
