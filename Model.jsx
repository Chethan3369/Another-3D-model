import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls, useGLTF } from "@react-three/drei";

function GLBModel({
  url,
  position = [0, 0, 0],
  rotation = [0, Math.PI, 0], // <-- flip facing direction (try this first)
  scale = 1,
}) {
  const { scene } = useGLTF(url);

  return (
    <group position={position} rotation={rotation} scale={scale}>
      <primitive object={scene} />
    </group>
  );
}

export default function ModelViewer() {
  return (
    <div style={{ width: "100%", height: 500 }}>
      <Canvas camera={{ position: [0, 1.2, 3], fov: 45 }}>
        <ambientLight intensity={0.6} />
        <directionalLight position={[3, 3, 3]} intensity={1.2} />

        <Suspense fallback={null}>
          <GLBModel
            url="/models/myModel.glb"
            scale={0.8}                 // smaller/bigger
            position={[0, -0.5, 0]}     // move down a bit
            rotation={[0, Math.PI, 0]}  // rotate if reversed; try 0, Math.PI/2, -Math.PI/2
          />
        </Suspense>

        <OrbitControls enableDamping />
      </Canvas>
    </div>
  );
}
