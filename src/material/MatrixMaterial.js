import { shaderMaterial } from "@react-three/drei";
import * as THREE from "three";

export const MatrixMaterial = shaderMaterial(
  {
    u_time: {value:0},
    u_mouse: { value: new THREE.Vector2(0.,0.) },
    u_resolution:{ value: new THREE.Vector2(0.1, 0.1) },
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
  // uniform vec2 u_resolution; 
uniform vec2 u_mouse;
uniform float u_time;

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
  vec2 u_resolution1 = vec2(1000.,930.);
    vec2 st = gl_FragCoord.xy/u_resolution1.xy;
    st.x *= u_resolution1.x/u_resolution1.y;

    vec2 grid = vec2(100.0,50.);
    st *= grid;

    vec2 ipos = floor(st);  // integer
    vec2 fpos = fract(st);  // fraction

    vec2 vel = vec2(u_time*2.*max(grid.x,grid.y)); // time
    vel *= vec2(-1.,0.0) * random(1.0+ipos.y); // direction

    // Assign a random value base on the integer coord
    vec2 offset = vec2(0.1,0.);

    vec3 color = vec3(0.);
    color.r = pattern(st+offset,vel,0.5+u_mouse.x/u_resolution1.x);
    color.g = pattern(st,vel,0.5+u_mouse.x/u_resolution1.x);
    color.b = pattern(st-offset,vel,0.5+u_mouse.x/u_resolution1.x);

    // Margins
    color *= step(0.2,fpos.y);

    gl_FragColor = vec4(1.0-color,1.0);
}

  `
);
