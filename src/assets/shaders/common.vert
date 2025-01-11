void main() {
    // Use THREE.js's built-in position attribute
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}