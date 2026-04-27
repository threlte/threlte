import"./disclose-version.DsnmJJEf.js";import{p as re,Z as l,f as C,s as le,g as ae,u as ne,a as te}from"./runtime.QwcowWmd.js";import{f as ce,a as x,c as L}from"./template.BTOqUpqr.js";import{s as se}from"./snippet.C4xr2bBf.js";import{i as de}from"./if.DdzMJn16.js";import{c as N}from"./svelte-component.CTAeTR9H.js";import{p as o,s as fe,r as ue}from"./props.DGdK2eRS.js";import{D as ve,U as ge,b as me,aq as he,l as g,C as w,i as pe,T as y}from"./observe.svelte.xONaORci.js";/* empty css                                                      */import{u as Pe}from"./useTask.svelte.CmJ2DNhI.js";const ke=`
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
`,Ce=`
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
`;var xe=ce("<!> <!>",1);function Me(U,i){re(i,!0);let S=o(i,"cellColor",3,"#000000"),G=o(i,"sectionColor",3,"#0000ee"),z=o(i,"cellSize",3,1),T=o(i,"backgroundColor",3,"#dadada"),b=o(i,"backgroundOpacity",3,0),D=o(i,"sectionSize",3,10),Z=o(i,"plane",3,"xz"),m=o(i,"gridSize",19,()=>[20,20]),_=o(i,"followCamera",3,!1),O=o(i,"infiniteGrid",3,!1),M=o(i,"fadeDistance",3,100),A=o(i,"fadeStrength",3,1),d=o(i,"fadeOrigin",3,void 0),F=o(i,"cellThickness",3,1),R=o(i,"sectionThickness",3,2),B=o(i,"side",3,ve),E=o(i,"type",3,"grid"),j=o(i,"axis",3,"x"),p=o(i,"maxRadius",3,0),I=o(i,"cellDividers",3,6),W=o(i,"sectionDividers",3,2),q=o(i,"ref",15),H=ue(i,["$$slots","$$events","$$legacy","cellColor","sectionColor","cellSize","backgroundColor","backgroundOpacity","sectionSize","plane","gridSize","followCamera","infiniteGrid","fadeDistance","fadeStrength","fadeOrigin","cellThickness","sectionThickness","side","type","axis","maxRadius","cellDividers","sectionDividers","ref","children"]);const f=new ge,{invalidate:r,camera:J}=me(),V=new he,K=new g(0,1,0),Q=new g(0,0,0),u={x:0,y:1,z:2},X={xz:"xzy",xy:"xyz",zy:"zyx"},v={grid:0,lines:1,circular:2,polar:3},e={cellSize:{value:z()},sectionSize:{value:D()},cellColor:{value:new w(S())},sectionColor:{value:new w(G())},backgroundColor:{value:new w(T())},backgroundOpacity:{value:b()},fadeDistance:{value:M()},fadeStrength:{value:A()},fadeOrigin:{value:new g},cellThickness:{value:F()},sectionThickness:{value:R()},infiniteGrid:{value:O()},followCamera:{value:_()},coord0:{value:0},coord1:{value:2},coord2:{value:1},gridType:{value:v.grid},lineGridCoord:{value:u[j()]},circleGridMaxRadius:{value:p()},polarCellDividers:{value:I()},polarSectionDividers:{value:W()},worldCamProjPosition:{value:new g},worldPlanePosition:{value:new g}};l(()=>{const a=X[Z()],h=a.charAt(0),c=a.charAt(1),s=a.charAt(2);e.coord0.value=u[h],e.coord1.value=u[c],e.coord2.value=u[s],r()}),l(()=>{e.cellSize.value=z(),r()}),l(()=>{e.sectionSize.value=D(),r()}),l(()=>{e.cellColor.value.set(S()),r()}),l(()=>{e.sectionColor.value.set(G()),r()}),l(()=>{e.backgroundColor.value.set(T()),r()}),l(()=>{e.backgroundOpacity.value=b(),r()}),l(()=>{e.fadeDistance.value=M(),r()}),l(()=>{e.fadeStrength.value=A(),r()}),l(()=>{d()&&(pe(d(),"Vector3")?e.fadeOrigin.value.copy(d()):e.fadeOrigin.value.fromArray(d()),r())}),l(()=>{e.cellThickness.value=F(),r()}),l(()=>{e.sectionThickness.value=R(),r()}),l(()=>{e.followCamera.value=_(),r()}),l(()=>{e.infiniteGrid.value=O(),r()}),l(()=>{switch(E()){case"grid":{e.gridType.value=v.grid;break}case"lines":{e.gridType.value=v.lines,e.lineGridCoord.value=u[j()];break}case"circular":{e.gridType.value=v.circular,e.circleGridMaxRadius.value=p();break}case"polar":{e.gridType.value=v.polar,e.circleGridMaxRadius.value=p(),e.polarCellDividers.value=I(),e.polarSectionDividers.value=W();break}}r()}),Pe(()=>{V.setFromNormalAndCoplanarPoint(K,Q).applyMatrix4(f.matrixWorld);const a=f.material,h=a.uniforms.worldCamProjPosition,c=a.uniforms.worldPlanePosition,s=a.uniforms.fadeOrigin,P=V.projectPoint(J.current.position,h.value);d()||(s.value=P),c.value.set(0,0,0).applyMatrix4(f.matrixWorld)},{autoInvalidate:!1}),y(U,fe({get is(){return f},frustumCulled:!1},()=>H,{threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Grid/Grid.svelte",index:0},get ref(){return q()},set ref(a){q(a)},children:(a,h)=>{var c=xe(),s=C(c);N(s,()=>y.ShaderMaterial,(n,t)=>{t(n,{get fragmentShader(){return Ce},get vertexShader(){return ke},get uniforms(){return e},transparent:!0,get side(){return B()},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Grid/Grid.svelte",index:1}})});var P=le(s,2);{var Y=n=>{var t=L(),k=C(t);se(k,()=>i.children,()=>({ref:f})),x(n,t)},$=n=>{var t=L(),k=C(t);{let ee=ne(()=>typeof m()=="number"?[m(),m()]:m());N(k,()=>y.PlaneGeometry,(ie,oe)=>{oe(ie,{get args(){return ae(ee)},threlteStudio:{moduleId:"/home/runner/work/threlte/threlte/packages/extras/src/lib/components/Grid/Grid.svelte",index:2}})})}x(n,t)};de(P,n=>{i.children?n(Y):n($,!1)})}x(a,c)},$$slots:{default:!0}})),te()}export{Me as G};
