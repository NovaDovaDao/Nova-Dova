#ifdef GL_ES
precision highp float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    
    // Initialize with complete transparency
    gl_FragColor = vec4(0.0, 0.0, 0.0, 0.0);
}