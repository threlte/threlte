import"./disclose-version.DsnmJJEf.js";import{p as re,Z as l,f as C,s as le,g as ae,u as ne,a as te}from"./runtime.D20saW8m.js";import{f as ce,a as x,c as V}from"./template.DY3hUOmN.js";import{s as se}from"./snippet.ZYtLD8wA.js";import{i as de}from"./if.KLqBe-U_.js";import{c as N}from"./svelte-component.C-qodc9T.js";import{p as o,s as fe,r as ue}from"./props.BLzNsRtJ.js";import{D as ve,U as ge,b as me,aq as he,l as v,C as w,T as y}from"./observe.svelte.DDw9hZ_4.js";/* empty css                                                      */import{u as Pe}from"./useTask.svelte.DgOMa9PG.js";const pe=`
  varying vec3 localPosition;
  varying vec4 worldPosition;

  uniform vec3 worldCamProjPosition;
	uniform vec3 worldPlanePosition;
	uniform float fadeDistance;
	uniform bool infiniteGrid;
	uniform bool followCamera;

	uniform int coord0;
	uniform int coord1;
	uniform int coord2;

	void main() {
		localPosition = vec3(
		  position[coord0],
			position[coord1],
			position[coord2]
		);

		if (infiniteGrid) {
		  localPosition *= 1.0 + fadeDistance;
		}

		worldPosition = modelMatrix * vec4(localPosition, 1.0);
		if (followCamera) {
		  worldPosition.xyz += (worldCamProjPosition - worldPlanePosition);
      localPosition = (inverse(modelMatrix) * worldPosition).xyz;
		}

		gl_Position = projectionMatrix * viewMatrix * worldPosition;
	}
`,ke=`
  #define PI 3.141592653589793

	varying vec3 localPosition;
	varying vec4 worldPosition;

	uniform vec3 worldCamProjPosition;
	uniform float cellSize;
	uniform float sectionSize;
	uniform vec3 cellColor;
	uniform vec3 sectionColor;
	uniform float fadeDistance;
	uniform float fadeStrength;
	uniform vec3 fadeOrigin;
	uniform float cellThickness;
	uniform float sectionThickness;
	uniform vec3 backgroundColor;
	uniform float backgroundOpacity;

	uniform bool infiniteGrid;

	uniform int coord0;
	uniform int coord1;
	uniform int coord2;

	// 0 - default; 1 - lines; 2 - circles; 3 - polar
	uniform int gridType;

  // lineGrid coord for lines
	uniform int lineGridCoord;

	// circlegrid max radius
	uniform float circleGridMaxRadius;

	// polar grid dividers
	uniform float polarCellDividers;
	uniform float polarSectionDividers;

	float getSquareGrid(float size, float thickness, vec3 localPos) {
		vec2 coord = localPos.xy / size;

		vec2 grid = abs(fract(coord - 0.5) - 0.5) / fwidth(coord);
		float line = min(grid.x, grid.y) + 1.0 - thickness;

		return 1.0 - min(line, 1.0);
	}

	float getLinesGrid(float size, float thickness, vec3 localPos) {
		float coord = localPos[lineGridCoord] / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		return 1.0 - min(line, 1.0);
	}

	float getCirclesGrid(float size, float thickness, vec3 localPos) {
		float coord = length(localPos.xy) / size;
		float line = abs(fract(coord - 0.5) - 0.5) / fwidth(coord) - thickness * 0.2;

		if (!infiniteGrid && circleGridMaxRadius > 0. && coord > circleGridMaxRadius + thickness * 0.05) {
		  discard;
		}

		return 1.0 - min(line, 1.0);
	}

	float getPolarGrid(float size, float thickness, float polarDividers, vec3 localPos) {
		float rad = length(localPos.xy) / size;
		vec2 coord = vec2(rad, atan(localPos.x, localPos.y) * polarDividers / PI) ;

		vec2 wrapped = vec2(coord.x, fract(coord.y / (2.0 * polarDividers)) * (2.0 * polarDividers));
		vec2 coordWidth = fwidth(coord);
		vec2 wrappedWidth = fwidth(wrapped);
		vec2 width = (coord.y < -polarDividers * 0.5 || coord.y > polarDividers * 0.5 ? wrappedWidth : coordWidth) * (1.+thickness*0.25);

		// Compute anti-aliased world-space grid lines
		vec2 grid = abs(fract(coord - 0.5) - 0.5) / width;
		float line = min(grid.x, grid.y);

if (!infiniteGrid && circleGridMaxRadius > 0.0 && rad > circleGridMaxRadius + thickness * 0.05) {
		  discard;
		}

		return 1.0 - min(line, 1.0);
	}

	void main() {
		float g1 = 0.0;
		float g2 = 0.0;

		vec3 localPos = vec3(localPosition[coord0], localPosition[coord1], localPosition[coord2]);

		if (gridType == 0) {
			g1 = getSquareGrid(cellSize, cellThickness, localPos);
			g2 = getSquareGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 1) {
			g1 = getLinesGrid(cellSize, cellThickness, localPos);
			g2 = getLinesGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 2) {
			g1 = getCirclesGrid(cellSize, cellThickness, localPos);
			g2 = getCirclesGrid(sectionSize, sectionThickness, localPos);

		} else if (gridType == 3) {
			g1 = getPolarGrid(cellSize, cellThickness, polarCellDividers, localPos);
			g2 = getPolarGrid(sectionSize, sectionThickness, polarSectionDividers, localPos);
		}

		float dist = distance(fadeOrigin, worldPosition.xyz);
		float d = 1.0 - min(dist / fadeDistance, 1.0);
		float fadeFactor = pow(d, fadeStrength) * 0.95;

		vec3 color = mix(cellColor, sectionColor, min(1.0, sectionThickness * g2));

		if (backgroundOpacity > 0.0) {
			float linesAlpha = clamp((g1 + g2) * fadeFactor, 0.0,1.0);
			vec3 finalColor = mix(backgroundColor, color, linesAlpha);
			float blendedAlpha = max(linesAlpha, backgroundOpacity * fadeFactor);
			gl_FragColor = vec4(finalColor, blendedAlpha);

		} else {
			gl_FragColor = vec4(color, (g1 + g2) * pow(d, fadeStrength));
			gl_FragColor.a = mix(0.75 * gl_FragColor.a, gl_FragColor.a, g2);
		}

		if (gl_FragColor.a <= 0.0) {
		  discard;
		}

		#include <tonemapping_fragment>
		#include <colorspace_fragment>
	}
`;var Ce=ce("<!> <!>",1);function Oe(U,e){re(e,!0);let S=o(e,"cellColor",3,"#000000"),G=o(e,"sectionColor",3,"#0000ee"),z=o(e,"cellSize",3,1),T=o(e,"backgroundColor",3,"#dadada"),b=o(e,"backgroundOpacity",3,0),D=o(e,"sectionSize",3,10),Z=o(e,"plane",3,"xz"),g=o(e,"gridSize",19,()=>[20,20]),_=o(e,"followCamera",3,!1),O=o(e,"infiniteGrid",3,!1),M=o(e,"fadeDistance",3,100),F=o(e,"fadeStrength",3,1),h=o(e,"fadeOrigin",3,void 0),R=o(e,"cellThickness",3,1),A=o(e,"sectionThickness",3,2),B=o(e,"side",3,ve),E=o(e,"type",3,"grid"),j=o(e,"axis",3,"x"),P=o(e,"maxRadius",3,0),I=o(e,"cellDividers",3,6),W=o(e,"sectionDividers",3,2),q=o(e,"ref",15),H=ue(e,["$$slots","$$events","$$legacy","cellColor","sectionColor","cellSize","backgroundColor","backgroundOpacity","sectionSize","plane","gridSize","followCamera","infiniteGrid","fadeDistance","fadeStrength","fadeOrigin","cellThickness","sectionThickness","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const d=new ge,{invalidate:r,camera:J}=me(),L=new he,K=new v(0,1,0),Q=new v(0,0,0),f={x:0,y:1,z:2},X={xz:"xzy",xy:"xyz",zy:"zyx"},u={grid:0,lines:1,circular:2,polar:3},i={cellSize:{value:z()},sectionSize:{value:D()},cellColor:{value:new w(S())},sectionColor:{value:new w(G())},backgroundColor:{value:new w(T())},backgroundOpacity:{value:b()},fadeDistance:{value:M()},fadeStrength:{value:F()},fadeOrigin:{value:new v},cellThickness:{value:R()},sectionThickness:{value:A()},infiniteGrid:{value:O()},followCamera:{value:_()},coord0:{value:0},coord1:{value:2},coord2:{value:1},gridType:{value:u.grid},lineGridCoord:{value:f[j()]},circleGridMaxRadius:{value:P()},polarCellDividers:{value:I()},polarSectionDividers:{value:W()},worldCamProjPosition:{value:new v},worldPlanePosition:{value:new v}};l(()=>{const a=X[Z()],m=a.charAt(0),c=a.charAt(1),s=a.charAt(2);i.coord0.value=f[m],i.coord1.value=f[c],i.coord2.value=f[s],r()}),l(()=>{i.cellSize.value=z(),r()}),l(()=>{i.sectionSize.value=D(),r()}),l(()=>{i.cellColor.value.set(S()),r()}),l(()=>{i.sectionColor.value.set(G()),r()}),l(()=>{i.backgroundColor.value.set(T()),r()}),l(()=>{i.backgroundOpacity.value=b(),r()}),l(()=>{i.fadeDistance.value=M(),r()}),l(()=>{i.fadeStrength.value=F(),r()}),l(()=>{h()&&(i.fadeOrigin.value=h(),r())}),l(()=>{i.cellThickness.value=R(),r()}),l(()=>{i.sectionThickness.value=A(),r()}),l(()=>{i.followCamera.value=_(),r()}),l(()=>{i.infiniteGrid.value=O(),r()}),l(()=>{switch(E()){case"grid":{i.gridType.value=u.grid;break}case"lines":{i.gridType.value=u.lines,i.lineGridCoord.value=f[j()];break}case"circular":{i.gridType.value=u.circular,i.circleGridMaxRadius.value=P();break}case"polar":{i.gridType.value=u.polar,i.circleGridMaxRadius.value=P(),i.polarCellDividers.value=I(),i.polarSectionDividers.value=W();break}}r()}),Pe(()=>{L.setFromNormalAndCoplanarPoint(K,Q).applyMatrix4(d.matrixWorld);const a=d.material,m=a.uniforms.worldCamProjPosition,c=a.uniforms.worldPlanePosition,s=a.uniforms.fadeOrigin,p=L.projectPoint(J.current.position,m.value);h()||(s.value=p),c.value.set(0,0,0).applyMatrix4(d.matrixWorld)},{autoInvalidate:!1}),y(U,fe({get is(){return d},frustumCulled:!1},()=>H,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Grid/Grid.svelte",index:0},get ref(){return q()},set ref(a){q(a)},children:(a,m)=>{var c=Ce(),s=C(c);N(s,()=>y.ShaderMaterial,(n,t)=>{t(n,{get fragmentShader(){return ke},get vertexShader(){return pe},get uniforms(){return i},transparent:!0,get side(){return B()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Grid/Grid.svelte",index:1}})});var p=le(s,2);{var Y=n=>{var t=V(),k=C(t);se(k,()=>e.children,()=>({ref:d})),x(n,t)},$=n=>{var t=V(),k=C(t);{let ee=ne(()=>typeof g()=="number"?[g(),g()]:g());N(k,()=>y.PlaneGeometry,(ie,oe)=>{oe(ie,{get args(){return ae(ee)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Grid/Grid.svelte",index:2}})})}x(n,t)};de(p,n=>{e.children?n(Y):n($,!1)})}x(a,c)},$$slots:{default:!0}})),te()}export{Oe as G};
