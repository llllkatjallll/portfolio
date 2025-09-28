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

    @serializable(FileReference)
    jsonFile2D?: FileReference;

    @serializable(Vector3)
    position?: Vector3;

    private changingAnimation = false;
    private currentDimenstion = 3;
    private changeTime = 4000;
    private lerpSpeed = 0.03; // Slower for smoother animation

    private jsonData3D: ImageEntry[] = [];

    private jsonData2D: ImageEntry[] = [];

    private targetPositions: Vector3[] = []; // Store target positions for each child

    private debugCounter: number = 0; // Add a counter for debugging

    async awake() {
        // Load the JSON manifest from your server or local folder.
        const response = await fetch(this.jsonFile ? this.jsonFile.url : 'assets/painting.json');
        const data = await response.json();

                // Load the JSON manifest from your server or local folder.
        const response2d = await fetch(this.jsonFile2D ? this.jsonFile2D.url : 'assets/painting2D.json');
        const data2d = await response2d.json();

        this.jsonData3D = data;
        this.jsonData2D = data;

        //change mapping for 3d data
        // current x,y, and z are between -30 and 30, we want to map them to -50 and 50
        this.jsonData3D = data.map((entry: { name: any; x: any; y: any; z: any; }) => ({
            name: entry.name,
            x: this.mapRange(entry.x, -30, 30, -90, 90),
            y: this.mapRange(entry.y, -30, 30, -50, 50),
            z: this.mapRange(entry.z, -30, 30, -50, 50)
        }));

        //this.jsonData2D = this.jsonData3D;

        console.log("Loaded JSON data:", data);

        for (const entry of data) {
            // Build the full URL from your folder path and the file name.
            //const imageUrl = `include/rijksmuseum/${entry.name}.jpg`;
             const imageUrl = `include/rijksmuseum/${entry.name}`;



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

        // Initialize targetPositions to 3D positions
        this.targetPositions = this.jsonData3D.map(e => new Vector3(e.x, e.y, e.z));
    }

    mapRange(value: number, inMin: number, inMax: number, outMin: number, outMax: number): number {
        return (value - inMin) * (outMax - outMin) / (inMax - inMin) + outMin;
    }


    update() {
        if (this.changingAnimation) {
            // Only log occasionally to avoid console spam
            if (this.debugCounter % 30 === 0) {
                console.log(`Animation in progress: ${this.changeTime.toFixed(2)} ms remaining`);
            }
            this.debugCounter++;
            
            // Force an immediate repaint by directly calling moveConstantlyTowardsTarget
            this.moveConstantlyTowardsTarget();
            
            this.changeTime -= 16.67; // assuming ~60fps
            if (this.changeTime <= 0) {
                console.log("Animation complete, stopping");
                this.changingAnimation = false;
                this.changeTime = 4000;
                this.snapToTargetPositions();
            }
        }
    }

    async changeTo2DPositions() {
        console.log("Starting animation to 2D positions");
        // Make sure we're not already in 2D mode
        if (this.currentDimenstion === 2 && !this.changingAnimation) {
            console.log("Already in 2D mode");
            return;
        }

        // Make sure data is loaded
        if (!this.jsonData2D || this.jsonData2D.length === 0) {
            console.error("2D data not loaded!");
            return;
        }

        this.currentDimenstion = 2;
        this.changingAnimation = true;
        this.changeTime = 4000;
        this.debugCounter = 0;
        
        // Set target positions to 2D - make a deep copy to ensure new Vector3 objects
        this.targetPositions = this.jsonData2D.map(e => new Vector3(e.x, e.y, e.z));
        
        // Log initial and target positions for debugging
        this.logPositionDebugInfo();
    }

    async changeTo3DPositions() {
        console.log("Starting animation to 3D positions");
        // Make sure we're not already in 3D mode
        if (this.currentDimenstion === 3 && !this.changingAnimation) {
            console.log("Already in 3D mode");
            return;
        }

        // Make sure data is loaded
        if (!this.jsonData3D || this.jsonData3D.length === 0) {
            console.error("3D data not loaded!");
            return;
        }

        this.currentDimenstion = 3;
        this.changingAnimation = true;
        this.changeTime = 4000;
        this.debugCounter = 0;
        
        // Set target positions to 3D - make a deep copy to ensure new Vector3 objects
        this.targetPositions = this.jsonData3D.map(e => new Vector3(e.x, e.y, e.z));
        
        // Log initial and target positions for debugging
        this.logPositionDebugInfo();
    }

    moveConstantlyTowardsTarget() {
        const children = this.gameObject.children;
        if (!children || children.length === 0) {
            console.warn("No children to animate");
            return;
        }

        // Check if we have valid target positions
        if (!this.targetPositions || this.targetPositions.length === 0) {
            console.warn("No target positions defined");
            return;
        }

        let anyMoving = false;
        for (let index = 0; index < children.length && index < this.targetPositions.length; index++) {
            const child = children[index];
            const rectTransform = child.children[0].getComponent(RectTransform);
            if (rectTransform && this.targetPositions[index]) {
                const currentPos = rectTransform.worldPosition;
                const targetPos = this.targetPositions[index];
                
                // Check if we need to move (if not close enough to target)
                const distance = currentPos.distanceTo(targetPos);
                if (distance > 0.01) {
                    // IMPORTANT: Create a new Vector3 for the interpolated position
                    // This ensures the property change is recognized by the engine
                    const newPos = new Vector3();
                    newPos.copy(currentPos).lerp(targetPos, this.lerpSpeed);
                    rectTransform.worldPosition = newPos;
                    
                    anyMoving = true;
                }
            }
        }

        // If nothing is actually moving, we might be done early
        if (!anyMoving) {
            console.log("All objects reached their targets");
            this.changeTime = 0; // This will end the animation in the next update
        }
    }

    // Helper method for debugging
    logPositionDebugInfo() {
        const children = this.gameObject.children;
        if (!children || children.length === 0) return;

        console.log("Initial positions vs target positions:");
        for (let i = 0; i < Math.min(3, children.length); i++) {
            const child = children[i];
            const rectTransform = child.children[0].getComponent(RectTransform);
            if (rectTransform && this.targetPositions[i]) {
                console.log(`Child ${i}: Current=${JSON.stringify(rectTransform.worldPosition)} Target=${JSON.stringify(this.targetPositions[i])}`);
            }
        }
        console.log(`... and ${children.length - 3} more children`);
    }

    snapToTargetPositions() {
        const children = this.gameObject.children;
        if (children) {
            for (let index = 0; index < children.length; index++) {
                const child = children[index];
                const rectTransform = child.children[0].getComponent(RectTransform);
                if (rectTransform && this.targetPositions[index]) {
                    rectTransform.worldPosition.copy(this.targetPositions[index]);
                }
            }
        }
    }
}
