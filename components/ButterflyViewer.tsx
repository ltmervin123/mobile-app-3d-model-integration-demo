/* eslint-disable @typescript-eslint/no-require-imports */
/* eslint-disable react/no-unknown-property */
import {
  OrbitControls,
  useAnimations,
  useGLTF,
} from "@react-three/drei/native";
import { Canvas } from "@react-three/fiber/native";
import React, { Suspense, useEffect } from "react";
import { StyleSheet, View } from "react-native";

function ButterflyModel() {
  const { scene, animations } = useGLTF(
    require("../assets/models/butterfly.glb"),
  ) as any;
  const { actions } = useAnimations(animations, scene);

  useEffect(() => {
    Object.values(actions).forEach((action: any) => {
      if (action && "metarig|2" === action.getClip().name) {
        action.play();
      }
    });

    scene.traverse((child: any) => {
      if (child.isMesh) {
        child.castShadow = true;
        child.receiveShadow = true;
      }
    });
  }, [actions, scene]);

  return (
    <primitive
      object={scene}
      scale={2.5}
      position={[0, 0, 0]}
      frustumCulled={false}
    />
  );
}

function GroundPlane() {
  return (
    <group>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -2, 0]} receiveShadow>
        <planeGeometry args={[5000, 5000]} />
        {/* Just use a solid color for the base */}
        <meshStandardMaterial color="#d0d0d0" roughness={0.9} metalness={0} />
      </mesh>
      
      {/* The gridHelper handles the "checkered" visual effect */}
      <gridHelper
        args={[5000, 150, "#a8a8a8", "#a8a8a8"]}
        position={[0, -1.99, 0]}
      />
    </group>
  );
}

export default function ButterflyViewer() {
  return (
    <View style={styles.container}>
      <Canvas
        camera={{ position: [1000, 500, 500], fov: 50, near: 0.1, far: 10000 }}
        shadows
        onTouchStart={(e) => {
          if (e.nativeEvent.touches.length > 1) return false;
        }}
      >
        <color attach="background" args={["#c0c0c0"]} />
        <ambientLight intensity={0.8} />
        <directionalLight
          position={[100, 100, 100]}
          intensity={2}
          castShadow
          shadow-mapSize={[2048, 2048]}
          shadow-camera-far={1000}
        />
        <directionalLight position={[-500, 300, -500]} intensity={0.6} />

        <GroundPlane />

        <Suspense fallback={null}>
          <ButterflyModel />
        </Suspense>

        <OrbitControls
          enableZoom={true}
          target={[0, 0.3, 0]}
          minPolarAngle={0.1}
          maxPolarAngle={Math.PI - 0.1}
        />
      </Canvas>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    height: "100%",
  },
});
