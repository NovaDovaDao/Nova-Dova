precision highp float;

uniform vec3      iResolution;
uniform float     iTime;
uniform float     iTimeDelta;
uniform vec4      iMouse;
uniform sampler2D iChannel0;

#define NUM_LAYERS 12.0

mat2 Rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, -s, s, c);
}

float Star(vec2 uv, float flare) {
    float col = 0.;
    float d = length(uv);
    float m = .02/d;
    
    float rays = max(0., 1. - abs(uv.x * uv.y * 1000.));
    m += rays * flare;
    uv *= Rot(3.1415/4.);
    rays = max(0., 1. - abs(uv.x * uv.y * 1000.));
    m += rays * .3 * flare;
    
    m *= smoothstep(1., .2, d);
    return m;
}

float Hash21(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p+45.32);
    return fract(p.x*p.y);
}

vec3 StarLayer(vec2 uv) {
    vec3 col = vec3(0.);
    
    vec2 gv = fract(uv) - 0.5;
    vec2 id = floor(uv);
    
    for(int y = -1; y <= 1; y++ ) {
        for(int x = -1; x <= 1; x++) {
            vec2 offs = vec2(x, y);
            float n = Hash21(id + offs);
            float size = fract(n*345.32);
            
            vec2 p = vec2(n, fract(n*34.));
            
            float star = Star(gv - offs - p + .5, smoothstep(.9, 1., size) * .6);
            
            // Generate cooler colors - blues and purples
            vec3 starColor = mix(
                vec3(0.5, 0.8, 1.0),  // Light blue
                vec3(0.7, 0.3, 1.0),   // Purple
                fract(n*2345.2)
            );
            
            // Add slight color variation
            star *= sin(iTime*2.+n*6.2831)*.4+1.;
            
            // Make stars smaller and more subtle
            star *= size * 0.6;
            
            col += star * starColor;
        }
    }
    
    return col;
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec2 uv = (fragCoord - 0.5*iResolution.xy)/iResolution.y;
    vec2 M = (iMouse.xy - iResolution.xy*.5)/iResolution.y;
    
    // Slower movement
    float t = iTime * 0.005;
    
    uv *= Rot(t);
    
    // Create darker background
    vec3 col = vec3(0.02, 0.0, 0.05); // Very dark purple base
    
    for(float i=0.; i < 1.; i+=1./NUM_LAYERS) {
        float depth = fract(i+t);
        float scale = mix(15., 0.5, depth);
        float fade = depth * smoothstep(1., .9, depth);
        
        // Add stars with reduced brightness
        col += StarLayer(uv * scale + i * 453.2) * fade * 0.3;
    }
    
    // Add subtle purple fog
    col += vec3(0.1, 0.0, 0.2) * length(uv) * 0.1;
    
    // Adjust gamma and contrast
    col = pow(col, vec3(0.8));
    col = 1.1 * col/(1.0 + col);
    
    fragColor = vec4(col, 1.0);
}

void main() {
    vec4 fragColor;
    mainImage(fragColor, gl_FragCoord.xy);
    gl_FragColor = fragColor;
}
