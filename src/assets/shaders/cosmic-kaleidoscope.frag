precision highp float;

uniform vec3 iResolution;
uniform float iTime;
uniform vec2 iMouse;

#define NUM_LAYERS 12.0
#define PI 3.14159265359
#define BORDER_START 0.25  // Where the border begins from center
#define BORDER_WIDTH 0.35  // Width of the border transition

mat2 rot2d(float angle) {
    float s = sin(angle);
    float c = cos(angle);
    return mat2(c, -s, s, c);
}

// Enhanced star effect
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

float getBorderMask(vec2 uv) {
    // Only show effect on the sides
    float distFromCenter = abs(uv.x);
    
    // Create smoother border transition
    float borderMask = smoothstep(BORDER_START, BORDER_START + BORDER_WIDTH, distFromCenter);
    
    // Fade out at screen edges
    borderMask *= smoothstep(1.0, 0.8, distFromCenter);
    
    return borderMask;
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
            
            // Cooler color palette for stars
            vec3 color = mix(
                vec3(0.4, 0.7, 1.0),  // Light blue
                vec3(0.7, 0.3, 1.0),   // Purple
                fract(n * 2345.2)
            );
            
            // Subtle animation
            float starBrightness = sin(iTime * 2.0 + n * 6.2831) * 0.5 + 1.0;
            col += star * size * color * brightness * starBrightness;
        }
    }
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5 * iResolution.xy) / iResolution.y;
    float t = iTime * 0.05;
    
    // Get border mask
    float borderMask = getBorderMask(uv);
    
    // Only render stars in border area
    vec3 col = vec3(0.0);
    if(borderMask > 0.0) {
        uv *= rot2d(t);
        
        for(float i = 0.0; i < 1.0; i += 1.0/NUM_LAYERS) {
            float depth = fract(i + t);
            float scale = mix(20.0, 0.5, depth);
            float fade = depth * smoothstep(1.0, 0.9, depth);
            col += StarLayer(uv * scale + i * 453.2, borderMask) * fade;
        }
    }
    
    // Complete transparency in the center
    fragColor = vec4(col, borderMask);
}

void main() {
    mainImage(gl_FragColor, gl_FragCoord.xy);
}