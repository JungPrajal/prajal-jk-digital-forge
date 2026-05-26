import React, { useRef, useMemo, useState, useCallback, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Billboard } from '@react-three/drei';
import * as THREE from 'three';

interface SkillNode {
  id: string;
  label: string;
  group: string;
  color: string;
  position: [number, number, number];
  connections: string[];
}

const SKILLS: SkillNode[] = [
  // Core nodes
  { id: 'flutter', label: 'Flutter/Dart', group: 'mobile', color: '#02569B', position: [-2.5, 1.5, 0], connections: ['uiux', 'mobile-dev', 'php'] },
  { id: 'php', label: 'PHP/Laravel', group: 'backend', color: '#FF2D20', position: [2.5, 1.2, 0.5], connections: ['python', 'flutter', 'git'] },
  { id: 'python', label: 'Python/Django', group: 'backend', color: '#3776AB', position: [0, 2.8, -0.5], connections: ['tensorflow', 'cv', 'php'] },
  // AI/ML
  { id: 'tensorflow', label: 'TensorFlow', group: 'ai', color: '#FF6F00', position: [-1.5, -1.5, 1], connections: ['python', 'cv', 'nlp'] },
  { id: 'cv', label: 'Computer Vision', group: 'ai', color: '#f59e0b', position: [1.5, -1.8, 0.8], connections: ['tensorflow', 'python'] },
  { id: 'nlp', label: 'NLP', group: 'ai', color: '#fbbf24', position: [-3, -0.5, 0.5], connections: ['tensorflow', 'python'] },
  // Design & Tools
  { id: 'uiux', label: 'UI/UX Design', group: 'design', color: '#ec4899', position: [3, -0.5, -0.5], connections: ['figma', 'flutter'] },
  { id: 'figma', label: 'Figma', group: 'design', color: '#A259FF', position: [2, -2.5, -0.3], connections: ['uiux', 'adobe'] },
  { id: 'adobe', label: 'Adobe Suite', group: 'design', color: '#FF0000', position: [-0.5, -2.8, -0.8], connections: ['figma', 'uiux'] },
  // DevOps
  { id: 'git', label: 'Git/GitHub', group: 'devops', color: '#3b82f6', position: [0.5, 0, 1.5], connections: ['php', 'flutter', 'python'] },
  { id: 'mobile-dev', label: 'Mobile Dev', group: 'mobile', color: '#06b6d4', position: [-2.8, -2, -0.5], connections: ['flutter'] },
];

// Shared state for hovered node
const HoverContext = React.createContext<{
  hovered: string | null;
  setHovered: (id: string | null) => void;
}>({ hovered: null, setHovered: () => {} });

/* ─── Connection Lines ─── */
const ConnectionLines = React.memo(() => {
  const { hovered } = React.useContext(HoverContext);
  const groupRef = useRef<THREE.Group>(null);

  const lines = useMemo(() => {
    const result: { from: [number, number, number]; to: [number, number, number]; ids: [string, string] }[] = [];
    const seen = new Set<string>();
    SKILLS.forEach((node) => {
      node.connections.forEach((targetId) => {
        const key = [node.id, targetId].sort().join('-');
        if (seen.has(key)) return;
        seen.add(key);
        const target = SKILLS.find((n) => n.id === targetId);
        if (target) {
          result.push({ from: node.position, to: target.position, ids: [node.id, targetId] });
        }
      });
    });
    return result;
  }, []);

  return (
    <group ref={groupRef}>
      {lines.map((line, i) => {
        const isActive = hovered && (line.ids[0] === hovered || line.ids[1] === hovered);
        const points = [new THREE.Vector3(...line.from), new THREE.Vector3(...line.to)];
        const geometry = new THREE.BufferGeometry().setFromPoints(points);
        return (
          <primitive key={i} object={new THREE.Line(
            geometry,
            new THREE.LineBasicMaterial({
              color: '#00e5ff',
              transparent: true,
              opacity: isActive ? 0.9 : 0.12,
            })
          )} />
        );
      })}
    </group>
  );
});

/* ─── Single Node ─── */
const SkillNodeMesh = React.memo(({ node }: { node: SkillNode }) => {
  const { hovered, setHovered } = React.useContext(HoverContext);
  const meshRef = useRef<THREE.Mesh>(null);
  const glowRef = useRef<THREE.Mesh>(null);
  const baseScale = useRef(1);

  const isHovered = hovered === node.id;
  const isConnected = hovered
    ? SKILLS.find((n) => n.id === hovered)?.connections.includes(node.id)
    : false;
  const isActive = isHovered || isConnected;

  useFrame((state, delta) => {
    if (!meshRef.current) return;
    const targetScale = isHovered ? 1.4 : isConnected ? 1.2 : 1;
    baseScale.current += (targetScale - baseScale.current) * delta * 6;
    meshRef.current.scale.setScalar(baseScale.current);

    // Float
    const t = state.clock.elapsedTime;
    meshRef.current.position.y = node.position[1] + Math.sin(t * 0.8 + node.position[0]) * 0.08;

    if (glowRef.current) {
      glowRef.current.scale.setScalar(baseScale.current * 2.5);
      (glowRef.current.material as THREE.MeshBasicMaterial).opacity = isActive ? 0.3 : 0.05;
    }
  });

  return (
    <group position={node.position}>
      {/* Glow sphere */}
      <mesh ref={glowRef}>
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial color={node.color} transparent opacity={0.05} depthWrite={false} />
      </mesh>
      {/* Core sphere */}
      <mesh
        ref={meshRef}
        onPointerEnter={(e) => { e.stopPropagation(); setHovered(node.id); }}
        onPointerLeave={() => setHovered(null)}
      >
        <sphereGeometry args={[0.18, 24, 24]} />
        <meshStandardMaterial
          color={node.color}
          emissive={node.color}
          emissiveIntensity={isActive ? 1.2 : 0.3}
          roughness={0.3}
          metalness={0.6}
        />
      </mesh>
      {/* Label */}
      <Billboard follow lockX={false} lockY={false} lockZ={false}>
        <Text
          position={[0, 0.35, 0]}
          fontSize={0.16}
          color={isActive ? '#ffffff' : '#88aacc'}
          anchorX="center"
          anchorY="bottom"
          font="/fonts/inter-bold.woff"
          outlineWidth={0.01}
          outlineColor="#000000"
        >
          {node.label}
        </Text>
      </Billboard>
    </group>
  );
});

/* ─── Scene ─── */
const Scene = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.05;
    }
  });

  return (
    <group ref={groupRef}>
      <ambientLight intensity={0.4} />
      <pointLight position={[5, 5, 5]} intensity={0.8} color="#00e5ff" />
      <pointLight position={[-5, -3, 3]} intensity={0.4} color="#a855f7" />
      <ConnectionLines />
      {SKILLS.map((node) => (
        <SkillNodeMesh key={node.id} node={node} />
      ))}
    </group>
  );
};

/* ─── Main Component ─── */
const SkillWeb3D: React.FC = () => {
  const [hovered, setHovered] = useState<string | null>(null);
  const [inView, setInView] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <section id="skills" className="min-h-screen py-20 relative">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-gradient">
          Neural Network
        </h2>
        <p className="text-center text-muted-foreground mb-8 max-w-lg mx-auto">
          Hover over a node to see its connections fire — my interconnected skill architecture.
        </p>
      </div>

      <div
        ref={containerRef}
        className="max-w-5xl mx-auto h-[500px] md:h-[600px] relative"
        style={{ willChange: 'transform, opacity', transform: 'translate3d(0,0,0)' }}
      >
        {inView ? (
          <HoverContext.Provider value={{ hovered, setHovered }}>
            <Canvas
              camera={{ position: [0, 0, 7], fov: 50 }}
              dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio : 1, 2)]}
              frameloop={inView ? 'always' : 'never'}
              shadows={false}
              gl={{ antialias: true, powerPreference: 'high-performance', alpha: true }}
              style={{ background: 'transparent' }}
            >
              <Scene />
            </Canvas>
          </HoverContext.Provider>
        ) : (
          <div style={{ display: 'none' }} />
        )}

        {/* Legend */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-4 flex-wrap justify-center">
          {[
            { label: 'Backend', color: '#10b981' },
            { label: 'AI/ML', color: '#f59e0b' },
            { label: 'Mobile', color: '#06b6d4' },
            { label: 'Design', color: '#ec4899' },
            { label: 'DevOps', color: '#3b82f6' },
          ].map((g) => (
            <span key={g.label} className="flex items-center gap-1.5 text-xs text-muted-foreground">
              <span className="w-2 h-2 rounded-full" style={{ background: g.color }} />
              {g.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillWeb3D;
