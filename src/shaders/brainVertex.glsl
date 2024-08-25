export default `

varying vec2 vUv;
varying float vProgress;
uniform float uTime;

void main() {

    vUv = uv;
    vec3 newPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
    // gl_PointSize = 50.0;

    vec4 mvPosition = modelViewMatrix * vec4(newPosition, 1.0);
    gl_PointSize = 2. * (1. / -mvPosition.z);
}
`;