#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);

    // Create neon effect
    float d = length(st - vec2(0.5));
    color = vec3(0.1, 0.8, 0.9) * (1.0 - smoothstep(0.0, 0.5, d));
    color += vec3(0.9, 0.1, 0.8) * (1.0 - smoothstep(0.0, 0.1, d));

    gl_FragColor = vec4(color, 1.0);
}