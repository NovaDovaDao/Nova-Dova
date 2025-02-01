import { create } from "zustand";
import * as THREE from "three";

// Define types for the Zustand store
interface DovaState {
  rotationSpeed: number;
  isRotating: boolean;
  envMapIntensity: number;
  typingSpeed: number;
  isTyping: boolean;
  petalColor: string;
  sphereEmissive: string;
  cameraPosition: THREE.Vector3;
  cameraTarget: THREE.Vector3;
  initialCameraPosition: THREE.Vector3;
  initialCameraTarget: THREE.Vector3;
  isModelClicked: boolean;
  setRotationSpeed: (speed: number) => void;
  setIsRotating: (rotating: boolean) => void;
  setTyping: (isTyping: boolean) => void;
  setPetalColor: (color: string) => void;
  setSphereEmissive: (color: string) => void;
  setCameraPosition: (position: THREE.Vector3) => void;
  setCameraTarget: (target: THREE.Vector3) => void;
  setIsModelClicked: (clicked: boolean) => void;
  // Add other state variables and setter functions as needed
}

export const useDovaStore = create<DovaState>((set) => ({
  rotationSpeed: 0.01,
  isRotating: true,
  envMapIntensity: 0.05,
  typingSpeed: 0.1,
  isTyping: false,
  petalColor: "white",
  sphereEmissive: "hotpink",
  cameraPosition: new THREE.Vector3(3, 3, 5), // Initial camera position
  cameraTarget: new THREE.Vector3(0, 0, 0), // Initial camera target
  initialCameraPosition: new THREE.Vector3(3, 3, 5), // Store initial values
  initialCameraTarget: new THREE.Vector3(0, 0, 0),
  isModelClicked: false,
  setRotationSpeed: (speed) => set({ rotationSpeed: speed }),
  setIsRotating: (rotating) => set({ isRotating: rotating }),
  setTyping: (isTyping) => set({ isTyping }),
  setPetalColor: (color) => set({ petalColor: color }),
  setSphereEmissive: (color) => set({ sphereEmissive: color }),
  setCameraPosition: (position) => set({ cameraPosition: position }),
  setCameraTarget: (target) => set({ cameraTarget: target }),
  setIsModelClicked: (clicked) => set({ isModelClicked: clicked }),
}));
