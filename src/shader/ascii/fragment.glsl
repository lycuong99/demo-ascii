
  // based on https://www.shadertoy.com/view/lsBXzD
  // which is nowadays a pixi.js ascii filter https://filters.pixijs.download/main/docs/PIXI.filters.AsciiFilter.html
  
  precision highp float;
  uniform sampler2D media;
  uniform float time;
  uniform vec2 resolution;
  uniform float charsize;
  uniform float brightness;

  float character(float n, vec2 p)
  {
    p = floor(p*vec2(4.0, -4.0) + 2.5);
    if (clamp(p.x, 0.0, 4.0) == p.x)
    {
      if (clamp(p.y, 0.0, 4.0) == p.y)	
      {
        if (int(mod(n/exp2(p.x + 5.0*p.y), 2.0)) == 1) return 1.0;
      }	
    }
    return 0.0;
  }
  void main()
  {
    vec2 p = gl_FragCoord.xy;
    //vec2 p = gl_FragCoord.xy / 2.;
    vec2 uv = p / resolution.xy;
    
    vec3 col = texture2D(media, uv).rgb;
    
    // float gray = 0.3 * col.r + 0.59 * col.g + 0.11 * col.b;

    // keying or contrast
    float luma = dot(col,vec3(brightness, brightness, brightness));
    
    float gray = smoothstep(-.2, 1.2, luma);
    
    // character selector codez
    
    //float n =  4096.0;              // .
    //if (gray > 0.2) n = 65600.0;    // :
    //  if (gray > 0.3) n = 332772.0;   // *
    //  if (gray > 0.4) n = 15255086.0; // o 
    //  if (gray > 0.5) n = 23385164.0; // &
    //  if (gray > 0.6) n = 15252014.0; // 8
    //  if (gray > 0.7) n = 13199452.0; // @
    //  if (gray > 0.8) n = 11512810.0; // #
    //  
      float n = float[](0.,4194304.,131200.,324.,330.,283712.,12650880.,4532768.,
                       13191552.,10648704.,11195936.,15218734.,15255086.,15252014.,15324974.,11512810.
                     )[int(gray * 16.)]; 

      p = mod(p/charsize, charsize/2.) - vec2(charsize/4.);
      
      col = col*character(n, p);

      // make all white
      // col = mix(vec3(character(n, p)),col, 1.0 - 1.0);
      
      gl_FragColor = vec4(col * 4.0, 1.0);

      // transparent bg
      if(gl_FragColor == vec4(0., 0., 0., 1.)){
        gl_FragColor = vec4(0., 0., 0., 0.);
      }
  }
  