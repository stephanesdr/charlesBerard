export const heroVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying float vInfluence;
  uniform vec2 uPointer;
  uniform float uRadius;
  uniform float uStrength;

  float easeInOutCubic(float value) {
    return value < 0.5
      ? 4.0 * value * value * value
      : 1.0 - pow(-2.0 * value + 2.0, 3.0) / 2.0;
  }

  void main() {
    vUv = uv;
    vec3 nextPosition = position;
    float distanceToPointer = distance(position.xy, uPointer);
    float mappedDistance = clamp(1.0 - distanceToPointer / uRadius, 0.0, 1.0);
    float influence = easeInOutCubic(mappedDistance);

    nextPosition.z += influence * uStrength;
    vInfluence = influence;

    gl_Position = projectionMatrix * modelViewMatrix * vec4(nextPosition, 1.0);
  }
`;

export const heroFragmentShader = /* glsl */ `
  varying vec2 vUv;
  uniform sampler2D uTexture;

  void main() {
    vec4 color = texture2D(uTexture, vUv);
    gl_FragColor = color;
  }
`;

export const shadowVertexShader = /* glsl */ `
  varying vec2 vUv;
  varying vec2 vWorldPosition;

  void main() {
    vUv = uv;
    vWorldPosition = position.xy;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const shadowFragmentShader = /* glsl */ `
  varying vec2 vUv;
  varying vec2 vWorldPosition;
  uniform sampler2D uTexture;
  uniform vec2 uPointer;
  uniform float uRadius;

  void main() {
    vec4 color = texture2D(uTexture, vUv);
    float distanceToPointer = distance(vWorldPosition, uPointer);
    float fade = smoothstep(0.0, uRadius, distanceToPointer);
    color.a *= fade;
    gl_FragColor = color;
  }
`;
