#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    vec3 color = vec3(0.0);
    
    // Create subtle gradient background
    color = mix(
        vec3(0.1, 0.2, 0.3),
        vec3(0.2, 0.3, 0.4),
        st.y
    );
    
    // Add noise effect
    float noise = fract(sin(dot(st, vec2(12.9898, 78.233))) * 43758.5453123);
    color += noise * 0.1;
    
    gl_FragColor = vec4(color, 1.0);
}
