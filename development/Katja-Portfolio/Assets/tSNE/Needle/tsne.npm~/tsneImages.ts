import { Behaviour, serializable, AssetReference, RectTransform, Image, FileReference, ImageReference } from "@needle-tools/engine";
import { Vector3 } from "three";

interface ImageEntry {
    name: string;
    x: number;
    y: number;
    z: number;
}

export class tsneImages extends Behaviour {

    @serializable(AssetReference)
    objectToInstantiate?: AssetReference;

    @serializable(FileReference)
    jsonFile?: FileReference;

    @serializable(Vector3)
    position?: Vector3;

    async awake() {
        // Load the JSON manifest from your server or local folder.
        const response = await fetch(this.jsonFile ? this.jsonFile.url : 'assets/painting.json');
        const data = await response.json();

        console.log("Loaded JSON data:", data);

        for (const entry of data) {
            // Build the full URL from your folder path and the file name.
            const imageUrl =  `include/images/${entry.name}.jpg`;



            console.log("Processing image:", imageUrl);
            // Create or get an asset reference dynamically.
            const assetRef = AssetReference.getOrCreateFromUrl(imageUrl);

            const imgRef = ImageReference.getOrCreate(imageUrl);
            const texture = await imgRef.createTexture();
            console.log("Image reference and texture:", imgRef, texture);
            // Instantiate a new UI Image based on the prefab

            if (this.objectToInstantiate) {
                const instance = await this.objectToInstantiate.instantiate(this.gameObject);
                if (instance) {
                    // get component rectTransform and set position
                    const rectTransform = instance.getComponent(RectTransform);
                    if (rectTransform) {

                        rectTransform.worldPosition = new Vector3(entry.x, entry.y, entry.z);
                    }

                    const imgComp = instance.getComponent(Image);
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


    }