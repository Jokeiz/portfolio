import { Canvas, useFrame } from '@react-three/fiber';
import { Suspense, useRef } from 'react';
import { MeshDistortMaterial, Float } from '@react-three/drei';
import { useReducedMotion } from '../hooks/useReducedMotion';

function Orb() {
  const ref = useRef();
  useFrame((state, delta) => {
    if (!ref.current) return;
    ref.current.rotation.y += delta * 0.2;
    ref.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.4) * 0.2;
  });
  return (
    <group ref={ref}>
      <mesh>
        <sphereGeometry args={[1.2, 32, 32]} />
        <MeshDistortMaterial
          color="#7df9d4"
          distort={0.55}
          speed={1.6}
          metalness={0.1}
          roughness={0.05}
        />
      </mesh>
      <mesh>
        <sphereGeometry args={[1.45, 16, 16]} />
        <meshBasicMaterial color="#7df9d4" wireframe transparent opacity={0.12} />
      </mesh>
    </group>
  );
}

function Sparks() {
  return (
    <>
      {[...Array(6)].map((_, i) => {
        const a = (i / 6) * Math.PI * 2;
        return (
          <Float key={i} speed={1.6} floatIntensity={1.2} rotationIntensity={1}>
            <mesh position={[Math.cos(a) * 2.2, Math.sin(a * 1.3) * 0.5, Math.sin(a) * 2.2]}>
              <octahedronGeometry args={[0.12, 0]} />
              <meshStandardMaterial color={i % 2 ? '#a78bfa' : '#ffffff'} metalness={0.9} roughness={0.1} />
            </mesh>
          </Float>
        );
      })}
    </>
  );
}

export default function ContactOrb() {
  const reduced = useReducedMotion();
  // 'always' so the orb keeps living. R3F's never→always handoff is flaky.
  const frameloop = reduced ? 'demand' : 'always';

  return (
    <div style={{ position: 'absolute', inset: 0 }}>
      <Canvas
        frameloop={frameloop}
        dpr={[1, 1.5]}
        camera={{ position: [0, 0, 4.5], fov: 36 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.55} />
        <directionalLight position={[3, 3, 3]} intensity={1.6} color="#7df9d4" />
        <directionalLight position={[-2, -2, 1]} intensity={0.9} color="#a78bfa" />
        <Suspense fallback={null}>
          <Orb />
          <Sparks />
        </Suspense>
      </Canvas>
    </div>
  );
}
