import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Button, DeviceEventEmitter, View } from 'react-native';
import { Canvas, useThree, useFrame } from '@react-three/fiber/native';
import { Box, useGLTF } from '@react-three/drei/native';
import burgerModelPath from '@assets/glbs/burger.glb';

import type { GLTF } from 'three-stdlib/loaders/GLTFLoader';
import type { Mesh } from 'three';

type Position = [number, number, number];

function Camera() {
  const { camera } = useThree(state => state);
  camera.position.set(0, 1, 6);

  return null;
}

function Burger({ position }: { position: Position }) {
  const burger = useGLTF(burgerModelPath) as GLTF;
  const [goToSky, setGoToSky] = useState(false);

  useFrame(state => {
    if (burger === undefined) return;

    if (goToSky) {
      burger.scene.rotation.y += 0.3;
      burger.scene.position.y += 0.3;
    } else {
      burger.scene.rotation.x += Math.sin(state.clock.elapsedTime) * 0.03;
      burger.scene.rotation.z += Math.sin(state.clock.elapsedTime) * 0.03;
      burger.scene.rotation.y += Math.sin(state.clock.elapsedTime) * 0.03;

      burger.scene.position.y += Math.sin(state.clock.elapsedTime) * 0.03;
    }
  });

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('onReset', () => {
      setGoToSky(false);
      burger.scene.position.y = 0;
    });

    burger.scene.scale.set(0.5, 0.5, 0.5);

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <mesh
      onPointerEnter={() => setGoToSky(true)}
      onClick={() => setGoToSky(true)}>
      <primitive position={position} object={burger.scene} />
    </mesh>
  );
}

function Cube({ position }: { position: Position }) {
  const ref = useRef<Mesh>(null);
  const [goToSky, setGoToSky] = useState(false);

  useFrame(state => {
    if (ref.current === null) return;

    if (goToSky) {
      ref.current.rotation.y += 0.3;
      ref.current.position.y += 0.3;
    } else {
      ref.current.rotation.y += 0.03;
      ref.current.position.y += Math.sin(state.clock.elapsedTime) * 0.03;
    }
  });

  useEffect(() => {
    const listener = DeviceEventEmitter.addListener('onReset', () => {
      if (ref.current === null) return;

      setGoToSky(false);
      ref.current.position.y = 0;
    });

    return () => {
      listener.remove();
    };
  }, []);

  return (
    <mesh
      onPointerEnter={() => setGoToSky(true)}
      onClick={() => setGoToSky(true)}>
      <Box ref={ref} position={position} />
    </mesh>
  );
}

export default function MyFirstThree() {
  return (
    <View style={{ flex: 1 }}>
      <Canvas style={{ backgroundColor: '#99CCFF' }}>
        <ambientLight intensity={1} />
        <directionalLight color="white" position={[0, 0, 0]} />

        <Camera />

        <Cube position={[-1.5, 0, 0]} />
        <Suspense>
          <Burger position={[0, 0, 0]} />
        </Suspense>
        <Cube position={[1.5, 0, 0]} />
      </Canvas>

      <Button
        title={'Reset'}
        onPress={() => {
          DeviceEventEmitter.emit('onReset');
        }}
      />
    </View>
  );
}
