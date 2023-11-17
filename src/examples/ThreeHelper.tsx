import React, { useEffect, useRef, useState } from 'react';
import { DirectionalLightHelper } from 'three';
import OrbitControls from 'expo-three-orbitcontrols';
import { Canvas, useThree } from '@react-three/fiber/native';
import { MeshDistortMaterial, useHelper } from '@react-three/drei';

import type { Mesh, Camera, DirectionalLight } from 'three';

type Position = [number, number, number];

function Cube({
  position,
  size,
}: {
  position: Position;
  size: [number, number, number];
}) {
  const ref = useRef<Mesh>(null);

  return (
    <mesh ref={ref} position={position}>
      <boxGeometry args={size} />
      <MeshDistortMaterial color={'pink'} factor={10} />
    </mesh>
  );
}

const Scene = () => {
  const directionalLightRef = useRef<DirectionalLight>(null);

  const { camera } = useThree(state => state);

  useHelper(
    // @ts-ignore , 타입 에러 수정 방법을 모르겠음
    directionalLightRef,
    DirectionalLightHelper,
    0.5, // help 크기
    'pink', // helper 색상
  );

  useEffect(() => {
    camera.position.set(0, 0, 6);
  }, []);

  return (
    <>
      <directionalLight
        position={[0, 1.5, 2]}
        intensity={0.5}
        ref={directionalLightRef}
      />
      <ambientLight intensity={0.5} />
      <Cube position={[0, 0, 0]} size={[1, 1, 1]} />
    </>
  );
};

export default function ThreeHelper() {
  const [camera, setCamera] = useState<Camera | null>(null);

  return (
    <OrbitControls style={{ flex: 1 }} camera={camera}>
      <Canvas
        style={{ backgroundColor: 'black' }}
        onCreated={({ camera }) => setCamera(camera)}>
        <Scene />
      </Canvas>
    </OrbitControls>
  );
}
