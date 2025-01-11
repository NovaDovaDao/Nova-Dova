// src/assets/shaders/agent-builder.frag
precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;

#define NUM_LAYERS 8.0
#define PI 3.14159265359

mat2 rot2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

// Hash function for pseudo-random numbers
float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.13);
    p3 += dot(p3, p3.yzx + 3.333);
    return fract((p3.x + p3.y) * p3.z);
}

// 2D noise function
float noise(vec2 x) {
    vec2 i = floor(x);
    vec2 f = fract(x);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    vec2 u = f * f * (3.0 - 2.0 * f);
    return mix(a, b, u.x) + (c - a) * u.y * (1.0 - u.x) + (d - b) * u.x * u.y;
}

// Flow field function
vec2 flowField(vec2 p, float time) {
    float scale = 3.0;
    float timeScale = 0.2;
    vec2 field = vec2(
        noise(p * scale + vec2(0.0, time * timeScale)),
        noise(p * scale + vec2(time * timeScale, 0.0))
    ) * 2.0 - 1.0;
    return normalize(field);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y);
    vec2 mouse = (iMouse.xy - 0.5 * iResolution.xy) / min(iResolution.x, iResolution.y);
    
    float time = iTime * 0.2;
    vec3 finalColor = vec3(0.0);
    
    // Multiple layers of flow fields
    for(float i = 0.0; i < NUM_LAYERS; i++) {
        float layerTime = time + i * 0.5;
        
        // Get flow field direction
        vec2 flow = flowField(uv + i * 0.1, layerTime);
        
        // Create dynamic patterns based on flow field
        vec2 offset = flow * 0.1;
        vec2 pos = uv + offset;
        
        // Rotate position for more interesting patterns
        pos *= rot2d(layerTime * 0.1 + i * PI / NUM_LAYERS);
        
        // Create base pattern
        float pattern = length(pos);
        pattern = sin(pattern * 10.0 + layerTime) * 0.5 + 0.5;
        
        // Add some variation
        pattern *= noise(pos * 5.0 + layerTime);
        
        // Color mapping
        vec3 color = mix(
            vec3(0.2, 0.4, 1.0),  // Deep blue
            vec3(0.7, 0.3, 1.0),   // Purple
            pattern
        );
        
        // Layer opacity
        float opacity = 1.0 - i / NUM_LAYERS;
        opacity *= 0.2;
        
        // Accumulate colors
        finalColor += color * opacity;
    }
    
    // Add subtle mouse interaction
    float mouseDist = length(uv - mouse);
    float mouseGlow = exp(-mouseDist * 4.0) * 0.5;
    finalColor += vec3(0.7, 0.3, 1.0) * mouseGlow;
    
    // Add some grain
    float grain = noise(uv * 500.0 + time) * 0.02;
    finalColor += grain;
    
    // Final adjustments
    finalColor = pow(finalColor, vec3(1.2)); // Contrast
    float vignette = 1.0 - length(uv) * 0.5;
    finalColor *= vignette;
    
    // Output with slight transparency for overlay effect
    fragColor = vec4(finalColor, 0.95);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}