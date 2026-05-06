import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useMemo } from 'react';
import {
  MeshDistortMaterial,
  Float,
  Environment,
  Points,
  PointMaterial,
} from '@react-three/drei';
import * as THREE from 'three';

function Centerpiece() {
  const groupRef = useRef();
  const ringRef = useRef();
  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.12;
      groupRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.3) * 0.15;
    }
    if (ringRef.current) {
      ringRef.current.rotation.x += delta * 0.18;
      ringRef.current.rotation.z -= delta * 0.1;
    }
  });
  return (
    <group ref={groupRef}>
      {/* Solid distorted core — full subdivision for smooth distortion */}
      <mesh>
        <icosahedronGeometry args={[1.35, 4]} />
        <MeshDistortMaterial
          color="#11141c"
          roughness={0.18}
          metalness={0.9}
          distort={0.42}
          speed={1.1}
          envMapIntensity={1.8}
        />
      </mesh>

      {/* Wireframe halo */}
      <mesh ref={ringRef}>
        <icosahedronGeometry args={[1.85, 1]} />
        <meshBasicMaterial wireframe color="#7df9d4" transparent opacity={0.18} />
      </mesh>

      {/* Inner energy point */}
      <mesh>
        <sphereGeometry args={[0.18, 32, 32]} />
        <meshBasicMaterial color="#7df9d4" />
      </mesh>
    </group>
  );
}

function FloatingShard({ position, size = 0.18, color = '#ffffff', shape = 'oct' }) {
  const Geo = {
    oct: <octahedronGeometry args={[size, 0]} />,
    tet: <tetrahedronGeometry args={[size, 0]} />,
    box: <boxGeometry args={[size, size, size]} />,
    icosa: <icosahedronGeometry args={[size, 0]} />,
  }[shape];
  return (
    <Float speed={1.4} rotationIntensity={1.4} floatIntensity={1.6}>
      <mesh position={position}>
        {Geo}
        <meshStandardMaterial color={color} metalness={0.85} roughness={0.18} />
      </mesh>
    </Float>
  );
}

const PARTICLE_COUNT = 600;

function ParticleField() {
  const ref = useRef();
  const positions = useMemo(() => {
    const arr = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const r = 8 + Math.random() * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      arr[i * 3 + 2] = r * Math.cos(phi);
    }
    return arr;
  }, []);
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.012;
  });
  return (
    <Points ref={ref} positions={positions} stride={3} frustumCulled>
      <PointMaterial
        transparent
        color="#ffffff"
        size={0.02}
        sizeAttenuation
        depthWrite={false}
        opacity={0.55}
      />
    </Points>
  );
}

function CameraRig() {
  useFrame((state) => {
    const x = state.pointer.x * 0.7;
    const y = state.pointer.y * 0.45;
    state.camera.position.x += (x - state.camera.position.x) * 0.05;
    state.camera.position.y += (-y * 0.5 - state.camera.position.y) * 0.05;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function Hero3D() {
  return (
    <Canvas
      dpr={[1, 1.5]}
      camera={{ position: [0, 0, 5.2], fov: 35 }}
      gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      style={{ background: 'transparent' }}
    >
      <ambientLight intensity={0.3} />
      <directionalLight position={[4, 3, 3]} intensity={1.6} color="#7df9d4" />
      <directionalLight position={[-3, -2, 2]} intensity={0.9} color="#a78bfa" />
      <pointLight position={[0, 0, 2]} intensity={0.4} color="#ffffff" />

      <Suspense fallback={null}>
        <Environment preset="city" />
        <Centerpiece />
        <FloatingShard position={[-2.8, 1.3, 0.2]} size={0.16} color="#7df9d4" shape="oct" />
        <FloatingShard position={[2.6, 0.9, -0.6]} size={0.18} color="#a78bfa" shape="tet" />
        <FloatingShard position={[2.0, -1.6, 0.4]} size={0.13} color="#ffffff" shape="box" />
        <FloatingShard position={[-2.4, -1.1, -0.3]} size={0.20} color="#7df9d4" shape="icosa" />
        <FloatingShard position={[0.6, 2.0, -1.2]} size={0.10} color="#ffffff" shape="oct" />
        <FloatingShard position={[-0.9, -2.1, 0.7]} size={0.15} color="#a78bfa" shape="box" />
        <FloatingShard position={[3.1, 1.7, -1.5]} size={0.09} color="#7df9d4" shape="tet" />
        <FloatingShard position={[-3.0, 0.2, -1.0]} size={0.11} color="#ffffff" shape="icosa" />
        <ParticleField />
      </Suspense>

      <CameraRig />
    </Canvas>
  );
}
