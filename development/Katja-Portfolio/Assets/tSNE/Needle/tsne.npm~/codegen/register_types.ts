/* eslint-disable */
import { TypeStore } from "@needle-tools/engine"

// Import types
import { StateListener } from "../StateManager.js";
import { StateManager } from "../StateManager.js";
import { tsneImages } from "../tsneImages.js";
import { tsneObjects } from "../tsneObjects.js";

// Register types
TypeStore.add("StateListener", StateListener);
TypeStore.add("StateManager", StateManager);
TypeStore.add("tsneImages", tsneImages);
TypeStore.add("tsneObjects", tsneObjects);
