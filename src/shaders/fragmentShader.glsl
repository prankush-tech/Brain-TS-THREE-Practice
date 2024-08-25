export default `

varying vec2 vUv;
varying float vProgress;

void main() {

  vec3 colorA = vec3(0.6,0.3,0.1);
  vec3 finalColor = mix(colorA,colorA * 0.001,vProgress);

  float hideCorners = smoothstep(1.0,0.9,vUv.x); 
  float hideCorners2 = smoothstep(0.0,0.1,vUv.x); 


//   gl_FragColor = vec4(vec3(vProgress),1.0);
  gl_FragColor = vec4(finalColor,hideCorners*hideCorners2);
}
`;
