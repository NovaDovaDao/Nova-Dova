precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;

#define NUM_LAYERS 12.0
#define PI 3.14159265359

mat2 rot2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

float Star(vec2 uv, float flare) {
    float d = length(uv);
    float m = 0.02/d;
    
    float rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * flare;
    uv *= rot2d(PI/4.0);
    rays = max(0.0, 1.0 - abs(uv.x * uv.y * 1000.0));
    m += rays * flare * 0.3;
    
    m *= smoothstep(1.0, 0.2, d);
    return m;
}

float Hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float getStarFieldMask(vec2 uv) {
    float dist = length(uv);
    
    // Create a radial gradient from center
    float mask = 1.0 - smoothstep(0.0, 2.0, dist);
    
    // Add some variation based on angle
    float angle = atan(uv.y, uv.x);
    mask *= 1.0 + 0.2 * sin(angle * 8.0 + iTime);
    
    return mask;
}

vec3 StarLayer(vec2 uv, float brightness) {
    vec3 col = vec3(0.0);
    
    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    
    for(int y = -1; y <= 1; y++) {
        for(int x = -1; x <= 1; x++) {
            vec2 offset = vec2(float(x), float(y));
            float n = Hash21(id + offset);
            float size = fract(n * 345.32);
            
            vec2 p = vec2(n, fract(n * 34.0));
            float star = Star(gv - offset - p + 0.5, smoothstep(0.9, 1.0, size) * 0.6);
            
            // Star colors
            vec3 color = mix(
                vec3(0.4, 0.7, 1.0),  // Light blue
                vec3(0.7, 0.3, 1.0),   // Purple
                fract(n * 2345.2)
            );
            
            // Animated brightness
            float starBrightness = sin(iTime * 2.0 + n * 6.2831) * 0.5 + 1.0;
            
            // Make stars near center brighter
            float distFromCenter = length(uv);
            float centerBoost = 1.0 + 2.0 * exp(-distFromCenter * 0.5);
            
            col += star * size * color * brightness * starBrightness * centerBoost;
        }
    }
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float t = iTime * 0.05;
    
    // Rotate UV coordinates around center
    uv *= rot2d(t * 0.2);
    
    // Get star field intensity based on distance from center
    float starFieldMask = getStarFieldMask(uv);
    
    vec3 col = vec3(0.0);
    vec2 baseUV = uv;
    
    // Create layered star effect emanating from center
    for(float i = 0.0; i < 1.0; i += 1.0/NUM_LAYERS) {
        float depth = fract(i + t);
        // Make scale range larger for more dramatic perspective
        float scale = mix(30.0, 0.5, depth);
        float fade = depth * smoothstep(1.0, 0.9, depth);
        
        // Move UV outward from center
        vec2 layerUV = baseUV * scale;
        layerUV += normalize(baseUV) * t * 5.0; // Add outward motion
        
        col += StarLayer(layerUV + i * 453.2, starFieldMask) * fade;
    }
    
    // Add subtle center glow
    float centerGlow = exp(-length(uv) * 2.0) * 0.2;
    col += vec3(0.6, 0.3, 1.0) * centerGlow;
    
    // Use distance from center for alpha channel
    float alpha = smoothstep(2.0, 0.0, length(uv));
    fragColor = vec4(col, alpha);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}