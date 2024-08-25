export default `

varying vec2 vUv;
varying float vProgress;
uniform float uTime;

void main() {

    vUv = uv;
    vProgress = smoothstep(-1.0,1.0,sin(vUv.x * 8.0  + uTime*3.0));

    vec3 newPosition = position;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(newPosition, 1.0);
}
`;