import { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, MeshDistortMaterial, Sparkles, Float } from '@react-three/drei';
import * as THREE from 'three';

const Globe = () => {
  const sphereRef = useRef<THREE.Mesh>(null);
  const targetRotation = useRef({ x: 0, y: 0 });

  useFrame((state, delta) => {
    // Stop continuous animation if document is not visible
    if (typeof document !== 'undefined' && document.visibilityState === 'hidden') return;

    if (sphereRef.current) {
      // Base rotation over time
      const timeRotationX = state.clock.getElapsedTime() * 0.1;
      const timeRotationY = state.clock.getElapsedTime() * 0.15;

      // Interactive rotation based on mouse pointer
      targetRotation.current.x = (state.pointer.y * Math.PI) / 4; // Tilt up/down
      targetRotation.current.y = (state.pointer.x * Math.PI) / 4; // Tilt left/right

      // Smoothly interpolate current rotation towards target rotation + base rotation
      sphereRef.current.rotation.x = THREE.MathUtils.lerp(sphereRef.current.rotation.x, timeRotationX + targetRotation.current.x, 2 * delta);
      sphereRef.current.rotation.y = THREE.MathUtils.lerp(sphereRef.current.rotation.y, timeRotationY + targetRotation.current.y, 2 * delta);
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.4} floatIntensity={0.8}>
      <Sphere ref={sphereRef} args={[1, 48, 48]} scale={1.5}>
        <MeshDistortMaterial
          color="#06b6d4" // Cyan
          attach="material"
          distort={0.35}
          speed={1.5}
          roughness={0.2}
          metalness={0.8}
          wireframe={true}
          emissive="#3b82f6" // Blue
          emissiveIntensity={0.5}
        />
      </Sphere>
      
      {/* Inner core */}
      <Sphere args={[0.8, 24, 24]}>
        <meshStandardMaterial
          color="#3b82f6"
          roughness={0.1}
          metalness={0.9}
          emissive="#06b6d4"
          emissiveIntensity={0.2}
        />
      </Sphere>

      <Sparkles count={60} scale={4} size={1.8} speed={0.3} opacity={0.5} color="#4ade80" />
    </Float>
  );
};

export const HeroGlobe3D = () => {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      const handler = (e: MediaQueryListEvent) => setPrefersReducedMotion(e.matches);
      mediaQuery.addEventListener('change', handler);
      return () => mediaQuery.removeEventListener('change', handler);
    }
  }, []);

  if (prefersReducedMotion) {
    return null; // Respect user preference for reduced motion
  }

  return (
    <div className="absolute inset-0 -z-10 w-full h-full opacity-60 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ position: [0, 0, 5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ powerPreference: 'low-power', antialias: false }}
      >
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} />
        <pointLight position={[-10, -10, -5]} color="#10b981" intensity={2} />
        <Globe />
        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.4}
          maxPolarAngle={Math.PI / 2 + 0.2}
          minPolarAngle={Math.PI / 2 - 0.2}
        />
      </Canvas>
    </div>
  );
};

export default HeroGlobe3D;
