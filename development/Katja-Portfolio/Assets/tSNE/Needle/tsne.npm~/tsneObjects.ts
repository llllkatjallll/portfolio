import { Behaviour, FileReference, ObjectUtils, serializable } from "@needle-tools/engine";
import { Vector3, Material, MeshBasicMaterial, TextureLoader, DoubleSide } from "three";

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

    async awake() {
        const response = await fetch(this.jsonFile3D ? this.jsonFile3D.url : 'assets/painting.json');
        const data = await response.json();
        this.jsonData3D = data;

        this.jsonData3D = data.map((entry: { name: any; x: any; y: any; z: any; }) => ({
            name: entry.name,
            x: this.mapRange(entry.x, -30, 30, -90, 90),
            y: this.mapRange(entry.y, -30, 30, -50, 50),
            z: this.mapRange(entry.z, -30, 30, -50, 50)
        })); 

              for (const entry of data) {
            // Build the full URL from your folder path and the file name.
            //const imageUrl = `include/rijksmuseum/${entry.name}.jpg`;
             const imageUrl = `include/rijksmuseum/${entry.name}`;




            if (this.objectToInstantiate) {
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
            }
        } 


    }

       mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }

    start() {

        // create material
        const quad = ObjectUtils.createPrimitive("Quad", { name: "Quad", position: { x: 0, y: 0, z: 0 }, parent: this.gameObject });
        quad.scale.set(2, 2, 2);
        quad.rotation.set(0, 180, 0);

        // Create a texture loader
        const loader = new TextureLoader();
         const imageUrl = `include/rijksmuseum/SK-A-4.jpg`;
        const texture = loader.load(imageUrl);

        // Material with texture
        const material = new MeshBasicMaterial({ map: texture, side: DoubleSide });


        quad.material = material;

    }
}