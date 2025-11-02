import {
  Behaviour,
  FileReference,
  ObjectUtils,
  serializable,
} from "@needle-tools/engine";
import {
  Vector3,
  Material,
  MeshBasicMaterial,
  TextureLoader,
  DoubleSide,
  SRGBColorSpace,
  Raycaster,
  Vector2,
  Mesh,
  Camera,
} from "three";

interface ImageEntry {
  name: string;
  x: number;
  y: number;
  z: number;
}

export class tsneObjects extends Behaviour {
  @serializable(FileReference)
  jsonFile3D?: FileReference;

    @serializable(Camera)
  myCamera?: Camera;

  private jsonData3D: ImageEntry[] = [];
  private targetPositions: Vector3[] = []; // Store target positions for each child
  private fpsElement: HTMLElement | null = null;
  private nameElement: HTMLElement | null = null; // For displaying the name
  private raycaster = new Raycaster();
  private mouse = new Vector2();

  async awake() {
    const response = await fetch(
      this.jsonFile3D ? this.jsonFile3D.url : "assets/painting.json"
    );
    const data = await response.json();
    this.jsonData3D = data;

    this.jsonData3D = data.map(
      (entry: { name: any; x: any; y: any; z: any }) => ({
        name: entry.name,
        x: this.mapRange(entry.x, -30, 30, -490, 490),
        y: this.mapRange(entry.y, -30, 30, -150, 150),
        z: this.mapRange(entry.z, -30, 30, -150, 150),
      })
    );

    for (const entry of data) {

      const imageUrl = `include/rijksmuseum/${entry.name}`;

      // Create a texture loader
      const loader = new TextureLoader();

      // Load the texture and use the onLoad callback
      loader.load(
        imageUrl,
        // onLoad callback
        (texture) => {
          texture.colorSpace = SRGBColorSpace;
          const aspectRatio = texture.image.width / texture.image.height;

          const quad = ObjectUtils.createPrimitive("Quad", {
            name: "Quad",
            position: { x: entry.x, y: entry.y, z: entry.z },
            parent: this.gameObject,
          });
          quad.rotation.set(0, 180, 0);
          quad.userData.name = entry.name;

          quad.scale.set(aspectRatio, 1, 1); // Adjust scale based on aspect ratio

          quad.matrixAutoUpdate = false;
          quad.updateMatrix();
          const material = new MeshBasicMaterial({
            map: texture,
            side: DoubleSide,
          });
          quad.material = material;

          // Optional: for performance, if the object will not move
          // quad.matrixAutoUpdate = false;
          // quad.updateMatrix();
        },
        // onProgress callback (optional)
        undefined,
        // onError callback
        (err) => {
          console.error("An error happened loading texture.", err);
        }
      );
    }
  }

  mapRange(
    value: number,
    inMin: number,
    inMax: number,
    outMin: number,
    outMax: number
  ): number {
    return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
  }



  start() {




    // Create and style the FPS counter element
    this.fpsElement = document.createElement("div");
    this.fpsElement.style.position = "fixed";
    this.fpsElement.style.top = "10px";
    this.fpsElement.style.right = "10px";
    this.fpsElement.style.padding = "5px 10px";
    this.fpsElement.style.backgroundColor = "rgba(0,0,0,0.5)";
    this.fpsElement.style.color = "white";
    this.fpsElement.style.fontFamily = "monospace";
    this.fpsElement.style.zIndex = "100";
    document.body.appendChild(this.fpsElement);

     // Create and style the name display element
    this.nameElement = document.createElement("div");
    this.nameElement.style.position = "fixed";
    this.nameElement.style.bottom = "10px";
    this.nameElement.style.left = "10px";
    this.nameElement.style.padding = "8px 12px";
    this.nameElement.style.backgroundColor = "rgba(0,0,0,0.7)";
    this.nameElement.style.color = "white";
    this.nameElement.style.fontFamily = "monospace";
    this.nameElement.style.zIndex = "100";
    this.nameElement.style.display = "none"; // Initially hidden
    document.body.appendChild(this.nameElement);

    // Add click listener
    this.context.domElement.addEventListener(
      "pointerdown",
      this.onPointerDown.bind(this)
    );


  }


   private onPointerDown(args: any) {
    // Use args.originalEvent if available, otherwise fallback to args
    const event = args.originalEvent ?? args;

    // Calculate mouse position in normalized device coordinates (-1 to +1)
    this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    this.raycaster.setFromCamera(this.mouse, this.myCamera!);

    // Calculate objects intersecting the picking ray
    const intersects = this.raycaster.intersectObjects(this.gameObject.children);

    if (intersects.length > 0) {
      const clickedObject = intersects[0].object as Mesh;
      if (clickedObject.userData.name && this.nameElement) {
        this.nameElement.innerText = `Name: ${clickedObject.userData.name}`;
        this.nameElement.style.display = "block";
      }
    } else {
      // Hide the name if we click on empty space
      if (this.nameElement) {
        this.nameElement.style.display = "none";
      }
    }
  }


  private lastLogTime: number = 0;
  update() {
    // Update the FPS counter element once per second
    if (this.context.time.time - this.lastLogTime > 1) {
      const fps = 1 / this.context.time.deltaTime;
      if (this.fpsElement) {
        this.fpsElement.innerText = `FPS: ${fps.toFixed(1)}`;
      }
      this.lastLogTime = this.context.time.time;
    }
  }

  onDestroy() {
    // Clean up and remove the element when the component is destroyed
    if (this.fpsElement && this.fpsElement.parentElement) {
      this.fpsElement.parentElement.removeChild(this.fpsElement);
    }
  }
}
