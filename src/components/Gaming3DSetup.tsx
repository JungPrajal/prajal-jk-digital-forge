import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Text, Box, Sphere, Cylinder, Plane } from '@react-three/drei';
import * as THREE from 'three';

// Code samples for different technologies
const codeSnippets = {
  react: [
    "import React, { useState, useEffect } from 'react';",
    "import { motion } from 'framer-motion';",
    "",
    "const Portfolio = () => {",
    "  const [skills, setSkills] = useState([]);",
    "  const [isLoading, setIsLoading] = useState(true);",
    "",
    "  useEffect(() => {",
    "    fetchSkills().then(data => {",
    "      setSkills(data);",
    "      setIsLoading(false);",
    "    });",
    "  }, []);",
    "",
    "  return (",
    "    <motion.div",
    "      initial={{ opacity: 0 }}",
    "      animate={{ opacity: 1 }}",
    "      className='portfolio-container'",
    "    >",
    "      <h1>Prajal - Full Stack Developer</h1>",
    "      {skills.map(skill => (",
    "        <SkillCard key={skill.id} skill={skill} />",
    "      ))}",
    "    </motion.div>",
    "  );",
    "};"
  ],
  python: [
    "# Django REST API Development",
    "from rest_framework import serializers, viewsets",
    "from rest_framework.decorators import action",
    "from rest_framework.response import Response",
    "from django.db import models",
    "",
    "class ProjectSerializer(serializers.ModelSerializer):",
    "    class Meta:",
    "        model = Project",
    "        fields = ['id', 'title', 'description', 'tech_stack']",
    "",
    "class ProjectViewSet(viewsets.ModelViewSet):",
    "    queryset = Project.objects.all()",
    "    serializer_class = ProjectSerializer",
    "",
    "    @action(detail=False, methods=['get'])",
    "    def featured(self, request):",
    "        featured_projects = self.queryset.filter(is_featured=True)",
    "        serializer = self.get_serializer(featured_projects, many=True)",
    "        return Response(serializer.data)",
    "",
    "    def perform_create(self, serializer):",
    "        serializer.save(author=self.request.user)"
  ],
  flutter: [
    "// Flutter Mobile App Development",
    "import 'package:flutter/material.dart';",
    "import 'package:provider/provider.dart';",
    "",
    "class PortfolioApp extends StatelessWidget {",
    "  @override",
    "  Widget build(BuildContext context) {",
    "    return MaterialApp(",
    "      title: 'Prajal Portfolio',",
    "      theme: ThemeData(",
    "        primarySwatch: Colors.purple,",
    "        visualDensity: VisualDensity.adaptivePlatformDensity,",
    "      ),",
    "      home: HomePage(),",
    "    );",
    "  }",
    "}",
    "",
    "class HomePage extends StatefulWidget {",
    "  @override",
    "  _HomePageState createState() => _HomePageState();",
    "}",
    "",
    "class _HomePageState extends State<HomePage>",
    "    with TickerProviderStateMixin {",
    "  AnimationController? _controller;",
    "",
    "  @override",
    "  void initState() {",
    "    super.initState();",
    "    _controller = AnimationController(",
    "      duration: Duration(seconds: 2),",
    "      vsync: this,",
    "    )..repeat(reverse: true);",
    "  }"
  ],
  laravel: [
    "<?php",
    "// Laravel API Controller",
    "namespace App\\Http\\Controllers\\API;",
    "",
    "use App\\Http\\Controllers\\Controller;",
    "use App\\Models\\Project;",
    "use Illuminate\\Http\\Request;",
    "use Illuminate\\Http\\JsonResponse;",
    "",
    "class ProjectController extends Controller",
    "{",
    "    public function index(): JsonResponse",
    "    {",
    "        $projects = Project::with(['technologies', 'images'])",
    "            ->where('status', 'published')",
    "            ->orderBy('created_at', 'desc')",
    "            ->paginate(10);",
    "",
    "        return response()->json([",
    "            'success' => true,",
    "            'data' => $projects,",
    "            'message' => 'Projects retrieved successfully'",
    "        ]);",
    "    }",
    "",
    "    public function store(Request $request): JsonResponse",
    "    {",
    "        $validated = $request->validate([",
    "            'title' => 'required|string|max:255',",
    "            'description' => 'required|string',",
    "            'tech_stack' => 'required|array'",
    "        ]);",
    ""
  ]
};

const CodeDisplay = ({ mousePosition, currentTech }) => {
  const [currentLine, setCurrentLine] = useState(0);
  const [currentChar, setCurrentChar] = useState(0);
  const [displayedCode, setDisplayedCode] = useState<string[]>([]);
  const [isTyping, setIsTyping] = useState(true);

  const codeLines = codeSnippets[currentTech] || codeSnippets.react;

  useEffect(() => {
    if (!isTyping) return;

    const timer = setInterval(() => {
      if (currentLine < codeLines.length) {
        const line = codeLines[currentLine];
        if (currentChar < line.length) {
          setDisplayedCode(prev => {
            const newCode = [...prev];
            if (!newCode[currentLine]) {
              newCode[currentLine] = '';
            }
            newCode[currentLine] = line.substring(0, currentChar + 1);
            return newCode;
          });
          setCurrentChar(prev => prev + 1);
        } else {
          setCurrentLine(prev => prev + 1);
          setCurrentChar(0);
        }
      } else {
        setIsTyping(false);
        setTimeout(() => {
          setCurrentLine(0);
          setCurrentChar(0);
          setDisplayedCode([]);
          setIsTyping(true);
        }, 3000);
      }
    }, Math.random() * 100 + 50); // Variable typing speed

    return () => clearInterval(timer);
  }, [currentLine, currentChar, isTyping, codeLines]);

  const getSyntaxColor = (line: string) => {
    if (line.includes('//') || line.includes('#')) return '#6B7280';
    if (line.includes('import') || line.includes('from') || line.includes('use ')) return '#EC4899';
    if (line.includes('const') || line.includes('function') || line.includes('class')) return '#8B5CF6';
    if (line.includes('useState') || line.includes('useEffect')) return '#3B82F6';
    if (line.includes("'") || line.includes('"')) return '#10B981';
    if (line.includes('return') || line.includes('export')) return '#F59E0B';
    if (line.includes('<') || line.includes('>')) return '#06B6D4';
    if (line.includes('{') || line.includes('}') || line.includes('[') || line.includes(']')) return '#F97316';
    return '#E5E7EB';
  };

  return (
    <div className="absolute inset-2 bg-gray-900/95 rounded-lg p-4 font-mono text-xs overflow-hidden">
      {/* VS Code-like header */}
      <div className="flex items-center justify-between mb-3 pb-2 border-b border-gray-700/50">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500 animate-pulse"></div>
          <div className="w-3 h-3 rounded-full bg-yellow-500 animate-pulse" style={{ animationDelay: '0.3s' }}></div>
          <div className="w-3 h-3 rounded-full bg-green-500 animate-pulse" style={{ animationDelay: '0.6s' }}></div>
        </div>
        <span className="text-gray-400 text-[10px] bg-gray-800 px-2 py-1 rounded">
          {currentTech === 'react' ? 'Portfolio.tsx' : 
           currentTech === 'python' ? 'api.py' :
           currentTech === 'flutter' ? 'main.dart' : 'ProjectController.php'}
        </span>
      </div>
      
      {/* Code content */}
      <div className="space-y-1 relative">
        {displayedCode.map((line, index) => (
          <div key={index} className="flex animate-fade-in" style={{ animationDelay: `${index * 0.1}s` }}>
            <span className="text-gray-500 text-[10px] mr-3 w-6 text-right">{index + 1}</span>
            <span className="text-[10px] leading-relaxed" style={{ color: getSyntaxColor(line) }}>
              {line}
              {index === currentLine && isTyping && (
                <span className="inline-block w-px h-3 bg-white animate-pulse ml-px"></span>
              )}
            </span>
          </div>
        ))}
      </div>
      
      {/* Terminal at bottom */}
      <div className="absolute bottom-4 left-4 right-4 bg-black/80 rounded p-2 text-[10px]">
        <div className="text-green-400">
          $ npm run dev
          <br />
          <span className="text-gray-400">✓ Local:   http://localhost:3000/</span>
          <br />
          <span className="text-blue-400">Ready in 847ms</span>
        </div>
      </div>
    </div>
  );
};

const RGBLight = ({ position, color, intensity = 1, mousePosition }) => {
  const lightRef = useRef<THREE.PointLight>();
  
  useFrame((state) => {
    if (lightRef.current) {
      // React to mouse position
      const mouseInfluence = Math.max(0, 1 - 
        Math.sqrt(
          Math.pow(mousePosition.x - position[0], 2) + 
          Math.pow(mousePosition.y - position[1], 2)
        ) / 5
      );
      
      lightRef.current.intensity = intensity + mouseInfluence * 2;
      
      // Subtle pulsing
      lightRef.current.intensity += Math.sin(state.clock.elapsedTime * 3) * 0.3;
    }
  });

  return (
    <pointLight
      ref={lightRef}
      position={position}
      color={color}
      intensity={intensity}
      distance={10}
      decay={2}
    />
  );
};

const PCCase = ({ mousePosition, onHover }) => {
  const caseRef = useRef<THREE.Group>(null);
  const [rgbColor, setRgbColor] = useState('#8B5CF6');
  
  useFrame((state) => {
    if (caseRef.current) {
      // Subtle rotation based on mouse
      caseRef.current.rotation.y = mousePosition.x * 0.1;
      caseRef.current.rotation.x = mousePosition.y * 0.05;
    }
  });

  useEffect(() => {
    const colors = ['#8B5CF6', '#EC4899', '#06B6D4', '#10B981', '#F59E0B'];
    const interval = setInterval(() => {
      setRgbColor(colors[Math.floor(Math.random() * colors.length)]);
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={caseRef} position={[3, -1, 0]} onPointerOver={() => onHover('react')}>
      {/* Main PC case */}
      <Box args={[1.5, 3, 2]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1F2937" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* RGB fans */}
      <Cylinder args={[0.3, 0.3, 0.1]} position={[0.6, 1, 1]}>
        <meshStandardMaterial color={rgbColor} emissive={rgbColor} emissiveIntensity={0.3} />
      </Cylinder>
      <Cylinder args={[0.3, 0.3, 0.1]} position={[0.6, 0, 1]}>
        <meshStandardMaterial color={rgbColor} emissive={rgbColor} emissiveIntensity={0.3} />
      </Cylinder>
      <Cylinder args={[0.3, 0.3, 0.1]} position={[0.6, -1, 1]}>
        <meshStandardMaterial color={rgbColor} emissive={rgbColor} emissiveIntensity={0.3} />
      </Cylinder>
      
      {/* GPU with RGB */}
      <Box args={[1.2, 0.3, 0.8]} position={[0, -0.5, 0.5]}>
        <meshStandardMaterial color="#374151" emissive={rgbColor} emissiveIntensity={0.1} />
      </Box>
      
      {/* RAM sticks */}
      <Box args={[0.1, 0.8, 0.3]} position={[-0.3, 0.5, 0.5]}>
        <meshStandardMaterial color="#6B7280" emissive={rgbColor} emissiveIntensity={0.2} />
      </Box>
      <Box args={[0.1, 0.8, 0.3]} position={[-0.1, 0.5, 0.5]}>
        <meshStandardMaterial color="#6B7280" emissive={rgbColor} emissiveIntensity={0.2} />
      </Box>
    </group>
  );
};

const Monitor = ({ mousePosition, currentTech, onHover }) => {
  const monitorRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (monitorRef.current) {
      monitorRef.current.rotation.y = mousePosition.x * 0.05;
      monitorRef.current.rotation.x = mousePosition.y * 0.02;
    }
  });

  return (
    <group ref={monitorRef} position={[0, 0, 0]} onPointerOver={() => onHover('python')}>
      {/* Monitor frame */}
      <Box args={[6, 4, 0.3]} position={[0, 0, 0]}>
        <meshStandardMaterial color="#1F2937" metalness={0.9} roughness={0.1} />
      </Box>
      
      {/* Screen */}
      <Box args={[5.6, 3.6, 0.05]} position={[0, 0, 0.15]}>
        <meshStandardMaterial color="#000000" emissive="#0F172A" emissiveIntensity={0.1} />
      </Box>
      
      {/* Monitor stand */}
      <Cylinder args={[0.3, 0.3, 1]} position={[0, -2.5, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </Cylinder>
      <Cylinder args={[0.8, 0.8, 0.2]} position={[0, -3, 0]}>
        <meshStandardMaterial color="#374151" metalness={0.8} roughness={0.2} />
      </Cylinder>
    </group>
  );
};

const Keyboard = ({ mousePosition, onHover }) => {
  const keyboardRef = useRef<THREE.Group>(null);
  const [typingKey, setTypingKey] = useState(-1);
  
  useFrame(() => {
    if (keyboardRef.current) {
      keyboardRef.current.rotation.x = mousePosition.y * 0.02;
    }
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTypingKey(Math.floor(Math.random() * 10));
      setTimeout(() => setTypingKey(-1), 100);
    }, 500);
    return () => clearInterval(interval);
  }, []);

  return (
    <group ref={keyboardRef} position={[0, -4, 2]} onPointerOver={() => onHover('flutter')}>
      {/* Keyboard base */}
      <Box args={[4, 0.2, 1.5]}>
        <meshStandardMaterial color="#1F2937" metalness={0.6} roughness={0.3} />
      </Box>
      
      {/* Keys with RGB backlighting */}
      {Array.from({ length: 10 }, (_, i) => (
        <Box key={i} args={[0.3, 0.1, 0.3]} position={[-1.8 + i * 0.4, 0.15, 0]}>
          <meshStandardMaterial 
            color="#374151" 
            emissive={typingKey === i ? "#8B5CF6" : "#1F2937"} 
            emissiveIntensity={typingKey === i ? 0.5 : 0.1} 
          />
        </Box>
      ))}
    </group>
  );
};

const Mouse = ({ mousePosition, onHover }) => {
  const mouseRef = useRef<THREE.Group>(null);
  
  useFrame(() => {
    if (mouseRef.current) {
      mouseRef.current.position.x = mousePosition.x * 0.5;
      mouseRef.current.position.z = 2 + mousePosition.y * 0.2;
    }
  });

  return (
    <group ref={mouseRef} position={[2, -4, 2]} onPointerOver={() => onHover('laravel')}>
      {/* Mouse body */}
      <Box args={[0.6, 0.2, 1]}>
        <meshStandardMaterial color="#1F2937" metalness={0.8} roughness={0.2} />
      </Box>
      
      {/* RGB logo */}
      <Sphere args={[0.1]} position={[0, 0.15, -0.2]}>
        <meshStandardMaterial color="#EC4899" emissive="#EC4899" emissiveIntensity={0.8} />
      </Sphere>
    </group>
  );
};

const Scene3D = ({ mousePosition, currentTech, setCurrentTech }) => {
  const handleHover = useCallback((tech) => {
    setCurrentTech(tech);
  }, [setCurrentTech]);

  return (
    <>
      {/* Ambient lighting */}
      <ambientLight intensity={0.2} />
      
      {/* RGB lighting system */}
      <RGBLight position={[0, 2, 2]} color="#8B5CF6" mousePosition={mousePosition} />
      <RGBLight position={[3, 0, 2]} color="#EC4899" mousePosition={mousePosition} />
      <RGBLight position={[-3, 0, 2]} color="#06B6D4" mousePosition={mousePosition} />
      <RGBLight position={[0, -2, 2]} color="#10B981" mousePosition={mousePosition} />
      
      {/* PC Components */}
      <Monitor mousePosition={mousePosition} currentTech={currentTech} onHover={handleHover} />
      <PCCase mousePosition={mousePosition} onHover={handleHover} />
      <Keyboard mousePosition={mousePosition} onHover={handleHover} />
      <Mouse mousePosition={mousePosition} onHover={handleHover} />
      
      {/* Desk surface */}
      <Plane args={[12, 8]} position={[0, -4.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <meshStandardMaterial color="#0F172A" metalness={0.3} roughness={0.7} />
      </Plane>
      
      {/* Particles */}
      {Array.from({ length: 20 }, (_, i) => (
        <Sphere key={i} args={[0.02]} position={[
          (Math.random() - 0.5) * 10,
          Math.random() * 5,
          (Math.random() - 0.5) * 10
        ]}>
          <meshStandardMaterial color="#8B5CF6" emissive="#8B5CF6" emissiveIntensity={0.5} />
        </Sphere>
      ))}
    </>
  );
};

const Gaming3DSetup = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentTech, setCurrentTech] = useState('react');
  const containerRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = useCallback((event: MouseEvent) => {
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
      setMousePosition({ x, y });
    }
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
      return () => container.removeEventListener('mousemove', handleMouseMove);
    }
  }, [handleMouseMove]);

  return (
    <div ref={containerRef} className="relative w-full h-screen bg-gradient-to-br from-gray-900 via-purple-900/20 to-gray-900 overflow-hidden">
      {/* 3D Canvas */}
      <Canvas camera={{ position: [0, 0, 8], fov: 75 }} className="absolute inset-0">
        <Scene3D 
          mousePosition={mousePosition} 
          currentTech={currentTech} 
          setCurrentTech={setCurrentTech} 
        />
      </Canvas>
      
      {/* Code display overlay positioned over monitor */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="relative w-full h-full">
          <div 
            className="absolute w-96 h-64 pointer-events-auto"
            style={{ 
              left: '50%', 
              top: '50%', 
              transform: 'translate(-50%, -60%)' 
            }}
          >
            <CodeDisplay mousePosition={mousePosition} currentTech={currentTech} />
          </div>
        </div>
      </div>
      
      {/* Hero content overlay */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="text-center z-10 mt-96">
          <h1 className="text-6xl md:text-8xl font-bold text-white mb-6 animate-fade-in">
            <span className="bg-gradient-to-r from-purple-400 via-pink-500 to-cyan-400 bg-clip-text text-transparent">
              Prajal Khanal
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 animate-fade-in" style={{ animationDelay: '0.2s' }}>
            Full Stack Developer & Gaming Enthusiast
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <span className="px-4 py-2 bg-purple-500/20 text-purple-300 rounded-full border border-purple-500/30">
              React/TypeScript
            </span>
            <span className="px-4 py-2 bg-blue-500/20 text-blue-300 rounded-full border border-blue-500/30">
              Python/Django
            </span>
            <span className="px-4 py-2 bg-cyan-500/20 text-cyan-300 rounded-full border border-cyan-500/30">
              Flutter
            </span>
            <span className="px-4 py-2 bg-red-500/20 text-red-300 rounded-full border border-red-500/30">
              PHP/Laravel
            </span>
          </div>
          
          {/* Interactive hint */}
          <p className="text-sm text-gray-400 mt-8 animate-pulse">
            Move your mouse to interact with the setup • Hover over components to see different code
          </p>
        </div>
      </div>
      
      {/* RGB glow effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div 
          className="absolute w-32 h-32 bg-purple-500/30 rounded-full blur-3xl transition-all duration-300"
          style={{ 
            left: `${(mousePosition.x + 1) * 50}%`, 
            top: `${(-mousePosition.y + 1) * 50}%`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
        <div 
          className="absolute w-24 h-24 bg-cyan-500/20 rounded-full blur-2xl transition-all duration-500"
          style={{ 
            left: `${(mousePosition.x + 1) * 30 + 20}%`, 
            top: `${(-mousePosition.y + 1) * 30 + 30}%`,
            transform: 'translate(-50%, -50%)'
          }}
        ></div>
      </div>
    </div>
  );
};

export default Gaming3DSetup;