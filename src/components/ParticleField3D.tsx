import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const PARTICLE_COUNT = 1200;
const SPREAD = 12;
const MOUSE_RADIUS = 2.5;
const MOUSE_FORCE = 0.8;

function Particles() {
  const meshRef = useRef<THREE.Points>(null);
  const mouseRef = useRef(new THREE.Vector3(100, 100, 0));
  const { viewport } = useThree();

  const { positions, basePositions, velocities, colors, sizes } = useMemo(() => {
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    const basePositions = new Float32Array(PARTICLE_COUNT * 3);
    const velocities = new Float32Array(PARTICLE_COUNT * 3);
    const colors = new Float32Array(PARTICLE_COUNT * 3);
    const sizes = new Float32Array(PARTICLE_COUNT);

    // Electric cyan color with slight variation
    const cyan = new THREE.Color('#00e5ff');
    const cyanDim = new THREE.Color('#0088aa');

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // DNA helix shape with randomness
      const t = (i / PARTICLE_COUNT) * Math.PI * 8;
      const helixRadius = 2 + Math.random() * 1.5;
      const strand = i % 2 === 0 ? 1 : -1;

      const x = Math.cos(t * strand) * helixRadius + (Math.random() - 0.5) * 3;
      const y = ((i / PARTICLE_COUNT) - 0.5) * SPREAD + (Math.random() - 0.5) * 1.5;
      const z = Math.sin(t * strand) * helixRadius + (Math.random() - 0.5) * 3;

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      basePositions[i3] = x;
      basePositions[i3 + 1] = y;
      basePositions[i3 + 2] = z;

      velocities[i3] = 0;
      velocities[i3 + 1] = 0;
      velocities[i3 + 2] = 0;

      // Color variation
      const col = Math.random() > 0.3 ? cyan : cyanDim;
      colors[i3] = col.r;
      colors[i3 + 1] = col.g;
      colors[i3 + 2] = col.b;

      sizes[i] = Math.random() * 3 + 1;
    }

    return { positions, basePositions, velocities, colors, sizes };
  }, []);

  // Mouse tracking handled via global listener below

  // Attach global listener
  React.useEffect(() => {
    const handler = (e: MouseEvent) => {
      const x = (e.clientX / window.innerWidth) * 2 - 1;
      const y = -(e.clientY / window.innerHeight) * 2 + 1;
      mouseRef.current.set(x * viewport.width / 2, y * viewport.height / 2, 0);
    };
    window.addEventListener('mousemove', handler, { passive: true });
    return () => window.removeEventListener('mousemove', handler);
  }, [viewport]);

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const geo = meshRef.current.geometry;
    const posArr = geo.attributes.position.array as Float32Array;
    const dt = Math.min(delta, 0.05);
    const time = state.clock.elapsedTime;

    // Slow rotation
    meshRef.current.rotation.y += dt * 0.08;

    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const i3 = i * 3;

      // Mouse repulsion
      const dx = posArr[i3] - mouseRef.current.x;
      const dy = posArr[i3 + 1] - mouseRef.current.y;
      const dz = posArr[i3 + 2] - mouseRef.current.z;
      const distSq = dx * dx + dy * dy + dz * dz;
      const dist = Math.sqrt(distSq);

      if (dist < MOUSE_RADIUS && dist > 0.01) {
        const force = (MOUSE_RADIUS - dist) / MOUSE_RADIUS * MOUSE_FORCE;
        velocities[i3] += (dx / dist) * force * dt * 60;
        velocities[i3 + 1] += (dy / dist) * force * dt * 60;
        velocities[i3 + 2] += (dz / dist) * force * dt * 60;
      }

      // Spring back to base position
      const springStrength = 1.5;
      velocities[i3] += (basePositions[i3] - posArr[i3]) * springStrength * dt;
      velocities[i3 + 1] += (basePositions[i3 + 1] - posArr[i3 + 1]) * springStrength * dt;
      velocities[i3 + 2] += (basePositions[i3 + 2] - posArr[i3 + 2]) * springStrength * dt;

      // Subtle floating motion
      const floatOffset = i * 0.01;
      velocities[i3 + 1] += Math.sin(time * 0.5 + floatOffset) * 0.002;

      // Damping
      const damping = 0.92;
      velocities[i3] *= damping;
      velocities[i3 + 1] *= damping;
      velocities[i3 + 2] *= damping;

      // Apply velocity
      posArr[i3] += velocities[i3] * dt * 60;
      posArr[i3 + 1] += velocities[i3 + 1] * dt * 60;
      posArr[i3 + 2] += velocities[i3 + 2] * dt * 60;
    }

    geo.attributes.position.needsUpdate = true;
  });

  return (
    <points ref={meshRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={PARTICLE_COUNT}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={PARTICLE_COUNT}
          array={colors}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-size"
          count={PARTICLE_COUNT}
          array={sizes}
          itemSize={1}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.06}
        vertexColors
        transparent
        opacity={0.7}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
        depthWrite={false}
      />
    </points>
  );
}

const ParticleField3D: React.FC = () => {
  return (
    <div className="fixed inset-0 z-0" style={{ background: '#0a0f1a' }}>
      <Canvas
        camera={{ position: [0, 0, 8], fov: 60 }}
        dpr={[1, 1.5]}
        gl={{
          antialias: false,
          powerPreference: 'high-performance',
          alpha: false,
        }}
        style={{ background: '#0a0f1a' }}
      >
        <color attach="background" args={['#0a0f1a']} />
        <fog attach="fog" args={['#0a0f1a', 8, 20]} />
        <Particles />
      </Canvas>
    </div>
  );
};

export default ParticleField3D;
