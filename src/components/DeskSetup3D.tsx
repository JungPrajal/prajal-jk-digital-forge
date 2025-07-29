import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box, Cylinder, RoundedBox } from '@react-three/drei';
import * as THREE from 'three';

const Monitor = () => {
  return (
    <group position={[0, 0.5, 0]}>
      {/* Monitor base */}
      <Cylinder args={[0.3, 0.3, 0.1]} position={[0, -0.4, 0]}>
        <meshStandardMaterial color="#1a1a1a" />
      </Cylinder>
      
      {/* Monitor stand */}
      <Box args={[0.1, 0.6, 0.1]} position={[0, -0.1, 0]}>
        <meshStandardMaterial color="#2a2a2a" />
      </Box>
      
      {/* Monitor screen */}
      <RoundedBox args={[2.2, 1.3, 0.1]} radius={0.05} position={[0, 0.3, 0]}>
        <meshStandardMaterial color="#111111" />
      </RoundedBox>
      
      {/* Screen content */}
      <Box args={[2, 1.1, 0.01]} position={[0, 0.3, 0.06]}>
        <meshStandardMaterial 
          color="#0a0a0a" 
          emissive="#1a1a2e"
          emissiveIntensity={0.5}
        />
      </Box>
      
      {/* Code lines simulation */}
      {[0, 1, 2, 3, 4].map((i) => (
        <Box 
          key={i}
          args={[1.5, 0.05, 0.01]} 
          position={[-0.2, 0.5 - i * 0.15, 0.07]}
        >
          <meshStandardMaterial 
            color={i % 2 === 0 ? "#00ff00" : "#0099ff"} 
            emissive={i % 2 === 0 ? "#00ff00" : "#0099ff"}
            emissiveIntensity={0.3}
          />
        </Box>
      ))}
    </group>
  );
};

const PCCase = () => {
  const pcRef = useRef<THREE.Group>(null);
  
  useFrame((state) => {
    if (pcRef.current) {
      // Subtle breathing light effect
      const intensity = 0.5 + Math.sin(state.clock.elapsedTime * 2) * 0.3;
      pcRef.current.children.forEach((child: any, index) => {
        if (child.material && index > 0) {
          child.material.emissiveIntensity = intensity;
        }
      });
    }
  });

  return (
    <group ref={pcRef} position={[2.5, 0, 0]} rotation={[0, -0.3, 0]}>
      {/* PC Case */}
      <RoundedBox args={[0.8, 1.8, 1.6]} radius={0.05}>
        <meshStandardMaterial color="#1a1a1a" />
      </RoundedBox>
      
      {/* RGB Fans */}
      <Cylinder args={[0.25, 0.25, 0.1]} position={[0.35, 0.5, 0]}>
        <meshStandardMaterial 
          color="#ff00ff" 
          emissive="#ff00ff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Cylinder>
      
      <Cylinder args={[0.25, 0.25, 0.1]} position={[0.35, -0.2, 0]}>
        <meshStandardMaterial 
          color="#00ffff" 
          emissive="#00ffff"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </Cylinder>
    </group>
  );
};

const Keyboard = () => {
  return (
    <group position={[0, -0.8, 1.2]}>
      <RoundedBox args={[3, 0.1, 1]} radius={0.05}>
        <meshStandardMaterial color="#2a2a2a" />
      </RoundedBox>
      
      {/* RGB underglow */}
      <Box args={[3.2, 0.05, 1.2]} position={[0, -0.1, 0]}>
        <meshStandardMaterial 
          color="#a855f7" 
          emissive="#a855f7"
          emissiveIntensity={0.3}
          transparent
          opacity={0.6}
        />
      </Box>
    </group>
  );
};

const MousePad = () => {
  return (
    <group position={[1.5, -0.85, 0.8]}>
      <RoundedBox args={[1.5, 0.02, 1.2]} radius={0.1}>
        <meshStandardMaterial 
          color="#06b6d4" 
          emissive="#06b6d4"
          emissiveIntensity={0.2}
        />
      </RoundedBox>
    </group>
  );
};

const DeskSetup3D = () => {
  return (
    <div className="w-full h-full">
      <Canvas camera={{ position: [4, 2, 6], fov: 50 }}>
        <ambientLight intensity={0.3} />
        <directionalLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, 5, 5]} intensity={0.5} color="#a855f7" />
        <pointLight position={[5, -5, 5]} intensity={0.5} color="#06b6d4" />
        
        {/* Desk surface */}
        <Box args={[6, 0.2, 3]} position={[0, -1, 0]}>
          <meshStandardMaterial color="#3a3a3a" />
        </Box>
        
        <Monitor />
        <PCCase />
        <Keyboard />
        <MousePad />
      </Canvas>
    </div>
  );
};

export default DeskSetup3D;