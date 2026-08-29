import"./disclose-version.DsnmJJEf.js";import{p as se,L as E,a as ie,f as p,s as n,g as t,d as le,P as pe,b as ce,c as xe,u as Y,r as ge}from"./runtime.Cq5xh0TU.js";import{f as S,a as x,c as we}from"./template.L6xDPO6U.js";import{p as f,s as _e}from"./props.D2nmUwxA.js";import{C as ye}from"./Canvas.W5tGNMdy.js";import{u as Se,av as y,r as X,i as De,aN as Me,a as ze,b2 as Pe,T as m}from"./observe.svelte.C0rBo_1K.js";import"./legacy.CFq86F04.js";import{P as ke}from"./tweakpane-plugin-waveform.Cv4Bc8Ou.js";/* empty css                                                           */import{C as oe}from"./Checkbox.CHEo0QyS.js";import{L as Ie}from"./List.DES-sKn-.js";import{P as de}from"./Point.BhrtjFLU.js";import{S as N}from"./Slider.BmKO9zvs.js";import{F as ne}from"./Folder.BC_VJqHJ.js";/* empty css                                                       *//* empty css                                                       */import{i as Ae}from"./if.eGY2C9_P.js";import{e as ue,i as me}from"./each.BnTYX0wD.js";import{c as A}from"./svelte-component.B_Rq4ZKt.js";import{s as fe,a as Ee}from"./store.3KrUyxeZ.js";/* empty css                                                      */import{u as ve}from"./useGltf.DPwQ2AfK.js";import{z as qe}from"./raycast.CFpYK-V8.js";import{E as Ce}from"./Environment.ChqOPST0.js";import{O as Te}from"./OrbitControls.DoM_3t9u.js";import{I as he,a as be}from"./Instance.BF5CaLUC.js";import{R as Be}from"./RadialGradientTexture.C7i8F2Ks.js";import{u as Fe}from"./useThrelte.Wdl2QUb4.js";import{u as Oe}from"./useTask.svelte.bJHaryD1.js";import{W as Ge}from"./Wireframe.7ypSDfpo.js";/* empty css                                                   */import"./snippet.B1WTn4og.js";import"./branches.CjZ4fCu_.js";import"./this.BCeOz4X_.js";import"./Context.DGw4xGmZ.js";import"./events.-BVBOS9k.js";import"./create-subscriber.Cxqb2LK-.js";import"./index.D-QOJTr1.js";import"./index-client.CbnisDQz.js";import"./slot.D_7HTdDr.js";import"./lifecycle.wtIJeE0B.js";import"./class.BJ3gECX0.js";import"./attributes.B79LgCJy.js";import"./style.B7VQCyQc.js";/* empty css                                                                     */import"./misc.DJFr2OVT.js";import"./GenericInput.CWrVV9Hz.js";import"./GenericBinding.Bk_u6Xea.js";import"./index.DgAtSlAd.js";import"./Blade.DlY74Mcb.js";import"./GenericInputFolding.CwCJHoGw.js";import"./GenericSlider.5rawTSfv.js";import"./GLTFLoader.BChjxnZD.js";import"./BufferGeometryUtils.CYgNS1cU.js";import"./useStage.CWd7QsJH.js";import"./injectPlugin.Ckfbmr_3.js";import"./transitions.Bigw4laK.js";import"./loop.BGGTUj09.js";import"./render.DOVvO0Mi.js";import"./RGBELoader.BTIsI8-8.js";import"./useEnvironment.svelte.BzvNMzS_.js";import"./OrbitControls.BU7KfRIa.js";import"./useControlsContext.svelte.Co1ANGN5.js";import"./common.D06VaDkQ.js";const We=`
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
  `,Le="__wobble_v2",ae=(o,e,{withNormals:a})=>{o.uniforms.time=e.time,o.uniforms.factor=e.factor,o.uniforms.frequency=e.frequency,o.uniforms.noise=e.noise,o.uniforms.pulse=e.pulse,o.uniforms.drift=e.drift,o.uniforms.bendiness=e.bendiness,o.uniforms.axis=e.axis,o.uniforms.across1=e.across1,o.uniforms.across2=e.across2,o.uniforms.anchor=e.anchor,o.uniforms.hasAnchor=e.hasAnchor,o.uniforms.forceDirection=e.forceDirection,o.uniforms.hasForceDirection=e.hasForceDirection,o.vertexShader=`
      uniform float time;
      uniform float factor;
      uniform float frequency;
      uniform float noise;
      uniform float pulse;
      uniform float drift;
      uniform float bendiness;
      uniform vec3 axis;
      uniform vec3 across1;
      uniform vec3 across2;
      uniform float anchor;
      uniform bool hasAnchor;
      uniform vec3 forceDirection;
      uniform bool hasForceDirection;
      ${We}
      ${o.vertexShader}
    `,o.vertexShader=o.vertexShader.replace("#include <begin_vertex>",`float along = dot(position, axis);
       vec2 acrossPos = vec2(dot(position, across1), dot(position, across2));

       // For InstancedMesh / BatchedMesh, fold each instance's "across"
       // translation into the noise sample so instances wobble out of phase.
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

       float wobble = sin(1.0 + time + along * frequency + instanceOffset.x);
       if (noise > 0.0) {
         wobble = mix(wobble, wobbleFbm(vec3(spatialSample * 0.6, time * 0.5)), noise);
       }

       float gust = 1.0;
       if (pulse > 0.0) {
         // Two sines stacked, offset per-instance so neighbours pulse out of
         // sync. Maps roughly to [0, 1].
         float pulseSum =
           0.6 * sin(time * 0.3 + instanceOffset.x * 0.3) +
           0.4 * sin(time * 0.71 + instanceOffset.y * 0.3 + 1.3);
         float pulseNoise = pulseSum * 0.5 + 0.5;
         gust = mix(1.0, 0.1 + 1.4 * pulseNoise, pulse);
       }

       float theta = wobble * gust / 2.0 * factor * weight;

       vec3 transformed = position;
       ${a?"vec3 normalAcc = vNormal;":""}

       // Twist around the wobble axis. Skipped entirely when bendiness == 1
       // because the bend path fully replaces the position.
       if (bendiness < 1.0) {
         transformed = wobbleRotate(position, axis, theta);
         ${a?"normalAcc = wobbleRotate(vNormal, axis, theta);":""}
       }

       // Bend: tilt in the across-plane toward forceDirection. Skipped when
       // bendiness == 0; otherwise blended with the twist above.
       if (bendiness > 0.0) {
         float pivotAlong = hasAnchor ? anchor : 0.0;
         vec3 anchorPoint = axis * pivotAlong;

         vec3 forceDir;
         if (hasForceDirection) {
           vec3 fd = forceDirection - dot(forceDirection, axis) * axis;
           float fdLen = length(fd);
           forceDir = fdLen > 0.0001 ? fd / fdLen : across1;
         } else if (drift > 0.0) {
           // Two sines stacked; gives a slow non-repeating angle.
           float driftSum =
             0.6 * sin(time * 0.08) +
             0.4 * sin(time * 0.19 + 2.1);
           float driftAngle = driftSum * 3.14159 * drift;
           forceDir = across1 * cos(driftAngle) + across2 * sin(driftAngle);
         } else {
           forceDir = across1;
         }
         vec3 bendAxisVec = cross(axis, forceDir);

         // Bend uses its own slow oscillation; macroscopic sway is much
         // slower than the per-vertex twist flutter.
         float bendUniform = sin(time * 0.25 + instanceOffset.x * 0.2);
         float bendWobble = bendUniform;
         if (noise > 0.0) {
           float bendPerVertex = wobbleFbm(vec3(spatialSample * 0.3, time * 0.15));
           bendWobble = mix(bendUniform, bendPerVertex, noise);
         }
         float bendTheta = bendWobble * gust * factor * weight / 2.0;

         vec3 bent = wobbleRotate(position - anchorPoint, bendAxisVec, bendTheta) + anchorPoint;
         transformed = mix(transformed, bent, bendiness);
         ${a?"normalAcc = mix(normalAcc, wobbleRotate(vNormal, bendAxisVec, bendTheta), bendiness);":""}
       }

       ${a?"vNormal = normalAcc;":""}`)},Ne=(o,e)=>{const a=o.onBeforeCompile,g=o.customProgramCacheKey;return o.onBeforeCompile=function(h,r){a.call(this,h,r),ae(h,e,{withNormals:!0})},o.customProgramCacheKey=function(){return`${g.call(this)}|${Le}`},o.needsUpdate=!0,()=>{o.onBeforeCompile=a,o.customProgramCacheKey=g,o.needsUpdate=!0}},Re=(o,e)=>{const a=o.customDepthMaterial,g=o.customDistanceMaterial,h=new Me({depthPacking:ze});h.onBeforeCompile=M=>ae(M,e,{withNormals:!1});const r=new Pe;return r.onBeforeCompile=M=>ae(M,e,{withNormals:!1}),o.customDepthMaterial=h,o.customDistanceMaterial=r,()=>{o.customDepthMaterial=a,o.customDistanceMaterial=g,h.dispose(),r.dispose()}};function te(o,e){se(e,!0);const{invalidate:a}=Fe();let g=f(e,"speed",3,1),h=f(e,"factor",3,1),r=f(e,"frequency",3,1),M=f(e,"noise",3,0),T=f(e,"pulse",3,0),R=f(e,"drift",3,0),j=f(e,"bendiness",3,0),z=f(e,"axis",19,()=>[0,1,0]),U=f(e,"shadow",3,!0);const q=Se(),s={time:new y(0),factor:new y(1),frequency:new y(1),noise:new y(0),pulse:new y(0),drift:new y(0),bendiness:new y(0),axis:new y(new X(0,1,0)),across1:new y(new X(1,0,0)),across2:new y(new X(0,0,1)),anchor:new y(0),hasAnchor:new y(!1),forceDirection:new y(new X),hasForceDirection:new y(!1)},D=new X;E(()=>{s.factor.value=h(),a()}),E(()=>{s.frequency.value=r(),a()}),E(()=>{s.noise.value=M(),a()}),E(()=>{s.pulse.value=T(),a()}),E(()=>{s.drift.value=R(),a()}),E(()=>{s.bendiness.value=j(),a()}),E(()=>{const w=s.axis.value.set(z()[0],z()[1],z()[2]).normalize();D.set(0,1,0),Math.abs(w.y)>=.9&&D.set(1,0,0),s.across1.value.crossVectors(w,D).normalize(),s.across2.value.crossVectors(w,s.across1.value),a()}),E(()=>{e.anchor===void 0?s.hasAnchor.value=!1:(s.anchor.value=e.anchor,s.hasAnchor.value=!0),a()}),E(()=>{e.forceDirection===void 0?s.hasForceDirection.value=!1:(s.forceDirection.value.set(e.forceDirection[0],e.forceDirection[1],e.forceDirection[2]),s.hasForceDirection.value=!0),a()}),E(()=>{e.time!==void 0&&(s.time.value=e.time,a())}),E(()=>{const w=q.current;if(!De(w,"Mesh")){console.error("<Wobble> must be placed inside a <T.Mesh>.");return}const G=e.material??w.material;if(!G)return;const K=(Array.isArray(G)?G:[G]).map(W=>Ne(W,s)),H=U()?Re(w,s):void 0;return()=>{K.forEach(W=>W()),H?.()}}),Oe(w=>{s.time.value+=w*g()},{running:()=>e.time===void 0&&g()!==0}),ie()}var je=S("<!> <!>",1),Ue=S("<!> <!>",1),Ve=S("<!> <!> <!>",1),Ke=S("<!> <!>",1),He=S("<!> <!> <!> <!>",1),Ye=S("<!> <!> <!> <!>",1),Ze=S("<!> <!> <!> <!>",1),Je=S("<!> <!>",1),Qe=S("<!> <!> <!> <!> <!> <!> <!>",1);function Xe(o,e){se(e,!0);const a=()=>fe(w,"$plantGltf",h),g=()=>fe(G,"$flowerGltf",h),[h,r]=Ee();let M=f(e,"subject",3,"plant"),T=f(e,"speed",3,1),R=f(e,"factor",3,.5),j=f(e,"frequency",3,1),z=f(e,"noise",3,0),U=f(e,"pulse",3,0),q=f(e,"drift",3,0),s=f(e,"bendiness",3,0),D=f(e,"axis",19,()=>[0,1,0]);const w=ve("/models/rhyzome_plant-baked.glb"),G=ve("/models/Flower.glb"),V=Array.from({length:20},(c,i)=>{const d=i/10*Math.PI*2+Math.random()*.4,L=.3+Math.random();return{x:Math.cos(d)*L,z:Math.sin(d)*L,scale:2+Math.random()*1.5,rotation:Math.random()*Math.PI*2}});var K=Qe(),H=p(K);A(H,()=>m.PerspectiveCamera,(c,i)=>{i(c,{makeDefault:!0,position:[0,7,7],fov:35,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:0}})});var W=n(H,2);Te(W,{enableDamping:!0,enableZoom:!1,"target.y":1.7});var Z=n(W,2);A(Z,()=>m.DirectionalLight,(c,i)=>{i(c,{position:[1,5,1],intensity:4,castShadow:!0,"shadow.mapSize.width":1024,"shadow.mapSize.height":1024,"shadow.camera.left":-4,"shadow.camera.right":4,"shadow.camera.top":4,"shadow.camera.bottom":-4,"shadow.camera.near":.5,"shadow.camera.far":20,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:1}})});var J=n(Z,2);Ce(J,{url:"/textures/equirectangular/hdr/industrial_sunset_puresky_1k.hdr"});var Q=n(J,2);qe(Q,{size:10,samples:10,focus:1.5});var $=n(Q,2);A($,()=>m.Mesh,(c,i)=>{i(c,{"rotation.x":-Math.PI/2,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:2},children:(d,L)=>{var P=je(),O=p(P);A(O,()=>m.CircleGeometry,(_,u)=>{u(_,{args:[6,64],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:3}})});var k=n(O,2);A(k,()=>m.MeshStandardMaterial,(_,u)=>{u(_,{transparent:!0,roughness:0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:4},children:(b,I)=>{Be(b,{outerRadius:256,stops:[{offset:0,color:"white"},{offset:.7,color:"rgba(255, 255, 255, 0)"}]})},$$slots:{default:!0}})}),x(d,P)},$$slots:{default:!0}})});var l=n($,2);{var ee=c=>{var i=Ke(),d=p(i);A(d,()=>m.Mesh,(P,O)=>{O(P,{castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:5},children:(k,_)=>{var u=Ue(),b=p(u);m(b,{get is(){return a().nodes.concrete_pot_lambert3_0.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:6}});var I=n(b,2);m(I,{get is(){return a().materials.lambert3},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:7}}),x(k,u)},$$slots:{default:!0}})});var L=n(d,2);A(L,()=>m.Mesh,(P,O)=>{O(P,{castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:8},children:(k,_)=>{var u=Ve(),b=p(u);m(b,{get is(){return a().nodes.plant_lambert2_0.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:9}});var I=n(b,2);m(I,{get is(){return a().materials.lambert2},roughness:.4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:10}});var C=n(I,2);te(C,{get speed(){return T()},get factor(){return R()},get frequency(){return j()},get noise(){return z()},get pulse(){return U()},get drift(){return q()},get bendiness(){return s()},get axis(){return D()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}}),x(k,u)},$$slots:{default:!0}})}),x(c,i)},B=c=>{var i=we(),d=p(i);A(d,()=>m.Mesh,(L,P)=>{P(L,{"position.y":1.5,castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:11},children:(O,k)=>{var _=He(),u=p(_);A(u,()=>m.SphereGeometry,(v,re)=>{re(v,{args:[1,32,32],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:12}})});var b=n(u,2);A(b,()=>m.MeshStandardMaterial,(v,re)=>{re(v,{color:"#ff7755",roughness:.1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:13}})});var I=n(b,2);te(I,{get speed(){return T()},get factor(){return R()},get frequency(){return j()},get noise(){return z()},get pulse(){return U()},get drift(){return q()},get bendiness(){return s()},get axis(){return D()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}});var C=n(I,2);Ge(C,{}),x(O,_)},$$slots:{default:!0}})}),x(c,i)},F=c=>{var i=Je(),d=p(i);he(d,{castShadow:!0,receiveShadow:!0,get limit(){return V.length},children:(P,O)=>{var k=Ye(),_=p(k);m(_,{get is(){return g().nodes.Stem.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:14}});var u=n(_,2);A(u,()=>m.MeshStandardMaterial,(C,v)=>{v(C,{color:"#3d7a3a",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:15}})});var b=n(u,2);te(b,{get speed(){return T()},get factor(){return R()},get frequency(){return j()},get noise(){return z()},get pulse(){return U()},get drift(){return q()},get bendiness(){return s()},get axis(){return D()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}});var I=n(b,2);ue(I,17,()=>V,me,(C,v)=>{be(C,{get"position.x"(){return t(v).x},get"position.z"(){return t(v).z},get scale(){return t(v).scale},get"rotation.y"(){return t(v).rotation}})}),x(P,k)},$$slots:{default:!0}});var L=n(d,2);he(L,{castShadow:!0,receiveShadow:!0,get limit(){return V.length},children:(P,O)=>{var k=Ze(),_=p(k);m(_,{get is(){return g().nodes.Blossom.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:16}});var u=n(_,2);A(u,()=>m.MeshStandardMaterial,(C,v)=>{v(C,{color:"#ff5599",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:17}})});var b=n(u,2);te(b,{get speed(){return T()},get factor(){return R()},get frequency(){return j()},get noise(){return z()},get pulse(){return U()},get drift(){return q()},get bendiness(){return s()},get axis(){return D()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}});var I=n(b,2);ue(I,17,()=>V,me,(C,v)=>{be(C,{get"position.x"(){return t(v).x},get"position.z"(){return t(v).z},get scale(){return t(v).scale},get"rotation.y"(){return t(v).rotation}})}),x(P,k)},$$slots:{default:!0}}),x(c,i)};Ae(l,c=>{M()==="plant"&&a()?c(ee):M()==="orb"?c(B,1):M()==="flowers"&&g()&&c(F,2)})}x(o,K),ie(),r()}var $e=S("<!> <!>",1),et=S("<!> <!>",1),tt=S("<!> <!>",1),rt=S("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),ot=S('<div class="svelte-2sbcau"><!></div> <!>',1);function vr(o,e){se(e,!0);const a={frequency:1,axis:[0,1,0],forceDirectionEnabled:!1,forceDirection:[1,0,0],timeEnabled:!1,time:0},g={plant:{...a,speed:2.5,factor:.3,noise:.4,pulse:.4,drift:.4,bendiness:.4,anchorEnabled:!0,anchor:.76},orb:{...a,speed:2.5,factor:3,noise:.1,pulse:.1,drift:.1,bendiness:.5,anchorEnabled:!1,anchor:0},flowers:{...a,speed:5,factor:3,noise:.75,pulse:.75,drift:.75,bendiness:1,anchorEnabled:!0,anchor:0}};let h=le("plant"),r=le(pe(g.plant));E(()=>{ce(r,g[t(h)],!0)});var M=ot(),T=p(M),R=xe(T);ye(R,{children:(z,U)=>{{let q=Y(()=>t(r).anchorEnabled?t(r).anchor:void 0),s=Y(()=>t(r).forceDirectionEnabled?t(r).forceDirection:void 0),D=Y(()=>t(r).timeEnabled?t(r).time:void 0);Xe(z,_e({get subject(){return t(h)}},()=>t(r),{get anchor(){return t(q)},get forceDirection(){return t(s)},get time(){return t(D)}}))}},$$slots:{default:!0}}),ge(T);var j=n(T,2);ke(j,{title:"Wobble",position:"fixed",children:(z,U)=>{var q=rt(),s=p(q);Ie(s,{label:"subject",options:{Plant:"plant",Orb:"orb",Flowers:"flowers"},get value(){return t(h)},set value(l){ce(h,l,!0)}});var D=n(s,2);N(D,{label:"speed",min:0,max:5,step:.01,get value(){return t(r).speed},set value(l){t(r).speed=l}});var w=n(D,2);N(w,{label:"factor",min:0,max:3,step:.01,get value(){return t(r).factor},set value(l){t(r).factor=l}});var G=n(w,2);N(G,{label:"frequency",min:.1,max:5,step:.01,get value(){return t(r).frequency},set value(l){t(r).frequency=l}});var V=n(G,2);N(V,{label:"noise",min:0,max:1,step:.01,get value(){return t(r).noise},set value(l){t(r).noise=l}});var K=n(V,2);N(K,{label:"pulse",min:0,max:1,step:.01,get value(){return t(r).pulse},set value(l){t(r).pulse=l}});var H=n(K,2);N(H,{label:"drift",min:0,max:1,step:.01,get value(){return t(r).drift},set value(l){t(r).drift=l}});var W=n(H,2);N(W,{label:"bendiness",min:0,max:1,step:.01,get value(){return t(r).bendiness},set value(l){t(r).bendiness=l}});var Z=n(W,2);de(Z,{label:"axis",min:-1,max:1,step:.01,get value(){return t(r).axis},set value(l){t(r).axis=l}});var J=n(Z,2);ne(J,{title:"anchor",children:(l,ee)=>{var B=$e(),F=p(B);oe(F,{label:"enabled",get value(){return t(r).anchorEnabled},set value(i){t(r).anchorEnabled=i}});var c=n(F,2);{let i=Y(()=>!t(r).anchorEnabled);N(c,{label:"along axis",min:-2,max:4,step:.01,get disabled(){return t(i)},get value(){return t(r).anchor},set value(d){t(r).anchor=d}})}x(l,B)},$$slots:{default:!0}});var Q=n(J,2);ne(Q,{title:"forceDirection",children:(l,ee)=>{var B=et(),F=p(B);oe(F,{label:"enabled",get value(){return t(r).forceDirectionEnabled},set value(i){t(r).forceDirectionEnabled=i}});var c=n(F,2);{let i=Y(()=>!t(r).forceDirectionEnabled);de(c,{label:"xyz",min:-1,max:1,step:.01,get disabled(){return t(i)},get value(){return t(r).forceDirection},set value(d){t(r).forceDirection=d}})}x(l,B)},$$slots:{default:!0}});var $=n(Q,2);ne($,{title:"time",children:(l,ee)=>{var B=tt(),F=p(B);oe(F,{label:"external",get value(){return t(r).timeEnabled},set value(i){t(r).timeEnabled=i}});var c=n(F,2);{let i=Y(()=>!t(r).timeEnabled);N(c,{label:"seconds",min:0,max:30,step:.01,get disabled(){return t(i)},get value(){return t(r).time},set value(d){t(r).time=d}})}x(l,B)},$$slots:{default:!0}}),x(z,q)},$$slots:{default:!0}}),x(o,M),ie()}export{vr as default};
