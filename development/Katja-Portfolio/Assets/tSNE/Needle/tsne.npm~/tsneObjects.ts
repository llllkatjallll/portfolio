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

  private jsonData3D: ImageEntry[] = [];
  private targetPositions: Vector3[] = []; // Store target positions for each child
  private fpsElement: HTMLElement | null = null;
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
      // Build the full URL from your folder path and the file name.
      //const imageUrl = `include/rijksmuseum/${entry.name}.jpg`;
      const imageUrl = `include/rijksmuseum/${entry.name}`;

      /*            if (this.objectToInstantiate) {
                const instance = await this.objectToInstantiate.instantiate(this.gameObject);
                if (instance) {
                    // get component rectTransform and set position
                    const rectTransform = instance.children[0].getComponent(RectTransform);
                    if (rectTransform) {

                        rectTransform.worldPosition = new Vector3(entry.x, entry.y, entry.z);
                    }

                    const imgComp = instance.children[0].getComponent(Image);
                    if (imgComp) {

                        imgComp.image = texture;
                        // get the size of the texture and set the size of the rectTransform accordingly
                        if (texture) {
                            const aspectRatio = texture.image.width / texture.image.height;
                            //change objects scale based on aspect ratio
                            if (rectTransform) {
                                rectTransform.gameObject.scale.x = aspectRatio;
                            }
                        }

                    }
                }
            } */

      // create material
      const quad = ObjectUtils.createPrimitive("Quad", {
        name: "Quad",
        position: { x: entry.x, y: entry.y, z: entry.z },
        parent: this.gameObject,
      });
      quad.rotation.set(0, 180, 0);

      // Create a texture loader
      const loader = new TextureLoader();
      quad.material = new MeshBasicMaterial({
        color: 0xffffff,
        side: DoubleSide,
      });

      // Load the texture and use the onLoad callback
      loader.load(
        imageUrl,
        // onLoad callback
        (texture) => {
          texture.colorSpace = SRGBColorSpace;
          const aspectRatio = texture.image.width / texture.image.height;
          quad.scale.set(aspectRatio , 1, 1); // Adjust scale based on aspect ratio

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
  }
  private lastLogTime: number = 0;
  update(){
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
