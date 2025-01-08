// src/assets/shaders/cosmic-kaleidoscope.frag
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;

#define NUM_LAYERS 12.0
#define PI 3.14159265359

// Rotation matrix
mat2 rot2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

// Improved star effect with cyan glow
float Star(vec2 uv, float flare) {
    float d = length(uv);
    float m = 0.02/d;
    
    // Star shape
    float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * flare * 1.5;
    
    // Rotated rays for cross effect
    uv *= rot2d(PI/4.0);
    rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * flare * 0.3;
    
    // Add cyan glow
    float glow = exp(-d * 2.0);
    m += glow * 0.1;
    m *= smoothstep(1.0, 0.2, d);
    
    return m;
}

// Hash function for randomization
float Hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

vec3 StarLayer(vec2 uv) {
    vec3 col = vec3(0.0);
    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    
    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 offset = vec2(float(x), float(y));
            float n = Hash21(id + offset); // Random value
            float size = fract(n * 345.32);
            float star = Star(gv - offset - vec2(n, fract(n * 34.0)) + 0.5, 
                          smoothstep(0.8, 1.0, size) * 0.6);
            
            // Color palette matching your design
            vec3 color = mix(
                vec3(0.0, 0.8, 1.0),  // Cyan
                vec3(0.4, 0.3, 1.0),  // Blue
                fract(n * 2345.2)
            );
            
            // Animate stars
            star *= sin(iTime * 2.0 + n * 6.2831) * 0.5 + 1.0;
            col += star * size * color;
        }
    }
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float t = iTime * 0.1;
    
    // Add central glow effect
    float centerGlow = exp(-length(uv) * 1.5);
    vec3 col = vec3(0.0);
    
    // Layer the star field
    for(float i = 0.0; i < 1.0; i += 1.0/NUM_LAYERS) {
        float depth = fract(i + t);
        float scale = mix(20.0, 0.5, depth);
        float fade = depth * smoothstep(1.0, 0.9, depth);
        col += StarLayer(uv * scale + i * 453.2) * fade;
    }
    
    // Add central cyan glow
    vec3 glowColor = vec3(0.0, 0.8, 1.0); // Cyan
    col += glowColor * centerGlow * 0.5;
    
    // Color grading
    col = pow(col, vec3(0.8)); // Gamma correction
    col *= 1.2; // Brightness boost
    
    // Add vignette effect
    float vignette = smoothstep(1.2, 0.5, length(uv));
    col *= vignette;
    
    fragColor = vec4(col, 1.0);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}