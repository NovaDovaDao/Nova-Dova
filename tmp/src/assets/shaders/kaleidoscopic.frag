precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;

#define PI 3.14159265359
#define TWO_PI 6.28318530718

// Rotation matrix
mat2 rot2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

// Random & noise functions
float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise(vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a)* u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Kaleidoscope effect
vec2 kaleidoscope(vec2 uv, float segments) {
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    
    angle = mod(angle, TWO_PI/segments);
    angle = abs(angle - PI/segments);
    
    return vec2(cos(angle), sin(angle)) * radius;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord * 2.0 - iResolution.xy) / min(iResolution.x, iResolution.y);
    
    // Mouse interaction
    vec2 mouse = (iMouse.xy - iResolution.xy * 0.5) / min(iResolution.x, iResolution.y);
    float mouseDistance = length(uv - mouse);
    
    // Time variables
    float time = iTime * 0.2;
    
    // Apply kaleidoscope effect
    vec2 kaleido = kaleidoscope(uv * (1.0 + sin(time) * 0.2), 8.0);
    
    // Create base pattern
    float pattern = 0.0;
    for(float i = 1.0; i < 6.0; i++) {
        vec2 rotated = kaleido * rot2d(time * 0.1 * i);
        pattern += noise(rotated * (2.0 * i) + time);
    }
    pattern /= 5.0;
    
    // Color mapping
    vec3 color1 = vec3(0.3, 0.0, 0.5);  // Deep purple
    vec3 color2 = vec3(0.8, 0.0, 0.8);  // Bright pink
    vec3 color3 = vec3(0.0, 0.4, 0.8);  // Bright blue
    
    vec3 finalColor = mix(color1, color2, pattern);
    finalColor = mix(finalColor, color3, noise(kaleido + time));
    
    // Add glow effect
    float glow = exp(-mouseDistance * 2.0) * 0.5;
    finalColor += vec3(0.8, 0.4, 1.0) * glow;
    
    // Add subtle sparkles
    float sparkle = pow(noise(kaleido * 50.0 + time * 2.0), 20.0);
    finalColor += vec3(1.0) * sparkle;
    
    // Output final color
    fragColor = vec4(finalColor, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}