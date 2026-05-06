import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { Float, Text } from '@react-three/drei';
import { useReducedMotion } from '../hooks/useReducedMotion';

const FACES = [
  { label: 'FRONTEND', color: '#7df9d4' },
  { label: '3D / WEBGL', color: '#a78bfa' },
  { label: 'FULL-STACK', color: '#7df9d4' },
  { label: 'UI / UX', color: '#a78bfa' },
  { label: 'MOTION', color: '#7df9d4' },
  { label: 'INFRA', color: '#a78bfa' },
];

function CubeFaceLabel({ position, rotation, label, color }) {
  return (
    <group position={position} rotation={rotation}>
      <mesh>
        <planeGeometry args={[1.6, 1.6]} />
        <meshStandardMaterial
          color="#0a0c12"
          metalness={0.6}
          roughness={0.25}
          emissive={color}
          emissiveIntensity={0.04}
        />
      </mesh>
      <Text
        position={[0, 0, 0.01]}
        fontSize={0.12}
        color={color}
        anchorX="center"
        anchorY="middle"
        letterSpacing={0.12}
        font={undefined}
      >
        {label}
      </Text>
      {/* Border lines */}
      <mesh>
        <ringGeometry args={[0.78, 0.79, 4]} />
        <meshBasicMaterial color={color} transparent opacity={0.15} />
      </mesh>
    </group>
  );
}

function RotatingCube() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.x += delta * 0.18;
    ref.current.rotation.y += delta * 0.22;
  });

  const half = 0.85;
  return (
    <group ref={ref}>
      {/* Solid inner cube */}
      <mesh>
        <boxGeometry args={[1.7, 1.7, 1.7]} />
        <meshStandardMaterial color="#0a0c12" metalness={0.7} roughness={0.2} />
      </mesh>
      {/* Wireframe outer */}
      <mesh>
        <boxGeometry args={[1.85, 1.85, 1.85]} />
        <meshBasicMaterial color="#7df9d4" wireframe transparent opacity={0.18} />
      </mesh>

      {/* 6 face labels */}
      <CubeFaceLabel position={[0, 0, half]} rotation={[0, 0, 0]} {...FACES[0]} />
      <CubeFaceLabel position={[0, 0, -half]} rotation={[0, Math.PI, 0]} {...FACES[1]} />
      <CubeFaceLabel position={[half, 0, 0]} rotation={[0, Math.PI / 2, 0]} {...FACES[2]} />
      <CubeFaceLabel position={[-half, 0, 0]} rotation={[0, -Math.PI / 2, 0]} {...FACES[3]} />
      <CubeFaceLabel position={[0, half, 0]} rotation={[-Math.PI / 2, 0, 0]} {...FACES[4]} />
      <CubeFaceLabel position={[0, -half, 0]} rotation={[Math.PI / 2, 0, 0]} {...FACES[5]} />
    </group>
  );
}

function OrbitingDots() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.4;
  });
  return (
    <group ref={ref}>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <Float key={i} speed={1.2} floatIntensity={0.6}>
            <mesh position={[Math.cos(a) * 2.4, Math.sin(a * 1.5) * 0.6, Math.sin(a) * 2.4]}>
              <sphereGeometry args={[0.04, 12, 12]} />
              <meshBasicMaterial color={i % 2 ? '#7df9d4' : '#a78bfa'} />
            </mesh>
          </Float>
        );
      })}
    </group>
  );
}

export default function SkillsCube() {
  const reduced = useReducedMotion();
  // Stay on 'always' — R3F's never→always transition is unreliable and the
  // cube animation is what people came for. Browsers throttle bg tabs anyway.
  const frameloop = reduced ? 'demand' : 'always';

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ position: [3.5, 2.2, 3.5], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 4, 3]} intensity={1.4} color="#7df9d4" />
        <directionalLight position={[-3, -2, -2]} intensity={0.7} color="#a78bfa" />
        <Suspense fallback={null}>
          <RotatingCube />
          <OrbitingDots />
        </Suspense>
      </Canvas>
    </div>
  );
}
