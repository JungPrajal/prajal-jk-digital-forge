import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Vector3 } from 'three';
import * as THREE from 'three';

const FlowingCurves = () => {
  const curveRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    if (curveRef.current) {
      curveRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 0.2) * 0.1;
    }
  });

  // Create flowing curve points
  const createCurvePoints = (offset: number) => {
    const points = [];
    for (let i = 0; i < 50; i++) {
      const t = i / 49;
      const x = (t - 0.5) * 20;
      const y = Math.sin(t * Math.PI * 3 + offset) * 3;
      const z = Math.cos(t * Math.PI * 2 + offset) * 2;
      points.push(new Vector3(x, y, z));
    }
    return points;
  };

  return (
    <group ref={curveRef}>
      {[0, 1, 2, 3].map((index) => {
        const points = createCurvePoints(index * Math.PI * 0.5);
        return (
          <line key={index}>
            <bufferGeometry>
              <bufferAttribute
                attach="attributes-position"
                count={points.length}
                array={new Float32Array(points.flatMap(p => [p.x, p.y, p.z]))}
                itemSize={3}
              />
            </bufferGeometry>
            <lineBasicMaterial 
              color={index % 2 === 0 ? "#a855f7" : "#06b6d4"} 
              transparent 
              opacity={0.6}
              linewidth={2}
            />
          </line>
        );
      })}
    </group>
  );
};

const FlowingBackground = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0">
      <Canvas camera={{ position: [0, 0, 10], fov: 75 }}>
        <ambientLight intensity={0.3} />
        <FlowingCurves />
      </Canvas>
      
      {/* Additional CSS curves for the flowing effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 -right-1/4 w-96 h-96 rounded-full border-2 border-primary animate-pulse"></div>
        <div className="absolute top-1/2 -left-1/4 w-80 h-80 rounded-full border border-accent animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/3 w-64 h-64 rounded-full border border-primary/50 animate-pulse"></div>
      </div>
      
      {/* Flowing gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 animate-pulse"></div>
    </div>
  );
};

export default FlowingBackground;