import React, { useRef } from 'react';
import { Canvas, useThree, useFrame } from '@react-three/fiber/native';

import type { Mesh, Color } from 'three';

type Position = [number, number, number];

function Camera() {
  const { camera } = useThree(state => state);
  camera.position.set(0, 0, 6);

  return null;
}

function Cube({
  position,
  size,
}: {
  position: Position;
  size: [number, number, number];
}) {
  const ref = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  useFrame((state, delta) => {
    if (ref.current === null) return;

    ref.current.rotation.x += Math.sin(state.clock.elapsedTime) * 0.03;
    ref.current.rotation.y += delta * 2; //
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerEnter={event => {
        event.stopPropagation();
        setIsHovered(true);
      }}
      onPointerLeave={() => {
        setIsHovered(false);
      }}>
      <boxGeometry args={size} />
      <meshStandardMaterial color={isHovered ? 'red' : 'pink'} />
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

function Torus({
  position,
  size,
  color,
}: {
  position: [number, number, number];
  size: [number, number, number, number];
  color: Color | string;
}) {
  const ref = useRef<Mesh>(null);
  const [isHovered, setIsHovered] = React.useState(false);

  useFrame(state => {
    if (ref.current === null) return;

    ref.current.rotation.x += Math.sin(state.clock.elapsedTime) * 0.03;
  });

  return (
    <mesh
      ref={ref}
      position={position}
      onPointerEnter={event => {
        event.stopPropagation();
        setIsHovered(true);
      }}
      onPointerLeave={() => {
        setIsHovered(false);
      }}>
      <torusGeometry args={size} />
      <meshStandardMaterial color={isHovered ? 'red' : color} />
    </mesh>
  );
}

function TorusKnot({
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

    ref.current.rotation.x += Math.sin(state.clock.elapsedTime) * 0.03;
  });

  return (
    <mesh ref={ref} position={position}>
      <torusKnotGeometry args={size} />
      <meshStandardMaterial color={color} />
    </mesh>
  );
}

export default function Geometries() {
  return (
    <Canvas style={{ backgroundColor: 'black' }}>
      <directionalLight position={[0, 0, 5]} intensity={0.5} />
      <ambientLight intensity={0.5} />

      <Camera />

      <Cube position={[-1.5, 0, 0]} size={[1, 1, 1]} />
      <Sphere position={[0, 0, 0]} size={[0.75, 15, 15]} color={'orange'} />
      <Torus
        position={[1.5, 0, 0]}
        size={[0.55, 0.15, 30, 30]}
        color={'green'}
      />
      <TorusKnot
        position={[0, 2, 0]}
        size={[0.5, 0.1, 1000]}
        color={'hotpink'}
      />
    </Canvas>
  );
}
