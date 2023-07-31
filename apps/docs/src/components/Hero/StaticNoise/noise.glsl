void mainImage(const in vec4 inputColor, const in vec2 uv, out vec4 outputColor) {

	vec3 noise = vec3(rand(uv));

	#ifdef PREMULTIPLY

	outputColor = vec4(min(inputColor.rgb * noise, vec3(1.0)), inputColor.a);

	#else

	outputColor = vec4(noise, inputColor.a);

	#endif

}
