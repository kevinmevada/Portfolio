"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Environment, MeshTransmissionMaterial, Float } from "@react-three/drei";
import { useMemo, useRef, type MutableRefObject } from "react";
import * as THREE from "three";

function GlassCore({ mouse }: { mouse: MutableRefObject<{ x: number; y: number }> }) {
  const group = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (!group.current) return;
    const t = state.clock.elapsedTime;
    group.current.rotation.y = t * 0.18 + mouse.current.x * 0.45;
    group.current.rotation.x = Math.sin(t * 0.22) * 0.12 + mouse.current.y * 0.3;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.35}>
      <group ref={group}>
        <mesh>
          <icosahedronGeometry args={[1.35, 0]} />
          <MeshTransmissionMaterial
            backside
            samples={8}
            resolution={512}
            transmission={1}
            roughness={0.12}
            thickness={1.4}
            ior={1.4}
            chromaticAberration={0.04}
            anisotropy={0.2}
            distortion={0.15}
            distortionScale={0.25}
            temporalDistortion={0.1}
            color="#ffffff"
          />
        </mesh>
        <mesh scale={0.42}>
          <icosahedronGeometry args={[1, 1]} />
          <meshStandardMaterial
            color="#7eb6ff"
            emissive="#3d7dd9"
            emissiveIntensity={0.35}
            roughness={0.35}
            metalness={0.2}
          />
        </mesh>
      </group>
    </Float>
  );
}

function AmbientField() {
  const positions = useMemo(() => {
    const count = 120;
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 2.2 + Math.random() * 2.4;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta) * 0.7;
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.018} color="#a8b4c4" transparent opacity={0.55} sizeAttenuation />
    </points>
  );
}

function Scene() {
  const mouse = useRef({ x: 0, y: 0 });

  return (
    <group
      onPointerMove={(e) => {
        mouse.current.x = e.pointer.x * 0.35;
        mouse.current.y = e.pointer.y * 0.35;
      }}
    >
      <AmbientField />
      <GlassCore mouse={mouse} />
    </group>
  );
}

export default function SceneCanvas() {
  return (
    <Canvas
      className="!absolute inset-0"
      dpr={[1, 1.6]}
      camera={{ position: [0, 0, 5.2], fov: 36 }}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      style={{ background: "transparent" }}
    >
      <ambientLight intensity={0.85} />
      <directionalLight position={[4, 5, 3]} intensity={1.1} color="#ffffff" />
      <directionalLight position={[-3, -1, -2]} intensity={0.35} color="#b7d0ff" />
      <Environment preset="city" environmentIntensity={0.55} />
      <Scene />
    </Canvas>
  );
}
