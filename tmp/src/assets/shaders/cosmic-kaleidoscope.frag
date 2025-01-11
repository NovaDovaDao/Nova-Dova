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

float getStarFieldMask(vec2 uv, vec2 mousePos) {
    // Calculate distance from mouse position
    float dist = length(uv - mousePos);
    
    // Create a radial gradient from mouse position
    float mask = 1.0 - smoothstep(0.0, 2.0, dist);
    
    // Add variation based on angle from mouse position
    float angle = atan(uv.y - mousePos.y, uv.x - mousePos.x);
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
            
            vec3 color = mix(
                vec3(0.4, 0.7, 1.0),  // Light blue
                vec3(0.7, 0.3, 1.0),   // Purple
                fract(n * 2345.2)
            );
            
            float starBrightness = sin(iTime * 2.0 + n * 6.2831) * 0.5 + 1.0;
            col += star * size * color * brightness * starBrightness;
        }
    }
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float t = iTime * 0.05;
    
    // Convert mouse position to same coordinate space as UV
    vec2 mousePos = (iMouse.xy - 0.5 * iResolution.xy) / iResolution.y;
    
    // If mouse hasn't been clicked yet, use center
    if (iMouse.x == 0.0 && iMouse.y == 0.0) {
        mousePos = vec2(0.0);
    }
    
    // Rotate UV around mouse position
    vec2 offsetUv = uv - mousePos;
    offsetUv *= rot2d(t * 0.2);
    uv = mousePos + offsetUv;
    
    // Get star field intensity based on distance from mouse
    float starFieldMask = getStarFieldMask(uv, mousePos);
    
    vec3 col = vec3(0.0);
    vec2 baseUV = uv - mousePos; // Make effects relative to mouse position
    
    // Create layered star effect emanating from mouse position
    for(float i = 0.0; i < 1.0; i += 1.0/NUM_LAYERS) {
        float depth = fract(i + t);
        float scale = mix(30.0, 0.5, depth);
        float fade = depth * smoothstep(1.0, 0.9, depth);
        
        // Move stars outward from mouse position
        vec2 layerUV = baseUV * scale;
        layerUV += normalize(baseUV) * t * 5.0;
        
        col += StarLayer(layerUV + i * 453.2, starFieldMask) * fade;
    }
    
    // Add glow at mouse position
    float mouseGlow = exp(-length(baseUV) * 2.0) * 0.2;
    col += vec3(0.6, 0.3, 1.0) * mouseGlow;
    
    // Use distance from mouse for alpha
    float alpha = smoothstep(2.0, 0.0, length(baseUV));
    fragColor = vec4(col, alpha);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}