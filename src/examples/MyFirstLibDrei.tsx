import React, { useRef, useState } from 'react';
import OrbitControls from 'expo-three-orbitcontrols';
import { Canvas, useFrame } from '@react-three/fiber/native';
import { MeshWobbleMaterial, MeshDistortMaterial } from '@react-three/drei';

import type { Mesh, Color, Camera } from 'three';

type Position = [number, number, number];

function Cube({
  position,
  size,
}: {
  position: Position;
  size: [number, number, number];
}) {
  const ref = useRef<Mesh>(null);

  useFrame((state, delta) => {
    if (ref.current === null) return;

    ref.current.rotation.x += Math.sin(state.clock.elapsedTime) * 0.03;
    ref.current.rotation.y += delta * 2; //
  });

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      {/*<MeshWobbleMaterial color={'pink'} factor={3} />*/}
      <MeshDistortMaterial color={'pink'} />
    </mesh>
  );
}

function Sphere({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number];
  color: Color | string;
}) {
  const ref = useRef<Mesh>(null);

  useFrame(state => {
    if (ref.current === null) return;

    ref.current.position.z += Math.sin(state.clock.elapsedTime) * 0.015;
    ref.current.rotation.y += Math.sin(state.clock.elapsedTime) * 0.03;
  });

  return (
    <mesh ref={ref} position={position}>
      <sphereGeometry args={size} />
      <meshStandardMaterial color={color} wireframe />
    </mesh>
  );
}

export default function MyFirstLibDrei() {
  const [camera, setCamera] = useState<Camera | null>(null);

  return (
    <OrbitControls style={{ flex: 1 }} camera={camera}>
      <Canvas
        style={{ backgroundColor: 'black' }}
        onCreated={({ camera }) => {
          setCamera(camera);
        }}>
        <directionalLight position={[0, 0, 5]} intensity={0.5} />
        <ambientLight intensity={0.5} />
        <Cube position={[-1.5, 0, 0]} size={[1, 1, 1]} />
        <Sphere position={[0, 0, 0]} size={[0.75, 15, 15]} color={'orange'} />
      </Canvas>
    </OrbitControls>
  );
}
