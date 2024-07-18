import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const MatrixMaterial = shaderMaterial(
  {
    time: 0,
    u_mouse: { value: new THREE.Vector2(0.1, 0.1) },
    u_resolution: { value: new THREE.Vector2(window.innerWidth, window.innerHeight) },
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  // vertex shader
  /*glsl*/ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  // fragment shader
  /*glsl*/ `
  precision mediump float;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float time;

float random (in float x) {
    return fract(sin(x)*1e4);
}

float random (in vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
}

float pattern(vec2 st, vec2 v, float t) {
    vec2 p = floor(st+v);
    return step(t, random(100.+p*.000001)+random(p.x)*0.5 );
}

void main() {
    vec2 st = gl_FragCoord.xy/u_resolution.xy;
    st.x *= u_resolution.x/u_resolution.y;

   

    vec3 color = vec3(0.);
    

    // Margins

    gl_FragColor = vec4(1.0-color,1.0);
}


  `
);
