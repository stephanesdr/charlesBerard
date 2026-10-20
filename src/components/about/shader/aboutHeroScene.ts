import {
  Mesh,
  OrthographicCamera,
  PlaneGeometry,
  Raycaster,
  Scene,
  ShaderMaterial,
  Vector2,
  WebGLRenderer,
  type Texture,
} from "three";
import {
  heroFragmentShader,
  heroVertexShader,
  shadowFragmentShader,
  shadowVertexShader,
} from "./shaders";

type SceneTextures = {
  text: Texture;
  shadow: Texture;
};

export class AboutHeroScene {
  private readonly scene = new Scene();
  private readonly camera = new OrthographicCamera(-1, 1, 1, -1, 0.1, 10);
  private readonly renderer: WebGLRenderer;
  private readonly raycaster = new Raycaster();
  private readonly pointerNdc = new Vector2();
  private readonly pointerTarget = new Vector2(100, 100);
  private readonly pointerCurrent = new Vector2(100, 100);
  private geometry = new PlaneGeometry(1, 1, 96, 64);
  private readonly textMaterial: ShaderMaterial;
  private readonly shadowMaterial: ShaderMaterial;
  private readonly textMesh: Mesh<PlaneGeometry, ShaderMaterial>;
  private readonly shadowMesh: Mesh<PlaneGeometry, ShaderMaterial>;
  private textures: SceneTextures;
  private frame: number | null = null;
  private active = true;

  constructor(canvas: HTMLCanvasElement, textures: SceneTextures) {
    this.textures = textures;
    this.camera.position.z = 2.5;

    this.renderer = new WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
    });
    this.renderer.setClearColor(0x000000, 0);

    this.textMaterial = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTexture: { value: textures.text },
        uPointer: { value: this.pointerCurrent },
        uRadius: { value: 0.45 },
        uStrength: { value: 0.2 },
      },
      vertexShader: heroVertexShader,
      fragmentShader: heroFragmentShader,
    });

    this.shadowMaterial = new ShaderMaterial({
      transparent: true,
      depthWrite: false,
      uniforms: {
        uTexture: { value: textures.shadow },
        uPointer: { value: this.pointerCurrent },
        uRadius: { value: 0.45 },
      },
      vertexShader: shadowVertexShader,
      fragmentShader: shadowFragmentShader,
    });

    this.shadowMesh = new Mesh(this.geometry, this.shadowMaterial);
    this.shadowMesh.position.z = -0.04;
    this.textMesh = new Mesh(this.geometry, this.textMaterial);
    this.shadowMesh.rotation.set(-0.08, 0.04, 0);
    this.textMesh.rotation.copy(this.shadowMesh.rotation);
    this.scene.add(this.shadowMesh, this.textMesh);
    this.start();
  }

  resize(width: number, height: number, dpr: number, textures: SceneTextures) {
    const viewHeight = 2;
    const viewWidth = viewHeight * (width / height);
    this.camera.left = -viewWidth / 2;
    this.camera.right = viewWidth / 2;
    this.camera.top = viewHeight / 2;
    this.camera.bottom = -viewHeight / 2;
    this.camera.updateProjectionMatrix();
    this.renderer.setPixelRatio(Math.min(dpr, 1.75));
    this.renderer.setSize(width, height, false);

    this.geometry.dispose();
    this.geometry = new PlaneGeometry(viewWidth, viewHeight, 96, 64);
    this.textMesh.geometry = this.geometry;
    this.shadowMesh.geometry = this.geometry;

    this.textures.text.dispose();
    this.textures.shadow.dispose();
    this.textures = textures;
    this.textMaterial.uniforms.uTexture.value = textures.text;
    this.shadowMaterial.uniforms.uTexture.value = textures.shadow;
    this.textMaterial.uniforms.uRadius.value = viewHeight * 0.18;
    this.textMaterial.uniforms.uStrength.value = viewHeight * 0.12;
    this.shadowMaterial.uniforms.uRadius.value = viewHeight * 0.18;
  }

  setPointer(clientX: number, clientY: number, bounds: DOMRect) {
    this.pointerNdc.set(
      ((clientX - bounds.left) / bounds.width) * 2 - 1,
      -((clientY - bounds.top) / bounds.height) * 2 + 1,
    );
    this.raycaster.setFromCamera(this.pointerNdc, this.camera);
    const intersection = this.raycaster.intersectObject(this.textMesh, false)[0];
    if (intersection) {
      this.pointerTarget.set(intersection.point.x, intersection.point.y);
    }
  }

  resetPointer() {
    this.pointerTarget.set(100, 100);
  }

  setActive(active: boolean) {
    this.active = active;
    if (active) this.start();
    else this.stop();
  }

  private start() {
    if (this.frame !== null || !this.active) return;

    const render = () => {
      this.pointerCurrent.lerp(this.pointerTarget, 0.12);
      this.renderer.render(this.scene, this.camera);
      this.frame = window.requestAnimationFrame(render);
    };

    this.frame = window.requestAnimationFrame(render);
  }

  private stop() {
    if (this.frame === null) return;
    window.cancelAnimationFrame(this.frame);
    this.frame = null;
  }

  dispose() {
    this.stop();
    this.scene.remove(this.textMesh, this.shadowMesh);
    this.geometry.dispose();
    this.textures.text.dispose();
    this.textures.shadow.dispose();
    this.textMaterial.dispose();
    this.shadowMaterial.dispose();
    this.renderer.dispose();
  }
}
