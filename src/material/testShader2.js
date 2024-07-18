import * as THREE from "three";

const DataStream = {
  uniforms: {
    u_time: { value: 0 },
    u_mouse: { value: new THREE.Vector2(0, 0) },
    u_resolution: { value: new THREE.Vector2(0.1, 0.1) },
    color: new THREE.Color(0.2, 0.0, 0.1),
  },
  vertexShader: `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
    }
  `,
  fragmentShader: /*glsl*/ `
  #define Hash(x) fract(sin(x) * 34214.0)
   uniform vec2 u_resolution; 
  uniform vec2 u_mouse;
  uniform float u_time;
  varying vec2 vUv;
  float random (in float x) {
      return fract(sin(x)*1e4);
  }

  float random (in vec2 st) {
      return fract(sin(dot(st.xy, vec2(12.9898,78.233)))* 43758.5453123);
  }

  float pattern(vec2 st, vec2 v, float t) {
      vec2 p = floor(st+v);
      float matDo = .000001;
      matDo*=1000.;
      return step(t, random(100.+p*matDo)+random(p.x)*0.5 );
  }

  void main() {
    vec2 u_resolution1 = vec2(1000.,930.);

    vec2 uv = 500.* vUv.xy / u_resolution1.xy;
    float sp = Hash(floor(uv.x * 64.0));
    uv.y += sp * u_time * 0.5;
    float x_s = fract(uv.x * 64.0);
    float y_s = fract(uv.y * 18.0);

    float g = Hash(floor(uv.x * 410.0) + Hash(floor(uv.y * 140.0)));
    
    g = smoothstep(abs(g - 0.5), 0.2, 0.5);
    g *= step(x_s, 0.6) * step(y_s, 0.8) * step(Hash(floor(uv.y * 18.0)) + Hash(floor(uv.x * 64.0)), 1.0);
    
    g *= (1.0 - sp * 0.5);
    
    gl_FragColor = vec4(0.0, g, 0.0, 1.0);
  }
    `,
};

export { DataStream  };
