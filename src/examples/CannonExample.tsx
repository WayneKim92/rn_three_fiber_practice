import React, { useEffect, useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Plane } from '@react-three/drei';
import * as CANNON from 'cannon';
import OrbitControls from 'expo-three-orbitcontrols';
import { Camera, Mesh } from 'three';
import { Body } from 'cannon';

const world = new CANNON.World();

type Position = [number, number, number];
type Size = [number, number, number];

function Cube({
  position,
  size,
  orbit,
}: {
  position: Position;
  size: Size;
  orbit?: number;
}) {
  const ref = useRef<Mesh>();
  const body = useRef<Body>();

  useEffect(() => {
    const cubeShape = new CANNON.Box(new CANNON.Vec3(...size));
    body.current = new CANNON.Body({ mass: 1, shape: cubeShape });
    body.current.position.set(...position);
    world.addBody(body.current);
  }, [position, size]);

  useFrame(({ clock }) => {
    if (ref.current === undefined) return;

    if (body.current) {
      world.step(1 / 60);
      // @ts-ignore
      ref.current.position.copy(body.current.position);
      // @ts-ignore
      ref.current.quaternion.copy(body.current.quaternion);

      if (orbit) {
        const radius = orbit; // 원의 반지름
        const speed = 5; // 움직임의 속도
        const angle = clock.getElapsedTime() * speed;
        body.current.position.x = radius * Math.cos(angle);
        body.current.position.z = radius * Math.sin(angle);
      }
    }
  });

  return (
    // @ts-ignore
    <Box ref={ref} args={size} position={position}>
      <meshStandardMaterial color={'orange'} />
    </Box>
  );
}

function Ground() {
  useEffect(() => {
    const groundShape = new CANNON.Plane();
    const groundBody = new CANNON.Body({ mass: 0, shape: groundShape });
    groundBody.quaternion.setFromAxisAngle(
      new CANNON.Vec3(1, 0, 0),
      -Math.PI / 2,
    );
    world.addBody(groundBody);
  }, []);

  return (
    <Plane args={[100, 100]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
      <meshStandardMaterial color={'white'} />
    </Plane>
  );
}

export default function CannonExample() {
  const [camera, setCamera] = useState<Camera | null>(null);

  useEffect(() => {
    // world.gravity.set(0, -9.82, 0);
    world.gravity.set(0, -200, 0); // 이제 멈추는데?
  }, []);

  return (
    <OrbitControls style={{ flex: 1 }} camera={camera}>
      <Canvas
        shadows
        camera={{ position: [50, 50, 50], fov: 50 }}
        onCreated={({ camera }) => setCamera(camera)}>
        <ambientLight intensity={0.5} />
        <directionalLight castShadow position={[2.5, 8, 5]} />
        {/* useFrame은 최대 두개 밖에 못 쓰겠다. JS 쓰레드 만으로는 성능 부족함 */}
        <Cube position={[0, 1, 0]} size={[1, 1, 1]} orbit={15} />
        <Cube position={[0, 0, 0]} size={[1, 1, 1]} />
        <Ground />
      </Canvas>
    </OrbitControls>
  );
}
