import"./disclose-version.DsnmJJEf.js";import{p as ie,L as A,a as le,f as x,s as n,g as r,d as ce,P as xe,b as de,c as ge,u as Q,r as we}from"./runtime.74l6iTpt.js";import{f as y,a as g,c as _e}from"./template.cF74NQJq.js";import{p as f,s as ye}from"./props.D9B9D2SC.js";import{C as Se}from"./Canvas.BKGblHP4.js";import{u as De,av as _,r as X,i as Me,aN as ze,a as Pe,b4 as ke,T as m}from"./observe.svelte.C9iXwWTj.js";import"./legacy.BZ6q4bX4.js";import{P as Ie}from"./tweakpane-plugin-waveform.CZqf6SlV.js";/* empty css                                                           */import{C as oe}from"./Checkbox.BrOkyQ8i.js";import{L as Ae}from"./List.DBBrEjfB.js";import{P as ue}from"./Point.cu8DdZCu.js";import{S as j}from"./Slider.Bi57AD_H.js";import{F as ne}from"./Folder.BaZlfHYU.js";/* empty css                                                       *//* empty css                                                       */import{i as Ee}from"./if.DKCY-Hf3.js";import{e as me,i as fe}from"./each.BXFYlEYK.js";import{c as I}from"./svelte-component.CmgrVerG.js";import{a as ae,s as be}from"./store.IXa4mVwD.js";/* empty css                                                      */import{u as ve}from"./useGltf.Df7erZLp.js";import{z as qe}from"./raycast.BIiun7TH.js";import{E as Ce}from"./Environment.awds-ZVy.js";import{O as Te}from"./OrbitControls.CT7OUnyl.js";import{I as he,a as pe}from"./Instance.BZ2WApT5.js";import{R as Be}from"./RadialGradientTexture.lq_xloVE.js";import{u as Fe}from"./useThrelte.RYiPwqiX.js";import{u as Oe}from"./useTask.svelte.BR7SFbMo.js";import{W as Ge}from"./Wireframe.UVPg1p8V.js";/* empty css                                                   */import"./snippet.Dn0BqGl2.js";import"./branches.c6uAwFN9.js";import"./this.CWS0BOnE.js";import"./Context.64nrMPqg.js";import"./events.BgWfslDP.js";import"./create-subscriber.v8HejWhZ.js";import"./index.BE65HV78.js";import"./index-client.CfETg8We.js";import"./slot.BKxBr9N6.js";import"./lifecycle.13fege8Y.js";import"./class.apHgXXlV.js";import"./attributes.B79LgCJy.js";import"./style.C5GBuOx3.js";/* empty css                                                                     */import"./misc.DhaR_Lsw.js";import"./GenericInput.rOCHPEsL.js";import"./GenericBinding.BfhMb5wl.js";import"./index.DgAtSlAd.js";import"./Blade.D_0ftuNU.js";import"./GenericInputFolding.C4_PmWai.js";import"./GenericSlider.CQIdOYEG.js";import"./GLTFLoader.XV_3L3ld.js";import"./BufferGeometryUtils.DogOYP6e.js";import"./useStage.xqE9X3YT.js";import"./injectPlugin.Dm1l-MP0.js";import"./transitions.D1-baVkw.js";import"./loop.BGGTUj09.js";import"./render.Dzq4Aoun.js";import"./RGBELoader.CAVg0Y_t.js";import"./useEnvironment.svelte.BUIdu-4e.js";import"./OrbitControls.DK6dgeOD.js";import"./useControlsContext.Boq-WD48.js";import"./common.D06VaDkQ.js";const We=`
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
  `,Le="__wobble_v2",se=(o,e,{withNormals:c})=>{o.uniforms.time=e.time,o.uniforms.factor=e.factor,o.uniforms.frequency=e.frequency,o.uniforms.noise=e.noise,o.uniforms.pulse=e.pulse,o.uniforms.drift=e.drift,o.uniforms.bendiness=e.bendiness,o.uniforms.axis=e.axis,o.uniforms.across1=e.across1,o.uniforms.across2=e.across2,o.uniforms.anchor=e.anchor,o.uniforms.hasAnchor=e.hasAnchor,o.uniforms.forceDirection=e.forceDirection,o.uniforms.hasForceDirection=e.hasForceDirection,o.vertexShader=`
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
       ${c?"vec3 normalAcc = vNormal;":""}

       // Twist around the wobble axis. Skipped entirely when bendiness == 1
       // because the bend path fully replaces the position.
       if (bendiness < 1.0) {
         transformed = wobbleRotate(position, axis, theta);
         ${c?"normalAcc = wobbleRotate(vNormal, axis, theta);":""}
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
         ${c?"normalAcc = mix(normalAcc, wobbleRotate(vNormal, bendAxisVec, bendTheta), bendiness);":""}
       }

       ${c?"vNormal = normalAcc;":""}`)},Ne=(o,e)=>{const c=o.onBeforeCompile,S=o.customProgramCacheKey;return o.onBeforeCompile=function(h,t){c.call(this,h,t),se(h,e,{withNormals:!0})},o.customProgramCacheKey=function(){return`${S.call(this)}|${Le}`},o.needsUpdate=!0,()=>{o.onBeforeCompile=c,o.customProgramCacheKey=S,o.needsUpdate=!0}},Re=(o,e)=>{const c=o.customDepthMaterial,S=o.customDistanceMaterial,h=new ze({depthPacking:Pe});h.onBeforeCompile=D=>se(D,e,{withNormals:!1});const t=new ke;return t.onBeforeCompile=D=>se(D,e,{withNormals:!1}),o.customDepthMaterial=h,o.customDistanceMaterial=t,()=>{o.customDepthMaterial=c,o.customDistanceMaterial=S,h.dispose(),t.dispose()}};function te(o,e){ie(e,!0);const c=()=>ae(Z,"$parent",S),[S,h]=be(),{invalidate:t}=Fe();let D=f(e,"speed",3,1),B=f(e,"factor",3,1),U=f(e,"frequency",3,1),V=f(e,"noise",3,0),F=f(e,"pulse",3,0),K=f(e,"drift",3,0),E=f(e,"bendiness",3,0),M=f(e,"axis",19,()=>[0,1,0]),q=f(e,"shadow",3,!0);const Z=De(),s={time:new _(0),factor:new _(1),frequency:new _(1),noise:new _(0),pulse:new _(0),drift:new _(0),bendiness:new _(0),axis:new _(new X(0,1,0)),across1:new _(new X(1,0,0)),across2:new _(new X(0,0,1)),anchor:new _(0),hasAnchor:new _(!1),forceDirection:new _(new X),hasForceDirection:new _(!1)},C=new X;A(()=>{s.factor.value=B(),t()}),A(()=>{s.frequency.value=U(),t()}),A(()=>{s.noise.value=V(),t()}),A(()=>{s.pulse.value=F(),t()}),A(()=>{s.drift.value=K(),t()}),A(()=>{s.bendiness.value=E(),t()}),A(()=>{const b=s.axis.value.set(M()[0],M()[1],M()[2]).normalize();C.set(0,1,0),Math.abs(b.y)>=.9&&C.set(1,0,0),s.across1.value.crossVectors(b,C).normalize(),s.across2.value.crossVectors(b,s.across1.value),t()}),A(()=>{e.anchor===void 0?s.hasAnchor.value=!1:(s.anchor.value=e.anchor,s.hasAnchor.value=!0),t()}),A(()=>{e.forceDirection===void 0?s.hasForceDirection.value=!1:(s.forceDirection.value.set(e.forceDirection[0],e.forceDirection[1],e.forceDirection[2]),s.hasForceDirection.value=!0),t()}),A(()=>{e.time!==void 0&&(s.time.value=e.time,t())}),A(()=>{const b=c();if(!Me(b,"Mesh")){console.error("<Wobble> must be placed inside a <T.Mesh>.");return}const O=e.material??b.material;if(!O)return;const H=(Array.isArray(O)?O:[O]).map(N=>Ne(N,s)),Y=q()?Re(b,s):void 0;return()=>{H.forEach(N=>N()),Y?.()}}),Oe(b=>{s.time.value+=b*D()},{running:()=>e.time===void 0&&D()!==0}),le(),h()}var je=y("<!> <!>",1),Ue=y("<!> <!>",1),Ve=y("<!> <!> <!>",1),Ke=y("<!> <!>",1),He=y("<!> <!> <!> <!>",1),Ye=y("<!> <!> <!> <!>",1),Ze=y("<!> <!> <!> <!>",1),Je=y("<!> <!>",1),Qe=y("<!> <!> <!> <!> <!> <!> <!>",1);function Xe(o,e){ie(e,!0);const c=()=>ae(Z,"$plantGltf",h),S=()=>ae(s,"$flowerGltf",h),[h,t]=be();let D=f(e,"subject",3,"plant"),B=f(e,"speed",3,1),U=f(e,"factor",3,.5),V=f(e,"frequency",3,1),F=f(e,"noise",3,0),K=f(e,"pulse",3,0),E=f(e,"drift",3,0),M=f(e,"bendiness",3,0),q=f(e,"axis",19,()=>[0,1,0]);const Z=ve("/models/rhyzome_plant-baked.glb"),s=ve("/models/Flower.glb"),C=Array.from({length:20},(l,a)=>{const d=a/10*Math.PI*2+Math.random()*.4,R=.3+Math.random();return{x:Math.cos(d)*R,z:Math.sin(d)*R,scale:2+Math.random()*1.5,rotation:Math.random()*Math.PI*2}});var b=Qe(),O=x(b);I(O,()=>m.PerspectiveCamera,(l,a)=>{a(l,{makeDefault:!0,position:[0,7,7],fov:35,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:0}})});var J=n(O,2);Te(J,{enableDamping:!0,enableZoom:!1,"target.y":1.7});var H=n(J,2);I(H,()=>m.DirectionalLight,(l,a)=>{a(l,{position:[1,5,1],intensity:4,castShadow:!0,"shadow.mapSize.width":1024,"shadow.mapSize.height":1024,"shadow.camera.left":-4,"shadow.camera.right":4,"shadow.camera.top":4,"shadow.camera.bottom":-4,"shadow.camera.near":.5,"shadow.camera.far":20,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:1}})});var Y=n(H,2);Ce(Y,{url:"/textures/equirectangular/hdr/industrial_sunset_puresky_1k.hdr"});var N=n(Y,2);qe(N,{size:10,samples:10,focus:1.5});var $=n(N,2);I($,()=>m.Mesh,(l,a)=>{a(l,{"rotation.x":-Math.PI/2,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:2},children:(d,R)=>{var z=je(),L=x(z);I(L,()=>m.CircleGeometry,(w,u)=>{u(w,{args:[6,64],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:3}})});var P=n(L,2);I(P,()=>m.MeshStandardMaterial,(w,u)=>{u(w,{transparent:!0,roughness:0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:4},children:(p,k)=>{Be(p,{outerRadius:256,stops:[{offset:0,color:"white"},{offset:.7,color:"rgba(255, 255, 255, 0)"}]})},$$slots:{default:!0}})}),g(d,z)},$$slots:{default:!0}})});var i=n($,2);{var ee=l=>{var a=Ke(),d=x(a);I(d,()=>m.Mesh,(z,L)=>{L(z,{castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:5},children:(P,w)=>{var u=Ue(),p=x(u);m(p,{get is(){return c().nodes.concrete_pot_lambert3_0.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:6}});var k=n(p,2);m(k,{get is(){return c().materials.lambert3},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:7}}),g(P,u)},$$slots:{default:!0}})});var R=n(d,2);I(R,()=>m.Mesh,(z,L)=>{L(z,{castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:8},children:(P,w)=>{var u=Ve(),p=x(u);m(p,{get is(){return c().nodes.plant_lambert2_0.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:9}});var k=n(p,2);m(k,{get is(){return c().materials.lambert2},roughness:.4,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:10}});var T=n(k,2);te(T,{get speed(){return B()},get factor(){return U()},get frequency(){return V()},get noise(){return F()},get pulse(){return K()},get drift(){return E()},get bendiness(){return M()},get axis(){return q()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}}),g(P,u)},$$slots:{default:!0}})}),g(l,a)},G=l=>{var a=_e(),d=x(a);I(d,()=>m.Mesh,(R,z)=>{z(R,{"position.y":1.5,castShadow:!0,receiveShadow:!0,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:11},children:(L,P)=>{var w=He(),u=x(w);I(u,()=>m.SphereGeometry,(v,re)=>{re(v,{args:[1,32,32],threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:12}})});var p=n(u,2);I(p,()=>m.MeshStandardMaterial,(v,re)=>{re(v,{color:"#ff7755",roughness:.1,threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:13}})});var k=n(p,2);te(k,{get speed(){return B()},get factor(){return U()},get frequency(){return V()},get noise(){return F()},get pulse(){return K()},get drift(){return E()},get bendiness(){return M()},get axis(){return q()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}});var T=n(k,2);Ge(T,{}),g(L,w)},$$slots:{default:!0}})}),g(l,a)},W=l=>{var a=Je(),d=x(a);he(d,{castShadow:!0,receiveShadow:!0,get limit(){return C.length},children:(z,L)=>{var P=Ye(),w=x(P);m(w,{get is(){return S().nodes.Stem.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:14}});var u=n(w,2);I(u,()=>m.MeshStandardMaterial,(T,v)=>{v(T,{color:"#3d7a3a",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:15}})});var p=n(u,2);te(p,{get speed(){return B()},get factor(){return U()},get frequency(){return V()},get noise(){return F()},get pulse(){return K()},get drift(){return E()},get bendiness(){return M()},get axis(){return q()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}});var k=n(p,2);me(k,17,()=>C,fe,(T,v)=>{pe(T,{get"position.x"(){return r(v).x},get"position.z"(){return r(v).z},get scale(){return r(v).scale},get"rotation.y"(){return r(v).rotation}})}),g(z,P)},$$slots:{default:!0}});var R=n(d,2);he(R,{castShadow:!0,receiveShadow:!0,get limit(){return C.length},children:(z,L)=>{var P=Ze(),w=x(P);m(w,{get is(){return S().nodes.Blossom.geometry},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:16}});var u=n(w,2);I(u,()=>m.MeshStandardMaterial,(T,v)=>{v(T,{color:"#ff5599",threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/apps/docs/src/examples/extras/wobble/Scene.svelte",index:17}})});var p=n(u,2);te(p,{get speed(){return B()},get factor(){return U()},get frequency(){return V()},get noise(){return F()},get pulse(){return K()},get drift(){return E()},get bendiness(){return M()},get axis(){return q()},get anchor(){return e.anchor},get forceDirection(){return e.forceDirection},get time(){return e.time}});var k=n(p,2);me(k,17,()=>C,fe,(T,v)=>{pe(T,{get"position.x"(){return r(v).x},get"position.z"(){return r(v).z},get scale(){return r(v).scale},get"rotation.y"(){return r(v).rotation}})}),g(z,P)},$$slots:{default:!0}}),g(l,a)};Ee(i,l=>{D()==="plant"&&c()?l(ee):D()==="orb"?l(G,1):D()==="flowers"&&S()&&l(W,2)})}g(o,b),le(),t()}var $e=y("<!> <!>",1),et=y("<!> <!>",1),tt=y("<!> <!>",1),rt=y("<!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!> <!>",1),ot=y('<div class="svelte-2sbcau"><!></div> <!>',1);function vr(o,e){ie(e,!0);const c={frequency:1,axis:[0,1,0],forceDirectionEnabled:!1,forceDirection:[1,0,0],timeEnabled:!1,time:0},S={plant:{...c,speed:2.5,factor:.3,noise:.4,pulse:.4,drift:.4,bendiness:.4,anchorEnabled:!0,anchor:.76},orb:{...c,speed:2.5,factor:3,noise:.1,pulse:.1,drift:.1,bendiness:.5,anchorEnabled:!1,anchor:0},flowers:{...c,speed:5,factor:3,noise:.75,pulse:.75,drift:.75,bendiness:1,anchorEnabled:!0,anchor:0}};let h=ce("plant"),t=ce(xe(S.plant));A(()=>{de(t,S[r(h)],!0)});var D=ot(),B=x(D),U=ge(B);Se(U,{children:(F,K)=>{{let E=Q(()=>r(t).anchorEnabled?r(t).anchor:void 0),M=Q(()=>r(t).forceDirectionEnabled?r(t).forceDirection:void 0),q=Q(()=>r(t).timeEnabled?r(t).time:void 0);Xe(F,ye({get subject(){return r(h)}},()=>r(t),{get anchor(){return r(E)},get forceDirection(){return r(M)},get time(){return r(q)}}))}},$$slots:{default:!0}}),we(B);var V=n(B,2);Ie(V,{title:"Wobble",position:"fixed",children:(F,K)=>{var E=rt(),M=x(E);Ae(M,{label:"subject",options:{Plant:"plant",Orb:"orb",Flowers:"flowers"},get value(){return r(h)},set value(i){de(h,i,!0)}});var q=n(M,2);j(q,{label:"speed",min:0,max:5,step:.01,get value(){return r(t).speed},set value(i){r(t).speed=i}});var Z=n(q,2);j(Z,{label:"factor",min:0,max:3,step:.01,get value(){return r(t).factor},set value(i){r(t).factor=i}});var s=n(Z,2);j(s,{label:"frequency",min:.1,max:5,step:.01,get value(){return r(t).frequency},set value(i){r(t).frequency=i}});var C=n(s,2);j(C,{label:"noise",min:0,max:1,step:.01,get value(){return r(t).noise},set value(i){r(t).noise=i}});var b=n(C,2);j(b,{label:"pulse",min:0,max:1,step:.01,get value(){return r(t).pulse},set value(i){r(t).pulse=i}});var O=n(b,2);j(O,{label:"drift",min:0,max:1,step:.01,get value(){return r(t).drift},set value(i){r(t).drift=i}});var J=n(O,2);j(J,{label:"bendiness",min:0,max:1,step:.01,get value(){return r(t).bendiness},set value(i){r(t).bendiness=i}});var H=n(J,2);ue(H,{label:"axis",min:-1,max:1,step:.01,get value(){return r(t).axis},set value(i){r(t).axis=i}});var Y=n(H,2);ne(Y,{title:"anchor",children:(i,ee)=>{var G=$e(),W=x(G);oe(W,{label:"enabled",get value(){return r(t).anchorEnabled},set value(a){r(t).anchorEnabled=a}});var l=n(W,2);{let a=Q(()=>!r(t).anchorEnabled);j(l,{label:"along axis",min:-2,max:4,step:.01,get disabled(){return r(a)},get value(){return r(t).anchor},set value(d){r(t).anchor=d}})}g(i,G)},$$slots:{default:!0}});var N=n(Y,2);ne(N,{title:"forceDirection",children:(i,ee)=>{var G=et(),W=x(G);oe(W,{label:"enabled",get value(){return r(t).forceDirectionEnabled},set value(a){r(t).forceDirectionEnabled=a}});var l=n(W,2);{let a=Q(()=>!r(t).forceDirectionEnabled);ue(l,{label:"xyz",min:-1,max:1,step:.01,get disabled(){return r(a)},get value(){return r(t).forceDirection},set value(d){r(t).forceDirection=d}})}g(i,G)},$$slots:{default:!0}});var $=n(N,2);ne($,{title:"time",children:(i,ee)=>{var G=tt(),W=x(G);oe(W,{label:"external",get value(){return r(t).timeEnabled},set value(a){r(t).timeEnabled=a}});var l=n(W,2);{let a=Q(()=>!r(t).timeEnabled);j(l,{label:"seconds",min:0,max:30,step:.01,get disabled(){return r(a)},get value(){return r(t).time},set value(d){r(t).time=d}})}g(i,G)},$$slots:{default:!0}}),g(F,E)},$$slots:{default:!0}}),g(o,D),le()}export{vr as default};
